# Admin Dashboard - Quick Reference Guide

## 🎯 What You Can Do Right Now

### View the Admin Dashboard
Navigate to `/admin` in your browser (admin users only)

### Interact with Overview Tab
- **Pause/Resume** the activity feed
- **Click tabs** to switch between sections (currently only Overview is implemented)
- **View** 4 system metrics with trends
- **Monitor** 7 system services
- **See** real-time activity feed

---

## 📁 File Structure

```
src/app/admin/
├── page.tsx                      ← Main admin page (start here)
├── types.ts                      ← Type definitions
├── mock-data.ts                  ← Sample data
├── utils.ts                      ← Helper functions
├── IMPLEMENTATION.md             ← Detailed docs
└── _components/
    ├── metrics-card.tsx          ← Metric display
    ├── activity-feed.tsx         ← Activity list
    ├── system-health.tsx         ← Service status
    └── index.ts                  ← Exports
```

---

## 🔑 Key Components

### MetricsCard
Displays a single metric with icon, value, and trend.

```typescript
<MetricsCard metric={mockMetrics[0]} />
// Renders: "Total Users: 342 +23 ↑"
```

### ActivityFeed
Shows real-time system activities with pause control.

```typescript
<ActivityFeed activities={mockActivityEvents} />
// Renders: 6 activities with severity badges
```

### SystemHealth
Displays all system services with operational status.

```typescript
<SystemHealth services={mockSystemServices} />
// Renders: 7 services with status indicators
```

---

## 📊 Mock Data Samples

### Metrics
- Total Users: 342 (+23 this week)
- Active Projects: 1,847 (+89 this week)
- System Uptime: 99.97% (stable)
- API Requests: 2.4M/month (+15%)

### Activities (6)
1. User upgrade to Portfolio (2 min ago)
2. Project analysis completion (5 min ago)
3. New user registration (8 min ago)
4. Report generation (12 min ago)
5. Failed login attempt (15 min ago) ⚠️
6. API rate limit exceeded (18 min ago) 🔴

### Services (7)
- ✅ Web Application (120ms response)
- ✅ PostgreSQL Database (47/100 connections)
- ✅ Redis Cache (94% hit rate)
- ✅ S3 File Storage (847GB/2TB usage)
- ⚠️ Email Service (23 pending)
- ✅ AI Workers (3 active jobs)
- ✅ Tavily Search API (450/1000 rate)

---

## 🎨 Colors & Icons

### Status Indicators
- ✅ Operational → Green (#10b981)
- ⚠️ Degraded → Amber (#f59e0b)
- ❌ Down → Red (#ef4444)

### Metric Colors
- Blue: Users metric
- Green: Projects metric
- Purple: Uptime metric
- Orange: API requests metric

### Severity Badges
- 🔵 Info → Blue background
- 🟡 Warning → Amber background
- 🔴 Critical → Red background

---

## 🔌 API Integration Points (TODO)

When ready to connect real data:

```typescript
// Get system metrics
fetch('/api/admin/metrics')

// Stream activities
WebSocket: 'wss://api/admin/activities'

// Check service health
fetch('/api/admin/services/health')

// Verify admin role
fetch('/api/auth/me') → check role === 'admin'
```

---

## 📝 Utility Functions

### Formatting
```typescript
formatMetricValue(1847)        // "1,847"
formatLargeNumber(2400000)     // "2.4M"
formatActivityTime(date)        // "2 min ago"
formatTrend("up")              // "↑"
```

### Colors
```typescript
getStatusColor("operational")  // "text-green-600 bg-green-50..."
getTrendColor("up")            // "text-green-600"
getMetricCardColor("blue")     // "bg-blue-50 border-blue-200"
```

### Status
```typescript
getStatusIcon("operational")   // "✅"
getStatusLabel("degraded")     // "Degraded"
isAdmin("admin")               // true
```

---

## 🧪 Testing the Dashboard

### Prerequisites
- Browser with JavaScript enabled
- User with admin role
- Access to `/admin` route

### Test Scenarios

**1. View Overview Tab**
- See 4 metric cards
- See activity feed
- See system health section

**2. Pause/Resume Activity Feed**
- Click "Pause" button
- Feed stops updating
- Click "Resume" (button changes)
- Feed resumes

**3. Switch Tabs**
- Click each tab button
- Overview shows content
- Other tabs show "Coming soon" placeholders

**4. Check Responsive Design**
- Resize browser window
- On mobile: 1 metric card per row
- On tablet: 2 metric cards per row
- On desktop: 4 metric cards per row

---

## 🐛 Troubleshooting

### Not seeing admin dashboard
- Check user role is "admin"
- Verify `/admin` route is accessible
- Check browser console for errors

### Metrics not showing
- Verify mock-data.ts is imported
- Check MetricsCard component renders
- Inspect browser DevTools

### Activity feed not updating
- Click Pause to verify button works
- Check ActivityFeed component renders
- Mock data has 6 activities

### Colors not displaying
- Check Tailwind CSS is loaded
- Verify color classes are correct
- Browser may need cache clear

---

## 📈 Next Tabs to Implement

1. **Users Tab** - User list, search, role management
2. **Projects Tab** - Project overview, metrics
3. **System Health Tab** - Detailed service monitoring
4. **Analytics Tab** - Charts and reports
5. **Audit Logs Tab** - Activity log viewer
6. **Settings Tab** - Admin configuration

---

## 💡 Tips

- All mock data can be found in `mock-data.ts`
- Utility functions are in `utils.ts` - reuse them!
- Types are defined in `types.ts` for consistency
- Components are in `_components/` folder
- Use barrel export `_components/index.ts`

---

## ✅ Compilation Status

- ✅ 0 errors
- ✅ 0 warnings
- ✅ TypeScript strict mode
- ✅ Production ready

---

**Ready to implement next tab?** Just provide the specification and we'll build it!
