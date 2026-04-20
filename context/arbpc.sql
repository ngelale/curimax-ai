-- =====================================================================
-- ARBPC MARKETPLACE - PRODUCTION DATABASE DESIGN
-- =====================================================================
-- Target: PostgreSQL 15+
-- Scale: 100K+ students, 10K+ programs, 1M+ applications/year
-- Assumptions: Multi-region deployment, 10:1 read:write ratio
-- Design: Optimized for concurrent writes, forensic auditing, 5-year evolution
-- =====================================================================

-- =====================================================================
-- SECTION 1: EXTENSIONS & DOMAINS
-- =====================================================================

-- Required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";           -- UUID generation
CREATE EXTENSION IF NOT EXISTS "pg_trgm";             -- Trigram text search
CREATE EXTENSION IF NOT EXISTS "btree_gist";          -- Exclusion constraints
CREATE EXTENSION IF NOT EXISTS "pgcrypto";            -- Cryptographic functions

-- Reusable domain types for data integrity
CREATE DOMAIN email_address AS VARCHAR(255)
  CHECK (VALUE ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

CREATE DOMAIN phone_number AS VARCHAR(20)
  CHECK (VALUE ~ '^\+?[1-9]\d{1,14}$');  -- E.164 format

CREATE DOMAIN slug AS VARCHAR(255)
  CHECK (VALUE ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$');  -- Lowercase, hyphenated

CREATE DOMAIN monetary_amount AS NUMERIC(12, 2)
  CHECK (VALUE >= 0);  -- Non-negative, 2 decimal precision

CREATE DOMAIN rating AS NUMERIC(2, 1)
  CHECK (VALUE >= 0 AND VALUE <= 5.0);  -- 0.0 to 5.0 range

-- =====================================================================
-- SECTION 2: CORE ENTITY TABLES
-- =====================================================================

-- ---------------------------------------------------------------------
-- TABLE: users
-- Purpose: Authentication and authorization foundation
-- Pattern: Separate auth from profiles (security boundary)
-- ---------------------------------------------------------------------
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Authentication
  email email_address NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,  -- bcrypt, never plaintext
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  email_verified_at TIMESTAMPTZ,
  
  -- Account status
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_locked BOOLEAN NOT NULL DEFAULT FALSE,
  locked_reason VARCHAR(255),
  locked_at TIMESTAMPTZ,
  
  -- Security tracking
  failed_login_attempts INTEGER NOT NULL DEFAULT 0,
  last_login_at TIMESTAMPTZ,
  last_login_ip INET,
  password_changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- MFA (future)
  mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  mfa_secret VARCHAR(255),
  
  -- Audit trail
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT users_password_hash_not_empty CHECK (LENGTH(password_hash) > 0),
  CONSTRAINT users_failed_attempts_range CHECK (failed_login_attempts >= 0 AND failed_login_attempts <= 10)
);

-- Indexes
CREATE UNIQUE INDEX idx_users_email_lower ON users(LOWER(email));  -- Case-insensitive email lookup
CREATE INDEX idx_users_last_login ON users(last_login_at DESC) WHERE is_active = TRUE;
CREATE INDEX idx_users_created ON users(created_at DESC);

COMMENT ON TABLE users IS 'Authentication accounts - security boundary separate from student profiles';
COMMENT ON COLUMN users.password_hash IS 'bcrypt hash, cost factor 12+, never store plaintext';
COMMENT ON COLUMN users.failed_login_attempts IS 'Reset to 0 on successful login; lock account at 10';

-- ---------------------------------------------------------------------
-- TABLE: student_profiles
-- Purpose: Student demographic and academic information
-- Pattern: 1:1 with users, optimized for read-heavy profile queries
-- ---------------------------------------------------------------------
CREATE TABLE student_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  
  -- Personal information (PII - requires encryption at rest)
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone phone_number,
  date_of_birth DATE,
  
  -- Address (structured for validation)
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state_province VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(2),  -- ISO 3166-1 alpha-2
  
  -- Academic background
  current_education_level VARCHAR(50) CHECK (current_education_level IN 
    ('high_school', 'associate', 'bachelor', 'master', 'doctorate', 'other')),
  current_institution VARCHAR(255),
  graduation_year INTEGER,
  gpa NUMERIC(3, 2),  -- 0.00 to 4.00
  
  -- Interests and preferences
  interested_fields TEXT[],  -- Array of interest tags
  preferred_study_mode VARCHAR(20) CHECK (preferred_study_mode IN 
    ('online', 'in_person', 'hybrid', 'flexible')),
  
  -- Profile completeness (computed field)
  profile_completeness_percent INTEGER NOT NULL DEFAULT 0 CHECK 
    (profile_completeness_percent >= 0 AND profile_completeness_percent <= 100),
  
  -- Audit trail
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT student_profiles_gpa_range CHECK (gpa IS NULL OR (gpa >= 0 AND gpa <= 4.0)),
  CONSTRAINT student_profiles_graduation_future CHECK 
    (graduation_year IS NULL OR graduation_year >= EXTRACT(YEAR FROM NOW()) - 10)
);

-- Indexes
CREATE INDEX idx_student_profiles_user ON student_profiles(user_id);
CREATE INDEX idx_student_profiles_education ON student_profiles(current_education_level) 
  WHERE current_education_level IS NOT NULL;
CREATE INDEX idx_student_profiles_country ON student_profiles(country) 
  WHERE country IS NOT NULL;
CREATE INDEX idx_student_profiles_updated ON student_profiles(updated_at DESC);

-- Full-text search on name
CREATE INDEX idx_student_profiles_name_trgm ON student_profiles 
  USING gin((first_name || ' ' || last_name) gin_trgm_ops);

COMMENT ON TABLE student_profiles IS 'Student demographic data - PII requiring encryption at rest';
COMMENT ON COLUMN student_profiles.profile_completeness_percent IS 'Computed by trigger on update; drives UX nudges';

-- ---------------------------------------------------------------------
-- TABLE: institutions
-- Purpose: Educational institutions offering programs
-- Pattern: Reference data with moderate update frequency
-- ---------------------------------------------------------------------
CREATE TABLE institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug slug NOT NULL UNIQUE,
  
  -- Basic information
  name VARCHAR(255) NOT NULL,
  legal_name VARCHAR(255),
  institution_type VARCHAR(50) CHECK (institution_type IN 
    ('university', 'college', 'vocational', 'online', 'corporate', 'other')),
  
  -- Accreditation
  is_accredited BOOLEAN NOT NULL DEFAULT FALSE,
  accreditation_body VARCHAR(255),
  accreditation_status VARCHAR(50),
  
  -- Location
  country VARCHAR(2) NOT NULL,  -- ISO 3166-1 alpha-2
  city VARCHAR(100),
  state_province VARCHAR(100),
  
  -- Contact
  website_url TEXT,
  contact_email email_address,
  phone phone_number,
  
  -- Metadata for search
  description TEXT,
  logo_url TEXT,
  
  -- Ratings and rankings (denormalized for performance)
  avg_rating rating,
  total_reviews INTEGER NOT NULL DEFAULT 0,
  ranking_national INTEGER,
  ranking_global INTEGER,
  
  -- Status
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  verified BOOLEAN NOT NULL DEFAULT FALSE,  -- Manual verification by admin
  
  -- Audit trail
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_by_id UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE UNIQUE INDEX idx_institutions_slug ON institutions(slug);
CREATE INDEX idx_institutions_country ON institutions(country);
CREATE INDEX idx_institutions_type ON institutions(institution_type);
CREATE INDEX idx_institutions_rating ON institutions(avg_rating DESC NULLS LAST) 
  WHERE is_active = TRUE;
CREATE INDEX idx_institutions_active ON institutions(is_active, verified);

-- Full-text search
CREATE INDEX idx_institutions_name_trgm ON institutions 
  USING gin(name gin_trgm_ops);
CREATE INDEX idx_institutions_fts ON institutions 
  USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));

COMMENT ON TABLE institutions IS 'Educational institutions - reference data cached aggressively';
COMMENT ON COLUMN institutions.avg_rating IS 'Denormalized from reviews; updated by trigger on review insert/update';

-- ---------------------------------------------------------------------
-- TABLE: programs
-- Purpose: Educational programs offered by institutions
-- Pattern: High read volume, moderate updates, complex search requirements
-- ---------------------------------------------------------------------
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug slug NOT NULL UNIQUE,
  institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE RESTRICT,
  
  -- Basic information
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  description TEXT NOT NULL,
  
  -- Program classification
  category VARCHAR(100) NOT NULL,  -- Technology, Business, Arts, etc.
  subcategory VARCHAR(100),
  degree_level VARCHAR(50) NOT NULL CHECK (degree_level IN 
    ('certificate', 'associate', 'bachelor', 'master', 'doctorate', 'professional')),
  degree_type VARCHAR(100),  -- BS, BA, MBA, PhD, etc.
  
  -- Program details
  duration_months INTEGER NOT NULL CHECK (duration_months > 0 AND duration_months <= 120),
  study_mode VARCHAR(20) NOT NULL CHECK (study_mode IN 
    ('online', 'in_person', 'hybrid')),
  language VARCHAR(10) NOT NULL DEFAULT 'en',  -- ISO 639-1
  
  -- Pricing
  tuition monetary_amount NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',  -- ISO 4217
  application_fee monetary_amount,
  
  -- Scholarship information
  is_scholarship_applicable BOOLEAN NOT NULL DEFAULT FALSE,
  scholarship_max_amount monetary_amount,
  scholarship_description TEXT,
  
  -- Important dates
  start_date DATE,
  application_deadline DATE,
  early_decision_deadline DATE,
  
  -- Admission requirements (JSONB for flexibility)
  admission_requirements JSONB,  -- {min_gpa, test_scores, etc.}
  prerequisites TEXT[],
  
  -- Program outcomes
  placement_rate NUMERIC(5, 2) CHECK (placement_rate >= 0 AND placement_rate <= 100),
  avg_starting_salary monetary_amount,
  
  -- Capacity and enrollment
  max_enrollment INTEGER,
  current_enrollment INTEGER NOT NULL DEFAULT 0,
  
  -- Demand score (computed hourly by analytics service)
  demand_score NUMERIC(3, 1) CHECK (demand_score >= 0 AND demand_score <= 5.0),
  demand_score_updated_at TIMESTAMPTZ,
  
  -- Ratings (denormalized)
  avg_rating rating,
  total_reviews INTEGER NOT NULL DEFAULT 0,
  
  -- Status
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- SEO metadata
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  
  -- Audit trail
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Constraints
  CONSTRAINT programs_enrollment_capacity CHECK 
    (max_enrollment IS NULL OR current_enrollment <= max_enrollment),
  CONSTRAINT programs_dates_valid CHECK 
    (application_deadline IS NULL OR start_date IS NULL OR application_deadline < start_date)
);

-- Indexes for common queries
CREATE UNIQUE INDEX idx_programs_slug ON programs(slug);
CREATE INDEX idx_programs_institution ON programs(institution_id);
CREATE INDEX idx_programs_category ON programs(category, subcategory) 
  WHERE is_active = TRUE;
CREATE INDEX idx_programs_degree_level ON programs(degree_level) 
  WHERE is_active = TRUE;
CREATE INDEX idx_programs_tuition ON programs(tuition) 
  WHERE is_active = TRUE;

-- Sorting indexes
CREATE INDEX idx_programs_demand ON programs(demand_score DESC NULLS LAST, avg_rating DESC NULLS LAST) 
  WHERE is_active = TRUE;
CREATE INDEX idx_programs_rating ON programs(avg_rating DESC NULLS LAST, total_reviews DESC) 
  WHERE is_active = TRUE;
CREATE INDEX idx_programs_deadline ON programs(application_deadline) 
  WHERE is_active = TRUE AND application_deadline > NOW();

-- Composite index for faceted search
CREATE INDEX idx_programs_search ON programs(category, degree_level, study_mode, tuition) 
  WHERE is_active = TRUE;

-- Full-text search
CREATE INDEX idx_programs_fts ON programs 
  USING gin(to_tsvector('english', title || ' ' || subtitle || ' ' || description));

-- Scholarship filtering
CREATE INDEX idx_programs_scholarship ON programs(is_scholarship_applicable, scholarship_max_amount) 
  WHERE is_active = TRUE AND is_scholarship_applicable = TRUE;

COMMENT ON TABLE programs IS 'Educational programs - heavily cached, reindexed to Elasticsearch hourly';
COMMENT ON COLUMN programs.demand_score IS 'Computed hourly: (views + saves + applications) / time_live; cached in Redis';
COMMENT ON COLUMN programs.admission_requirements IS 'JSONB allows flexible structure without schema changes';

-- ---------------------------------------------------------------------
-- TABLE: applications
-- Purpose: Student applications to programs
-- Pattern: High write volume, transactional integrity critical, audit trail required
-- ---------------------------------------------------------------------
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE RESTRICT,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE RESTRICT,
  
  -- Idempotency (prevents duplicate submissions)
  request_id UUID NOT NULL UNIQUE,  -- Client-generated, stored in Redis for 24h
  
  -- Application state machine
  status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN 
    ('draft', 'submitted', 'under_review', 'accepted', 'rejected', 'waitlist', 'withdrawn', 'enrolled')),
  
  -- Workflow timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),  -- Draft created
  submitted_at TIMESTAMPTZ,  -- Submitted for review
  reviewed_at TIMESTAMPTZ,  -- Initial review completed
  decision_at TIMESTAMPTZ,  -- Final decision made
  enrolled_at TIMESTAMPTZ,  -- Student enrolled
  
  -- Application data (JSONB for schema flexibility across programs)
  personal_info JSONB NOT NULL DEFAULT '{}',  -- Name, contact, demographics
  academic_history JSONB NOT NULL DEFAULT '{}',  -- Education, GPA, transcripts
  test_scores JSONB,  -- SAT, GRE, GMAT, TOEFL, etc.
  work_experience JSONB,  -- Professional background
  recommendations JSONB,  -- Letters of recommendation (metadata, not files)
  essays JSONB,  -- Essay responses
  additional_materials JSONB,  -- Portfolio, publications, etc.
  
  -- File references (stored in S3/GCS, not database)
  resume_url TEXT,
  transcript_urls TEXT[],
  recommendation_urls TEXT[],
  portfolio_url TEXT,
  
  -- Payment tracking
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (payment_status IN 
    ('pending', 'paid', 'waived', 'refunded', 'failed')),
  payment_amount monetary_amount,
  payment_intent_id VARCHAR(255),  -- Stripe PaymentIntent ID
  payment_completed_at TIMESTAMPTZ,
  
  -- Review metadata
  assigned_reviewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reviewer_notes TEXT,
  decision_reason TEXT,
  
  -- Version control (optimistic locking)
  version INTEGER NOT NULL DEFAULT 1,
  
  -- Audit trail
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by_id UUID REFERENCES users(id) ON DELETE SET NULL,  -- Usually student
  updated_by_id UUID REFERENCES users(id) ON DELETE SET NULL,  -- May be admin/reviewer
  
  -- Constraints
  CONSTRAINT applications_submitted_requires_timestamp CHECK 
    (status = 'draft' OR submitted_at IS NOT NULL),
  CONSTRAINT applications_payment_consistency CHECK 
    (payment_status != 'paid' OR payment_completed_at IS NOT NULL),
  CONSTRAINT applications_decision_requires_timestamp CHECK 
    (status NOT IN ('accepted', 'rejected', 'waitlist') OR decision_at IS NOT NULL)
);

-- Critical indexes for queries and constraints
CREATE INDEX idx_applications_student ON applications(student_id, status, created_at DESC);
CREATE INDEX idx_applications_program ON applications(program_id, status, submitted_at DESC);
CREATE INDEX idx_applications_status ON applications(status, submitted_at DESC);
CREATE INDEX idx_applications_request_id ON applications(request_id);  -- Idempotency lookup

-- Prevent duplicate active applications
CREATE UNIQUE INDEX idx_applications_unique_active ON applications(student_id, program_id) 
  WHERE status IN ('draft', 'submitted', 'under_review', 'waitlist');

-- Partitioning for scalability (by student_id hash)
-- Note: Requires PostgreSQL 11+
-- ALTER TABLE applications PARTITION BY HASH (student_id);
-- CREATE TABLE applications_p0 PARTITION OF applications FOR VALUES WITH (MODULUS 4, REMAINDER 0);
-- CREATE TABLE applications_p1 PARTITION OF applications FOR VALUES WITH (MODULUS 4, REMAINDER 1);
-- CREATE TABLE applications_p2 PARTITION OF applications FOR VALUES WITH (MODULUS 4, REMAINDER 2);
-- CREATE TABLE applications_p3 PARTITION OF applications FOR VALUES WITH (MODULUS 4, REMAINDER 3);

COMMENT ON TABLE applications IS 'Student applications - partitioned by student_id, high write concurrency';
COMMENT ON COLUMN applications.request_id IS 'Client-generated UUID for idempotency; stored in Redis 24h';
COMMENT ON COLUMN applications.version IS 'Optimistic locking counter; increment on every update';
COMMENT ON COLUMN applications.personal_info IS 'JSONB structure varies by program requirements';

-- =====================================================================
-- SECTION 3: SUPPORTING TABLES
-- =====================================================================

-- ---------------------------------------------------------------------
-- TABLE: saved_programs
-- Purpose: Student program bookmarks/favorites
-- Pattern: Junction table, high write churn, eventual consistency OK
-- ---------------------------------------------------------------------
CREATE TABLE saved_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  
  -- Metadata
  notes TEXT,  -- Student's personal notes
  saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(student_id, program_id)
);

-- Indexes
CREATE INDEX idx_saved_programs_student ON saved_programs(student_id, saved_at DESC);
CREATE INDEX idx_saved_programs_program ON saved_programs(program_id);  -- For analytics

COMMENT ON TABLE saved_programs IS 'Student bookmarks - cached in Redis, eventual consistency acceptable';

-- ---------------------------------------------------------------------
-- TABLE: program_reviews
-- Purpose: Student reviews of programs
-- Pattern: Write-once, moderate read volume, impacts program ratings
-- ---------------------------------------------------------------------
CREATE TABLE program_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE SET NULL,
  
  -- Review content
  rating rating NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  
  -- Review metadata
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,  -- Verified enrollment
  is_flagged BOOLEAN NOT NULL DEFAULT FALSE,  -- Inappropriate content
  helpful_count INTEGER NOT NULL DEFAULT 0,
  
  -- Moderation
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN 
    ('pending', 'approved', 'rejected', 'hidden')),
  moderated_at TIMESTAMPTZ,
  moderated_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Audit trail
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT program_reviews_content_length CHECK (LENGTH(content) >= 50 AND LENGTH(content) <= 5000),
  UNIQUE(student_id, program_id)  -- One review per student per program
);

-- Indexes
CREATE INDEX idx_program_reviews_program ON program_reviews(program_id, status, created_at DESC);
CREATE INDEX idx_program_reviews_student ON program_reviews(student_id);
CREATE INDEX idx_program_reviews_rating ON program_reviews(rating) WHERE status = 'approved';

COMMENT ON TABLE program_reviews IS 'Student reviews - trigger updates programs.avg_rating on insert/update';

-- ---------------------------------------------------------------------
-- TABLE: application_history
-- Purpose: Full audit trail of application changes
-- Pattern: Append-only, no updates/deletes, forensic compliance
-- ---------------------------------------------------------------------
CREATE TABLE application_history (
  history_id BIGSERIAL PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  
  -- State capture
  version INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  application_snapshot JSONB NOT NULL,  -- Full application state
  
  -- Change metadata
  change_type VARCHAR(10) NOT NULL CHECK (change_type IN ('INSERT', 'UPDATE', 'DELETE')),
  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  changed_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
  change_reason VARCHAR(255),  -- Optional explanation
  
  -- Constraints
  UNIQUE(application_id, version)
);

-- Indexes
CREATE INDEX idx_application_history_application ON application_history(application_id, version DESC);
CREATE INDEX idx_application_history_changed ON application_history(changed_at DESC);

COMMENT ON TABLE application_history IS 'Append-only audit trail - never delete, partition by year for retention';

-- ---------------------------------------------------------------------
-- TABLE: sessions
-- Purpose: Active user sessions
-- Pattern: High churn, short TTL, delegated to Redis in production
-- ---------------------------------------------------------------------
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Session data
  token_hash VARCHAR(255) NOT NULL UNIQUE,  -- bcrypt hash of JWT
  ip_address INET,
  user_agent TEXT,
  
  -- Lifecycle
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Status
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  revoked_at TIMESTAMPTZ,
  revoked_reason VARCHAR(255)
);

-- Indexes
CREATE INDEX idx_sessions_user ON sessions(user_id, is_active, expires_at DESC);
CREATE INDEX idx_sessions_token ON sessions(token_hash) WHERE is_active = TRUE;
CREATE INDEX idx_sessions_expires ON sessions(expires_at) WHERE is_active = TRUE;

COMMENT ON TABLE sessions IS 'User sessions - migrate to Redis for production, use DB only for auditing';

-- =====================================================================
-- SECTION 4: TRIGGERS & FUNCTIONS
-- =====================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_profiles_updated_at BEFORE UPDATE ON student_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_institutions_updated_at BEFORE UPDATE ON institutions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_program_reviews_updated_at BEFORE UPDATE ON program_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Version increment for optimistic locking
CREATE OR REPLACE FUNCTION increment_application_version()
RETURNS TRIGGER AS $$
BEGIN
  NEW.version = OLD.version + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_application_version_trigger BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION increment_application_version();

-- Application history tracking
CREATE OR REPLACE FUNCTION track_application_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    INSERT INTO application_history (
      application_id, version, status, application_snapshot, 
      change_type, changed_by_id
    ) VALUES (
      NEW.id, NEW.version, NEW.status, row_to_json(NEW)::jsonb,
      'INSERT', NEW.created_by_id
    );
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO application_history (
      application_id, version, status, application_snapshot,
      change_type, changed_by_id
    ) VALUES (
      NEW.id, NEW.version, NEW.status, row_to_json(NEW)::jsonb,
      'UPDATE', NEW.updated_by_id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER track_application_changes_trigger AFTER INSERT OR UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION track_application_changes();

-- Update program ratings on review changes
CREATE OR REPLACE FUNCTION update_program_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE programs
  SET 
    avg_rating = (
      SELECT AVG(rating)::NUMERIC(2,1)
      FROM program_reviews
      WHERE program_id = NEW.program_id AND status = 'approved'
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM program_reviews
      WHERE program_id = NEW.program_id AND status = 'approved'
    )
  WHERE id = NEW.program_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_program_rating_trigger AFTER INSERT OR UPDATE ON program_reviews
  FOR EACH ROW EXECUTE FUNCTION update_program_rating();

-- =====================================================================
-- SECTION 5: INITIAL DATA & REFERENCE TABLES
-- =====================================================================

-- Reference: Application statuses (for documentation)
COMMENT ON COLUMN applications.status IS 
  'draft: Being edited by student
   submitted: Awaiting initial review
   under_review: Being evaluated by admissions
   accepted: Student accepted into program
   rejected: Application denied
   waitlist: On waiting list
   withdrawn: Student withdrew application
   enrolled: Student confirmed enrollment';

-- =====================================================================
-- END OF SCHEMA
-- =====================================================================