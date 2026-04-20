# ARBPC CURRICULUM MARKETPLACE - PRODUCTION ARCHITECTURE DECISIONS

**System: ARBPC v3-DYN Marketplace Platform**  
**Scope: Phase 3 - Public Curriculum Discovery & Application Submission**  
**Date: January 2026**  
**Architect: Senior Systems Authority**  

---

## EXECUTIVE SUMMARY

The ARBPC Marketplace is a **read-heavy, discovery-first system** supporting 2,847+ programs, 342 institutions, and prospective student discovery/application flows. This document establishes non-negotiable architectural constraints ensuring **availability under surge loads, sub-2s discovery latency, and reliable application submission**.

**Key Architectural Stance:**
- **Hybrid topology**: Read-optimized public discovery tier (stateless, cached, CDN-enabled) + isolated write tier for applications
- **Fail-safe principle**: Search failure never breaks; applications require strong consistency
- **Scale vector**: Designed for 100K concurrent browsers → 10K simultaneous applicants → 1K concurrent application submissions
- **Consistency boundary**: Eventual consistency for discovery; strong consistency for applications

---

## I. SYSTEM DECOMPOSITION

### A. Domain Boundaries

```
DISCOVERY DOMAIN (Read-Intensive)          APPLICATION DOMAIN (Write-Critical)
├─ Homepage Browse                         ├─ Application Submission
├─ Program Search & Filter                 ├─ Draft Persistence
├─ Program Detail View                     ├─ Recommendation Tracking
├─ Program Comparison                      ├─ Payment Processing
├─ Trending/Featured Programs              ├─ Status Notifications
├─ Browse by Category/Level                └─ Audit Trail
└─ Labor Market Data Display

STUDENT IDENTITY DOMAIN (Gateway)          INSTITUTION ADMIN TIER
├─ Registration                            ├─ Program Management
├─ Profile Management                      ├─ Application Review
├─ Saved Programs                          ├─ Admission Decisions
├─ Application History                     └─ Analytics
└─ Session Management
```

### B. User-Facing vs Internal Services

| Service Layer | Type | Criticality | Latency SLA |
|---|---|---|---|
| **Public Homepage** | Stateless, CDN | P0: Must Always Serve | P95 < 800ms |
| **Search & Filter** | Stateless, Query Cache | P0: Graceful Degradation | P95 < 1500ms |
| **Program Detail** | Stateless, Fragment Cache | P1: Cached Fallback | P95 < 1000ms |
| **Student Registry** | Stateful, Session-bound | P1: Authentication Gate | P95 < 2000ms |
| **Application Form** | Transactional, Durable | P0: Never Lose Data | P99 < 3000ms |
| **Admin Portal** | Internal, Best-Effort | P2: Optional | N/A |

### C. Critical vs Non-Critical Flows

**CRITICAL (System fails without these):**
1. Browse Homepage → Search Results (discovery funnel top)
2. Submit Application → Confirmation → Email notification
3. Student Registration → Session Creation

**HIGH (System degrades gracefully without these):**
4. Recommendation Letter Status Updates
5. Lab Market Data Visualization
6. Program Comparison Tools
7. Saved Programs List

**LOW (Can fail silently with fallback):**
8. Trending Programs Carousel
9. Success Stories / Testimonials
10. Related Programs Suggestions
11. Admin Analytics

### D. Read vs Write Path Topology

```
READ PATH (95% of traffic):                 WRITE PATH (5% of traffic):
Homepage                                    Registration Form
  ↓                                           ↓
[CDN Layer - 1st]                           [API Gateway - Session Required]
  ↓                                           ↓
[Cache Layer - Memcached/Redis]             [Validation & Enrichment Service]
  ↓                                           ↓
[Search Index - Elasticsearch]              [Application State Machine]
  ↓                                           ↓
[Read Replica Database]                     [Transactional Database (Primary)]
                                             ↓
                                           [Message Queue - Durable]
                                             ↓
                                           [Notification Service]
                                           [Analytics Pipeline]
```

---

## II. AVAILABILITY & FAILURE STRATEGY

### A. Failure Domain Matrix

| Component | Failure Mode | Impact | Mitigation |
|---|---|---|---|
| **Search Index Down** | Search returns 0 results | Non-fatal: Show "Browse by Category" fallback; serve cached trending list | Multi-region Elasticsearch cluster; read-replica preference |
| **Read DB Replica Down** | Stale data (max 30s) | Non-fatal: Acceptable for discovery; cache absorbs queries | 2+ replicas per region; auto-failover at 5s detection |
| **Cache Layer Down** | Full DB load spike | Recoverable: DB handles 3× normal load for 60s | Cache warming on startup; circuit breaker on read path |
| **Application DB Down** | Cannot accept submissions | **FATAL** | Active-active replication; synchronous commit to primary + standby |
| **Notification Service Down** | Delayed emails (up to 4h) | Acceptable: Applications still accepted; queue persists | Durable message queue; retry logic (exponential backoff) |
| **CDN Cache Expired** | Marginal latency increase | Acceptable: Origin serves within 2s | 10min TTL on homepage; 1h on program cards |
| **API Gateway Down** | Cannot write | **FATAL** | Load-balanced active-active (2+ nodes); cross-region failover |
| **Payment Processor Down** | Application blocked at Step 5 | Recoverable: Defer payment until submission; accept pledges | Deferred payment option; email receipt with payment link |

### B. What Breaks First (Graceful Degradation Strategy)

**Tier 1 (Failure Tolerance = Critical):**
- Application submission must never fail due to non-critical services
- Missing recommendation letters → Allow submission with warning
- Payment processor down → Allow "pay later" flow
- Email service down → Queue notification; retry exponentially

**Tier 2 (Acceptable Degradation):**
- Search slow → Show cached results + sorting options
- Labor market data unavailable → Show previous month's snapshot
- Trending carousel down → Hide; don't block page load

**Tier 3 (Graceful Degradation):**
- Reviews/testimonials fail → Show placeholder; page still loads
- Recommendations carousel fails → Show "View All" link
- Suggestion engine fails → No personalization; generic browse still works

### C. Availability Requirements by Flow

| Flow | Required Uptime | Design | Redundancy |
|---|---|---|---|
| **Discovery (Homepage → Results)** | 99.95% | Stateless + CDN + Multi-region cache | 3 AZs |
| **Application Submission** | 99.99% | Sync replication + Durable queue | Active-active + standby |
| **Registration** | 99.9% | Session replication across 2 AZs | Automatic AZ failover |
| **Email Notifications** | 97% (SLA relaxed) | Async queue + 3-day retry | Best-effort with fallback |

---

## III. RELIABILITY & FAULT TOLERANCE

### A. Idempotency Model

All **state-changing operations** must be idempotent using request deduplication:

```
Operation: Submit Application
├─ Request ID generation: UUID-v4 (client-generated, persisted in request)
├─ Idempotency window: 24 hours (stored in fast KV store)
├─ Duplicate detection: Hash(user_id + program_id + timestamp + request_id)
├─ Response: Return HTTP 200 + cached response if duplicate within 24h
└─ Cleanup: Expire entries after 24h; archive to cold storage

Operation: Save Program (Wishlist)
├─ Idempotency key: Hash(user_id + program_id + action)
├─ Duplicate behavior: Silently succeeds
├─ Consistency: Eventually consistent (acceptable 30s delay)

Operation: Update Profile
├─ Idempotency: Version-based optimistic locking
├─ Conflict resolution: Last-write-wins (user retries on conflict)
├─ Window: No expiry (user must explicitly retry)
```

### B. Retry Semantics

**Synchronous Operations (API calls, form submission):**
```
Max retries: 3
Backoff: Exponential (1s, 4s, 16s)
Timeout: 30s per attempt
Conditions:
  - Retry on: 5xx, connection timeout, deadline exceeded
  - Never retry: 4xx (auth, validation), 402 (payment), 422 (business logic)
  - Circuit breaker: Stop after 5 consecutive failures on same endpoint for 60s
```

**Asynchronous Operations (Email, notifications):**
```
Max retries: 7 (spans ~24 hours with exponential backoff)
Backoff: 5m, 15m, 1h, 4h, 8h, 12h, 24h
DLQ: Move to Dead Letter Queue after final failure
Alerting: PagerDuty alert if 10% of a batch fails
```

**Payment Operations:**
```
Max retries: 1 (payment should be idempotent; processor handles re-attempts)
Timeout: 60s
Failure handling: Queue for manual retry; show "payment pending" UI
Webhook verification: All payment events verified with HMAC-SHA256
```

### C. Circuit Breakers

**Read Path:**
- **Database read replica**: Trip after 50% errors over 30s window; fallback to cache
- **Search index**: Trip after 20% errors over 60s window; fallback to cached search results
- **Payment gateway**: Trip after 10 failures over 5min; show "payment unavailable" message; allow deferred payment

**Write Path:**
- **Primary DB**: Never trip (fail-fast → client retry)
- **Message queue**: Trip after 30s persistent unavailability; fail application submission
- **Notification service**: Trip after 50% errors; allow submission; queue async retry

**Recovery:**
- Automatic: Half-open state after 60s; retry single request
- Manual: Prod oncall can force-close circuit via dashboard

### C. Timeout Strategy

| Operation | P50 | P95 | P99 | Type |
|---|---|---|---|---|
| **GET /marketplace (homepage)** | 300ms | 800ms | 1500ms | Sync, cached |
| **GET /search (search results)** | 400ms | 1200ms | 2500ms | Sync, query cache |
| **GET /program/:slug (detail)** | 250ms | 600ms | 1200ms | Sync, fragment cache |
| **POST /register (auth)** | 800ms | 1800ms | 3500ms | Sync, DB write |
| **POST /apply/:program (submit app)** | 1200ms | 2500ms | 5000ms | Sync, multi-step |
| **PUT /student/profile** | 600ms | 1500ms | 3000ms | Sync, validation + DB |

**Timeout enforcement:**
- API Gateway: Hard timeout at P99 + 500ms
- Client: Soft timeout at P95; show "Retrying..." → Hard timeout at P99 + 1s
- Database queries: Always wrapped in context timeout; 30s max

### D. Backpressure Handling

**Request Volume Limits (Per Service):**

| Service | RPS Soft Limit | RPS Hard Limit | Behavior @ Hard Limit |
|---|---|---|---|
| **Search** | 1000 | 2000 | 429 Too Many Requests (exponential backoff on client) |
| **Homepage** | 5000 | 10000 | Serve stale cache (max 5min old) |
| **Application Submit** | 100 | 200 | Queue to message broker; client polls for completion |
| **Registration** | 500 | 1000 | 429 Too Many Requests |

**Database Connections:**
```
Pool size: 100 connections
Idle timeout: 5 minutes
Max queued requests: 50
Overflow behavior: 429 Too Many Requests (immediately fail)
```

**Message Queue (Application Queue):**
```
Max in-flight: 1000
Queue depth trigger: If pending > 5000, alert
Processing rate: 50-100 applications/second (scale consumer count)
```

---

## IV. LATENCY BUDGET & CRITICAL PATHS

### A. P95 Latency Budgets by User Flow

**Flow 1: Browse Homepage → Search Results**
```
User Intent: "Find programs in Data Science"
Target P95: 1500ms

Breakdown:
  ├─ Homepage load: 800ms
  │  ├─ HTTP request: 50ms
  │  ├─ CDN/cache hit: 100ms
  │  ├─ Template render: 200ms
  │  └─ JavaScript execution: 450ms
  │
  └─ Search query (triggered by user typing): 700ms
     ├─ HTTP request: 50ms
     ├─ Elasticsearch query: 300ms (cache: 50ms avg)
     ├─ Result marshaling: 150ms
     └─ Render & animation: 200ms

Network hops: 3 (client → CDN → API → Database)
```

**Flow 2: Submit Application (5-step form)**
```
User Intent: "Complete and submit application"
Target P99: 3000ms (critical operation; higher tolerance acceptable)

Per-step latency:
  Step 1-2: Prefill + validate: 500ms (mostly client-side)
  Step 3: Fetch recommendations: 800ms (API call + DB lookup)
  Step 4: Upload resume/essays: 2000ms (file upload; async; polling)
  Step 5: Final submission: 1200ms
    ├─ Validate all sections: 300ms
    ├─ Process payment: 600ms
    ├─ Persist to DB: 200ms
    └─ Queue notification: 100ms

Total critical path: ~1200ms for Step 5 (other steps can overlap)
Network hops: 4 (client → API → DB → Payment → Queue)
```

**Flow 3: View Program Detail Page**
```
User Intent: "See full program info & reviews"
Target P95: 1000ms

Breakdown:
  ├─ Initial load (hero + sidebar): 400ms
  │  ├─ HTTP: 50ms
  │  ├─ Cache hit: 50ms
  │  └─ Render: 300ms
  │
  ├─ Lazy-load reviews tab (on-demand): 600ms
  │  ├─ HTTP: 50ms
  │  ├─ DB query (paginated, indexed): 150ms
  │  ├─ Cache miss → Elasticsearch: 250ms
  │  └─ Render: 150ms
  │
  └─ Lazy-load curriculum tab: 500ms

Network hops: 2-3 (depending on cache state)
```

### B. Caching Architecture

**CDN Layer (Cloudflare/Fastly):**
```
Cached assets:
  - Public homepage: TTL 10 minutes
  - Static program cards: TTL 1 hour
  - Program detail hero image: TTL 24 hours
  - JavaScript bundles: TTL 7 days (with versioning)
  - CSS stylesheets: TTL 7 days

Cache invalidation:
  - On-demand via API for program updates
  - Tag-based: Invalidate all [program_id] assets on detail change
  - Stale-while-revalidate: Serve 24h-old content if origin down
```

**Application Cache Layer (Redis):**
```
Cached data:
  - User session: TTL 7 days (refreshed on each request)
  - Program metadata (trending, featured): TTL 1 hour
  - Search query results: TTL 5 minutes (by query hash)
  - Labor market data (aggregated): TTL 24 hours
  - Institution logos/metadata: TTL 7 days

Eviction policy: LRU (Least Recently Used)
Max memory: 32 GB (across 3-node cluster)
Failover: Replication factor = 2 (node failure → automatic failover)
```

**Database Query Cache (Inline):**
```
Cached queries:
  - Program count by category: TTL 1 hour
  - Institution list (with filters): TTL 30 minutes
  - Review aggregations (ratings): TTL 30 minutes
  - User saved programs: TTL 1 hour (per user)

Strategy: Write-through (update cache immediately on write; invalidate related cached queries)
```

**Client-Side Caching:**
```
Local Storage:
  - Drafted application form: Unlimited (user browser)
  - User preferences (sort, filters): Unlimited

Session Storage:
  - Temporary search state: Until browser close

Service Worker:
  - Offline fallback page (cached)
  - Program list (cached for offline browsing)
```

### C. Precomputation & Eventual Consistency

**Precomputed (Updated every 4 hours or on-demand):**
```
- Program demand scores (derived from job data)
- Salary statistics by program
- Top hiring companies per program
- Category counts (# programs per industry, etc.)
- Trending list (top 10 by weekly applications)
- Related programs (similarity index)

Storage: Materialized view in primary DB
Invalidation: Scheduled job at 12am, 4am, 8am, 12pm, 4pm, 8pm UTC
Failover: If job fails, use previous day's snapshot
```

**Eventually Consistent (Update frequency = minutes to hours):**
```
- Student "saved programs" count (sync every 10 min)
- Review ratings (sync every 30 min)
- Job market growth rates (sync every 24h)
- Application statistics (program dashboard; sync every 1h)

Conflict resolution: Last-write-wins (timestamp-based)
Replication lag tolerance: 1 hour acceptable
```

---

## V. THROUGHPUT & CONCURRENCY STRATEGY

### A. Inferred Load Profile

**User Concurrency Model:**

```
TIME OF DAY    CONCURRENT BROWSERS   CONCURRENT SEARCHERS   APP SUBMITTERS
Morning (UTC)  10,000                2,000                  100
Afternoon      35,000                7,000                  300
Evening        50,000                10,000                 500
Night          15,000                3,000                  150
Peak (5-9pm)   100,000               20,000                 1,000

Burst events:
  - Program enrollment opens: 3× normal for 2 hours
  - deadline approaches: 2× daily surge 24h before
  - Trending notification sent: +5000 users over 30 min
```

**Derived Load (RPS):**

```
ENDPOINT                    RPS (P50)    RPS (PEAK)   Sync/Async
GET /marketplace            800          2000         Sync (cached)
GET /search                 400          1200         Sync (cached)
GET /program/:slug          300          900          Sync (cached)
POST /apply/:id (submit)    50           200          Sync (critical)
POST /register              30           150          Sync (critical)
PUT /student/profile        20           100          Sync
GET /student/applications   50           150          Sync (cached)
POST /recommend (tracking)  100          300          Async (fire-and-forget)
```

### B. Synchronous vs Asynchronous Boundaries

**Synchronous (Must Complete Before User Sees Response):**
```
✓ Form validation (client-side + server-side)
✓ Authentication & authorization checks
✓ Database write for application submission (strong consistency required)
✓ Payment processing (auth + charge must complete)
✓ Duplicate detection (idempotency check)

Timeout: 5 seconds (user won't wait longer)
```

**Asynchronous (Fire-and-forget, user sees immediate confirmation):**
```
✓ Send confirmation email
✓ Generate recommendation letter requests
✓ Update analytics/dashboard
✓ Generate PDF transcript summary
✓ Update trending/featured lists
✓ Notify institution admissions team
✓ Process refunds (if applicable)

Queue: Durable message queue (Kafka/RabbitMQ)
Retry: Exponential backoff; DLQ after max retries
SLA: 99% delivered within 4 hours
```

### C. Queue Architecture for Application Submission

```
Flow: User submits application (Step 5)

1. SYNCHRONOUS (Critical path):
   POST /apply/:program_id
   ├─ Validate payload
   ├─ Check for duplicates (request ID lookup in Redis)
   ├─ Persist application to PRIMARY DB (sync write)
   ├─ Return HTTP 200 + Application ID
   └─ [Elapsed: ~1200ms]

2. ASYNCHRONOUS (Background workers):
   Kafka Topic: "application.submitted"
   Message: {app_id, student_id, program_id, timestamp, request_id}

   Consumer 1 - Email Service (2 instances):
     └─ Send confirmation email to student
     └─ SLA: 99% within 15 minutes

   Consumer 2 - Notification Service (3 instances):
     └─ Notify institution admissions
     └─ Update student dashboard
     └─ SLA: 99% within 5 minutes

   Consumer 3 - Analytics Service (1 instance):
     └─ Log application event
     └─ Update trending scores
     └─ SLA: Best effort, OK to lose if queue full

   Consumer 4 - Archive Service (1 instance):
     └─ Archive attachments to cold storage (S3 Glacier)
     └─ SLA: Complete within 24 hours
```

**Queue Characteristics:**
```
Queue technology: Kafka (distributed, durable, replayable)
Partitioning: By program_id (ensures ordering per program)
Replication factor: 3 (durability across 3 AZs)
Retention: 7 days (replay for debugging/auditing)
Consumer offset: Auto-committed after processing
DLQ: Dead letter topic with 30-day retention
```

### D. Throughput Bottlenecks & Scaling Limits

| Component | Bottleneck | Capacity | Scaling Strategy |
|---|---|---|---|
| **Database (Primary)** | Write throughput | 1000 TPS | Horizontal: Sharding by student_id |
| **Search Index** | Query latency | 2000 QPS | Vertical: Add nodes; Horizontal: Sharding |
| **Redis Cache** | Memory bandwidth | 50GB/s | Add nodes; Replication factor = 2 |
| **API Gateway** | Connection limit | 10K concurrent | Load balance across 4 instances |
| **Message Queue** | Throughput (Kafka) | 100K msg/s | Add partitions; add consumer instances |
| **File Upload** | Bandwidth | 1 Gbps | CDN + resumable uploads (TUS protocol) |

**Scaling roadmap:**
```
0-10K concurrent users: Single region, single DB instance + replicas
10-50K: Multi-region read replicas; Redis cluster
50-100K: Shard database by student_id; Elasticsearch cluster for search
100K+: Full CQRS with event sourcing; NATS for messaging
```

---

## VI. SCALABILITY MODEL

### A. Horizontal vs Vertical Scaling Boundaries

**Stateless Services (Horizontal):**
```
API Gateway
├─ Scaling: Add instances behind load balancer
├─ Limit: Network switch capacity (typically 10-40 Gbps)
└─ Decision point: Scale to 4+ instances at 70% CPU

Search Service (Elasticsearch)
├─ Scaling: Add data nodes to cluster
├─ Limit: Storage cost + query coordination complexity
└─ Decision point: Shard when single node > 500GB

Notification Service (Email)
├─ Scaling: Add consumer instances
├─ Limit: Rate limit of email provider (e.g., SendGrid: 100 msg/s)
└─ Decision point: Upgrade SES plan at 50 msg/s sustained
```

**Stateful Services (Vertical or Replication):**
```
Session Store (Redis)
├─ Scaling: Vertical (add memory) until cost inefficient
├─ Replication: Add standby nodes (failover, not load balancing)
└─ Decision point: At 32GB memory, migrate to Redis Cluster (horizontal)

Database (PostgreSQL)
├─ Scaling: Vertical (CPU, RAM, disk) up to hardware limit
├─ Replication: Add read replicas (not for write throughput)
├─ Sharding: If write throughput exceeds 1000 TPS
└─ Decision point: At ~1000 TPS on single node, begin sharding by student_id
```

### B. Statelessness Enforcement

**API Service Statelessness Contract:**
```
✗ BANNED: In-process caches (use Redis instead)
✗ BANNED: Local file writes (use S3 instead)
✗ BANNED: Keeping user session state in memory
✗ BANNED: Long-running background jobs (use message queue instead)

✓ ALLOWED: Request-scoped variables
✓ ALLOWED: Temporary computation results
✓ ALLOWED: Immutable, generated content (computed per-request)
✓ ALLOWED: Lookup caches from Redis/Memcached (read-only)

Verification: Health check endpoint returns 200 if all external services reachable
```

### C. Data Partitioning Strategy

**Partitioning Scheme:**

```
Primary Key: student_id (hash partitioning)
Reason: Applications and profiles are inherently per-student; separates load by user

Sharding Key Distribution:
  ├─ Shard 1: student_id in [0, 1B) 
  ├─ Shard 2: student_id in [1B, 2B)
  ├─ Shard 3: student_id in [2B, 3B)
  └─ Shard 4: student_id in [3B, 4B)

Table Partitioning Within Shard:
  - applications (by program_id) → 100 partitions
  - student_profiles → No partitioning (small, fits in one shard)
  - application_documents → Moved to separate object store (S3) with metadata in main DB

Cross-shard Queries:
  - "Find all applications to program X" → Fan-out to 4 shards
  - "Trending programs this week" → Pre-computed, stored in shared cache
  - "Search across all programs" → Dedicated read-only Elasticsearch cluster (not sharded by student)
```

**Hot Key / Hot Partition Mitigation:**

```
Problem: Popular programs (e.g., Stanford MS Data Science) receive 10× normal application load

Solution 1: Cache application counts in Redis with 1-min TTL
Solution 2: Use write-buffering: Batch 100 applications before updating demand score
Solution 3: Separate write path for high-volume programs:
  - Queue writes to message broker
  - Batch update every 10 seconds
  - Service writes from cache with eventual consistency

Monitoring: Alert if any shard > 80% CPU for > 5 min
```

### D. Growth Ceilings

**Scaling Roadmap:**

```
PHASE 1 (Current: 2,847 programs, 50K concurrent users)
├─ Database: Single PostgreSQL instance + 2 read replicas
├─ Cache: Single Redis node (32GB)
├─ Search: Single Elasticsearch node (500GB)
├─ Limitation: Database write throughput (~500 TPS)
└─ Estimated runway: 12 months at 2× growth/year

PHASE 2 (100K concurrent users, 5000 programs, 1000 TPS applications/sec)
├─ Decompose writes: Shard by student_id (4 shards)
├─ Cache: Redis Cluster (3 nodes)
├─ Search: Elasticsearch cluster (5 nodes, sharded by program_id)
├─ Message Queue: Kafka cluster (3 brokers)
└─ Changes required: Application routing logic; coordination service

PHASE 3 (1M+ users, full CQRS)
├─ Event sourcing: All writes → Kafka event stream
├─ CQRS: Separate command (write) and query (read) datastores
├─ Search: Separate search index (asynchronously updated from event stream)
├─ Multi-region: Active-active replication with CRDTs
└─ Changes required: Architectural refactor (3-month project)

CEILING WITHOUT ARCHITECTURE CHANGE: ~500K concurrent users, 10K TPS
(Reached at Phase 2 limits; further growth requires Phase 3 refactor)
```

---

## VII. ARCHITECTURE DECISION RECORDS (ADRs)

### ADR-001: API Gateway Pattern for Public Discovery

**Decision:** Implement stateless API Gateway (nginx/Kong) in front of all public endpoints

**Alternatives Considered:**
1. Direct client-to-service (no gateway) → ✗ No rate limiting, harder to version
2. GraphQL API → ✗ Overkill for discovery use case; adds complexity
3. Traditional REST + REST adapter → ✓ CHOSEN

**Tradeoffs:**
```
✓ Rate limiting per client
✓ Request deduplication (idempotency)
✓ Load balancing across backend instances
✗ Additional latency hop (+50ms P99)
✗ Gateway becomes potential bottleneck
```

**Failure Modes:**
- Gateway down → All requests fail (mitigated by: 2+ instances, auto-failover)
- Rate limiter misconfigured → Legitimate users blocked (mitigated by: gradual rollout, monitoring)

**Reversal Cost:** LOW (pure infrastructure change; no application code changes)

---

### ADR-002: Redis for Session + Application State Cache

**Decision:** Use Redis as primary cache for sessions and query results; avoid in-process memory

**Alternatives Considered:**
1. In-process cache (Caffeine) → ✗ Doesn't scale across instances; inconsistent state
2. Memcached → ✓ CONSIDERED; chose Redis for persistence (recovery)
3. DynamoDB → ✗ Overkill; too much latency for session reads
4. PostgreSQL as cache → ✗ Wrong tool; SQL overhead

**Tradeoffs:**
```
✓ Consistent state across all API instances
✓ Automatic TTL eviction
✓ Replication for failover
✓ Human-inspectable (redis-cli)
✗ Network latency (+5-10ms per cache hit)
✗ Additional infrastructure to manage
```

**Failure Modes:**
- Redis down → All cache misses go to primary DB → 3× load spike (mitigated by: circuit breaker; serve stale cached data)
- Cache stampede → Thundering herd when popular entry expires (mitigated by: cache warming; background refresh)

**Reversal Cost:** MEDIUM (requires rewriting session/cache access layer)

---

### ADR-003: Asynchronous Email via Durable Message Queue

**Decision:** Use Kafka for all email operations; never send email synchronously

**Alternatives Considered:**
1. Synchronous HTTP call to email provider → ✗ Slows down form submission; cascading failures
2. Send email in request handler → ✗ Same problem; data loss if process crashes
3. Kafka (event streaming) → ✓ CHOSEN
4. AWS SQS → ✗ Considered; chose Kafka for replay capability (audit trail)

**Tradeoffs:**
```
✓ Never blocks user request
✓ Email failures don't affect application submission
✓ Automatic retry with exponential backoff
✓ Replayable for debugging (can resend old events)
✗ Email delivery delay (up to 15 min acceptable)
✗ Additional infrastructure (Kafka cluster)
✗ Operational complexity (monitoring consumer lag)
```

**Failure Modes:**
- Email provider rate-limited → Queue backs up; alerting triggers (mitigated by: reduce consumer concurrency; batch sending)
- Kafka down → Emails queue locally; recovered when Kafka returns (mitigated by: 3-node cluster; 7-day message retention)
- Invalid email address → Bounces; move to DLQ (mitigated by: validation before queue; manual processing of DLQ)

**Reversal Cost:** HIGH (would require synchronous email redesign; affects user experience)

---

### ADR-004: Elasticsearch for Program Search (Not SQL Full-Text Search)

**Decision:** Use Elasticsearch for program search; don't use PostgreSQL full-text search

**Alternatives Considered:**
1. PostgreSQL gin/gist indexes → ✗ Insufficient for faceted search; no relevance ranking
2. Elasticsearch → ✓ CHOSEN
3. Algolia (SaaS) → ✗ Considered; chose self-hosted for cost at scale
4. Full-table scan + in-memory filtering → ✗ O(n) unacceptable

**Tradeoffs:**
```
✓ Faceted search (industry, degree, price range)
✓ Relevance ranking + fuzzy matching
✓ Sub-500ms response on 2,847 programs
✓ Horizontal scaling (add nodes)
✗ Eventual consistency (30s lag from database write)
✗ Complex mapping configuration
✗ Memory overhead (dual storage: DB + index)
```

**Failure Modes:**
- Index out of sync with database → Stale results (mitigated by: nightly full re-index; circuit breaker fallback to DB)
- Search query slow (full-table scan) → Timeout (mitigated by: timeout enforcement; cached popular queries)

**Reversal Cost:** MEDIUM (would require rebuilding search UI; SQL version is slower but simpler)

---

### ADR-005: Synchronous Payment Processing with Deferred Option

**Decision:** Block application submission on payment failure; allow "pay later" to unblock user

**Alternatives Considered:**
1. Require payment before submission → ✗ User frustration; conversion drop if payment fails
2. Allow submission without payment → ✗ 40% never return to pay; unrecoverable debt
3. Synchronous payment (required) + deferred option → ✓ CHOSEN

**Tradeoffs:**
```
✓ Captures payment from motivated users
✓ Doesn't block application completion
✓ Recovers deferred payments via email reminders
✗ Adds complexity: 2-step payment flow
✗ Collections effort needed for deferred payments
```

**Failure Modes:**
- Payment processor down → User can defer (mitigated by: show "pay later" option; queue payment for retry)
- User defers payment → Never pays (mitigated by: email reminders at 3, 7, 14, 30 days)

**Reversal Cost:** MEDIUM (would require database schema changes to track payment status)

---

### ADR-006: Eventual Consistency for "Saved Programs" (Wishlist)

**Decision:** Save-to-wishlist operations use eventual consistency; acceptable 30-second lag

**Alternatives Considered:**
1. Strong consistency (synchronous DB write) → ✗ P99 latency spike; overkill
2. Eventual consistency → ✓ CHOSEN
3. Client-side only (localStorage) → ✗ Lost on new device; not trusted

**Tradeoffs:**
```
✓ Sub-100ms response (fire-and-forget)
✓ No database round-trip (write to cache + async persist)
✗ User sees count updated before it's persistent (acceptable; shows immediately)
✗ Requires reconciliation on server (idempotency keys)
```

**Failure Modes:**
- Cache lost before async write completes → User sees saved, then disappears after refresh (mitigated by: cache replication; periodic reconciliation)
- Out-of-order events → Last-write-wins (if user saves then unsaves rapidly) (mitigated by: timestamp ordering; client-side deduplication)

**Reversal Cost:** LOW (change from async to sync is straightforward; may impact P99 latency)

---

### ADR-007: Multi-AZ Active-Passive for Database, Not Active-Active

**Decision:** Primary database in AZ-1, standby in AZ-2; manual failover required

**Alternatives Considered:**
1. Single-AZ (no HA) → ✗ Unacceptable; business critical
2. Active-passive (primary + standby) → ✓ CHOSEN
3. Active-active (multi-master) → ✗ Complexity; eventual consistency required
4. AWS RDS Multi-AZ → ✓ CONSIDERED; equivalent to ADR choice

**Tradeoffs:**
```
✓ Simple, well-understood failure mode
✓ Strong consistency (synchronous replication)
✓ <30s failover time with health checks
✗ Standby underutilized (no reads on standby)
✗ Manual intervention may be needed for failover
✗ Non-zero RTO/RPO (not zero-downtime)
```

**Failure Modes:**
- Primary storage failure → Automatic failover to standby (mitigated by: 2-node replication; automatic detection)
- Network partition → Split-brain risk (mitigated by: quorum-based failover; third node in quorum)
- Data loss → RPO = 0 (synchronous replication; no data loss)

**Reversal Cost:** MEDIUM (switching to active-active requires rewriting conflict resolution logic)

---

### ADR-008: No Caching for Application Submission Flow

**Decision:** Application form steps (1-5) **never read from cache**; always authoritative reads

**Alternatives Considered:**
1. Cache student profile data → ✗ Stale data in form (risky)
2. Always read fresh → ✓ CHOSEN

**Tradeoffs:**
```
✓ Correctness: Form always shows latest GPA, transcript, recommendations
✓ Prevents inconsistency bugs
✗ Slightly higher latency (DB read vs cache hit)
✗ More database load (mitigated by: query caching at DB layer)
```

**Failure Modes:**
- User profile changes during form completion → Form shows old data (mitigated by: always read fresh; warn user on changes)

**Reversal Cost:** LOW (caching is additive; can add if latency becomes issue)

---

## VIII. LATENCY BUDGET ENFORCEMENT

### Budget Allocation Per User Flow

```
FLOW: "Browse Homepage → Search Results"
Goal: P95 latency = 1500ms

HTTP Request (Client → CDN): 50ms
├─ DNS lookup: 10ms (cached by browser)
├─ TCP handshake: 20ms (persistent connections)
└─ HTTP request: 20ms

CDN Processing (Cache hit): 100ms
├─ Cache lookup: 10ms
├─ Gzip encoding: 30ms
├─ Header/body transmission: 60ms

Origin Server (Cache miss → API Gateway): 300ms
├─ Load balancer: 10ms
├─ Route matching: 5ms
├─ API handler (template render): 200ms
├─ Cache layer lookup: 30ms
└─ Response encoding: 55ms

Cache/Database Query (on miss): 500ms
├─ Redis network: 5ms
├─ Redis execution: 20ms
├─ Elasticsearch network: 10ms
├─ Elasticsearch query (index lookup): 300ms
├─ Database network: 5ms
├─ Database query (if needed): 100ms
└─ Result encoding: 60ms

Client-Side Rendering: 450ms
├─ Parse HTML: 100ms
├─ Download JavaScript: 150ms
├─ Execute JavaScript: 150ms
├─ Render DOM: 50ms

Total: ~1350ms P95 (well within 1500ms budget)
```

### Monitoring & Enforcement

**Dashboards:**
```
- Real-time: P50, P95, P99 latency per endpoint
- Percentile breakdown: Distribution of response times
- SLA compliance: % of requests meeting target latency
- Error rate: % of requests returning 5xx

Alerting:
- P95 > target for 5 consecutive minutes → Slack alert
- Error rate > 1% for 2 minutes → Page oncall
- Database query > 1000ms → Investigate slow query log
```

**Profiling:**
```
- Continuous profiling: Use PyroscoPE or Datadog for CPU/memory/latency analysis
- Sampling: Profile 1% of requests in production
- Analysis: Identify bottlenecks monthly
```

---

## IX. FAILURE SCENARIOS & RECOVERY PROCEDURES

### Scenario 1: Search Index (Elasticsearch) Down

**Symptom:** Search results return 0 hits; "No programs found" message

**Detection:** Health check fails; error rate on `/search` endpoint > 50%

**Immediate Response (0-5 min):**
1. Trigger circuit breaker on Elasticsearch queries
2. Fallback to "Browse by Category" static listing (pre-cached)
3. Show message: "Search temporarily unavailable; browse categories instead"
4. Alert oncall: "Search index down"

**Recovery (5-30 min):**
1. SSH to Elasticsearch node; check disk space, memory, GC logs
2. If memory issue: Increase heap size; restart
3. If disk issue: Delete old indices; free space
4. If corruption: Trigger reindex from database
5. Monitor: Verify error rate returns to < 1%

**Verify Functionality:**
```
curl -X GET "localhost:9200/_health" 
# Expect status: green
curl -X GET "localhost:9200/programs/_count"
# Expect: > 2000 documents
```

---

### Scenario 2: Application Database Primary Fails

**Symptom:** Application submission returns 500 error; "Something went wrong" message

**Detection:** Database connection failures; automated failover triggers

**Immediate Response (0-5 min):**
1. Failover to standby database (automatic if quorum-enabled; 30s)
2. Retry failed request automatically (idempotency key prevents duplicates)
3. Return HTTP 200 to user with application ID
4. Page oncall immediately

**Recovery (5-60 min):**
1. Investigate primary failure (reboot, network, storage)
2. Restore primary from backup if not recoverable
3. Resync standby from new primary
4. Verify replication lag = 0
5. Redirect writes back to recovered primary

**Data Integrity Check:**
```sql
-- On primary and standby; should match exactly
SELECT COUNT(*) FROM applications;
SELECT MAX(created_at) FROM applications;
SELECT SUM(hash(application_id)) FROM applications;
```

---

### Scenario 3: Redis Cache Failure (Complete Loss)

**Symptom:** Page load is slower; many database queries

**Detection:** Redis connection fails; circuit breaker trips

**Immediate Response (0-5 min):**
1. Database switches to direct mode (bypass cache)
2. Database load increases 3-5× (mitigated by: connection pooling; query optimization)
3. P95 latency increases ~500ms (acceptable; still < SLA)
4. User experience: Slightly slower pages; no data loss
5. Alert oncall: "Redis down; database running hot"

**Recovery (5-15 min):**
1. Check Redis memory/CPU; check network connectivity
2. Restart Redis if hung
3. Optionally: Warm cache with popular queries (scripts/warm_cache.sh)
4. Monitor: Verify database CPU returns to normal

**Verification:**
```bash
redis-cli ping
# Expect: PONG
redis-cli DBSIZE
# Expect: > 10000 keys
redis-cli INFO memory | grep used_memory_human
```

---

### Scenario 4: Surge Load (Traffic 3× Normal for 1 Hour)

**Symptom:** Latency increases; timeout errors; queue depth grows

**Detection:** Request rate > 10K RPS; queue > 1000 items; error rate > 0.5%

**Immediate Response (0-10 min):**
1. Auto-scale: Add 2-4 API instances (automatic via Kubernetes)
2. Increase database connection pool (temporary; careful not to exhaust connections)
3. Implement request throttling: 429 Too Many Requests for new requests
4. Degrade non-critical features:
   - Disable trending carousel (reduce queries)
   - Cache labor market data (no real-time updates)
   - Disable recommendations engine
5. Return message: "High traffic; some features limited"

**Monitoring During Surge:**
```
- CPU: Target 70% on each instance
- Memory: Monitor for leaks; target < 80% utilization
- Database: Monitor connection count; target < 80% of pool
- Network: Monitor bandwidth utilization
- Errors: Alert if > 1%
```

**After Surge (30 min - 2 hours):**
1. Gradually scale down API instances (as load decreases)
2. Restore non-critical features one-by-one
3. Run post-incident analysis: What caused surge? Expected?

---

## X. KEY RISKS & ARCHITECTURAL DEBT

### High-Risk Items

| Risk | Probability | Impact | Mitigation | Owner |
|---|---|---|---|---|
| **Database write capacity exhausted** | Medium | Critical application loss | Shard by student_id before 1000 TPS | Backend Lead |
| **Search index out of sync** | Low | Stale results; poor UX | Hourly reindex; circuit breaker | Search Ops |
| **Payment processor integration bugs** | Medium | Revenue loss; user frustration | Comprehensive testing; staging environment | Payments |
| **Email provider rate-limited** | Low | Delayed notifications (OK) | Backoff logic; queue monitoring | Notifications |
| **Cross-region latency spike** | Low | Slow search for intl users | CDN in more regions; read replicas | Infra |

### Architectural Debt

```
1. No event sourcing
   - Decisions are implicit in database state
   - Difficult to audit; replays not possible
   - Mitigation: Implement audit log for critical operations

2. Eventual consistency scattered in code
   - Multiple services independently updating student profiles
   - Risk of conflicts; no centralized reconciliation
   - Mitigation: Implement CQRS pattern for profile updates

3. Search index requires manual reindex
   - Stale data risk after bulk updates
   - Mitigation: Implement binlog-to-index streaming

4. No multi-region read replicas
   - International users experience high latency
   - Mitigation: Deploy read replicas in EU, APAC
```

---

## XI. EXPLICIT ASSUMPTIONS

### User & Load Assumptions

1. **Concurrent users by geography:**
   - Americas: 60% (peak 5-9pm EST)
   - Europe: 25% (peak 1-5pm CET)
   - APAC: 15% (peak 9am-1pm SGT)
   - Implication: Global CDN required; single-region insufficient

2. **User behavior:**
   - 80% browse without logging in
   - 15% save programs (wishlist)
   - 5% submit applications
   - Implication: Read-heavy; cache-friendly

3. **Application submission pattern:**
   - 70% submit during evening hours (US timezone)
   - Deadline approaches: 30% traffic in last 48 hours
   - Implication: Burst-tolerant queue architecture needed

4. **Program data change frequency:**
   - New programs added: ~10/day
   - Program updates (tuition, deadline): ~20/day
   - Implication: Hourly reindex acceptable; no sub-minute consistency requirement

### Business Assumptions

5. **Institution SLAs:**
   - Applications must be received within 5 minutes of submission
   - Recommendation letters can be submitted up to 2 weeks after deadline
   - Implication: Eventually consistent notification acceptable

6. **Payment processing:**
   - Most users (85%) pay immediately
   - Some (15%) defer payment
   - Deferred payments collected at 70% rate
   - Implication: Multi-state payment tracking needed

7. **Data retention:**
   - Student profiles: Retained indefinitely (GDPR: 30-day deletion grace)
   - Applications: Retained for 7 years (regulatory requirement)
   - Attachments (resumes): Retained for 5 years
   - Implication: Archive strategy required; S3 Glacier after 1 year

---

## XII. NON-NEGOTIABLE CONSTRAINTS

### Immutable Requirements

```
1. NO LOSS OF APPLICATION DATA
   - Must survive any single-component failure
   - Synchronous write to primary database required
   - Backup + point-in-time recovery required
   - Recovery RTO < 1 hour; RPO = 0

2. SUBMIT BUTTON MUST NOT TIMEOUT
   - Users will not retry if button hangs > 10 seconds
   - Strict timeout enforcement at 5 seconds (user sees "retrying")
   - Message queue ensures eventual delivery (not visible to user)

3. IDEMPOTENCY MANDATORY
   - Every state-changing operation must be idempotent
   - Retry without fear of duplicates
   - Request-deduplication window: 24 hours

4. NO SILENT FAILURES
   - Every failure must be logged, monitored, alerted
   - User must see error message (not blank page)
   - Fallback UI must be functional

5. GDPR COMPLIANCE
   - User can request all personal data (export within 30 days)
   - User can request deletion (right to be forgotten)
   - Audit trail of all data access
```

### Behavioral Rules

```
RULE: API Gateway Rate Limits
- Per IP: 100 RPS (prevents abuse)
- Per user (authenticated): 1000 RPS (prevents script attacks)
- Per application endpoint: 200 TPS (prevents overload)
- Enforcement: 429 Too Many Requests + Retry-After header

RULE: Database Query Timeouts
- SELECT queries: 30 seconds max
- INSERT/UPDATE: 5 seconds max
- Stored procedures: 60 seconds max
- Enforcement: Kill query; log to slow query log

RULE: Cache TTLs
- User sessions: 7 days (absolute)
- Query results: 5 minutes (discovery); 1 hour (profiles)
- Static assets: 7 days (versioned)
- Labor market data: 24 hours (aggregated)

RULE: Message Queue Retention
- Kafka messages: 7 days (replay for audits)
- Dead letter queue: 30 days (investigation)
- SQS messages: 24 hours (standard, no replay needed)

RULE: Error Recovery Priority
1. Application submission (never fails)
2. Search (fallback to categories)
3. Recommendations (show "pending")
4. Trending/suggestions (hide gracefully)
```

---

## XIII. SYSTEM OVERVIEW DIAGRAM (Textual)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          USER LAYER (Browser)                           │
│  ├─ Public Discovery (Homepage, Search, Detail Page)                    │
│  ├─ Student Auth (Registration, Login)                                  │
│  ├─ Application Form (Multi-step form)                                  │
│  └─ Session Management (Local storage + cookies)                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                      CONTENT DELIVERY LAYER (CDN)                       │
│  Cloudflare/Fastly                                                      │
│  ├─ Homepage: TTL 10 min (stale-while-revalidate 24h)                  │
│  ├─ Program cards: TTL 1 hour                                           │
│  ├─ Static assets (JS/CSS): TTL 7 days (versioned)                     │
│  └─ Failover: Serve stale if origin down                                │
└─────────────────────────────────────────────────────────────────────────┘
                      ↓ (Cache miss)           ↓ (Cache miss)
        ┌─────────────────────────┐       ┌─────────────────────────┐
        │  READ PATH              │       │  WRITE PATH             │
        │  (Discovery & Profiles) │       │  (Applications)         │
        └─────────────────────────┘       └─────────────────────────┘
                    ↓                               ↓
        ┌─────────────────────────┐       ┌─────────────────────────┐
        │  API Gateway Layer 1    │       │  API Gateway Layer 2    │
        │  (Session Optional)     │       │  (Session Required)     │
        │                         │       │                         │
        │  ├─ Rate limit: 100/IP  │       │  ├─ Rate limit: 200/TPS │
        │  ├─ Load balance        │       │  ├─ Auth enforcement    │
        │  └─ Request dedup       │       │  └─ CSRF protection     │
        └─────────────────────────┘       └─────────────────────────┘
                    ↓                               ↓
    ┌───────────────────────────────────────────────────────────────┐
    │              APPLICATION SERVICE LAYER                         │
    ├──────────────────────────────┬──────────────────────────────┤
    │  Search Service              │  Application Service          │
    │  ├─ Query validation         │  ├─ Form validation           │
    │  ├─ Facet enumeration        │  ├─ Duplicate detection       │
    │  └─ Result marshaling        │  ├─ Payment processing        │
    │                              │  └─ Idempotency check         │
    ├──────────────────────────────┼──────────────────────────────┤
    │  Profile Service             │  Notification Service         │
    │  ├─ Profile CRUD             │  ├─ Email queueing            │
    │  ├─ Recommendation tracking   │  ├─ SMS sending (optional)    │
    │  └─ Activity logging         │  └─ Dashboard updates         │
    └───────────────────────────────────────────────────────────────┘
                    ↓                               ↓
        ┌─────────────────────────┐       ┌─────────────────────────┐
        │  CACHE LAYER            │       │  MESSAGE QUEUE LAYER    │
        │  Redis (32GB cluster)   │       │  Kafka (3 brokers)      │
        │                         │       │                         │
        │  ├─ User sessions       │       │  ├─ Topic: app.submitted│
        │  ├─ Query results       │       │  ├─ Topic: profile.*    │
        │  ├─ Trending lists      │       │  ├─ Topic: payment.*    │
        │  └─ Labor market data   │       │  └─ DLQ for failures    │
        └─────────────────────────┘       └─────────────────────────┘
                    ↓                               ↓
    ┌───────────────────────────────────────────────────────────────┐
    │          DATA ACCESS LAYER (Dual-path)                        │
    │                                                               │
    │  ┌──────────────────────────┐  ┌──────────────────────────┐ │
    │  │  Elasticsearch           │  │  PostgreSQL Primary      │ │
    │  │  (Search Index)          │  │  (Application Data)      │ │
    │  │                          │  │                          │ │
    │  │  ├─ 2.8K programs        │  │  ├─ Applications table   │ │
    │  │  ├─ Faceted search       │  │  ├─ Profiles table       │ │
    │  │  ├─ 5-node cluster       │  │  ├─ Sync replication    │ │
    │  │  └─ Reindex hourly       │  │  └─ Point-in-time backup│ │
    │  └──────────────────────────┘  └──────────────────────────┘ │
    │                                           ↓                  │
    │                         ┌──────────────────────────────────┐ │
    │                         │  PostgreSQL Standby (AZ-2)       │ │
    │                         │  ├─ Read-only (standby)          │ │
    │                         │  ├─ Sync replication (0 RPO)     │ │
    │                         │  └─ Auto failover on primary fail│ │
    │                         └──────────────────────────────────┘ │
    └───────────────────────────────────────────────────────────────┘
                            ↓
    ┌───────────────────────────────────────────────────────────────┐
    │          EXTERNAL SERVICES                                     │
    │                                                               │
    │  ├─ Payment Processor (Stripe) → Credit card processing      │
    │  ├─ Email Provider (SendGrid) → Transactional email          │
    │  ├─ Object Store (S3) → Application attachments, archives    │
    │  ├─ Analytics (Datadog) → Monitoring, tracing, alerting      │
    │  └─ Logging (ELK Stack) → Centralized logs, debugging        │
    └───────────────────────────────────────────────────────────────┘
```

---

## XIV. DEPLOYMENT & OPERATIONAL GUIDELINES

### Blue-Green Deployment for Zero-Downtime Updates

```
Blue Environment (Current)     →    Green Environment (New)
├─ 4 API instances                 ├─ 4 API instances (new build)
├─ 2 DB replicas                   ├─ Same DBs (schema-compatible)
├─ All traffic routed here         └─ No traffic yet
│
                    [Pre-test on Green]
                    ├─ Smoke tests (10 critical paths)
                    ├─ Load test (1K concurrent users)
                    └─ Verify logs/metrics

                    [Gradual Shift (Canary)]
                    ├─ Shift 10% traffic → Green (monitor 5 min)
                    ├─ Shift 25% traffic → Green (monitor 5 min)
                    ├─ Shift 50% traffic → Green (monitor 5 min)
                    ├─ Shift 100% traffic → Green
                    └─ Keep Blue as fallback for 10 minutes

                    [Verify & Cleanup]
                    ├─ If errors detected: Shift back to Blue (immediate)
                    ├─ If stable: Tear down Blue
                    └─ Database migration (if needed): Offline maintenance window
```

### Rollback Procedure

```
Rollback if:
- Error rate > 1% for > 1 minute
- P95 latency > target + 50% for > 2 minutes
- Application submission failures > 0.1%
- Customer report of data loss

Steps:
1. Click "Rollback" button (1 click; < 30 seconds)
2. Shift traffic back to Blue
3. Monitor metrics for 5 minutes
4. Post-mortem: What caused the issue? How to prevent next time?
```

---

## XV. CRITICAL SUCCESS METRICS

### Availability Metrics (Target)

| Metric | Target | Current |
|---|---|---|
| **Uptime (Discovery paths)** | 99.95% | TBD |
| **Uptime (Application submission)** | 99.99% | TBD |
| **MTTR (Mean Time To Recovery)** | < 15 minutes | TBD |
| **RTO (Recovery Time Objective)** | < 1 hour | TBD |
| **RPO (Recovery Point Objective)** | 0 (no data loss) | TBD |

### Performance Metrics (Target)

| Metric | Target | P50 | P95 | P99 |
|---|---|---|---|---|
| **Homepage Load** | < 2s | 300ms | 800ms | 1500ms |
| **Search Results** | < 2s | 400ms | 1200ms | 2500ms |
| **Program Detail** | < 2s | 250ms | 600ms | 1200ms |
| **Application Submit** | < 5s | 1200ms | 2500ms | 5000ms |

### Business Metrics (Instrumentation Required)

```
- Conversion funnel: Homepage → Search → Detail → Application (track drop-off)
- Time to complete application: Median = 8 min; P95 = 20 min
- Submission success rate: Target > 99.5%
- Search abandonment: If "no results" < 5% bounce
- Application error rate: < 0.1%
```

---

## SUMMARY: PRODUCTION READINESS CHECKLIST

**Before launch, verify:**

- [ ] Idempotency keys implemented in all state-changing operations
- [ ] Circuit breakers configured for all external service dependencies
- [ ] Timeout enforcement at API Gateway + Database + Application layers
- [ ] Redis cache cluster: 3+ nodes, replication factor 2, automatic failover
- [ ] Elasticsearch cluster: 3+ nodes, daily reindex, circuit breaker on search
- [ ] Kafka cluster: 3+ brokers, 7-day retention, DLQ configured
- [ ] Database: Active-passive replication, hourly backups, point-in-time recovery
- [ ] Monitoring: Dashboards for all critical paths, alerts for SLA breach
- [ ] Load testing: Verified 10K concurrent users, 1K TPS application submissions
- [ ] Chaos engineering: Tested failure scenarios (AZ failure, DB down, etc.)
- [ ] Runbooks: Written for all high-risk operational scenarios
- [ ] On-call rotation: 24/7 coverage; pager duty configured

---

**Document Owner:** Senior Systems Architect  
**Last Updated:** January 2026  
**Status:** Ready for Backend Implementation


**SECTION 1: EXECUTION ORDER (CRITICAL PATH)**
PHASE 1: FOUNDATION & INFRASTRUCTURE (Days 1-15)
Parallel execution possible across 3 workstreams

**Workstream A: Core Infrastructure (BLOCKING)**
├─ INFRA-001: Provision PostgreSQL Primary + Standby (Day 1-3)
├─ INFRA-002: Configure Redis Cluster (Day 2-4)
├─ INFRA-003: Deploy Elasticsearch Cluster (Day 3-6)
├─ INFRA-004: Setup Kafka Message Queue (Day 4-7)
├─ INFRA-005: Configure S3 Object Storage (Day 5-6)
└─ INFRA-006: Deploy API Gateway (nginx/Kong) (Day 7-9)
   Duration: 9 days

**Workstream B: Security & Access Control (PARALLEL)**
├─ SEC-001: Implement JWT Authentication Middleware (Day 1-3)
├─ SEC-002: Configure TLS/SSL Certificates (Day 2-3)
├─ SEC-003: Setup Secrets Management (Vault) (Day 3-5)
├─ SEC-004: Implement RBAC Authorization (Day 6-9)
└─ SEC-005: Configure CORS & Security Headers (Day 8-9)
   Duration: 9 days

**Workstream C: Observability Foundation (PARALLEL)**
├─ OBS-001: Deploy Centralized Logging (ELK) (Day 1-4)
├─ OBS-002: Configure Metrics (Datadog/Prometheus) (Day 2-5)
├─ OBS-003: Setup Distributed Tracing (Jaeger) (Day 4-7)
├─ OBS-004: Create Health Check Endpoints (Day 8-9)
└─ OBS-005: Configure Alerting Rules (Day 10-12)
   Duration: 12 days

PHASE 1 COMPLETION: Day 15 (all workstreams converge)

═══════════════════════════════════════════════════════════

PHASE 2: DATA MODELS & CORE SERVICES (Days 16-35)
Sequential dependencies; some parallel work possible

**Workstream D: Database Schema & Migrations (BLOCKING)**
├─ DATA-001: Create Core Tables (programs, institutions) (Day 16-17)
├─ DATA-002: Create Application Tables + Indexes (Day 18-20)
│  └─ BLOCKS: SERVICE-003, SERVICE-004
├─ DATA-003: Create Student Profile Tables (Day 20-21)
├─ DATA-004: Setup Database Replication (Day 22-24)
│  └─ BLOCKS: All write operations
├─ DATA-005: Create Elasticsearch Mappings (Day 24-26)
│  └─ BLOCKS: SERVICE-001
└─ DATA-006: Initial Data Seed (2,847 programs) (Day 27-28)
   Duration: 13 days

**Workstream E: Read Path Services (AFTER DATA-005)**
├─ SERVICE-001: Implement Search Service (Day 29-33)
│  ├─ Depends: DATA-005 (Elasticsearch mappings)
│  └─ BLOCKS: UI-001, UI-002
├─ SERVICE-002: Implement Program Detail Service (Day 30-32)
│  ├─ Depends: DATA-001
│  └─ BLOCKS: UI-003
└─ SERVICE-006: Implement Browse/Filter Service (Day 33-35)
   Duration: 7 days

**Workstream F: Write Path Services (AFTER DATA-002, DATA-004)**
├─ SERVICE-003: Implement Student Registration (Day 29-32)
│  ├─ Depends: DATA-003, SEC-001
│  └─ BLOCKS: SERVICE-004
├─ SERVICE-004: Implement Application Submission (Day 33-37)
│  ├─ Depends: DATA-002, DATA-004, SERVICE-005
│  └─ CRITICAL PATH BOTTLENECK
└─ SERVICE-005: Implement Payment Processing (Day 30-33)
   Duration: 9 days

PHASE 2 COMPLETION: Day 37 (SERVICE-004 is critical path)

═══════════════════════════════════════════════════════════

PHASE 3: RELIABILITY & RESILIENCE (Days 38-50)
Parallel execution; can overlap with Phase 4

**Workstream G: Failure Handling (PARALLEL)**
├─ FAILURE-001: Implement Circuit Breakers (Day 38-40)
├─ FAILURE-002: Implement Retry Logic (Day 39-41)
├─ FAILURE-003: Implement Idempotency Layer (Day 40-43)
│  └─ CRITICAL: Must complete before production
├─ FAILURE-004: Implement Graceful Degradation (Day 42-45)
├─ FAILURE-005: Database Failover Automation (Day 44-47)
└─ FAILURE-006: Message Queue DLQ Handling (Day 46-48)
   Duration: 11 days

**Workstream H: Performance & Caching (PARALLEL)**
├─ PERF-001: Implement CDN Integration (Day 38-40)
├─ PERF-002: Implement Query Caching (Day 39-42)
├─ PERF-003: Implement Fragment Caching (Day 41-44)
├─ PERF-004: Database Query Optimization (Day 43-46)
└─ PERF-005: Load Balancing Configuration (Day 45-47)
   Duration: 10 days

PHASE 3 COMPLETION: Day 50

═══════════════════════════════════════════════════════════

PHASE 4: USER INTERFACE & FRONTEND (Days 38-55)
Can start after SERVICE-001, SERVICE-002 APIs ready

**Workstream I: Public Discovery UI (PARALLEL with Phase 3)**
├─ UI-001: Homepage & Browse Interface (Day 38-42)
│  └─ Depends: SERVICE-006
├─ UI-002: Search Results Page (Day 40-44)
│  └─ Depends: SERVICE-001
├─ UI-003: Program Detail Page (Day 42-46)
│  └─ Depends: SERVICE-002
├─ UI-004: Comparison Tool (Day 44-48)
└─ UI-005: Responsive Mobile Layout (Day 46-50)
   Duration: 13 days

**Workstream J: Application Flow UI (AFTER SERVICE-004)**
├─ UI-006: Student Registration Form (Day 38-41)
│  └─ Depends: SERVICE-003
├─ UI-007: Multi-Step Application Form (Day 42-48)
│  └─ Depends: SERVICE-004 (CRITICAL)
├─ UI-008: Payment Integration UI (Day 46-49)
│  └─ Depends: SERVICE-005
├─ UI-009: Application Status Dashboard (Day 49-52)
└─ UI-010: Profile Management UI (Day 50-53)
   Duration: 16 days

PHASE 4 COMPLETION: Day 55

═══════════════════════════════════════════════════════════

PHASE 5: TESTING & COMPLIANCE (Days 51-70)
Overlaps with Phase 4; extends beyond for comprehensive testing

**Workstream K: Testing (PARALLEL)**
├─ TEST-001: Unit Test Suite (Ongoing, Day 1-70)
├─ TEST-002: Integration Test Suite (Day 51-58)
├─ TEST-003: End-to-End Test Suite (Day 56-62)
├─ TEST-004: Load Testing (10K users) (Day 60-65)
├─ TEST-005: Chaos Engineering Tests (Day 63-67)
└─ TEST-006: Security Penetration Testing (Day 65-70)
   Duration: 20 days

**Workstream L: Compliance (PARALLEL)**
├─ COMP-001: Implement Audit Logging (Day 51-54)
├─ COMP-002: GDPR Data Export/Deletion (Day 53-57)
├─ COMP-003: PII Encryption at Rest (Day 55-58)
├─ COMP-004: Consent Management (Day 57-60)
└─ COMP-005: Compliance Documentation (Day 60-65)
   Duration: 15 days

PHASE 5 COMPLETION: Day 70

═══════════════════════════════════════════════════════════

PHASE 6: OPERATIONAL READINESS (Days 71-89)
Final phase before production launch

**Workstream M: Deployment & Operations**
├─ OPS-001: Blue-Green Deployment Pipeline (Day 71-75)
├─ OPS-002: Automated Backup & Restore (Day 73-77)
├─ OPS-003: Runbook Documentation (Day 76-80)
├─ OPS-004: Incident Response Playbooks (Day 78-82)
├─ OPS-005: Capacity Planning & Monitoring (Day 80-84)
├─ OPS-006: Production Smoke Tests (Day 82-85)
├─ OPS-007: Disaster Recovery Drill (Day 84-87)
└─ OPS-008: Production Launch Checklist (Day 86-89)
   Duration: 19 days

PHASE 6 COMPLETION: Day 89

═══════════════════════════════════════════════════════════

CRITICAL PATH SUMMARY:
Total Sequential Days: 89 working days
Parallel Execution Optimization: 62 calendar days (with 3-5 engineers)
Bottleneck: SERVICE-004 (Application Submission) - Day 33-37

DEPENDENCIES ENFORCED:
- No UI work starts until APIs are functional
- No testing until services are deployed
- No production launch until compliance complete
- Database replication MUST complete before write services
