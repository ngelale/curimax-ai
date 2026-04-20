# ARBPC MARKETPLACE - EXECUTIVE SUMMARY: ARCHITECTURE DECISIONS

**Audience:** Product, Engineering Leadership, and Operations  
**Purpose:** Explain architectural choices and their impact on product roadmap  
**Date:** January 2026

---

## SYSTEM AT A GLANCE

**What is ARBPC Marketplace?**
A discovery and application platform for prospective students to:
1. Browse 2,847+ educational programs from 342 institutions
2. Search and filter programs by price, degree, location, demand
3. Submit multi-step applications directly through our platform

**Scale Target (Year 1):**
- 100,000 concurrent users browsing
- 10,000 simultaneous searchers
- 1,000 concurrent application submissions
- 99.95% uptime requirement

**Key Constraint:** Never lose an application submission

---

## ARCHITECTURAL DECISIONS AT A GLANCE

### Decision 1: Split into Two Separate Systems

**Read System (Discovery):**
- Stateless API Gateway
- Cached program data (Redis)
- Search index (Elasticsearch)
- Read-only database replicas

**Write System (Applications):**
- Stateless API Gateway (separate instance)
- Primary database (synchronous)
- Message queue (Kafka)
- Async notification workers

**Why?**
- Read traffic is 95% of total volume
- Discovery can tolerate stale data (1 hour old is fine)
- Applications must never fail or lose data
- Each system can scale independently

---

### Decision 2: Database Strategy: Active-Passive, Not Active-Active

**What we chose:**
- One primary database (accepting writes)
- One standby database (exact copy; failover-ready)
- Read replicas for scaling read volume
- If primary fails: Automatic failover to standby (< 1 min)

**Why not active-active (both databases accepting writes)?**
- Requires "eventual consistency" (data conflicts possible)
- Harder to debug issues
- Overkill for our consistency needs
- Active-passive is simpler and proven

**Impact on product roadmap:**
- Failover is automatic but briefly interrupts submissions (< 30 seconds)
- We accept this trade-off for simplicity and reliability

---

### Decision 3: Asynchronous Email (Not Synchronous)

**What we chose:**
- User clicks "Submit" → Application immediately saved to database
- System says "Confirmation email on the way"
- Email actually sent in background (via queue)
- Email can arrive 5-15 minutes later

**Why not send email immediately?**
- If email service is slow → Application submission hangs
- If email provider is down → Application fails
- If network connection drops during email send → User retries and we lose the data

**Impact on product roadmap:**
- Application confirmations arrive slowly (5-15 min) but reliably
- We can retry failed emails for 24 hours automatically
- Can upgrade email provider without impacting application submissions

---

### Decision 4: Elasticsearch for Search (Not SQL)

**What we chose:**
- Program search uses specialized search engine (Elasticsearch)
- Database queries only used for "transactional" data (applications, profiles)

**Why not just use database?**
- Database full-text search is slow on 2,847 programs
- Can't do multi-faceted filtering (by price AND degree AND location) efficiently
- Elasticsearch is 3× faster for complex queries

**Impact on product roadmap:**
- Search latency is predictable (500-800ms even with complex filters)
- Can scale search to 10K+ programs without re-architecture
- Search results lag 1 hour behind new programs (acceptable trade-off)

---

### Decision 5: Eventual Consistency for Saved Programs

**What we chose:**
- "Save program" (wishlist) returns instantly
- Data is "eventually consistent" (might take 30 seconds to propagate)

**Why?**
- Synchronous consistency would add 500ms latency
- Users can tolerate 30-second delays
- Saves database round-trip per save action

**Impact on product roadmap:**
- Wishlist feature is snappy (instant feedback)
- Data might be briefly out of sync across devices (rare edge case)
- No user-visible data loss (just brief inconsistency)

---

## WHAT BREAKS FIRST (Failure Priority)

**System will gracefully degrade in this order:**

**Tier 1: "Must Never Happen"**
- Application data loss → ❌ **Not acceptable**
  - Mitigation: Synchronous database write + backup replication

**Tier 2: "OK if it fails"**
- Search service down → ✓ **Show category browse instead**
- Labor market data unavailable → ✓ **Show yesterday's data**
- Recommendations pending → ✓ **Show "pending" label**

**Tier 3: "Nice to have"**
- Trending carousel → ✓ **Hide gracefully**
- Success stories → ✓ **Load asynchronously**
- Related programs → ✓ **Don't show if slow to load**

**What this means for you:**
- Users can always browse and apply
- Discovery features degrade gracefully
- Applications always succeed

---

## LATENCY EXPECTATIONS FOR USERS

| User Flow | Target | Reality | Reason |
|---|---|---|---|
| **Home page loads** | < 2s | 300-800ms | CDN + cache |
| **Search results** | < 2s | 400-1200ms | Elasticsearch |
| **Program detail** | < 2s | 250-600ms | Cache hit |
| **Submit application** | < 5s | 1-3s | Database write |
| **Get confirmation** | 5-15 min | Async via email | Background worker |

**What this means:** Site feels snappy; applications are reliable.

---

## COST IMPLICATIONS

### Infrastructure Costs (Estimated Annual)

| Component | Cost | Notes |
|---|---|---|
| **Database (Primary + Standby)** | $18K | PostgreSQL instances in 2 AZs |
| **Read Replicas** | $12K | 2 replicas for read scaling |
| **Redis Cache** | $4K | 3-node cluster, 32GB |
| **Elasticsearch** | $8K | 5-node cluster for search |
| **Kafka Message Queue** | $6K | 3-node cluster, durability |
| **API Servers** | $24K | 4 instances, auto-scaling |
| **CDN** | $15K | Cloudflare or Fastly |
| **Monitoring/Logging** | $8K | Datadog, ELK stack |
| **Storage (S3)** | $5K | Application documents + archives |
| **Other infrastructure** | $4K | Load balancers, networking |
| **TOTAL FIRST YEAR** | ~$104K | Scales with traffic; includes redundancy |

**What this buys you:**
- No data loss guarantees
- 99.95% uptime
- Fast search and applications
- Automatic failover
- Comprehensive monitoring

---

## ROADMAP IMPLICATIONS

### What's Easy to Change

✓ **Add more programs** (up to 10K) - No architecture change  
✓ **Add more fields to applications** - Schema extension  
✓ **Implement scholarships/financial aid** - New data store  
✓ **Add video to program detail** - CDN optimization  

### What Requires Re-architecture

✗ **Scale to 500K+ concurrent users** - Need database sharding  
✗ **Real-time bidirectional notifications** - Need WebSockets infrastructure  
✗ **Instant consistency for all features** - Need distributed transactions  
✗ **Support 100K programs** - Need to re-shard search index  

**Key insight:** Current architecture can handle 100× growth before breaking.

---

## RISKS & MITIGATION

| Risk | Probability | Mitigation |
|---|---|---|
| **Database primary failure** | Low (happens ~1×/year) | Auto-failover to standby; < 1 min downtime |
| **Search service slow** | Medium (happens ~1×/month) | Fallback UI; cached results; circuit breaker |
| **Surge load (10× normal)** | Medium (predictable: deadlines) | Auto-scale API; queue applications; degrade features |
| **Email provider down** | Low (high SLA) | Queue with retries; eventual delivery within 24h |
| **Payment processor down** | Very low | Allow "pay later" option; async retry |

**Overall risk level:** 🟡 Medium (manageable with ops processes)

---

## WHAT WE'RE DOING DIFFERENTLY

### vs. Simple Monolith (❌ Not chosen)

```
Monolith pros: Simple to build (2 months faster)
Monolith cons: Can't scale to 100K users; all or nothing failures

We chose: Distributed architecture (slower to build, scales 100×)
```

### vs. Serverless (AWS Lambda) (❌ Not chosen)

```
Serverless pros: Pay per request; scales automatically
Serverless cons: Cold starts; stateful service hard to build; data consistency harder

We chose: Managed infrastructure (more predictable latency)
```

### vs. Microservices (Fully Decomposed) (❌ Not chosen)

```
Microservices pros: Independent scaling; technology flexibility
Microservices cons: Operational complexity; latency overhead; debugging hard

We chose: Hybrid (monolith for core logic + specialized services for search/queue)
```

---

## SUCCESS METRICS

### For Product

- **User conversion:** Homepage → Application completion > 2%
- **Application success:** 99.5% of submissions succeed without user retry
- **Search abandonment:** < 5% of users see "no results" message
- **Time to apply:** Average 8 minutes end-to-end

### For Engineering

- **Availability:** 99.95% uptime (< 22 min downtime/month)
- **Latency:** P95 response time < 1500ms for discovery paths
- **Error rate:** < 0.1% for critical paths
- **MTTR:** < 15 minutes to fix any incident

### For Operations

- **On-call load:** < 3 incidents/month
- **Monitoring coverage:** 95% of critical operations instrumented
- **Runbook completeness:** All failure scenarios documented
- **Deployment velocity:** 1 release/week without data loss

---

## NEXT STEPS

### Month 1: Foundation
- Set up infrastructure (databases, cache, search, queue)
- Implement API Gateway + rate limiting
- Build core database schema

### Month 2: Discovery Features
- Implement program search and filtering
- Build program detail page
- Set up CDN and caching

### Month 3: Application Platform
- Build multi-step application form
- Implement payment processing
- Set up notification workers

### Month 4: Polish & Scale Test
- Implement monitoring and alerting
- Run load tests (1000 TPS applications)
- Write operational runbooks
- Go-live preparation

---

## CONCLUSION

This architecture is designed for **reliability and scalability without premature optimization**. We:

1. ✅ **Never lose application data** (sync database + standby)
2. ✅ **Degrade gracefully** (discovery optional; applications critical)
3. ✅ **Scale to 100K users** (stateless services + caching)
4. ✅ **Meet latency targets** (specialized databases + CDN)
5. ✅ **Keep operations simple** (proven patterns; limited services)

**The system is buildable. The system is scalable. Let's build it.**

---

**Document Status:** Approved for Implementation  
**Questions?** Contact: Architecture Review Board  
**Next Review:** After first 10K users
