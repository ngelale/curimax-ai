# ARBPC MARKETPLACE - SYSTEM ARCHITECTURE REFERENCE

**Quick Visual Reference for All Stakeholders**

---

## HIGH-LEVEL SYSTEM DIAGRAM

```
┌────────────────────────────────────────────────────────────────────────────┐
│                              USER BROWSERS                                 │
│                    (100K concurrent users peak)                            │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                   │
            ┌───────▼──────────┐           ┌───────────▼──────────┐
            │   PUBLIC TRAFFIC │           │   AUTHENTICATED      │
            │   (95% volume)   │           │   TRAFFIC (5%)       │
            │                  │           │                      │
            │  - Homepage      │           │  - Registration      │
            │  - Search        │           │  - Apply form        │
            │  - Details       │           │  - Profile           │
            └───────┬──────────┘           └────────┬─────────────┘
                    │                               │
            ┌───────▼──────────────────────────────▼──────────┐
            │       CDN LAYER (Cloudflare/Fastly)              │
            │  - Caches homepage (10 min)                      │
            │  - Caches program cards (1 hour)                 │
            │  - Caches JS/CSS (7 days)                        │
            │  - Global presence (90% cache hit)               │
            └───────┬──────────────────────────────────────────┘
                    │
            ┌───────▼──────────────────────────────────────────┐
            │       API GATEWAY LAYER (nginx/Kong)              │
            │  - Load balancing                                 │
            │  - Rate limiting (100 RPS/IP)                    │
            │  - Request deduplication                         │
            │  - HTTPS enforcement                             │
            │  [4 instances, auto-scaling 2-8]                 │
            └───────┬──────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
    ┌───▼─────────────┐   ┌────▼────────────────┐
    │  READ PATH      │   │  WRITE PATH         │
    │  (95% traffic)  │   │  (5% traffic)       │
    └───┬─────────────┘   └────┬────────────────┘
        │                      │
    ┌───▼──────────────────────────────────────┐
    │      BUSINESS LOGIC SERVICES              │
    │                                           │
    │  Search Service    ├─→ Elasticsearch     │
    │  Program Service   ├─→ PostgreSQL Read   │
    │  Profile Service   ├─→ PostgreSQL Write  │
    │  Payment Service   ├─→ Stripe            │
    │  Notification Svc  ├─→ Kafka Queue       │
    └───┬──────────────────────────────────────┘
        │
    ┌───▼──────────────────────────────────────┐
    │      DATA & PERSISTENCE LAYER             │
    │                                           │
    │  ┌─ PostgreSQL Primary (Writes)          │
    │  │  ├─ Applications (critical)            │
    │  │  ├─ Profiles (critical)                │
    │  │  └─ Sync replication to standby        │
    │  │                                        │
    │  ├─ PostgreSQL Standby (Failover)        │
    │  │  └─ Exact copy, 0 lag                 │
    │  │                                        │
    │  ├─ PostgreSQL Read Replicas             │
    │  │  ├─ Replica 1 (1-3s lag, OK)          │
    │  │  └─ Replica 2 (1-3s lag, OK)          │
    │  │                                        │
    │  ├─ Redis Cache Cluster (32GB)           │
    │  │  ├─ User sessions                     │
    │  │  ├─ Query results (5 min TTL)         │
    │  │  └─ Labor market data (24h TTL)       │
    │  │                                        │
    │  ├─ Elasticsearch (Search Index)         │
    │  │  ├─ 2,847 programs searchable         │
    │  │  ├─ 5-node cluster                    │
    │  │  └─ Hourly reindex (1h lag, OK)       │
    │  │                                        │
    │  ├─ Kafka Message Queue (3 brokers)      │
    │  │  ├─ Topic: application.submitted      │
    │  │  ├─ Topic: profile.updated            │
    │  │  ├─ Topic: payment.processed          │
    │  │  └─ 7-day retention                   │
    │  │                                        │
    │  └─ S3 Object Store                      │
    │     ├─ Application documents             │
    │     └─ Archive (Glacier after 1 year)    │
    └────────────────────────────────────────┘
```

---

## CRITICAL DATA FLOWS

### Flow 1: Browse Program (Cache Hit - Happy Path)

```
User Action: "Search for Data Science programs"

1. Browser request
   GET /search?q=data+science&degree=master

2. CDN (Cloudflare)
   ✓ Cache HIT (previous query cached)
   ← Return cached JSON + HTML (100ms)

3. Browser renders
   ← User sees results in 300ms total
```

**SLA Met:** P95 < 800ms ✓

---

### Flow 2: Browse Program (Cache Miss - Full Path)

```
User Action: "Search for rare combination of filters"

1. Browser request
   GET /search?q=data&location=remote&price=20000&degree=certificate

2. CDN (Cloudflare)
   ✗ Cache MISS (new query combination)
   → Forward to API Gateway

3. API Gateway
   - Validate request
   - Check rate limit (OK)
   - Route to Search Service

4. Search Service
   - Hit Redis cache (30ms)
   ✗ Miss: Query Elasticsearch
   - Build query: Match + Filters + Facets
   - Run Elasticsearch query (300ms)
   - Marshal results (150ms)
   - Return 10 programs + facets

5. API Gateway
   - Compress response
   - Cache in Redis (5min TTL)
   - Return to CDN

6. CDN
   - Cache response (1hr TTL)
   - Return to user (50ms transmission)

7. Browser
   - Parse HTML/JSON (100ms)
   - Render React components (150ms)
   - User sees results (900ms total)
```

**SLA Met:** P95 < 1500ms ✓

---

### Flow 3: Submit Application (Critical Path - No Cache)

```
User Action: "Complete Step 5 and click Submit"

┌─ SYNCHRONOUS (User waits) ─────────────────────────────┐
│                                                        │
│ 1. Client validates all form fields (client-side)    │
│    ✓ All data present                                 │
│                                                        │
│ 2. Browser sends request                              │
│    POST /apply/program-123                            │
│    ├─ Idempotency-Key: uuid (prevents duplicates)    │
│    ├─ Authorization: Bearer {jwt}                     │
│    └─ Payload: All application data                   │
│                                                        │
│ 3. API Gateway                                         │
│    - Verify auth token (valid, not expired)           │
│    - Check idempotency key (new, not duplicate)       │
│    - Rate limit check (OK, < 200 apps/sec)            │
│    - Route to Application Service                     │
│                                                        │
│ 4. Application Service                                │
│    - Parse + validate payload (all fields)            │
│    - Check: Student exists, Program exists            │
│    - Check: No duplicate application (student + prog) │
│    - Generate Application ID                          │
│    - Prepare for payment processing                   │
│                                                        │
│ 5. Payment Processing                                 │
│    IF application_fee > 0:                            │
│      - Call Stripe PaymentIntent.create()             │
│      - Return client secret to browser                │
│      - Browser initiates payment (Stripe iframe)      │
│      - Wait for payment confirmation (user enters CC) │
│      - Stripe returns payment_intent_id               │
│    ELSE:                                              │
│      - Skip payment (waived application)              │
│                                                        │
│ 6. Database Write (PRIMARY - SYNCHRONOUS)             │
│    INSERT INTO applications (                          │
│      id, student_id, program_id, status, personal_*,  │
│      payment_intent_id, request_id, ...               │
│    ) VALUES (...)                                     │
│                                                        │
│    ✓ Acknowledged by primary DB                       │
│    ✓ Replicated to standby DB (0 lag)                 │
│    [~200ms]                                           │
│                                                        │
│ 7. API Response to Client                             │
│    HTTP 200 OK                                         │
│    {                                                   │
│      "application_id": "app-abc123",                   │
│      "status": "submitted",                            │
│      "confirmation_url": "...",                        │
│      "payment_status": "completed"                     │
│    }                                                   │
│    [Total elapsed: 1200-2500ms] ✓ SLA met             │
│                                                        │
└────────────────────────────────────────────────────────┘

┌─ ASYNCHRONOUS (Background, user doesn't wait) ────────┐
│                                                        │
│ 8. Queue Events to Kafka                               │
│    Publish to: application.submitted                   │
│    Payload: {app_id, student_id, program_id, ...}    │
│    [Durably persisted; 3-broker replication]          │
│                                                        │
│ 9. Parallel Consumers                                  │
│                                                        │
│    Consumer A: Email Service                           │
│    ├─ Send confirmation email to student              │
│    ├─ Retry policy: Exponential backoff 7 times       │
│    ├─ SLA: 99% delivered within 15 minutes            │
│    └─ Offset: Commit after send successful            │
│                                                        │
│    Consumer B: Notification Service                    │
│    ├─ Send notification to institution admissions     │
│    ├─ Update student dashboard (new application)      │
│    └─ SLA: 99% within 5 minutes                        │
│                                                        │
│    Consumer C: Analytics Service                       │
│    ├─ Log event for trending/metrics                  │
│    ├─ Update application count (async)                │
│    ├─ Low priority (OK to lag 1 hour)                 │
│    └─ SLA: Best effort                                │
│                                                        │
│    Consumer D: Archive Service                         │
│    ├─ Archive application documents to S3             │
│    ├─ Create backup record                            │
│    └─ SLA: Complete within 24 hours                   │
│                                                        │
│ 10. User Experience                                    │
│     ✓ Sees confirmation screen immediately (< 3s)     │
│     ✓ Confirmation email arrives 5-15 min later       │
│     ✓ Application is permanently in database (100%)   │
│     ✓ Application is durable against any failure      │
│                                                        │
└────────────────────────────────────────────────────────┘

FAILURE SCENARIOS HANDLED:

Scenario 1: Payment processor timeout
  → Application saved to DB; Payment status = "pending"
  → User sees: "Payment processing, will confirm soon"
  → Backend retries payment asynchronously
  → If succeeds: Update app; send email
  → If fails: Send email with "pay later" link

Scenario 2: Email service down
  → Application saved; Email not sent yet
  → Kafka queue retains message for 7 days
  → When email service recovers, message is reprocessed
  → Email sent within 24 hours of recovery

Scenario 3: Database standby not in sync
  → Primary writes to local disk immediately
  → Standby catches up asynchronously (< 1s typical)
  → If primary dies: Standby has 99.9999% of data
  → Data loss risk: ~1 second of submissions (monitored)

Scenario 4: API Gateway crashes
  → Load balancer detects down (health check fails)
  → Routes traffic to remaining instances (2-7 others)
  → User sees no interruption (< 5s outage)
  → Application continues processing

VERIFICATION:
  → User can refresh page; app exists in dashboard
  → Confirmation email arrives within 15 min
  → Can view application status anytime
```

**SLA Met:** P99 < 5s; 100% success rate ✓

---

## FAILURE SCENARIOS & RECOVERY

### Scenario A: Elasticsearch Down (Search service unavailable)

```
┌─ DETECTION ─────────────────────────────────┐
│ Health check fails                          │
│ Error rate on /search > 50%                 │
│ Alert triggers: "Search index unavailable"  │
└─────────────────────────────────────────────┘
           │
           ▼
┌─ CIRCUIT BREAKER TRIPS ─────────────────────┐
│ Block search queries (fail fast)             │
│ Load fallback UI: "Browse by Category"       │
│ Show cached results from Redis if available  │
│ User sees: "Search temporarily unavailable" │
│ P95 latency impact: 0 (returns 200 OK)       │
│ Error rate: 0 (returns fallback)             │
└─────────────────────────────────────────────┘
           │
           ▼
┌─ RECOVERY (Automatic) ──────────────────────┐
│ 1. SSH to Elasticsearch cluster              │
│ 2. Check: Disk space, Memory, GC logs        │
│ 3. If memory issue: Increase heap; restart   │
│ 4. If disk issue: Delete old indices; free   │
│ 5. If corrupted: Trigger reindex from DB     │
│ Recovery time: 5-15 minutes                  │
└─────────────────────────────────────────────┘
           │
           ▼
┌─ VERIFICATION ──────────────────────────────┐
│ curl localhost:9200/_health  → green ✓      │
│ curl localhost:9200/programs/_count → >2000 │
│ Run smoke test: "Search data science" works │
│ Monitor: Error rate returns to < 0.5%       │
│ P95 latency: Returns to normal < 1200ms     │
└─────────────────────────────────────────────┘
```

**Impact:** Search down for 5-15 min; users browse categories instead  
**Data loss:** 0 (index can be rebuilt from DB)  
**User experience:** "Search temporarily unavailable; browse instead"

---

### Scenario B: Database Primary Fails

```
┌─ DETECTION ─────────────────────────────────┐
│ Connection refused to primary                │
│ Replication stream breaks                    │
│ Health check fails                           │
│ Automatic failover triggers!                 │
└─────────────────────────────────────────────┘
           │
           ▼
┌─ AUTOMATIC FAILOVER ────────────────────────┐
│ [0s]   Standby detected as alive             │
│ [5s]   Promote standby to primary            │
│ [10s]  Redirect all writes to new primary    │
│ [30s]  Applications resume working           │
│ Data loss: 0 (sync replication = no lag)     │
└─────────────────────────────────────────────┘
           │
           ▼
┌─ USER EXPERIENCE ───────────────────────────┐
│ Submitting applications: 30-second pause     │
│ Then: Resumes working automatically          │
│ Confirmation email: Delayed but still sent   │
│ Application data: 100% preserved             │
└─────────────────────────────────────────────┘
           │
           ▼
┌─ RECOVERY (Manual) ─────────────────────────┐
│ Investigate original primary:                │
│  - Hardware failure? → Replace server        │
│  - Network outage? → Restore connectivity    │
│  - Disk full? → Free space                   │
│  - Corruption? → Restore from backup         │
│ Resync original as new standby               │
│ Recovery time: 30 min - 2 hours              │
└─────────────────────────────────────────────┘
```

**Impact:** 30-second application submission interruption; auto-recovery  
**Data loss:** 0 (synchronous replication)  
**User experience:** "Briefly paused; please retry"

---

### Scenario C: Traffic Spike (10× Normal Load)

```
User: Applies to program with midnight deadline
Everyone applies simultaneously

┌─ DETECTION ─────────────────────────────────┐
│ Request rate: 1000 RPS → 10,000 RPS         │
│ Error rate: 0% → rises toward 5%             │
│ P95 latency: 1000ms → 5000ms                │
│ Queue depth: 100 → 5000 pending jobs         │
│ Database: CPU 30% → 95%                      │
│ Alert: "High traffic event detected"         │
└─────────────────────────────────────────────┘
           │
           ▼
┌─ AUTO-SCALING ──────────────────────────────┐
│ Kubernetes detects high CPU                  │
│ Spawn 4 additional API instances             │
│ [1 min] 4 → 8 instances running              │
│ Load balancer distributes traffic            │
│ Latency stabilizes at 2000-3000ms            │
│ Error rate drops to < 1%                     │
└─────────────────────────────────────────────┘
           │
           ▼
┌─ GRACEFUL DEGRADATION ──────────────────────┐
│ Non-critical features disabled:              │
│  ✗ Trending carousel (cache & skip)          │
│  ✗ Related programs (skip)                   │
│  ✗ Success stories (skip)                    │
│ Critical features still work:                │
│  ✓ Application submission (queued, not lost) │
│  ✓ Program search (slower, but works)        │
│  ✓ Apply button works                        │
└─────────────────────────────────────────────┘
           │
           ▼
┌─ USER EXPERIENCE ───────────────────────────┐
│ Submit button: Works (3-5 second latency)    │
│ Confirmation: "Processing your application" │
│ Backend: Queues up to 5000 apps              │
│ Workers: Process at 50 apps/sec              │
│ All 5000 apps: Processed within 2 minutes    │
│ All confirmations: Sent within 15 min        │
│ Zero data loss: All apps persisted           │
└─────────────────────────────────────────────┘
           │
           ▼
┌─ AFTER SPIKE ───────────────────────────────┐
│ Auto-scale down: 8 → 6 → 4 instances         │
│ Restore non-critical features                │
│ Post-incident review: "What caused spike?"   │
│ Capacity planning: Plan for next surge       │
└─────────────────────────────────────────────┘
```

**Impact:** 2-3× latency increase; all submissions still succeed  
**Data loss:** 0  
**User experience:** "It's slow but working; keep trying"

---

## KEY NUMBERS (SLA)

| Metric | Target | Responsibility |
|---|---|---|
| **Application Submission Success** | 99.9% | Database + API |
| **Homepage Load Time (P95)** | 800ms | CDN + Cache |
| **Search Latency (P95)** | 1200ms | Elasticsearch + Cache |
| **Payment Processing** | 2000ms | Stripe + API |
| **Email Delivery** | Within 15 min, 99% | Queue + Workers |
| **System Uptime** | 99.95% | Infrastructure |
| **Data Durability** | 99.99999% (6 nines) | Database replication |
| **Recovery Time (RTO)** | < 1 hour | Backup + Failover |
| **Recovery Point (RPO)** | 0 (no data loss) | Sync replication |

---

## SCALING ROADMAP

```
PHASE 1 (Today: Year 1)
├─ Users: 100K concurrent peak
├─ Programs: 2,847
├─ Applications/hour: 2,000 peak
├─ Architecture: Single region, single database
└─ Database capacity: ~1000 TPS writes

           ↓ (at 12-month mark, if growth continues)

PHASE 2 (Year 2: 10× growth)
├─ Users: 1M concurrent peak (may not happen!)
├─ Programs: 5,000
├─ Applications/hour: 20,000
├─ Architecture needed: Database sharding (4 shards)
├─ Changes: Routing logic; cross-shard queries
└─ Database capacity: 4000 TPS writes

           ↓ (if we reach unicorn status)

PHASE 3 (Year 3+: 100× growth)
├─ Architecture needed: CQRS + Event Sourcing
├─ Changes: Complete rewrite of core logic
├─ New pattern: Event stream → Read models
└─ Investment: 3-month re-architecture project
```

**Key insight:** Current architecture gets us to 1M users. Beyond that, we need to plan.

---

## DEPLOYMENT & UPDATES

### Zero-Downtime Deployment Process

```
Blue Environment (Current)           Green Environment (New)
├─ 4 API instances                  ├─ 4 API instances (new code)
├─ All traffic routed here          ├─ No traffic yet
└─ Database schema v5               └─ Database schema v5 (compatible)
                                    
                    [Run tests on Green]
                    ├─ Smoke tests (10 critical flows)
                    ├─ Load test (1000 concurrent users)
                    └─ Verify metrics

                    [Shift traffic gradually]
                    ├─ Shift 10% → Green (monitor 5 min)
                    ├─ Shift 25% → Green (monitor 5 min)
                    ├─ Shift 100% → Green
                    └─ Keep Blue ready for rollback (10 min)

                    [Verify stable]
                    ├─ Error rate < 0.1% ✓
                    ├─ P95 latency normal ✓
                    ├─ Zero data loss ✓
                    └─ Tear down Blue environment

Time to deploy: 20-30 minutes
Rollback time: < 2 minutes (if needed)
```

---

## FOR OPERATIONS TEAMS

### Daily Monitoring Checklist

```
☐ Database CPU: < 70% (alert if > 80%)
☐ Database disk: > 20% free (alert if < 10%)
☐ Redis memory: < 90% utilization
☐ Search index: Reindex completed in last 24h
☐ Kafka lag: < 1000 messages behind
☐ Error rate: < 0.1% (alert if > 1%)
☐ P95 latency: Homepage < 800ms, Search < 1200ms
☐ Application success rate: > 99.5%
☐ Email delivery: 100% within 15 min
☐ Backups: Completed in last 24h, verified restorable
```

### Incident Response Workflow

```
1. Alert fires (e.g., "Elasticsearch unavailable")
   → Ops receives page immediately
   → Time: 0 seconds

2. Ops investigates
   → Check service health
   → Check logs
   → Time: 1-2 minutes

3. If recoverable: Fix automatically
   → Restart service
   → Heal cluster
   → Time: 5-15 minutes

4. If not recoverable: Failover
   → Activate standby service
   → Redirect traffic
   → Time: 1-5 minutes

5. Communication
   → Update status page
   → Notify customers (if impactful)
   → Time: 5 minutes

6. Recovery
   → Investigate root cause
   → Restore original service
   → Time: 30 minutes - 2 hours

7. Post-mortem
   → Document incident
   → Plan to prevent recurrence
   → Time: Next business day
```

---

## CONCLUSION

This architecture is:
- ✅ **Reliable:** Automatic failover; no data loss
- ✅ **Scalable:** Handles 100K users; upgradable to 1M+
- ✅ **Observable:** Comprehensive monitoring & alerting
- ✅ **Maintainable:** Proven patterns; documented runbooks
- ✅ **Cost-effective:** ~$100K/year for robust infrastructure

**Status: Ready to implement**
