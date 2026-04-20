**# ARBPC v3-DYN: Build-Ready Technical Architecture**



\## Executive Summary



\*\*Project:\*\* ARBPC v3-DYN - Evidence-Based Curriculum Design Platform  

\*\*MVP Timeline:\*\* 12 weeks (3 months)  

\*\*Team Size:\*\* 2-3 developers (1 Full-stack, 1 AI/ML, 0.5 Designer)  

\*\*Estimated MVP Cost:\*\* $75K-$100K (personnel + infrastructure)  

\*\*Target:\*\* 10 design partner pilots → Commercial launch Month 7



\*\*Architecture Style:\*\* Modular Monolith with Serverless AI Workers  

\*\*Primary Stack:\*\* Next.js + PostgreSQL + Python AI Services



---



\## Phase 1 — Architecture Foundation



\### 1.1 Technical Constraints Analysis



\#### \*\*Hard Constraints\*\*



\*\*Budget: $50K-$100K (Year 1 tech budget)\*\*

\- \*\*Influences:\*\* 

&nbsp; - Must use cost-effective managed services (no DevOps team)

&nbsp; - Leverage free tiers and startup credits where possible

&nbsp; - Cannot hire multiple specialized engineers

&nbsp; - \*\*Decision:\*\* Modern serverless/PaaS stack to minimize operational overhead



\*\*Timeline: 12 weeks to functional MVP, 6 months to commercial launch\*\*

\- \*\*Implications:\*\*

&nbsp; - Choose familiar technologies over exotic ones

&nbsp; - Prioritize speed of development over perfect architecture

&nbsp; - Accept technical debt in non-critical areas

&nbsp; - \*\*Decision:\*\* Monolithic architecture for MVP, can split later



\*\*Team Composition: 1-2 developers (full-stack + AI specialist)\*\*

\- \*\*Skills Needed:\*\*

&nbsp; - JavaScript/TypeScript (React, Node.js)

&nbsp; - Python (for AI/ML work)

&nbsp; - SQL/Database design

&nbsp; - Basic DevOps (deployment pipelines)

\- \*\*Stack Choices:\*\*

&nbsp; - Cannot use specialized frameworks requiring deep expertise

&nbsp; - Must have strong documentation and community support

&nbsp; - \*\*Decision:\*\* Next.js ecosystem (familiar, well-documented, full-stack)



\*\*Compliance: FERPA (education data), GDPR (if EU users)\*\*

\- \*\*Requirements:\*\*

&nbsp; - No student-level data storage (aggregate only)

&nbsp; - Data export/deletion functionality

&nbsp; - Audit logging for data access

&nbsp; - Encryption at rest and in transit

&nbsp; - \*\*Decision:\*\* Build audit trails from day 1, add privacy features in v1.1



\*\*Integration Requirements:\*\*

\- Must work with web search APIs (Indeed, BLS, O\*NET)

\- Must generate documents (PDF, PowerPoint, Excel, Word)

\- Should integrate with email service (notifications)

\- Future: Payment processing, CRM, curriculum management systems



\#### \*\*Soft Constraints\*\*



\*\*Performance Targets:\*\*

\- Analysis completion: <15 minutes (95th percentile)

\- Page load time: <3 seconds

\- Time to first byte: <500ms

\- \*\*Priority:\*\* Medium - acceptable to optimize post-MVP



\*\*Scalability Needs:\*\*

\- MVP: 10 concurrent users, 100 projects total

\- Month 12: 30 customers × 3 projects = 90 active projects

\- Year 2: 100 customers × 5 projects = 500 active projects

\- \*\*Priority:\*\* Low for MVP - design for growth but don't over-engineer



\*\*Maintenance Expectations:\*\*

\- Founder + 1 developer maintaining post-launch

\- Must be simple enough for small team to support

\- \*\*Decision:\*\* Minimize custom infrastructure, use managed services



\#### \*\*Constraint Conflicts\*\*



\*\*⚖️ Speed vs. Quality:\*\*

\- \*\*Conflict:\*\* "McKinsey-quality outputs" vs. "30-day delivery"

\- \*\*Resolution:\*\* Focus AI quality on evidence gathering and analysis; accept manual refinement for curriculum design in MVP

\- \*\*Trade-off:\*\* Module 5 (Curriculum Blueprint) can be template-based initially, add AI generation in v2



\*\*⚖️ Self-Service vs. Consultant-Assisted:\*\*

\- \*\*Conflict:\*\* "$8.5K Sprint tier = self-service" but "currently manual delivery"

\- \*\*Resolution:\*\* MVP is consultant-assisted (wizard collects inputs, consultant refines); v2 adds full automation

\- \*\*Trade-off:\*\* Slower customer acquisition but higher quality outputs during validation phase



\*\*⚖️ Feature Completeness vs. Timeline:\*\*

\- \*\*Conflict:\*\* Spec lists 80+ page reports with 16 sections vs. 12-week build

\- \*\*Resolution:\*\* MVP delivers 20-30 page reports with 5 core sections (Executive Summary, Evidence, Competitors, Financials, Recommendations)

\- \*\*Trade-off:\*\* Defer Module 5 (Curriculum Blueprint AI), Module 7 (Collaboration), Module 8 (Analytics) to v2



---



\### 1.2 Architecture Style Selection



\*\*✅ Primary Architecture: Modular Monolith with Serverless AI Workers\*\*



\#### \*\*Rationale:\*\*



\*\*Why Monolith:\*\*

\- Small team (1-2 developers) cannot maintain microservices

\- MVP scope is focused (4-5 core modules)

\- Faster development (no inter-service communication overhead)

\- Simpler deployment (single application)

\- Easier debugging and monitoring

\- Lower infrastructure costs



\*\*Why Modular:\*\*

\- Cleanly separated modules (Intake, Evidence, Competitors, Financials, Reports)

\- Can extract to microservices later if needed

\- Promotes code organization and reusability

\- Each module has clear boundaries and interfaces



\*\*Why Serverless AI Workers:\*\*

\- Evidence gathering is long-running (5-15 minutes)

\- Don't want to block main application thread

\- Can scale independently (burst usage during analysis)

\- Cost-effective (pay-per-execution vs. always-on servers)



\#### \*\*What This Enables:\*\*

\- Fast iteration during MVP phase

\- Easy onboarding for new developers

\- Simple local development environment

\- Straightforward testing (no distributed system complexity)

\- Clear migration path to microservices if needed



\#### \*\*What This Constrains:\*\*

\- Cannot independently scale modules (but not needed for MVP volume)

\- Deployment requires full application redeploy (acceptable for small team)

\- Shared database (could become bottleneck at scale, but not for 100-500 projects)



\#### \*\*Specifically NOT Choosing:\*\*



\*\*❌ Microservices:\*\*

\- \*\*Reason:\*\* Massive operational overhead for 1-2 person team

\- Distributed tracing, service mesh, inter-service auth all add complexity

\- Would slow MVP development by 2-3x

\- Only needed at scale (1000+ customers, not Year 1 target)



\*\*❌ Pure Serverless (everything as functions):\*\*

\- \*\*Reason:\*\* Cold starts would hurt user experience

\- Complex state management across functions

\- Higher costs for always-on features (dashboard, real-time UI)

\- Better suited for batch/background jobs only



\*\*❌ JAMstack (static generation):\*\*

\- \*\*Reason:\*\* App is highly dynamic (user-generated data, long-running analyses)

\- Need server-side processing for AI workflows

\- Not a good fit for authenticated, data-driven applications



---



\### 1.3 System Context Diagram



```

┌─────────────────────────────────────────────────────────────────┐

│                          USER TYPES                              │

├─────────────────────────────────────────────────────────────────┤

│  Academic Director  │  Corporate CLO  │  Gov't Workforce Dir    │

│    Consultant       │  EdTech PM                                 │

└──────────────────┬──────────────────────────────────────────────┘

&nbsp;                  │

&nbsp;                  ↓

┌──────────────────────────────────────────────────────────────────┐

│                    WEB APPLICATION (Next.js)                      │

│  ┌────────────────────────────────────────────────────────────┐  │

│  │  Frontend (React + Tailwind)                               │  │

│  │  - Project Dashboard                                       │  │

│  │  - Intake Wizard                                           │  │

│  │  - Evidence/Competitor Tabs                                │  │

│  │  - Financial Calculator                                    │  │

│  │  - Report Generator                                        │  │

│  └────────────┬───────────────────────────────────────────────┘  │

│               │                                                   │

│  ┌────────────▼───────────────────────────────────────────────┐  │

│  │  Backend API (Next.js API Routes)                          │  │

│  │  - Authentication (NextAuth.js)                            │  │

│  │  - Project Management                                      │  │

│  │  - Analysis Orchestration                                  │  │

│  │  - Report Generation                                       │  │

│  └────────────┬───────────────────────────────────────────────┘  │

└───────────────┼───────────────────────────────────────────────────┘

&nbsp;               │

&nbsp;               ↓

┌───────────────────────────────────────────────────────────────────┐

│                      DATA \& SERVICES LAYER                         │

├───────────────────────────────────────────────────────────────────┤

│                                                                    │

│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐  │

│  │   PostgreSQL     │  │   Redis Cache    │  │   S3 Storage   │  │

│  │   (Supabase)     │  │   (Upstash)      │  │  (Vercel Blob) │  │

│  │                  │  │                  │  │                │  │

│  │  - Projects      │  │  - API responses │  │  - Reports     │  │

│  │  - Users         │  │  - Session data  │  │  - Uploads     │  │

│  │  - Evidence      │  │  - Job queue     │  │                │  │

│  │  - Competitors   │  │                  │  │                │  │

│  └──────────────────┘  └──────────────────┘  └────────────────┘  │

│                                                                    │

│  ┌────────────────────────────────────────────────────────────┐  │

│  │        AI/ML Services (Python + Vercel Functions)           │  │

│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │

│  │  │  Evidence    │  │  Competitor  │  │  Report         │  │  │

│  │  │  Gatherer    │  │  Analyzer    │  │  Generator      │  │  │

│  │  │              │  │              │  │                 │  │  │

│  │  │  - Web search│  │  - Web scrape│  │  - PDF/PPT/XLSX │  │  │

│  │  │  - BLS data  │  │  - Benchmark │  │  - Template fill│  │  │

│  │  │  - LLM parse │  │  - LLM gap   │  │  - File upload  │  │  │

│  │  └──────────────┘  └──────────────┘  └─────────────────┘  │  │

│  └────────────────────────────────────────────────────────────┘  │

└─────────────────────┬─────────────────────────────────────────────┘

&nbsp;                     │

&nbsp;                     ↓

┌──────────────────────────────────────────────────────────────────┐

│                    EXTERNAL SERVICES                              │

├──────────────────────────────────────────────────────────────────┤

│                                                                   │

│  🔍 Web Search                  📧 Email (Resend)                │

│     - Tavily API (primary)         - Transactional emails       │

│     - Fallback: Serper.dev         - Notifications              │

│                                                                   │

│  💳 Payments (Stripe)            🔐 Auth (NextAuth + Supabase)  │

│     - Subscription billing          - Email/password            │

│     - Usage tracking                - Future: SSO               │

│                                                                   │

│  📊 Analytics                    🐛 Monitoring                   │

│     - PostHog (product)             - Sentry (errors)           │

│     - Vercel Analytics (web)        - Vercel Logs              │

│                                                                   │

│  🤖 LLM API                      📄 Government Data              │

│     - OpenAI GPT-4 (primary)        - BLS API (free)            │

│     - Anthropic Claude (backup)     - O\*NET API (free)          │

│                                                                   │

└───────────────────────────────────────────────────────────────────┘

```



\*\*Data Flow Example (Create New Project):\*\*

```

1\. User fills intake wizard → Frontend validates

2\. POST /api/projects → API route receives

3\. Create project record → PostgreSQL

4\. Queue evidence job → Redis + Python worker

5\. Worker searches web → Tavily API

6\. Worker calls LLM → OpenAI API

7\. Worker parses results → Saves to PostgreSQL

8\. Worker completes → Updates project status

9\. Send email notification → Resend API

10\. User returns → Sees analysis results

```



---



\## Phase 2 — Technology Stack Selection



\### 2.1 Frontend Stack



\*\*⚙️ Framework Choice: Next.js 14+ (App Router)\*\*



\*\*Why:\*\*

\- \*\*Full-stack framework:\*\* Frontend + API routes in one codebase (perfect for small team)

\- \*\*Server components:\*\* Reduce client JavaScript, faster page loads

\- \*\*Built-in routing:\*\* File-based, intuitive for developers

\- \*\*Excellent TypeScript support:\*\* Catch errors at compile time

\- \*\*Vercel deployment:\*\* Zero-config, automatic HTTPS, edge network

\- \*\*Strong ecosystem:\*\* Massive community, abundant libraries

\- \*\*Team familiarity:\*\* Most common React framework (easier to hire/onboard)



\*\*Alternative Considered: Remix\*\*

\- \*\*Rejected because:\*\* Less mature ecosystem, smaller community, team unfamiliar

\- Next.js has better AI/ML integration examples (Python workers on Vercel)



\#### \*\*Core Libraries:\*\*



\*\*State Management: Zustand + React Query\*\*

\- \*\*Zustand (global state):\*\* Lightweight, simple API, perfect for user preferences, auth state

\- \*\*React Query (server state):\*\* Automatic caching, refetching, optimistic updates for API data

\- \*\*Why not Redux:\*\* Overkill for MVP complexity, slower development, steeper learning curve



\*\*Routing: Next.js App Router (built-in)\*\*

\- File-based routing in `/app` directory

\- Server components by default

\- Loading states and error boundaries built-in



\*\*UI Component Library: shadcn/ui + Tailwind CSS\*\*

\- \*\*shadcn/ui:\*\* Copy-paste components (no dependency bloat), full customization

\- \*\*Tailwind CSS:\*\* Utility-first, rapid prototyping, consistent design system

\- \*\*Why not MUI/Ant Design:\*\* Heavy bundles, harder to customize, opinionated styling



\*\*Forms: React Hook Form + Zod\*\*

\- \*\*React Hook Form:\*\* Performant (uncontrolled), excellent TypeScript support

\- \*\*Zod:\*\* Schema validation, reuse on frontend AND backend, type-safe

\- \*\*Why:\*\* Intake wizard has complex multi-step forms, need robust validation



\*\*Data Fetching: TanStack Query (React Query) v5\*\*

\- Automatic background refetching

\- Caching with smart invalidation

\- Optimistic updates

\- Loading/error states built-in

\- \*\*Perfect for:\*\* Long-running analyses (polling for status updates)



\*\*Charts/Visualizations: Recharts\*\*

\- React-native charting library

\- Responsive out-of-box

\- \*\*Use cases:\*\* Financial model charts, demand trend graphs, competitor comparison



\*\*Document Display: React-PDF\*\*

\- Preview generated reports before download

\- \*\*Use case:\*\* Report preview in Module 6



\#### \*\*Build \& Dev Tools:\*\*



\*\*Bundler: Next.js built-in (Turbopack)\*\*

\- Faster than Webpack

\- Zero config

\- Optimized for production



\*\*Package Manager: pnpm\*\*

\- Faster than npm/yarn

\- Efficient disk space usage

\- Strict dependency resolution (fewer bugs)



\*\*Code Quality:\*\*

\- \*\*ESLint:\*\* Next.js recommended config + custom rules

\- \*\*Prettier:\*\* Auto-formatting (2 spaces, single quotes, trailing commas)

\- \*\*Husky:\*\* Pre-commit hooks (lint, type-check)

\- \*\*TypeScript:\*\* Strict mode enabled



---



\### 2.2 Backend Stack



\*\*⚙️ Runtime/Language: Node.js 20+ (TypeScript) + Python 3.11\*\*



\*\*Node.js for API layer:\*\*

\- Same language as frontend (code reuse, shared types)

\- Excellent async handling (perfect for API orchestration)

\- Rich npm ecosystem

\- Team expertise



\*\*Python for AI workers:\*\*

\- Best ML/AI libraries (LangChain, transformers, pandas)

\- Superior data processing (parsing job postings, financial calcs)

\- \*\*Separation of concerns:\*\* Keep AI complexity out of main app



\*\*⚙️ Framework: Next.js API Routes + FastAPI (Python)\*\*



\*\*Next.js API Routes (TypeScript):\*\*

\- \*\*Why:\*\* Colocated with frontend, shared TypeScript types, automatic deployment

\- \*\*Use for:\*\* CRUD operations, authentication, orchestration, simple business logic



\*\*FastAPI (Python):\*\*

\- \*\*Why:\*\* Best Python web framework for APIs, automatic OpenAPI docs, async support

\- \*\*Use for:\*\* AI worker endpoints (evidence gathering, competitor analysis, report generation)

\- \*\*Deployed as:\*\* Vercel Serverless Functions (Python runtime)



\#### \*\*Core Libraries:\*\*



\*\*Authentication: NextAuth.js v5 (Auth.js)\*\*

\- Built for Next.js

\- Multiple providers (email/password, future OAuth)

\- Session management

\- Database adapter for PostgreSQL

\- \*\*Why not Clerk/Auth0:\*\* Cost ($hundreds/month), vendor lock-in, MVP doesn't need advanced features



\*\*Validation: Zod (shared with frontend)\*\*

\- Type-safe schemas

\- Runtime validation

\- \*\*Example:\*\*

```typescript

const projectSchema = z.object({

&nbsp; name: z.string().min(3).max(200),

&nbsp; program\_level: z.enum(\['certificate', 'bachelor', 'master', 'phd']),

&nbsp; target\_regions: z.array(z.string()).min(1)

});

```



\*\*ORM: Prisma\*\*

\- Type-safe database client

\- Excellent TypeScript integration

\- Migration tool built-in

\- Introspection and seeding

\- Works with PostgreSQL

\- \*\*Why not Drizzle:\*\* Newer, smaller ecosystem, team unfamiliar



\*\*API Documentation: OpenAPI (auto-generated from Zod schemas)\*\*

\- Convert Zod schemas to OpenAPI specs

\- Serve docs at `/api/docs`



\*\*Job Queue: Vercel KV (Redis) + BullMQ\*\*

\- \*\*Vercel KV:\*\* Managed Redis (low-latency, serverless-friendly)

\- \*\*BullMQ:\*\* Robust job processing (retry logic, progress tracking, priorities)

\- \*\*Use case:\*\* Queue evidence gathering jobs, poll for completion



\*\*File Handling: `@vercel/blob` SDK\*\*

\- Upload PDFs, Excel files, PowerPoint

\- Automatic CDN distribution

\- Signed URLs for secure downloads



\*\*LLM Integration: LangChain (Python) + OpenAI SDK\*\*

\- \*\*LangChain:\*\* Prompt templates, output parsers, retry logic

\- \*\*OpenAI SDK:\*\* Direct API calls to GPT-4

\- \*\*Why LangChain:\*\* Easier to swap LLM providers, built-in memory/chat history



\*\*Python Libraries:\*\*

\- `pandas`: Data manipulation (financial calculations, competitor analysis)

\- `requests`: HTTP client (web scraping, API calls)

\- `beautifulsoup4`: HTML parsing (competitor website scraping)

\- `openpyxl`: Excel generation

\- `python-pptx`: PowerPoint generation

\- `reportlab` or `WeasyPrint`: PDF generation

\- `pydantic`: Data validation (Python equivalent of Zod)



---



\### 2.3 Database Strategy



\*\*⚙️ Primary Database: PostgreSQL 15+ (via Supabase)\*\*



\*\*Why PostgreSQL:\*\*

\- \*\*Relational data:\*\* Clear entity relationships (Project → Evidence, Project → Users)

\- \*\*JSON support:\*\* Store flexible config\_data without schema changes

\- \*\*Full-text search:\*\* Built-in (can search evidence text, competitor data)

\- \*\*Mature:\*\* 20+ years, battle-tested, excellent documentation

\- \*\*PostGIS:\*\* Future geographic analysis (regional comparisons)



\*\*Why Supabase:\*\*

\- \*\*Managed PostgreSQL:\*\* No server management, automatic backups, scaling

\- \*\*Auth built-in:\*\* Supabase Auth (can replace NextAuth if needed)

\- \*\*Real-time subscriptions:\*\* Could enable collaboration features in v2

\- \*\*Row-level security:\*\* Database-level authorization (defense in depth)

\- \*\*Free tier:\*\* Generous (500MB database, 2GB bandwidth/month)

\- \*\*Pricing:\*\* $25/month for production workload (10GB database)



\*\*Why not self-hosted PostgreSQL:\*\*

\- Requires DevOps expertise (backups, monitoring, patching)

\- Higher operational burden for small team



\*\*Why not MySQL:\*\*

\- Less advanced JSON support

\- Weaker full-text search



\*\*Why not MongoDB:\*\*

\- Data is relational (Projects have foreign keys to Users, Evidence)

\- SQL is better for complex joins and aggregations

\- Team more familiar with SQL



\#### \*\*Caching Layer: Vercel KV (Redis)\*\*



\*\*Use Cases:\*\*

\- \*\*API response caching:\*\* BLS labor statistics (refresh daily)

\- \*\*Session management:\*\* User login sessions

\- \*\*Job queue:\*\* Background task orchestration

\- \*\*Rate limiting:\*\* Track API calls per user



\*\*Why Vercel KV:\*\*

\- Serverless-friendly (no connection pools)

\- Low latency (edge-deployed)

\- Simple pricing ($0.10 per 100K reads)



\*\*Why not Memcached:\*\*

\- Redis more feature-rich (data structures, pub/sub, persistence)



\#### \*\*Search: PostgreSQL Full-Text Search (MVP), Algolia (v2)\*\*



\*\*MVP:\*\* Use PostgreSQL `tsvector` and `ts\_rank`

\- \*\*Why:\*\* Simple, no additional service, "good enough" for 100-500 projects

\- \*\*Use case:\*\* Search evidence citations, competitor program names



\*\*v2 (if needed):\*\* Algolia

\- \*\*When:\*\* If users complain about search quality or need advanced filters

\- \*\*Why:\*\* Typo tolerance, faceted search, instant results

\- \*\*Cost:\*\* $1/month for 10K searches



\*\*Why not Elasticsearch:\*\*

\- Massive operational overhead

\- Overkill for MVP search needs



\#### \*\*File Storage: Vercel Blob\*\*



\*\*Use Cases:\*\*

\- Generated reports (PDF, PPTX, XLSX, DOCX)

\- User-uploaded documents (existing curriculum files)



\*\*Why Vercel Blob:\*\*

\- S3-compatible API

\- Automatic CDN distribution

\- Signed URLs for security

\- Simple pricing ($0.15/GB storage, $0.05/GB egress)

\- Zero config



\*\*Estimated Costs:\*\*

\- 100 projects × 5MB reports × 3 formats = 1.5GB storage = $0.23/month

\- Negligible egress (users download once)



\*\*Why not AWS S3 directly:\*\*

\- More complex setup (IAM roles, bucket policies)

\- Vercel Blob easier for small team



---



\### 2.4 Infrastructure \& Deployment



\*\*⚙️ Hosting Platform: Vercel (Everything)\*\*



\*\*Why Vercel:\*\*

\- \*\*Zero-config deployment:\*\* `git push` → automatic deploy

\- \*\*Next.js optimized:\*\* Built by same team, perfect integration

\- \*\*Edge network:\*\* Global CDN, fast everywhere

\- \*\*Serverless functions:\*\* Node.js + Python support

\- \*\*Preview deployments:\*\* Every PR gets unique URL (easy testing)

\- \*\*Generous free tier:\*\* Hobby plan sufficient for MVP

\- \*\*Commercial plan:\*\* $20/user/month (acceptable for Year 1 budget)



\*\*What runs on Vercel:\*\*

\- Next.js application (frontend + API routes)

\- Python serverless functions (AI workers)

\- Static assets (automatically CDN-cached)



\*\*Estimated Monthly Cost:\*\*

\- \*\*MVP (10 users):\*\* $0 (Hobby tier)

\- \*\*Production (30 customers):\*\* ~$100/month

&nbsp; - Pro plan: $20/seat × 2 developers = $40

&nbsp; - Function invocations: ~$30 (evidence gathering is compute-heavy)

&nbsp; - Bandwidth: ~$20 (report downloads)

&nbsp; - Vercel KV: ~$10

&nbsp; - Vercel Blob: ~$5



\*\*Why not AWS/GCP/Azure directly:\*\*

\- Requires DevOps expertise (VPCs, load balancers, auto-scaling)

\- Slower development velocity

\- Only makes sense at scale (>1000 customers)



\*\*Why not Railway/Render:\*\*

\- Good alternatives but less mature Next.js support

\- Vercel has better DX for this stack



\#### \*\*CI/CD: GitHub Actions + Vercel\*\*



\*\*Pipeline:\*\*

```yaml

\# .github/workflows/ci.yml

on: \[push, pull\_request]



jobs:

&nbsp; test:

&nbsp;   - Run type check (tsc --noEmit)

&nbsp;   - Run linter (eslint)

&nbsp;   - Run unit tests (vitest)

&nbsp;   - Run integration tests (Playwright)

&nbsp; 

&nbsp; deploy-preview:

&nbsp;   - Vercel automatically deploys PR preview

&nbsp;   - Comment on PR with preview URL

&nbsp; 

&nbsp; deploy-production:

&nbsp;   - On merge to main → Vercel production deploy

&nbsp;   - Run smoke tests against production

&nbsp;   - Notify team on Slack

```



\#### \*\*Environments:\*\*



\*\*Development:\*\*

\- Local: `npm run dev` (Next.js dev server + local PostgreSQL with Docker)

\- `.env.local` with development credentials

\- Seeded database with test data



\*\*Staging:\*\*

\- Vercel preview deployment (automatic on PR)

\- Connected to staging database (Supabase project)

\- Test with near-production data

\- Reset weekly



\*\*Production:\*\*

\- Vercel production deployment (automatic on merge to `main`)

\- Connected to production database

\- Monitoring and alerts enabled

\- Rollback plan: `vercel rollback` CLI command



\#### \*\*Monitoring \& Logging:\*\*



\*\*Error Tracking: Sentry\*\*

\- Automatic error capture (frontend + backend)

\- Source map upload (see original TypeScript errors)

\- Performance monitoring

\- \*\*Free tier:\*\* 5K errors/month (sufficient for MVP)

\- \*\*Cost at scale:\*\* $26/month for 50K errors



\*\*Analytics: PostHog (product) + Vercel Analytics (web)\*\*

\- \*\*PostHog:\*\*

&nbsp; - Feature usage tracking

&nbsp; - Conversion funnels (sign-up → project creation → report download)

&nbsp; - User cohorts

&nbsp; - \*\*Free tier:\*\* 1M events/month

\- \*\*Vercel Analytics:\*\*

&nbsp; - Web vitals (LCP, FID, CLS)

&nbsp; - Page load times

&nbsp; - \*\*Free:\*\* Included with Vercel Pro



\*\*Performance: Vercel Speed Insights\*\*

\- Real user monitoring

\- Core Web Vitals

\- \*\*Free:\*\* Included



\*\*Logs: Vercel Logs + Axiom (structured logging)\*\*

\- \*\*Vercel Logs:\*\* Built-in, searchable, 1-day retention on Pro

\- \*\*Axiom:\*\* Structured log aggregation, longer retention, queries

\- \*\*Free tier:\*\* 500MB/month (sufficient for MVP)



---



\### 2.5 Third-Party Services



\#### \*\*🔍 Web Search API: Tavily (primary) + Serper.dev (backup)\*\*



\*\*Purpose:\*\* Gather real-time labor market data, job postings, news, competitor info



\*\*Tavily API:\*\*

\- AI-optimized search (better for LLM consumption)

\- Returns clean, structured data

\- \*\*Pricing:\*\* $0.005/search (200 searches = $1)

\- \*\*Free tier:\*\* 1K searches/month

\- \*\*MVP estimate:\*\* 10 projects/month × 50 searches = 500 searches = $2.50/month



\*\*Serper.dev (backup):\*\*

\- Google Search API

\- Cheaper alternative ($0.001/search)

\- Less optimized for AI parsing

\- \*\*Use if:\*\* Tavily rate-limited or down



\*\*Integration Complexity:\*\* Simple (HTTP REST API)



\*\*Fallback Plan:\*\* 

\- If both fail → Use cached industry benchmarks + show warning to user

\- Manual consultant can supplement with proprietary research



---



\#### \*\*📧 Email Service: Resend\*\*



\*\*Purpose:\*\* Send transactional emails (welcome, analysis ready, invitations, approvals)



\*\*Why Resend:\*\*

\- Modern API (better DX than SendGrid)

\- React Email templates (write emails in JSX)

\- \*\*Pricing:\*\* $0.10 per 1K emails

\- \*\*Free tier:\*\* 3K emails/month

\- \*\*MVP estimate:\*\* 10 users × 10 emails each = 100 emails/month = $0



\*\*Email Types:\*\*

1\. Welcome email (account created)

2\. Email verification

3\. Password reset

4\. Analysis complete notification

5\. Report ready (with download link)

6\. Collaboration invitation (v2)

7\. Approval request (v2)

8\. Subscription renewal reminder



\*\*Fallback Plan:\*\* Switch to SendGrid or AWS SES (both have REST APIs)



---



\#### \*\*💳 Payment Processing: Stripe\*\*



\*\*Purpose:\*\* Subscription billing, invoices, payment method management



\*\*Why Stripe:\*\*

\- Industry standard for SaaS

\- Excellent developer experience

\- Built-in subscription management

\- Automatic invoicing

\- \*\*Pricing:\*\* 2.9% + $0.30 per transaction

\- \*\*No monthly fee\*\*



\*\*Integration Complexity:\*\* Medium (webhook handling for events)



\*\*What Stripe Handles:\*\*

\- Credit card processing

\- Subscription creation (Sprint $8.5K, Accelerator $25K, etc.)

\- Proration (upgrades/downgrades)

\- Failed payment retry logic

\- Invoices and receipts



\*\*Data Shared:\*\*

\- User subscribes → Create Stripe Customer + Subscription

\- Webhook: `invoice.paid` → Unlock features in our database

\- Webhook: `invoice.payment\_failed` → Lock account, send reminder



\*\*Fallback Plan:\*\* 

\- MVP can operate without payments (manual invoicing for design partners)

\- Add Stripe integration Month 7 before commercial launch



---



\#### \*\*🔐 Authentication: NextAuth.js + Supabase Auth\*\*



\*\*Purpose:\*\* User sign-up, login, session management



\*\*NextAuth.js (primary):\*\*

\- Email/password authentication

\- Magic link login

\- Future: OAuth (Google, Microsoft SSO for Enterprise)

\- \*\*Free and open-source\*\*



\*\*Supabase Auth (alternative):\*\*

\- If we choose Supabase for PostgreSQL, auth is included

\- Slightly simpler integration

\- \*\*Decision:\*\* Start with NextAuth (more flexible), can switch to Supabase Auth if needed



\*\*Authentication Flow:\*\*

1\. User signs up → Store in `users` table

2\. Email verification sent → Token in database

3\. User clicks link → Mark email as verified

4\. Login → Create session (JWT or database session)

5\. Protected routes → Check session, redirect if not authenticated



---



\#### \*\*🤖 LLM API: OpenAI GPT-4 (primary) + Anthropic Claude (backup)\*\*



\*\*Purpose:\*\* Parse job postings, extract skills, generate insights, create competitor analysis



\*\*OpenAI GPT-4:\*\*

\- \*\*Model:\*\* `gpt-4-turbo-preview` (128K context, cheaper than GPT-4)

\- \*\*Pricing:\*\* $0.01/1K input tokens, $0.03/1K output tokens

\- \*\*Use cases:\*\*

&nbsp; - Parse job posting text → Extract (title, salary, skills, requirements)

&nbsp; - Analyze competitors → Gap analysis insights

&nbsp; - Generate executive summary → Synthesize findings

\- \*\*MVP estimate:\*\* 

&nbsp; - 10 projects/month × 200 job postings × 2K tokens = 4M tokens/month

&nbsp; - Input: $40, Output (summaries): $30 = \*\*$70/month\*\*



\*\*Anthropic Claude (backup):\*\*

\- \*\*Model:\*\* `claude-3-5-sonnet` (200K context, great for long documents)

\- \*\*Pricing:\*\* Similar to OpenAI

\- \*\*Use if:\*\* OpenAI rate-limited, or superior performance on specific tasks



\*\*Integration Complexity:\*\* Simple (HTTP REST API, official SDKs)



\*\*Fallback Plan:\*\* If both fail → Display error, allow manual analysis by consultant



---



\#### \*\*📄 Government Data APIs: BLS + O\*NET (free)\*\*



\*\*Bureau of Labor Statistics (BLS):\*\*

\- \*\*Purpose:\*\* Employment data, wage statistics, growth projections

\- \*\*API:\*\* Free, no rate limits (within reason)

\- \*\*Use case:\*\* Validate demand (e.g., "Data Scientists: +23% growth, median $120K")

\- \*\*Integration:\*\* Simple REST API



\*\*O\*NET (Occupational Information Network):\*\*

\- \*\*Purpose:\*\* Detailed occupation data (skills, tasks, work activities)

\- \*\*API:\*\* Free web services

\- \*\*Use case:\*\* Map program to occupations, identify required skills

\- \*\*Integration:\*\* SOAP/REST API



\*\*Data Quality:\*\* High (government official sources → credibility for accreditation)



---



\#### \*\*📊 Analytics: PostHog (product analytics)\*\*



\*\*Purpose:\*\* Track user behavior, feature adoption, conversion funnels



\*\*Why PostHog:\*\*

\- \*\*Open-source\*\* (can self-host if needed)

\- \*\*Privacy-focused\*\* (GDPR compliant)

\- Session replay

\- Feature flags (for A/B testing)

\- \*\*Pricing:\*\* Free tier 1M events/month, then $0.000225/event

\- \*\*MVP estimate:\*\* 10 users × 100 events/day = 30K events/month = $0



\*\*What to Track:\*\*

\- Sign-up conversion

\- Intake wizard completion rate

\- Time spent per module

\- Report download rate

\- Feature usage (which modules users engage with most)



\*\*Alternative:\*\* Mixpanel, Amplitude (more expensive, similar features)



---



\#### \*\*Data Privacy Integration: GDPR/FERPA Compliance\*\*



\*\*FERPA (US Education Data):\*\*

\- \*\*Requirement:\*\* Do NOT store student-level data

\- \*\*Implementation:\*\* Only store aggregate data (# of students, not names)

\- \*\*Compliance:\*\* By design - spec explicitly avoids student data



\*\*GDPR (EU Users):\*\*

\- \*\*Requirements:\*\*

&nbsp; 1. Cookie consent

&nbsp; 2. Right to access data

&nbsp; 3. Right to deletion

&nbsp; 4. Data processing agreement

&nbsp; 5. Privacy policy



\- \*\*Implementation:\*\*

&nbsp; 1. Use cookie consent banner (free library: `react-cookie-consent`)

&nbsp; 2. Build "Export My Data" feature (download JSON of user's projects)

&nbsp; 3. Build "Delete My Account" feature (soft-delete, 90-day retention)

&nbsp; 4. Use Supabase (SOC 2 compliant) for data processing agreement

&nbsp; 5. Generate privacy policy (Termly.io free generator)



\*\*SOC 2 (for Enterprise sales):\*\*

\- \*\*Not required for MVP\*\*

\- \*\*Year 2 requirement:\*\* Hire auditor, implement controls

\- \*\*Preparation:\*\* 

&nbsp; - Audit logging (who accessed what data when)

&nbsp; - Encryption at rest and in transit (Supabase handles)

&nbsp; - Access controls (role-based permissions)



---



\## Phase 3 — Data Architecture



\### 3.1 Database Schema Design



\#### \*\*Table: `users`\*\*



```sql

CREATE TABLE users (

&nbsp; id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

&nbsp; email TEXT UNIQUE NOT NULL,

&nbsp; name TEXT NOT NULL,

&nbsp; password\_hash TEXT, -- NULL if using OAuth

&nbsp; email\_verified BOOLEAN DEFAULT FALSE,

&nbsp; 

&nbsp; -- Profile

&nbsp; organization\_name TEXT,

&nbsp; organization\_type TEXT CHECK (organization\_type IN (

&nbsp;   'university', 'corporate', 'government', 'consultant', 'edtech'

&nbsp; )),

&nbsp; role TEXT, -- e.g., "Dean of Academic Programs"

&nbsp; 

&nbsp; -- Subscription

&nbsp; subscription\_tier TEXT DEFAULT 'trial' CHECK (subscription\_tier IN (

&nbsp;   'trial', 'sprint', 'accelerator', 'portfolio', 'enterprise'

&nbsp; )),

&nbsp; subscription\_status TEXT DEFAULT 'active',

&nbsp; stripe\_customer\_id TEXT,

&nbsp; 

&nbsp; -- Quotas

&nbsp; projects\_quota INTEGER DEFAULT 1, -- Based on tier

&nbsp; projects\_used INTEGER DEFAULT 0,

&nbsp; 

&nbsp; -- Audit

&nbsp; created\_at TIMESTAMPTZ DEFAULT NOW(),

&nbsp; updated\_at TIMESTAMPTZ DEFAULT NOW(),

&nbsp; last\_login TIMESTAMPTZ,

&nbsp; 

&nbsp; -- Soft delete

&nbsp; deleted\_at TIMESTAMPTZ

);



CREATE INDEX idx\_users\_email ON users(email) WHERE deleted\_at IS NULL;

CREATE INDEX idx\_users\_stripe ON users(stripe\_customer\_id) WHERE stripe\_customer\_id IS NOT NULL;

```



\*\*Business Rules:\*\*

\- `email` must be valid format (validated by Zod)

\- `subscription\_tier` determines `projects\_quota`:

&nbsp; - trial: 1, sprint: 1, accelerator: 3, portfolio: 5, enterprise: 999

\- `projects\_used` increments when project created, decrements when deleted

\- Soft delete: Set `deleted\_at`, retain for 90 days, then hard delete



\*\*Access Patterns:\*\*

\- Login: `SELECT \* FROM users WHERE email = ? AND deleted\_at IS NULL`

\- Check quota: `SELECT projects\_used, projects\_quota FROM users WHERE id = ?`

\- Stripe webhook: `UPDATE users SET subscription\_tier = ? WHERE stripe\_customer\_id = ?`



---



\#### \*\*Table: `projects`\*\*



```sql

CREATE TABLE projects (

&nbsp; id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

&nbsp; user\_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

&nbsp; 

&nbsp; -- Basic Info

&nbsp; name TEXT NOT NULL, -- "Master's in Sustainable Finance"

&nbsp; program\_level TEXT NOT NULL CHECK (program\_level IN (

&nbsp;   'certificate', 'associate', 'bachelor', 'master', 'phd', 'executive\_ed', 'corporate\_training'

&nbsp; )),

&nbsp; program\_topic TEXT NOT NULL,

&nbsp; 

&nbsp; -- Geography \& Industry

&nbsp; target\_regions TEXT\[] NOT NULL, -- \['California, USA', 'New York, USA']

&nbsp; industry\_sectors TEXT\[], -- \['Finance', 'Renewable Energy']

&nbsp; 

&nbsp; -- Status

&nbsp; status TEXT DEFAULT 'draft' CHECK (status IN (

&nbsp;   'draft', 'analyzing', 'analysis\_complete', 'design\_in\_progress', 'review', 'approved', 'complete', 'archived'

&nbsp; )),

&nbsp; 

&nbsp; -- Configuration (flexible JSON for intake wizard data)

&nbsp; config\_data JSONB DEFAULT '{}'::jsonb,

&nbsp; 

&nbsp; -- Analysis Results (summary metrics)

&nbsp; demand\_score NUMERIC(3,1), -- 0.0 to 10.0

&nbsp; jobs\_found INTEGER,

&nbsp; avg\_salary\_usd INTEGER,

&nbsp; growth\_rate\_percent NUMERIC(5,2),

&nbsp; competitors\_found INTEGER,

&nbsp; 

&nbsp; -- Timestamps

&nbsp; created\_at TIMESTAMPTZ DEFAULT NOW(),

&nbsp; updated\_at TIMESTAMPTZ DEFAULT NOW(),

&nbsp; analysis\_started\_at TIMESTAMPTZ,

&nbsp; analysis\_completed\_at TIMESTAMPTZ,

&nbsp; 

&nbsp; -- Soft delete

&nbsp; deleted\_at TIMESTAMPTZ,

&nbsp; 

&nbsp; CONSTRAINT valid\_regions CHECK (array\_length(target\_regions, 1) > 0)

);



CREATE INDEX idx\_projects\_user ON projects(user\_id) WHERE deleted\_at IS NULL;

CREATE INDEX idx\_projects\_status ON projects(status) WHERE deleted\_at IS NULL;

CREATE INDEX idx\_projects\_created ON projects(created\_at DESC);



-- Full-text search on project name and topic

CREATE INDEX idx\_projects\_search ON projects USING GIN (

&nbsp; to\_tsvector('english', name || ' ' || program\_topic)

);

```



\*\*Business Rules:\*\*

\- `name` required, max 200 chars

\- `target\_regions` must have at least 1 region

\- `status` cannot go backwards (enforce in application logic)

\- Projects in "analyzing" status cannot be edited

\- `config\_data` stores all intake wizard inputs (flexible schema)



\*\*Lifecycle:\*\*

1\. Created: User completes intake wizard → `status = 'draft'`

2\. Analyzing: User clicks "Generate Analysis" → `status = 'analyzing'`, queue job

3\. Analysis Complete: Job finishes → `status = 'analysis\_complete'`, populate demand metrics

4\. Archived: User archives → `status = 'archived'`, set `deleted\_at` (soft delete after 90 days)



---



\#### \*\*Table: `evidence\_records`\*\*



```sql

CREATE TABLE evidence\_records (

&nbsp; id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

&nbsp; project\_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

&nbsp; 

&nbsp; -- Source Info

&nbsp; source\_type TEXT NOT NULL CHECK (source\_type IN (

&nbsp;   'job\_posting', 'labor\_statistic', 'news\_article', 'academic\_study', 'government\_report'

&nbsp; )),

&nbsp; source\_url TEXT,

&nbsp; source\_title TEXT,

&nbsp; source\_date DATE,

&nbsp; retrieved\_at TIMESTAMPTZ DEFAULT NOW(),

&nbsp; 

&nbsp; -- Content

&nbsp; evidence\_text TEXT, -- Full text content

&nbsp; structured\_data JSONB, -- Parsed data: {job\_title, salary\_min, salary\_max, skills: \[...]}

&nbsp; 

&nbsp; -- Relevance

&nbsp; relevance\_score NUMERIC(4,2) DEFAULT 5.0, -- 0.00 to 10.00

&nbsp; is\_primary BOOLEAN DEFAULT FALSE, -- Top 10 for citations

&nbsp; 

&nbsp; -- Metadata

&nbsp; created\_at TIMESTAMPTZ DEFAULT NOW()

);



CREATE INDEX idx\_evidence\_project ON evidence\_records(project\_id);

CREATE INDEX idx\_evidence\_relevance ON evidence\_records(project\_id, relevance\_score DESC);

CREATE INDEX idx\_evidence\_type ON evidence\_records(project\_id, source\_type);



-- Full-text search on evidence content

CREATE INDEX idx\_evidence\_search ON evidence\_records USING GIN (

&nbsp; to\_tsvector('english', COALESCE(evidence\_text, '') || ' ' || COALESCE(source\_title, ''))

);

```



\*\*Business Rules:\*\*

\- Evidence expires after 90 days (show "stale data" warning)

\- `relevance\_score` calculated by LLM based on project topic

\- `is\_primary = TRUE` for top 10 highest relevance (used in report citations)

\- `structured\_data` format depends on `source\_type`:

&nbsp; - `job\_posting`: `{job\_title, company, location, salary\_min, salary\_max, skills: \[...], requirements: \[...]}`

&nbsp; - `labor\_statistic`: `{occupation\_code, employment\_count, median\_salary, growth\_rate, region}`



\*\*Access Patterns:\*\*

\- Get evidence for project: `SELECT \* FROM evidence\_records WHERE project\_id = ? ORDER BY relevance\_score DESC LIMIT 50`

\- Get primary citations: `SELECT \* FROM evidence\_records WHERE project\_id = ? AND is\_primary = TRUE`

\- Search evidence: `SELECT \* FROM evidence\_records WHERE project\_id = ? AND to\_tsvector('english', evidence\_text) @@ plainto\_tsquery('artificial intelligence')`



---



\#### \*\*Table: `competitor\_programs`\*\*



```sql

CREATE TABLE competitor\_programs (

&nbsp; id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

&nbsp; project\_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

&nbsp; 

&nbsp; -- Program Info

&nbsp; institution\_name TEXT NOT NULL,

&nbsp; program\_name TEXT NOT NULL,

&nbsp; program\_url TEXT,

&nbsp; 

&nbsp; -- Details

&nbsp; tuition\_usd INTEGER,

&nbsp; duration\_weeks INTEGER,

&nbsp; total\_credits INTEGER,

&nbsp; delivery\_format TEXT CHECK (delivery\_format IN ('online', 'hybrid', 'in\_person', 'unknown')),

&nbsp; 

&nbsp; -- Differentiation

&nbsp; unique\_features TEXT\[], -- \["Fintech specialization", "Industry partnerships"]

&nbsp; ranking INTEGER, -- If available (US News, etc.)

&nbsp; 

&nbsp; -- Metadata

&nbsp; retrieved\_at TIMESTAMPTZ DEFAULT NOW(),

&nbsp; created\_at TIMESTAMPTZ DEFAULT NOW(),

&nbsp; 

&nbsp; UNIQUE(project\_id, institution\_name, program\_name) -- Prevent duplicates

);



CREATE INDEX idx\_competitors\_project ON competitor\_programs(project\_id);

CREATE INDEX idx\_competitors\_tuition ON competitor\_programs(project\_id, tuition\_usd);

```



\*\*Business Rules:\*\*

\- Maximum 20 competitors per project (to avoid clutter)

\- Duplicates detected by `(project\_id, institution\_name, program\_name)` unique constraint

\- User can manually add/edit competitors



\*\*Access Patterns:\*\*

\- Get all competitors: `SELECT \* FROM competitor\_programs WHERE project\_id = ? ORDER BY tuition\_usd`

\- Average tuition: `SELECT AVG(tuition\_usd) FROM competitor\_programs WHERE project\_id = ?`



---



\#### \*\*Table: `curriculum\_blueprints`\*\*



```sql

CREATE TABLE curriculum\_blueprints (

&nbsp; id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

&nbsp; project\_id UUID UNIQUE NOT NULL REFERENCES projects(id) ON DELETE CASCADE, -- 1:1 relationship

&nbsp; 

&nbsp; -- Program Structure

&nbsp; program\_duration\_weeks INTEGER NOT NULL,

&nbsp; total\_credits INTEGER,

&nbsp; delivery\_format TEXT CHECK (delivery\_format IN ('online', 'hybrid', 'in\_person')),

&nbsp; 

&nbsp; -- Modules (JSON array of objects)

&nbsp; modules JSONB NOT NULL DEFAULT '\[]'::jsonb,

&nbsp; -- Format: \[{

&nbsp; --   title: "Introduction to Data Science",

&nbsp; --   duration\_hours: 45,

&nbsp; --   credits: 3,

&nbsp; --   learning\_outcomes: \["Outcome 1", "Outcome 2"],

&nbsp; --   topics: \["Python basics", "Statistics", "Data visualization"],

&nbsp; --   assessments: \["Project", "Exam"]

&nbsp; -- }, ...]

&nbsp; 

&nbsp; -- Additional Sections

&nbsp; assessment\_strategy TEXT,

&nbsp; wil\_component TEXT, -- Work-integrated learning

&nbsp; 

&nbsp; -- Version Control

&nbsp; version INTEGER DEFAULT 1,

&nbsp; 

&nbsp; -- Timestamps

&nbsp; created\_at TIMESTAMPTZ DEFAULT NOW(),

&nbsp; updated\_at TIMESTAMPTZ DEFAULT NOW()

);



CREATE INDEX idx\_curriculum\_project ON curriculum\_blueprints(project\_id);



-- Validate modules structure (basic check)

ALTER TABLE curriculum\_blueprints ADD CONSTRAINT modules\_is\_array

&nbsp; CHECK (jsonb\_typeof(modules) = 'array');

```



\*\*Business Rules:\*\*

\- `modules` must have at least 3 modules

\- Total `duration\_hours` across modules should equal `program\_duration\_weeks \* hours\_per\_week`

\- `version` increments each time user saves changes (track history)



\*\*Access Patterns:\*\*

\- Get blueprint: `SELECT \* FROM curriculum\_blueprints WHERE project\_id = ?`

\- Update modules: `UPDATE curriculum\_blueprints SET modules = ?, version = version + 1 WHERE project\_id = ?`



---



\#### \*\*Table: `financial\_models`\*\*



```sql

CREATE TABLE financial\_models (

&nbsp; id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

&nbsp; project\_id UUID UNIQUE NOT NULL REFERENCES projects(id) ON DELETE CASCADE, -- 1:1 relationship

&nbsp; 

&nbsp; -- Revenue Assumptions

&nbsp; tuition\_per\_student INTEGER NOT NULL,

&nbsp; expected\_enrollment\_year1 INTEGER NOT NULL,

&nbsp; expected\_enrollment\_year2 INTEGER,

&nbsp; expected\_enrollment\_year3 INTEGER,

&nbsp; retention\_rate NUMERIC(4,2) DEFAULT 0.90, -- 90%

&nbsp; 

&nbsp; -- Cost Assumptions

&nbsp; cost\_faculty INTEGER NOT NULL,

&nbsp; cost\_facilities INTEGER NOT NULL,

&nbsp; cost\_marketing INTEGER NOT NULL,

&nbsp; cost\_admin INTEGER NOT NULL,

&nbsp; cost\_technology INTEGER DEFAULT 0,

&nbsp; 

&nbsp; -- Calculated Metrics (updated on save)

&nbsp; total\_revenue\_3yr INTEGER,

&nbsp; total\_costs\_3yr INTEGER,

&nbsp; net\_profit\_3yr INTEGER,

&nbsp; break\_even\_month INTEGER,

&nbsp; roi\_percentage NUMERIC(5,2),

&nbsp; 

&nbsp; -- Scenarios (JSON for multiple assumptions)

&nbsp; scenarios JSONB DEFAULT '{}'::jsonb,

&nbsp; -- Format: {

&nbsp; --   "conservative": {enrollment\_year1: 80, tuition: 20000, ...},

&nbsp; --   "likely": {enrollment\_year1: 120, tuition: 25000, ...},

&nbsp; --   "aggressive": {enrollment\_year1: 180, tuition: 30000, ...}

&nbsp; -- }

&nbsp; 

&nbsp; -- Timestamps

&nbsp; created\_at TIMESTAMPTZ DEFAULT NOW(),

&nbsp; updated\_at TIMESTAMPTZ DEFAULT NOW()

);



CREATE INDEX idx\_financial\_project ON financial\_models(project\_id);

```



\*\*Business Rules:\*\*

\- All costs must be non-negative

\- If user doesn't provide costs, use industry defaults (calculated based on `program\_level` + `target\_regions`)

\- `break\_even\_month` recalculates when any input changes

\- Warn user if `break\_even\_month > 60` (high risk)



\*\*Calculations (in application logic):\*\*

```typescript

// Monthly revenue (assuming students pay over program duration)

const monthlyRevenue = (enrollment \* tuition) / (durationWeeks / 4);



// Monthly costs

const monthlyCosts = (faculty + facilities + marketing + admin + technology) / 12;



// Cumulative profit

let cumulativeProfit = 0;

let breakEvenMonth = null;

for (let month = 1; month <= 60; month++) {

&nbsp; cumulativeProfit += monthlyRevenue - monthlyCosts;

&nbsp; if (cumulativeProfit >= 0 \&\& !breakEvenMonth) {

&nbsp;   breakEvenMonth = month;

&nbsp; }

}



// ROI

const roi = ((netProfit3yr / totalCosts3yr) \* 100);

```



---



\#### \*\*Table: `reports`\*\*



```sql

CREATE TABLE reports (

&nbsp; id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

&nbsp; project\_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

&nbsp; 

&nbsp; -- Report Configuration

&nbsp; report\_type TEXT NOT NULL CHECK (report\_type IN (

&nbsp;   'comprehensive\_pdf', 'executive\_ppt', 'financial\_excel', 'editable\_word', 'json\_data'

&nbsp; )),

&nbsp; included\_sections TEXT\[] NOT NULL, -- \['section\_0', 'section\_1', 'section\_3', 'section\_16']

&nbsp; 

&nbsp; -- File Info

&nbsp; file\_url TEXT NOT NULL, -- Vercel Blob signed URL

&nbsp; file\_size\_mb NUMERIC(6,2),

&nbsp; file\_name TEXT NOT NULL,

&nbsp; 

&nbsp; -- Usage

&nbsp; download\_count INTEGER DEFAULT 0,

&nbsp; last\_downloaded\_at TIMESTAMPTZ,

&nbsp; 

&nbsp; -- Expiry

&nbsp; expires\_at TIMESTAMPTZ NOT NULL, -- 90 days after generation

&nbsp; 

&nbsp; -- Timestamps

&nbsp; generated\_at TIMESTAMPTZ DEFAULT NOW()

);



CREATE INDEX idx\_reports\_project ON reports(project\_id, generated\_at DESC);

CREATE INDEX idx\_reports\_expiry ON reports(expires\_at) WHERE expires\_at < NOW();

```



\*\*Business Rules:\*\*

\- Reports expire after 90 days (delete file, keep metadata)

\- Maximum 3 regenerations per day per project (prevent abuse)

\- `download\_count` increments each time user downloads



\*\*Lifecycle:\*\*

1\. Created: User clicks "Generate Report" → Queue job, create record with `file\_url = NULL`

2\. Generated: Job completes → Upload to Vercel Blob, update `file\_url`

3\. Downloaded: User clicks download → Increment `download\_count`, update `last\_downloaded\_at`

4\. Expired: Cron job runs daily → Delete file from Vercel Blob, keep metadata



---



\#### \*\*Table: `project\_shares` (Phase 2 - Collaboration)\*\*



```sql

CREATE TABLE project\_shares (

&nbsp; id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

&nbsp; project\_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

&nbsp; owner\_user\_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

&nbsp; shared\_with\_user\_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

&nbsp; 

&nbsp; -- Permissions

&nbsp; permission\_level TEXT NOT NULL CHECK (permission\_level IN (

&nbsp;   'view', 'comment', 'edit', 'approve'

&nbsp; )),

&nbsp; 

&nbsp; -- Invitation Status

&nbsp; invitation\_status TEXT DEFAULT 'pending' CHECK (invitation\_status IN (

&nbsp;   'pending', 'accepted', 'declined', 'expired'

&nbsp; )),

&nbsp; invitation\_token TEXT UNIQUE,

&nbsp; invitation\_expires\_at TIMESTAMPTZ,

&nbsp; 

&nbsp; -- Approval Status (only if permission\_level = 'approve')

&nbsp; approval\_status TEXT CHECK (approval\_status IN (

&nbsp;   'pending', 'approved', 'rejected', 'not\_required'

&nbsp; )),

&nbsp; approval\_notes TEXT,

&nbsp; 

&nbsp; -- Timestamps

&nbsp; invited\_at TIMESTAMPTZ DEFAULT NOW(),

&nbsp; responded\_at TIMESTAMPTZ,

&nbsp; approved\_at TIMESTAMPTZ,

&nbsp; 

&nbsp; -- Constraints

&nbsp; CHECK (owner\_user\_id != shared\_with\_user\_id), -- Cannot share with self

&nbsp; UNIQUE(project\_id, shared\_with\_user\_id) -- One share per user per project

);

CREATE INDEX idx\_shares\_project ON project\_shares(project\_id);

CREATE INDEX idx\_shares\_invitee ON project\_shares(shared\_with\_user\_id);

CREATE INDEX idx\_shares\_token ON project\_shares(invitation\_token) WHERE invitation\_token IS NOT NULL;

```



\*\*Business Rules:\*\*

\- Cannot share with self (`owner\_user\_id != shared\_with\_user\_id`)

\- Maximum 10 collaborators per project (enforced in application)

\- Sprint tier cannot use collaboration (check user's `subscription\_tier`)

\- Invitation expires after 30 days if not accepted

\- `approval\_status` only applies if `permission\_level = 'approve'`



\*\*Access Patterns:\*\*

\- Get collaborators: `SELECT \* FROM project\_shares WHERE project\_id = ?`

\- Accept invitation: `UPDATE project\_shares SET invitation\_status = 'accepted', responded\_at = NOW() WHERE invitation\_token = ?`



---



\### 3.2 Data Migration Strategy



\#### \*\*Initial Data:\*\*



\*\*✅ Seed Data Needed:\*\*



1\. \*\*Reference Data:\*\*

```sql

-- Industry sectors (for dropdown in intake wizard)

CREATE TABLE industry\_sectors (

&nbsp; id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

&nbsp; name TEXT UNIQUE NOT NULL,

&nbsp; category TEXT NOT NULL -- 'Technology', 'Healthcare', 'Finance', etc.

);



INSERT INTO industry\_sectors (name, category) VALUES

&nbsp; ('Software Development', 'Technology'),

&nbsp; ('Data Science', 'Technology'),

&nbsp; ('Cybersecurity', 'Technology'),

&nbsp; ('Renewable Energy', 'Environment'),

&nbsp; ('Healthcare Administration', 'Healthcare'),

&nbsp; ('Financial Services', 'Finance'),

&nbsp; -- ... (50-100 common industries)

```



2\. \*\*Program Level Templates:\*\*

```sql

CREATE TABLE program\_templates (

&nbsp; id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

&nbsp; program\_level TEXT NOT NULL,

&nbsp; template\_name TEXT NOT NULL,

&nbsp; default\_duration\_weeks INTEGER,

&nbsp; default\_credits INTEGER,

&nbsp; typical\_tuition\_range\_min INTEGER,

&nbsp; typical\_tuition\_range\_max INTEGER,

&nbsp; description TEXT

);



INSERT INTO program\_templates VALUES

&nbsp; ('master', 'Master of Science (Standard)', 48, 48, 20000, 60000, 'Full-time 1-2 year program'),

&nbsp; ('bachelor', 'Bachelor of Science', 160, 120, 40000, 120000, '4-year undergraduate program'),

&nbsp; -- ... (templates for each program\_level)

```



3\. \*\*Test Accounts:\*\*

```sql

-- Create demo users for testing

INSERT INTO users (email, name, organization\_type, subscription\_tier, projects\_quota) VALUES

&nbsp; ('demo@university.edu', 'Demo Academic', 'university', 'accelerator', 3),

&nbsp; ('demo@corporate.com', 'Demo Corporate', 'corporate', 'portfolio', 5);

```



4\. \*\*Cost Benchmarks (for financial model defaults):\*\*

```sql

CREATE TABLE cost\_benchmarks (

&nbsp; id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

&nbsp; program\_level TEXT NOT NULL,

&nbsp; region TEXT NOT NULL, -- 'US\_Northeast', 'US\_West', etc.

&nbsp; avg\_faculty\_cost INTEGER,

&nbsp; avg\_facilities\_cost INTEGER,

&nbsp; avg\_marketing\_cost INTEGER,

&nbsp; avg\_admin\_cost INTEGER,

&nbsp; last\_updated TIMESTAMPTZ DEFAULT NOW()

);



-- Populated from industry research

```



\*\*❌ No Import from Existing System:\*\*

\- This is greenfield (no legacy data)



\*\*✅ User-Generated Data:\*\*

\- Users will create projects, evidence, reports through normal app usage



---



\#### \*\*Migration Plan:\*\*



\*\*Tool: Prisma Migrate\*\*



\*\*Why Prisma Migrate:\*\*

\- Type-safe migrations (generated from Prisma schema)

\- Version control (each migration is a timestamped file)

\- Automatic rollback on failure

\- Preview mode (see SQL before applying)



\*\*Migration Workflow:\*\*

```bash

\# 1. Create migration

npx prisma migrate dev --name add\_project\_shares\_table



\# 2. Review generated SQL in prisma/migrations/



\# 3. Apply to staging

npx prisma migrate deploy --preview-feature



\# 4. Test thoroughly



\# 5. Apply to production (zero-downtime)

npx prisma migrate deploy

```



\*\*Versioning Strategy:\*\*

\- Each migration has a timestamp: `20250106\_120000\_add\_project\_shares\_table`

\- Migrations are sequential (cannot skip)

\- Track applied migrations in `\_prisma\_migrations` table



\*\*Rollback Approach:\*\*

```bash

\# Manual rollback (Prisma doesn't support automatic rollback)

\# 1. Write reverse migration SQL manually

\# 2. Apply with psql or Prisma db execute



\# Example: Undo "add\_project\_shares\_table"

DROP TABLE IF EXISTS project\_shares;



\# 3. Delete migration from \_prisma\_migrations table

DELETE FROM \_prisma\_migrations WHERE migration\_name = '20250106\_120000\_add\_project\_shares\_table';

```



\*\*Zero-Downtime Strategy:\*\*

1\. \*\*Additive changes only\*\* (add columns, don't drop)

2\. Deploy new code that supports both old and new schema

3\. Run migration

4\. Verify

5\. Remove old code paths



\*\*Example: Renaming a column\*\*

```sql

-- DON'T DO THIS (breaks old code):

ALTER TABLE projects RENAME COLUMN program\_topic TO topic;



-- DO THIS (zero downtime):

-- Migration 1: Add new column

ALTER TABLE projects ADD COLUMN topic TEXT;

UPDATE projects SET topic = program\_topic WHERE topic IS NULL;



-- Migration 2 (after code deployed): Drop old column

ALTER TABLE projects DROP COLUMN program\_topic;

```



---



\### 3.3 Data Flow Diagrams



\#### \*\*FEATURE: Create New Project (Full Workflow)\*\*



```

┌─────────────────────────────────────────────────────────────┐

│ USER ACTION: Fills intake wizard (4 steps)                  │

└────────────────────────┬────────────────────────────────────┘

&nbsp;                        │

&nbsp;                        ↓

┌─────────────────────────────────────────────────────────────┐

│ FRONTEND: IntakeWizard.tsx                                   │

│  → Validates (client-side):                                  │

│    - Program name: required, 3-200 chars                     │

│    - Target regions: at least 1 selected                     │

│    - Industry sectors: at least 1 selected                   │

│  → On submit, calls: POST /api/projects                      │

└────────────────────────┬────────────────────────────────────┘

&nbsp;                        │

&nbsp;                        ↓

┌─────────────────────────────────────────────────────────────┐

│ BACKEND: app/api/projects/route.ts                          │

│  → Validates (server-side):                                  │

│    - Zod schema validation                                   │

│    - Check user quota: projects\_used < projects\_quota        │

│  → Processes:                                                │

│    - Create project record in PostgreSQL                     │

│    - Set status = 'draft'                                    │

│    - Increment user.projects\_used                            │

│  → Updates:                                                  │

│    - INSERT INTO projects (...)                              │

│    - UPDATE users SET projects\_used = projects\_used + 1      │

│  → Returns:                                                  │

│    - 201 Created                                             │

│    - {id, name, status, created\_at}                          │

└────────────────────────┬────────────────────────────────────┘

&nbsp;                        │

&nbsp;                        ↓

┌─────────────────────────────────────────────────────────────┐

│ FRONTEND: IntakeWizard.tsx                                   │

│  → Updates UI:                                               │

│    - Show success toast: "Project created!"                  │

│    - Redirect to: /projects/\[id]                             │

└─────────────────────────────────────────────────────────────┘

```



---



\#### \*\*FEATURE: Start Evidence Analysis (Background Job)\*\*



```

┌─────────────────────────────────────────────────────────────┐

│ USER ACTION: Clicks "Generate Analysis" button              │

└────────────────────────┬────────────────────────────────────┘

&nbsp;                        │

&nbsp;                        ↓

┌─────────────────────────────────────────────────────────────┐

│ FRONTEND: ProjectDetailPage.tsx                              │

│  → Calls: POST /api/projects/\[id]/analyze                   │

└────────────────────────┬────────────────────────────────────┘

&nbsp;                        │

&nbsp;                        ↓

┌─────────────────────────────────────────────────────────────┐

│ BACKEND: app/api/projects/\[id]/analyze/route.ts             │

│  → Validates:                                                │

│    - Project exists and belongs to user                      │

│    - Project status = 'draft' (not already analyzing)        │

│  → Processes:                                                │

│    - Update project status = 'analyzing'                     │

│    - Queue background job in Redis (BullMQ)                  │

│  → Updates:                                                  │

│    - UPDATE projects SET status = 'analyzing',               │

│        analysis\_started\_at = NOW()                           │

│    - LPUSH redis:jobs:evidence {project\_id, user\_id}        │

│  → Returns:                                                  │

│    - 202 Accepted                                            │

│    - {status: 'analyzing', estimated\_time: '10-15 minutes'}  │

└────────────────────────┬────────────────────────────────────┘

&nbsp;                        │

&nbsp;                        ↓

┌─────────────────────────────────────────────────────────────┐

│ BACKGROUND WORKER: Python serverless function                │

│  (Triggered by BullMQ job queue)                             │

│                                                               │

│  STEP 1: Construct Search Queries                            │

│   → Build query from project data:                           │

│     - "{program\_topic} jobs {region}"                        │

│     - "{program\_topic} salary {region}"                      │

│     - "{program\_topic} skills required"                      │

│                                                               │

│  STEP 2: Search Web (Tavily API)                             │

│   → For each query:                                          │

│     - POST https://api.tavily.com/search                     │

│     - Receive: \[{title, url, content, published\_date}, ...]  │

│   → Store raw results in memory (50-100 results total)       │

│                                                               │

│  STEP 3: Fetch BLS Data (Bureau of Labor Statistics)         │

│   → GET https://api.bls.gov/publicAPI/v2/timeseries/...      │

│   → Parse: employment numbers, growth projections, wages     │

│                                                               │

│  STEP 4: Parse with LLM (OpenAI GPT-4)                       │

│   → For each search result:                                  │

│     - Prompt: "Extract structured data from this job         │

│        posting: {content}. Return JSON with:                 │

│        {job\_title, company, location, salary\_min,            │

│        salary\_max, skills\_required, experience\_required}"    │

│     - API call: chat.completions.create()                    │

│     - Parse JSON response                                    │

│   → Calculate relevance score (0-10) based on topic match    │

│                                                               │

│  STEP 5: Store in Database                                   │

│   → For each parsed result:                                  │

│     - INSERT INTO evidence\_records (project\_id,              │

│        source\_type, source\_url, evidence\_text,               │

│        structured\_data, relevance\_score)                     │

│   → Mark top 10 as is\_primary = TRUE                         │

│                                                               │

│  STEP 6: Calculate Demand Score                              │

│   → Formula:                                                 │

│     demand\_score = (                                         │

│       job\_count \* 0.3 +                                      │

│       growth\_rate \* 0.25 +                                   │

│       salary\_premium \* 0.2 +                                 │

│       skill\_gap \* 0.15 +                                     │

│       geo\_concentration \* 0.1                                │

│     ) → normalized to 0-10                                   │

│                                                               │

│  STEP 7: Update Project                                      │

│   → UPDATE projects SET                                      │

│       status = 'analysis\_complete',                          │

│       demand\_score = ?,                                      │

│       jobs\_found = ?,                                        │

│       avg\_salary\_usd = ?,                                    │

│       growth\_rate\_percent = ?,                               │

│       analysis\_completed\_at = NOW()                          │

│                                                               │

│  STEP 8: Send Notification                                   │

│   → POST https://api.resend.com/emails/send                  │

│     - To: user.email                                         │

│     - Subject: "Your analysis is ready!"                     │

│     - Body: "View results: \[link]"                           │

│                                                               │

│  STEP 9: Trigger Next Stage (Competitor Analysis)            │

│   → Queue another job in Redis for competitor gathering      │

└─────────────────────────────────────────────────────────────┘

&nbsp;                        │

&nbsp;                        ↓

┌─────────────────────────────────────────────────────────────┐

│ USER: Receives email notification, clicks link              │

│  → Frontend polls /api/projects/\[id] every 5 seconds        │

│  → When status = 'analysis\_complete', shows results          │

└─────────────────────────────────────────────────────────────┘

```



---



\#### \*\*FEATURE: Generate Report (Document Creation)\*\*



```

┌─────────────────────────────────────────────────────────────┐

│ USER ACTION: Clicks "Generate PDF Report" button            │

│  → Selects sections to include (checkboxes)                 │

│  → Clicks "Generate"                                         │

└────────────────────────┬────────────────────────────────────┘

&nbsp;                        │

&nbsp;                        ↓

┌─────────────────────────────────────────────────────────────┐

│ FRONTEND: ReportGenerator.tsx                                │

│  → Calls: POST /api/projects/\[id]/reports                   │

│  → Body: {report\_type: 'comprehensive\_pdf',                  │

│            included\_sections: \['section\_0', 'section\_1'...]} │

└────────────────────────┬────────────────────────────────────┘

&nbsp;                        │

&nbsp;                        ↓

┌─────────────────────────────────────────────────────────────┐

│ BACKEND: app/api/projects/\[id]/reports/route.ts             │

│  → Validates:                                                │

│    - Project exists and belongs to user                      │

│    - Required modules complete (Evidence, Financials)        │

│    - User hasn't exceeded daily regeneration limit (3/day)   │

│  → Processes:                                                │

│    - Create report record (file\_url = NULL initially)        │

│    - Queue background job in Redis                           │

│  → Returns:                                                  │

│    - 202 Accepted                                            │

│    - {report\_id, status: 'generating', estimated\_time: 3min} │

└────────────────────────┬────────────────────────────────────┘

&nbsp;                        │

&nbsp;                        ↓

┌─────────────────────────────────────────────────────────────┐

│ BACKGROUND WORKER: Python serverless function                │

│                                                               │

│  STEP 1: Fetch Data from Database                            │

│   → SELECT \* FROM projects WHERE id = ?                      │

│   → SELECT \* FROM evidence\_records WHERE project\_id = ?      │

│       AND is\_primary = TRUE ORDER BY relevance\_score DESC    │

│   → SELECT \* FROM competitor\_programs WHERE project\_id = ?   │

│   → SELECT \* FROM financial\_models WHERE project\_id = ?      │

│                                                               │

│  STEP 2: Generate Report Content (LLM)                       │

│   → For each section:                                        │

│     - Executive Summary:                                     │

│       Prompt: "Summarize these findings in 2-3 paragraphs..."│

│     - Evidence Analysis:                                     │

│       Prompt: "Write analysis of labor market data..."       │

│     - Competitive Landscape:                                 │

│       Prompt: "Compare these programs and identify gaps..."  │

│     - Financial Projections:                                 │

│       (Use pre-calculated data, format into text)            │

│     - Recommendations:                                       │

│       Prompt: "Based on evidence, recommend..."              │

│                                                               │

│  STEP 3: Fill Template (PDF Generation)                      │

│   → Load template: templates/comprehensive\_report.html       │

│   → Replace placeholders:                                    │

│     - {{project\_name}} → "Master's in Sustainable Finance"   │

│     - {{demand\_score}} → "8.5"                               │

│     - {{evidence\_summary}} → (LLM-generated text)            │

│   → Convert HTML to PDF (WeasyPrint or Playwright)           │

│                                                               │

│  STEP 4: Upload to Storage                                   │

│   → POST to Vercel Blob API                                  │

│     - Upload PDF file                                        │

│     - Receive signed URL (expires in 90 days)                │

│                                                               │

│  STEP 5: Update Database                                     │

│   → UPDATE reports SET                                       │

│       file\_url = ?,                                          │

│       file\_size\_mb = ?,                                      │

│       expires\_at = NOW() + INTERVAL '90 days'                │

│     WHERE id = ?                                             │

│                                                               │

│  STEP 6: Send Notification                                   │

│   → Email user: "Your report is ready! \[Download Link]"      │

└─────────────────────────────────────────────────────────────┘

&nbsp;                        │

&nbsp;                        ↓

┌─────────────────────────────────────────────────────────────┐

│ FRONTEND: ReportGenerator.tsx                                │

│  → Polls /api/reports/\[report\_id] every 5 seconds           │

│  → When file\_url exists, shows "Download" button             │

│  → On click → GET file\_url (signed S3 URL, downloads PDF)    │

└─────────────────────────────────────────────────────────────┘

```



---



\## Phase 4 — API Design



\### 4.1 API Architecture



\*\*⚙️ API Style: REST (with some JSON-RPC patterns for complex operations)\*\*



\*\*Why REST:\*\*

\- Simple, widely understood

\- Great tooling (Postman, Swagger, REST clients)

\- Stateless (scales horizontally)

\- Good fit for CRUD operations



\*\*Why NOT GraphQL:\*\*

\- Overkill for MVP complexity

\- Steeper learning curve for team

\- Frontend doesn't need flexible querying (predefined use cases)



\*\*Why NOT tRPC:\*\*

\- Requires full TypeScript stack (limits Python workers)

\- Less familiar to most developers

\- Harder to document for API customers (future Enterprise tier)



\*\*Endpoint Structure:\*\*

```

Base URL (Production): https://app.arbpc.com/api

Base URL (Staging): https://staging-app.arbpc.com/api

Base URL (Development): http://localhost:3000/api



Resource Pattern: /api/v1/\[resource]/\[id]/\[sub-resource]

&nbsp;                       ^version (for future breaking changes)

```



\*\*API Versioning:\*\*

\- Use URL versioning (`/api/v1`, `/api/v2`)

\- Only increment for breaking changes

\- Maintain v1 for 12 months after v2 launch



---



\### 4.2 Endpoint Specification



\#### \*\*Authentication Endpoints\*\*



\##### \*\*POST /api/auth/register\*\*



\*\*Purpose:\*\* Create new user account



\*\*Authentication:\*\* None (public endpoint)



\*\*Request:\*\*

```json

{

&nbsp; "email": "user@example.com",

&nbsp; "password": "SecurePass123!",

&nbsp; "name": "Jane Doe",

&nbsp; "organization\_name": "University of Example",

&nbsp; "organization\_type": "university",

&nbsp; "role": "Associate Dean"

}

```



\*\*Validation Rules:\*\*

\- `email`: Required, valid email format, unique

\- `password`: Required, min 8 chars, must contain uppercase, lowercase, number, special char

\- `name`: Required, 2-100 chars

\- `organization\_type`: Required, enum: `\['university', 'corporate', 'government', 'consultant', 'edtech']`



\*\*Response (Success - 201):\*\*

```json

{

&nbsp; "user": {

&nbsp;   "id": "uuid",

&nbsp;   "email": "user@example.com",

&nbsp;   "name": "Jane Doe",

&nbsp;   "subscription\_tier": "trial",

&nbsp;   "projects\_quota": 1

&nbsp; },

&nbsp; "message": "Account created. Check your email to verify."

}

```



\*\*Error Responses:\*\*

\- `400`: Email already exists → `{"error": "Email already registered"}`

\- `400`: Weak password → `{"error": "Password must be at least 8 characters with uppercase, lowercase, number, and special character"}`

\- `422`: Invalid organization\_type → `{"error": "Invalid organization type"}`

\- `500`: Server error → `{"error": "Failed to create account. Please try again."}`



\*\*Side Effects:\*\*

\- Creates user in `users` table

\- Sends verification email via Resend API

\- Creates auth session (JWT token)



\*\*Rate Limiting:\*\* 5 requests per IP per hour



---



\##### \*\*POST /api/auth/login\*\*



\*\*Purpose:\*\* Authenticate existing user



\*\*Authentication:\*\* None



\*\*Request:\*\*

```json

{

&nbsp; "email": "user@example.com",

&nbsp; "password": "SecurePass123!"

}

```



\*\*Response (Success - 200):\*\*

```json

{

&nbsp; "user": {

&nbsp;   "id": "uuid",

&nbsp;   "email": "user@example.com",

&nbsp;   "name": "Jane Doe",

&nbsp;   "subscription\_tier": "accelerator"

&nbsp; },

&nbsp; "token": "jwt\_token\_here"

}

```



\*\*Error Responses:\*\*

\- `401`: Invalid credentials → `{"error": "Invalid email or password"}`

\- `403`: Email not verified → `{"error": "Please verify your email before logging in"}`



\*\*Side Effects:\*\*

\- Updates `last\_login` timestamp

\- Creates session (JWT or database session)



\*\*Rate Limiting:\*\* 10 requests per IP per hour



---



\#### \*\*Project Endpoints\*\*



\##### \*\*POST /api/projects\*\*



\*\*Purpose:\*\* Create new project



\*\*Authentication:\*\* Required (Bearer token)



\*\*Request:\*\*

```json

{

&nbsp; "name": "Master's in Sustainable Finance",

&nbsp; "program\_level": "master",

&nbsp; "program\_topic": "Sustainable Finance and ESG Investing",

&nbsp; "target\_regions": \["California, USA", "New York, USA"],

&nbsp; "industry\_sectors": \["Finance", "Renewable Energy"],

&nbsp; "config\_data": {

&nbsp;   "is\_refresh": false,

&nbsp;   "delivery\_format\_preference": "hybrid",

&nbsp;   "duration\_preference\_weeks": 48

&nbsp; }

}

```



\*\*Validation Rules:\*\*

\- `name`: Required, 3-200 chars

\- `program\_level`: Required, enum

\- `target\_regions`: Required, array with at least 1 item

\- User must have available quota: `projects\_used < projects\_quota`



\*\*Response (Success - 201):\*\*

```json

{

&nbsp; "project": {

&nbsp;   "id": "uuid",

&nbsp;   "name": "Master's in Sustainable Finance",

&nbsp;   "status": "draft",

&nbsp;   "created\_at": "2025-01-06T12:00:00Z"

&nbsp; }

}

```



\*\*Error Responses:\*\*

\- `400`: Name too short → `{"error": "Project name must be at least 3 characters"}`

\- `402`: Quota exceeded → `{"error": "You've reached your project limit. Upgrade to create more projects."}`

\- `422`: Invalid program\_level → `{"error": "Invalid program level"}`



\*\*Side Effects:\*\*

\- `INSERT INTO projects`

\- `UPDATE users SET projects\_used = projects\_used + 1`



\*\*Rate Limiting:\*\* 20 requests per user per hour



---



\##### \*\*GET /api/projects\*\*



\*\*Purpose:\*\* List user's projects



\*\*Authentication:\*\* Required



\*\*Query Parameters:\*\*

\- `status`: Filter by status (optional), enum: `\['draft', 'analyzing', 'complete', 'archived']`

\- `page`: Page number (default: 1)

\- `limit`: Items per page (default: 20, max: 100)

\- `sort`: Sort order (default: `created\_at\_desc`), options: `\['created\_at\_desc', 'created\_at\_asc', 'name\_asc']`



\*\*Request:\*\*

```

GET /api/projects?status=complete\&page=1\&limit=20

```



\*\*Response (Success - 200):\*\*

```json

{

&nbsp; "projects": \[

&nbsp;   {

&nbsp;     "id": "uuid",

&nbsp;     "name": "Master's in Sustainable Finance",

&nbsp;     "status": "analysis\_complete",

&nbsp;     "demand\_score": 8.5,

&nbsp;     "jobs\_found": 247,

&nbsp;     "created\_at": "2025-01-06T12:00:00Z",

&nbsp;     "updated\_at": "2025-01-06T14:30:00Z"

&nbsp;   }

&nbsp; ],

&nbsp; "pagination": {

&nbsp;   "page": 1,

&nbsp;   "limit": 20,

&nbsp;   "total": 5,

&nbsp;   "total\_pages": 1

&nbsp; }

}

```



---



\##### \*\*GET /api/projects/\[id]\*\*



\*\*Purpose:\*\* Get single project details



\*\*Authentication:\*\* Required (must own project)



\*\*Response (Success - 200):\*\*

```json

{

&nbsp; "project": {

&nbsp;   "id": "uuid",

&nbsp;   "name": "Master's in Sustainable Finance",

&nbsp;   "program\_level": "master",

&nbsp;   "program\_topic": "Sustainable Finance and ESG Investing",

&nbsp;   "target\_regions": \["California, USA", "New York, USA"],

&nbsp;   "industry\_sectors": \["Finance", "Renewable Energy"],

&nbsp;   "status": "analysis\_complete",

&nbsp;   "demand\_score": 8.5,

&nbsp;   "jobs\_found": 247,

&nbsp;   "avg\_salary\_usd": 95000,

&nbsp;   "growth\_rate\_percent": 12.5,

&nbsp;   "competitors\_found": 8,

&nbsp;   "created\_at": "2025-01-06T12:00:00Z",

&nbsp;   "analysis\_completed\_at": "2025-01-06T12:15:00Z"

&nbsp; }

}

```



\*\*Error Responses:\*\*

\- `404`: Project not found → `{"error": "Project not found"}`

\- `403`: Not authorized → `{"error": "You don't have permission to view this project"}`



---



\##### \*\*POST /api/projects/\[id]/analyze\*\*



\*\*Purpose:\*\* Start evidence gathering analysis



\*\*Authentication:\*\* Required (must own project)



\*\*Request:\*\*

```json

{

&nbsp; "priority": "normal" // or "high" for paid tiers

}

```



\*\*Validation Rules:\*\*

\- Project status must be `draft` or `analysis\_complete` (can re-analyze)



\*\*Response (Success - 202 Accepted):\*\*

```json

{

&nbsp; "job\_id": "uuid",

&nbsp; "status": "analyzing",

&nbsp; "estimated\_completion": "2025-01-06T12:15:00Z" // ~15 minutes

}

```



\*\*Error Responses:\*\*

\- `400`: Already analyzing → `{"error": "Analysis already in progress"}`

\- `402`: Trial user trying to re-analyze → `{"error": "Re-analysis requires paid subscription"}`



\*\*Side Effects:\*\*

\- Updates project status to `analyzing`

\- Queues background job in Redis

\- Sends email: "We're analyzing your program..."



\*\*Rate Limiting:\*\* 5 requests per user per day (prevent abuse)



---



\##### \*\*GET /api/projects/\[id]/evidence\*\*



\*\*Purpose:\*\* Get evidence records for project



\*\*Authentication:\*\* Required



\*\*Query Parameters:\*\*

\- `primary\_only`: Boolean (default: false) - only show top 10 citations

\- `source\_type`: Filter by type (optional)



\*\*Response (Success - 200):\*\*

```json

{

&nbsp; "evidence": \[

&nbsp;   {

&nbsp;     "id": "uuid",

&nbsp;     "source\_type": "job\_posting",

&nbsp;     "source\_title": "Senior Sustainable Finance Analyst - Goldman Sachs",

&nbsp;     "source\_url": "https://...",

&nbsp;     "source\_date": "2025-01-05",

&nbsp;     "relevance\_score": 9.2,

&nbsp;     "is\_primary": true,

&nbsp;     "structured\_data": {

&nbsp;       "job\_title": "Senior Sustainable Finance Analyst",

&nbsp;       "company": "Goldman Sachs",

&nbsp;       "location": "New York, NY",

&nbsp;       "salary\_min": 90000,

&nbsp;       "salary\_max": 130000,

&nbsp;       "skills": \["ESG Analysis", "Financial Modeling", "Python", "Bloomberg Terminal"]

&nbsp;     }

&nbsp;   }

&nbsp; ],

&nbsp; "summary": {

&nbsp;   "total\_records": 247,

&nbsp;   "avg\_relevance\_score": 7.8,

&nbsp;   "top\_skills": \["ESG Analysis", "Financial Modeling", "Risk Management"]

&nbsp; }

}

```



---



\##### \*\*GET /api/projects/\[id]/competitors\*\*



\*\*Purpose:\*\* Get competitor programs



\*\*Authentication:\*\* Required



\*\*Response (Success - 200):\*\*

```json

{

&nbsp; "competitors": \[

&nbsp;   {

&nbsp;     "id": "uuid",

&nbsp;     "institution\_name": "Columbia University",

&nbsp;     "program\_name": "MS in Sustainability Management",

&nbsp;     "program\_url": "https://...",

&nbsp;     "tuition\_usd": 72000,

&nbsp;     "duration\_weeks": 52,

&nbsp;     "delivery\_format": "hybrid",

&nbsp;     "unique\_features": \["Climate finance specialization", "Industry partnerships with World Bank"]

&nbsp;   }

&nbsp; ],

&nbsp; "analysis": {

&nbsp;   "avg\_tuition": 65000,

&nbsp;   "common\_features": \["ESG focus", "Practitioner faculty", "Capstone project"],

&nbsp;   "gaps": \["None offer cryptocurrency/blockchain focus", "Limited online options"],

&nbsp;   "positioning\_recommendation": "Differentiate with fintech/blockchain specialization and fully online format"

&nbsp; }

}

```



---



\##### \*\*GET /api/projects/\[id]/financials\*\*



\*\*Purpose:\*\* Get financial model



\*\*Authentication:\*\* Required



\*\*Response (Success - 200):\*\*

```json

{

&nbsp; "model": {

&nbsp;   "tuition\_per\_student": 55000,

&nbsp;   "expected\_enrollment\_year1": 120,

&nbsp;   "expected\_enrollment\_year2": 150,

&nbsp;   "expected\_enrollment\_year3": 180,

&nbsp;   "total\_revenue\_3yr": 24750000,

&nbsp;   "total\_costs\_3yr": 10500000,

&nbsp;   "net\_profit\_3yr": 14250000,

&nbsp;   "break\_even\_month": 18,

&nbsp;   "roi\_percentage": 135.7

&nbsp; },

&nbsp; "scenarios": {

&nbsp;   "conservative": {

&nbsp;     "enrollment\_year1": 80,

&nbsp;     "break\_even\_month": 28,

&nbsp;     "roi\_percentage": 78

&nbsp;   },

&nbsp;   "aggressive": {

&nbsp;     "enrollment\_year1": 180,

&nbsp;     "break\_even\_month": 12,

&nbsp;     "roi\_percentage": 210

&nbsp;   }

&nbsp; }

}

```



---



\##### \*\*PUT /api/projects/\[id]/financials\*\*



\*\*Purpose:\*\* Update financial assumptions



\*\*Authentication:\*\* Required



\*\*Request:\*\*

```json

{

&nbsp; "tuition\_per\_student": 60000,

&nbsp; "expected\_enrollment\_year1": 150,

&nbsp; "cost\_faculty": 300000,

&nbsp; "cost\_facilities": 150000,

&nbsp; "cost\_marketing": 200000,

&nbsp; "cost\_admin": 100000

}

```



\*\*Response (Success - 200):\*\*

```json

{

&nbsp; "model": {

&nbsp;   // ... recalculated values

&nbsp;   "break\_even\_month": 16,

&nbsp;   "roi\_percentage": 142.3

&nbsp; }

}

```



\*\*Side Effects:\*\*

\- Recalculates all dependent metrics

\- Updates `financial\_models` table



---



\#### \*\*Report Endpoints\*\*



\##### \*\*POST /api/projects/\[id]/reports\*\*



\*\*Purpose:\*\* Generate report



\*\*Authentication:\*\* Required



\*\*Request:\*\*

```json

{

&nbsp; "report\_type": "comprehensive\_pdf",

&nbsp; "included\_sections": \["section\_0", "section\_1", "section\_2", "section\_3", "section\_4"],

&nbsp; "branding": {

&nbsp;   "logo\_url": "https://...", // Enterprise only

&nbsp;   "primary\_color": "#0066CC"

&nbsp; }

}

```



\*\*Validation Rules:\*\*

\- Required modules must be complete (Evidence, Financials)

\- Max 3 report generations per project per day (prevent abuse)

\- `branding` only available for Enterprise tier



\*\*Response (Success - 202 Accepted):\*\*

```json

{

&nbsp; "report": {

&nbsp;   "id": "uuid",

&nbsp;   "status": "generating",

&nbsp;   "estimated\_completion": "2025-01-06T12:03:00Z" // ~3 minutes

&nbsp; }

}

```



\*\*Error Responses:\*\*

\- `400`: Missing required modules → `{"error": "Complete evidence analysis before generating report"}`

\- `429`: Daily limit exceeded → `{"error": "You've reached the daily report generation limit (3). Try again tomorrow."}`



\*\*Side Effects:\*\*

\- Creates report record

\- Queues background job

\- Sends email when complete



---



\##### \*\*GET /api/reports/\[id]\*\*



\*\*Purpose:\*\* Get report status and download URL



\*\*Authentication:\*\* Required



\*\*Response (Success - 200):\*\*

```json

{

&nbsp; "report": {

&nbsp;   "id": "uuid",

&nbsp;   "report\_type": "comprehensive\_pdf",

&nbsp;   "file\_name": "ARBPC\_Sustainable\_Finance\_Report.pdf",

&nbsp;   "file\_size\_mb": 12.5,

&nbsp;   "file\_url": "https://blob.vercel-storage.com/...", // Signed URL, expires in 1 hour

&nbsp;   "download\_count": 3,

&nbsp;   "generated\_at": "2025-01-06T12:03:00Z",

&nbsp;   "expires\_at": "2025-04-06T12:03:00Z" // 90 days

&nbsp; }

}

```



\*\*Error Responses:\*\*

\- `404`: Report not found or expired → `{"error": "Report not found or has expired"}`



\*\*Side Effects:\*\*

\- On first access: Increments `download\_count`



---



\### 4.3 API Documentation Strategy



\*\*Tool: OpenAPI 3.1 + Swagger UI\*\*



\*\*Location:\*\* `https://app.arbpc.com/api/docs`



\*\*Generation Method:\*\* Semi-automated

\- Use `zod-to-openapi` library to convert Zod schemas → OpenAPI schemas

\- Manually add endpoint descriptions, examples, notes

\- Commit `openapi.json` to repo (version control)



\*\*Documentation Format:\*\*

```yaml

\# Example OpenAPI spec snippet

/api/projects:

&nbsp; post:

&nbsp;   summary: Create new project

&nbsp;   description: |

&nbsp;     Creates a new curriculum design project. Users must have available quota.

&nbsp;     Trial users are limited to 1 project.

&nbsp;   tags: \[Projects]

&nbsp;   security:

&nbsp;     - BearerAuth: \[]

&nbsp;   requestBody:

&nbsp;     required: true

&nbsp;     content:

&nbsp;       application/json:

&nbsp;         schema:

&nbsp;           $ref: '#/components/schemas/CreateProjectRequest'

&nbsp;         example:

&nbsp;           name: "Master's in Sustainable Finance"

&nbsp;           program\_level: "master"

&nbsp;           target\_regions: \["California, USA"]

&nbsp;   responses:

&nbsp;     '201':

&nbsp;       description: Project created successfully

&nbsp;       content:

&nbsp;         application/json:

&nbsp;           schema:

&nbsp;             $ref: '#/components/schemas/ProjectResponse'

&nbsp;     '402':

&nbsp;       $ref: '#/components/responses/QuotaExceeded'

```



\*\*Update Process:\*\*

1\. Developer changes API endpoint

2\. Update Zod schema in code

3\. Run `npm run generate-openapi` (regenerates spec)

4\. Review diff in `openapi.json`

5\. Add/update endpoint descriptions manually

6\. Commit changes

7\. Swagger UI automatically updates on deploy



---



\## Phase 5 — Frontend Architecture



\### 5.1 Application Structure



```

/src

&nbsp; /app                    # Next.js 14 App Router

&nbsp;   /(auth)              # Route group (auth pages)

&nbsp;     /login

&nbsp;       page.tsx

&nbsp;     /register

&nbsp;       page.tsx

&nbsp;     /verify-email

&nbsp;       page.tsx

&nbsp;   /(dashboard)         # Route group (authenticated pages)

&nbsp;     /layout.tsx        # Dashboard layout with sidebar

&nbsp;     /projects

&nbsp;       /page.tsx        # List all projects

&nbsp;       /\[id]

&nbsp;         /page.tsx      # Project detail (tabs for modules)

&nbsp;         /evidence

&nbsp;           /page.tsx    # Evidence tab

&nbsp;         /competitors

&nbsp;           /page.tsx    # Competitors tab

&nbsp;         /blueprint

&nbsp;           /page.tsx    # Curriculum blueprint tab

&nbsp;         /financials

&nbsp;           /page.tsx    # Financial calculator tab

&nbsp;         /reports

&nbsp;           /page.tsx    # Report generator tab

&nbsp;       /new

&nbsp;         /page.tsx      # Intake wizard

&nbsp;     /settings

&nbsp;       /page.tsx

&nbsp;   /api                 # API routes

&nbsp;     /auth

&nbsp;       /register

&nbsp;         /route.ts

&nbsp;       /login

&nbsp;         /route.ts

&nbsp;     /projects

&nbsp;       /route.ts        # GET, POST

&nbsp;       /\[id]

&nbsp;         /route.ts      # GET, PUT, DELETE

&nbsp;         /analyze

&nbsp;           /route.ts    # POST

&nbsp;         /evidence

&nbsp;           /route.ts    # GET

&nbsp;         /competitors

&nbsp;           /route.ts    # GET

&nbsp;         /financials

&nbsp;           /route.ts    # GET, PUT

&nbsp;         /reports

&nbsp;           /route.ts    # POST

&nbsp;     /reports

&nbsp;       /\[id]

&nbsp;         /route.ts      # GET

&nbsp;   /layout.tsx          # Root layout

&nbsp;   /page.tsx            # Landing page

&nbsp;   

&nbsp; /components

&nbsp;   /ui                  # shadcn/ui components

&nbsp;     /button.tsx

&nbsp;     /input.tsx

&nbsp;     /card.tsx

&nbsp;     /dialog.tsx

&nbsp;     /toast.tsx

&nbsp;     /...

&nbsp;   /features            # Feature-specific components

&nbsp;     /projects

&nbsp;       /ProjectCard.tsx

&nbsp;       /ProjectList.tsx

&nbsp;       /IntakeWizard.tsx

&nbsp;     /evidence

&nbsp;       /EvidenceTable.tsx

&nbsp;       /DemandScoreCard.tsx

&nbsp;     /competitors

&nbsp;       /CompetitorTable.tsx

&nbsp;       /CompetitorChart.tsx

&nbsp;     /financials

&nbsp;       /FinancialCalculator.tsx

&nbsp;       /BreakEvenChart.tsx

&nbsp;     /reports

&nbsp;       /ReportGenerator.tsx

&nbsp;       /SectionSelector.tsx

&nbsp;   /layouts

&nbsp;     /DashboardLayout.tsx

&nbsp;     /AuthLayout.tsx

&nbsp;   /shared              # Reusable across features

&nbsp;     /LoadingSpinner.tsx

&nbsp;     /ErrorMessage.tsx

&nbsp;     /EmptyState.tsx

&nbsp;     

&nbsp; /lib                   # Utilities and configs

&nbsp;   /api

&nbsp;     /client.ts         # API client (fetch wrapper)

&nbsp;     /hooks.ts          # React Query hooks

&nbsp;   /auth

&nbsp;     /session.ts        # Session management

&nbsp;     /middleware.ts     # Auth middleware

&nbsp;   /utils

&nbsp;     /format.ts         # Number/date formatting

&nbsp;     /validation.ts     # Shared validation logic

&nbsp;   /constants

&nbsp;     /industries.ts     # Industry sectors list

&nbsp;     /regions.ts        # Regions list

&nbsp;     

&nbsp; /stores                # Zustand stores

&nbsp;   /auth.ts             # Auth state (user, token)

&nbsp;   /ui.ts               # UI state (sidebar open/closed, theme)

&nbsp;   

&nbsp; /types                 # TypeScript definitions

&nbsp;   /api.ts              # API request/response types

&nbsp;   /models.ts           # Domain models (Project, Evidence, etc.)

&nbsp;   

&nbsp; /styles

&nbsp;   /globals.css         # Global styles + Tailwind imports

```



---



\### 5.2 Component Architecture



\*\*⚙️ Pattern: Feature-Based Components + Atomic Design Principles\*\*



\*\*Why Feature-Based:\*\*

\- Components grouped by feature (easier to find)

\- Reduces coupling (feature components don't depend on each other)

\- Mirrors URL structure (`/projects/\[id]/evidence` → `/components/features/evidence/`)



\*\*Atomic Design Layers:\*\*

1\. \*\*Atoms\*\* (`/components/ui`): Buttons, inputs, cards (shadcn/ui)

2\. \*\*Molecules\*\* (`/components/shared`): LoadingSpinner, ErrorMessage, EmptyState

3\. \*\*Organisms\*\* (`/components/features`): EvidenceTable, CompetitorChart, FinancialCalculator

4\. \*\*Templates\*\* (`/components/layouts`): DashboardLayout, AuthLayout

5\. \*\*Pages\*\* (`/app`): Composed from organisms



---



\### \*\*Key Architectural Components:\*\*



\#### \*\*Component: IntakeWizard\*\*



\*\*Purpose:\*\* Multi-step form to collect project inputs



\*\*File:\*\* `/components/features/projects/IntakeWizard.tsx`



\*\*Props:\*\*

```typescript

interface IntakeWizardProps {

&nbsp; onComplete: (projectData: CreateProjectRequest) => void;

&nbsp; onCancel: () => void;

&nbsp; initialData?: Partial<CreateProjectRequest>; // For resuming draft

}

```



\*\*State (Internal):\*\*

```typescript

{

&nbsp; currentStep: number; // 1-4

&nbsp; formData: {

&nbsp;   name: string;

&nbsp;   program\_level: ProgramLevel;

&nbsp;   program\_topic: string;

&nbsp;   target\_regions: string\[];

&nbsp;   industry\_sectors: string\[];

&nbsp;   config\_data: object;

&nbsp; };

&nbsp; errors: Record<string, string>;

}

```



\*\*Interactions:\*\*

\- User fills Step 1 → Validates → Enables "Next" button

\- User clicks "Next" → Advances to Step 2

\- User clicks "Back" → Returns to previous step (preserves data)

\- User clicks "Save Draft" → Calls `POST /api/projects` with `status='draft'`

\- User completes Step 4 → Calls `onComplete(formData)`



\*\*Reusability:\*\* Only used in `/projects/new` page (not reused elsewhere)



---



\#### \*\*Component: EvidenceTable\*\*



\*\*Purpose:\*\* Display parsed evidence records with filtering/sorting



\*\*File:\*\* `/components/features/evidence/EvidenceTable.tsx`



\*\*Props:\*\*

```typescript

interface EvidenceTableProps {

&nbsp; projectId: string;

&nbsp; evidence: EvidenceRecord\[];

&nbsp; isLoading: boolean;

&nbsp; onRefresh: () => void;

}

```



\*\*State:\*\*

```typescript

{

&nbsp; filters: {

&nbsp;   source\_type: SourceType | 'all';

&nbsp;   primary\_only: boolean;

&nbsp;   search\_query: string;

&nbsp; };

&nbsp; sortBy: 'relevance' | 'date' | 'salary';

&nbsp; sortOrder: 'asc' | 'desc';

}

```



\*\*Interactions:\*\*

\- User clicks filter dropdown → Updates `filters.source\_type`

\- User types in search → Debounced search on `evidence\_text`

\- User clicks column header → Sorts table

\- User clicks row → Expands to show full details (modal or accordion)

\- User clicks "Refresh" → Calls `onRefresh()` (re-fetches evidence)



\*\*Reusability:\*\* Used in:

\- `/projects/\[id]/evidence` (main view)

\- Report preview modal (read-only mode)



---



\#### \*\*Component: FinancialCalculator\*\*



\*\*Purpose:\*\* Interactive sliders/inputs for financial assumptions, real-time chart updates



\*\*File:\*\* `/components/features/financials/FinancialCalculator.tsx`



\*\*Props:\*\*

```typescript

interface FinancialCalculatorProps {

&nbsp; projectId: string;

&nbsp; initialModel: FinancialModel;

&nbsp; onSave: (updatedModel: FinancialModel) => Promise<void>;

}

```



\*\*State:\*\*

```typescript

{

&nbsp; model: FinancialModel;

&nbsp; activeScenario: 'conservative' | 'likely' | 'aggressive';

&nbsp; isDirty: boolean; // Unsaved changes

}

```



\*\*Interactions:\*\*

\- User moves tuition slider → Updates `model.tuition\_per\_student` → Recalculates break-even

\- User switches scenario tab → Loads saved scenario assumptions

\- User clicks "Save" → Calls `onSave(model)` → `PUT /api/projects/\[id]/financials`

\- User clicks "Export to Excel" → Downloads pre-filled Excel template



\*\*Reusability:\*\* Only in `/projects/\[id]/financials`



---



\#### \*\*Component: ReportGenerator\*\*



\*\*Purpose:\*\* Select sections, configure branding, generate \& download reports



\*\*File:\*\* `/components/features/reports/ReportGenerator.tsx`



\*\*Props:\*\*

```typescript

interface ReportGeneratorProps {

&nbsp; projectId: string;

&nbsp; availableSections: Section\[];

&nbsp; userTier: SubscriptionTier;

}

```



\*\*State:\*\*

```typescript

{

&nbsp; reportType: 'comprehensive\_pdf' | 'executive\_ppt' | 'financial\_excel';

&nbsp; includedSections: string\[];

&nbsp; branding: {

&nbsp;   logo\_url?: string;

&nbsp;   primary\_color?: string;

&nbsp; };

&nbsp; generatingReport: boolean;

&nbsp; generatedReportId?: string;

}

```



\*\*Interactions:\*\*

\- User checks/unchecks sections → Updates `includedSections`

\- User clicks "Generate Report" → `POST /api/projects/\[id]/reports` → Shows progress modal

\- Background: Polls `GET /api/reports/\[id]` every 3 seconds until status='complete'

\- On complete: Shows "Download" button with file URL



\*\*Reusability:\*\* Only in `/projects/\[id]/reports`



---



\### 5.3 State Management Strategy



\#### \*\*Global State (Zustand):\*\*



\*\*Auth Store\*\* (`/stores/auth.ts`):

```typescript

interface AuthState {

&nbsp; user: User | null;

&nbsp; token: string | null;

&nbsp; isAuthenticated: boolean;

&nbsp; login: (email: string, password: string) => Promise<void>;

&nbsp; logout: () => void;

&nbsp; updateUser: (user: Partial<User>) => void;

}

```



\*\*Use Cases:\*\*

\- Check if user is logged in (for protected routes)

\- Display user name/email in header

\- Check subscription tier (for feature gating)



---



\*\*UI Store\*\* (`/stores/ui.ts`):

```typescript

interface UIState {

&nbsp; sidebarOpen: boolean;

&nbsp; theme: 'light' | 'dark';

&nbsp; toggleSidebar: () => void;

&nbsp; setTheme: (theme: 'light' | 'dark') => void;

}

```



\*\*Use Cases:\*\*

\- Persist sidebar state across page navigations

\- Theme switcher (future feature)



---



\#### \*\*Server State (React Query):\*\*



\*\*Projects\*\* (`/lib/api/hooks.ts`):

```typescript

// Fetch all projects

function useProjects(filters?: ProjectFilters) {

&nbsp; return useQuery({

&nbsp;   queryKey: \['projects', filters],

&nbsp;   queryFn: () => fetchProjects(filters),

&nbsp;   staleTime: 5 \* 60 \* 1000, // 5 minutes

&nbsp; });

}



// Fetch single project

function useProject(projectId: string) {

&nbsp; return useQuery({

&nbsp;   queryKey: \['project', projectId],

&nbsp;   queryFn: () => fetchProject(projectId),

&nbsp;   staleTime: 1 \* 60 \* 1000, // 1 minute

&nbsp;   refetchInterval: (data) => 

&nbsp;     data.status === 'analyzing' ? 5000 : false, // Poll every 5s if analyzing

&nbsp; });

}



// Create project mutation

function useCreateProject() {

&nbsp; const queryClient = useQueryClient();

&nbsp; return useMutation({

&nbsp;   mutationFn: (data: CreateProjectRequest) => createProject(data),

&nbsp;   onSuccess: () => {

&nbsp;     queryClient.invalidateQueries(\['projects']); // Refresh project list

&nbsp;   },

&nbsp; });

}

```



\*\*Caching Strategy:\*\*

\- \*\*Projects list:\*\* Cache for 5 minutes (user rarely creates new projects)

\- \*\*Project detail:\*\* Cache for 1 minute, auto-refetch if `status='analyzing'`

\- \*\*Evidence records:\*\* Cache for 10 minutes (rarely changes after analysis complete)

\- \*\*Competitors:\*\* Cache for 10 minutes

\- \*\*Financial model:\*\* No cache (always fetch latest, user might edit frequently)



---



\#### \*\*Local State (useState/useReducer):\*\*



\*\*Use Cases:\*\*

\- Form inputs (before submission) → `useState`

\- Modal open/closed → `useState`

\- Accordion expanded → `useState`

\- Complex form with multiple interdependent fields → `useReducer`



\*\*Example:\*\*

```typescript

// IntakeWizard uses useReducer for complex form state

type Action =

&nbsp; | { type: 'SET\_STEP'; step: number }

&nbsp; | { type: 'UPDATE\_FIELD'; field: string; value: any }

&nbsp; | { type: 'SET\_ERROR'; field: string; error: string }

&nbsp; | { type: 'CLEAR\_ERRORS' };



function wizardReducer(state: WizardState, action: Action): WizardState {

&nbsp; switch (action.type) {

&nbsp;   case 'SET\_STEP':

&nbsp;     return { ...state, currentStep: action.step };

&nbsp;   case 'UPDATE\_FIELD':

&nbsp;     return {

&nbsp;       ...state,

&nbsp;       formData: { ...state.formData, \[action.field]: action.value },

&nbsp;     };

&nbsp;   // ... other cases

&nbsp; }

}

```



---



\#### \*\*URL State (Query Params):\*\*



\*\*Use Cases:\*\*

\- Filters on project list: `/projects?status=complete\&sort=created\_at\_desc`

\- Pagination: `/projects?page=2`

\- Search: `/projects/\[id]/evidence?search=python+skills`

\- Tab selection: `/projects/\[id]?tab=competitors`



\*\*Implementation:\*\*

```typescript

// Use Next.js useSearchParams + useRouter

const searchParams = useSearchParams();

const router = useRouter();



const currentTab = searchParams.get('tab') || 'evidence';



function setTab(tab: string) {

&nbsp; const params = new URLSearchParams(searchParams);

&nbsp; params.set('tab', tab);

&nbsp; router.push(`?${params.toString()}`);

}

```



---



\### 5.4 Routing \& Navigation



```

/                            → Landing page (public)

/login                       → Login form

/register                    → Sign-up form

/verify-email?token=...      → Email verification

/reset-password              → Password reset flow



--- Protected Routes (require authentication) ---



/dashboard                   → Project list + summary cards

/projects                    → Same as /dashboard (alias)

/projects/new                → Intake wizard (4 steps)

/projects/\[id]               → Project detail page (redirects to /evidence)

/projects/\[id]/evidence      → Evidence analysis tab

/projects/\[id]/competitors   → Competitive benchmarking tab

/projects/\[id]/blueprint     → Curriculum design tab (v2)

/projects/\[id]/financials    → Financial calculator tab

/projects/\[id]/reports       → Report generator tab

/settings                    → User account settings

/settings/billing            → Subscription management



--- Admin Routes (future) ---



/admin/users                 → User management

/admin/analytics             → Usage dashboards

```



\*\*Protected Route Implementation:\*\*

```typescript

// /app/(dashboard)/layout.tsx

export default async function DashboardLayout({ children }) {

&nbsp; const session = await getServerSession();

&nbsp; 

&nbsp; if (!session) {

&nbsp;   redirect('/login');

&nbsp; }

&nbsp; 

&nbsp; return (

&nbsp;   <div className="flex h-screen">

&nbsp;     <Sidebar user={session.user} />

&nbsp;     <main className="flex-1 overflow-y-auto">

&nbsp;       {children}

&nbsp;     </main>

&nbsp;   </div>

&nbsp; );

}

```



\*\*Role-Based Access (future):\*\*

```typescript

// Middleware: /middleware.ts

export function middleware(request: NextRequest) {

&nbsp; const { pathname } = request.nextUrl;

&nbsp; 

&nbsp; // Admin routes

&nbsp; if (pathname.startsWith('/admin')) {

&nbsp;   const user = getUserFromToken(request);

