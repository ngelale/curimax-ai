# Approvals & Collaboration Feature - Implementation Guide

## 🎯 Overview

The Approvals & Collaboration module enables multi-user workflows with approval requests, commenting, activity tracking, and granular permission management for projects.

**Route**: `/projects/[id]/approvals`

## ✨ Features Implemented

### 1. **Approval Request Interface**
- Request details with requester avatar and timestamp
- Approval sections with status indicators and metrics
- Message from requester
- "View Full Project Details" action button
- Status banners (Approved, Rejected, Changes Requested)

### 2. **Approval Decision Flow**
- Notes/feedback textarea
- Three decision options:
  - **Approve**: Simple approval with optional notes
  - **Reject**: Requires rejection reason
  - **Request Changes**: Requires detailed feedback (checkbox-toggled)
- Validation ensures meaningful feedback
- Toast notifications for each decision

### 3. **Collaboration Features**
- **Activity Feed**: Chronological log of project actions
  - Created, edited, approved, rejected, commented, viewed
  - Actor information with avatars
  - Relative timestamps (2 hours ago)
  
- **Comments Section**: Per-section commenting
  - View existing comments with author/timestamp
  - Add new comments (permission-based)
  - Reply capability (structure ready)

- **Collaborators List**:
  - Display all collaborators by role
  - Show role badges with color coding
  - Role permissions description
  - Remove collaborator button (owner-only)

### 4. **Permissions Matrix**
| Action | View | Comment | Edit | Approve | Manage | Delete |
|--------|------|---------|------|---------|--------|--------|
| **Owner** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Editor** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Commenter** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Viewer** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

### 5. **Notification Preferences**
- Email notifications (6 event types)
- In-app notifications (2 options)
- Digest frequency (real-time, daily, weekly, off)
- Custom digest time/day settings
- Save preferences functionality

### 6. **Status Indicators**
- ✅ **Approved**: Green banner showing approver name
- ❌ **Rejected**: Red banner with rejection reason
- ⚠️ **Changes Requested**: Yellow banner with feedback
- ⏳ **Pending**: Blue banner (default)

## 📁 File Structure

```
src/app/(dashboard)/projects/[id]/approvals/
│
├── page.tsx                          # Main approval page (120 lines)
├── types.ts                          # TypeScript interfaces (90 lines)
├── mock-data.ts                      # Sample data (200 lines)
├── permissions.ts                    # Permission checking utilities (80 lines)
├── utils.ts                          # Helper functions (100 lines)
│
└── _components/                      # Reusable components
    ├── index.ts                      # Component exports
    ├── status-indicator.tsx          # Status banner (40 lines)
    ├── approval-card.tsx             # Approval request display (65 lines)
    ├── approval-decision.tsx         # Decision form (85 lines)
    ├── activity-feed.tsx             # Activity log (70 lines)
    ├── comments-section.tsx          # Comments UI (95 lines)
    ├── notification-preferences.tsx  # Notification settings (200 lines)
    └── collaborators-list.tsx        # Collaborators display (95 lines)
```

## 🔑 Types Overview

### ApprovalStatus
```typescript
type ApprovalStatus = "pending" | "approved" | "rejected" | "changes-requested"
```

### UserRole
```typescript
type UserRole = "owner" | "editor" | "commenter" | "viewer"
```

### ApprovalRequest
- Requester information
- Request timestamp
- Current status
- Approval sections with metrics
- Decision notes
- Activity history

### Collaborator
- User info (name, email, avatar)
- Role assignment
- When added and by whom

### NotificationPreferences
- Email notification flags (6 types)
- In-app notification settings
- Digest frequency and timing

## 🎮 Component Breakdown

### StatusIndicator
- Displays approval status with icon and color
- Shows approver name if approved
- Auto-colors based on status

### ApprovalCard
- Shows requester and timestamp
- Displays approval message
- Lists review sections with details
- Key metrics per section

### ApprovalDecision
- Textarea for notes/feedback
- Checkbox to toggle "request changes" mode
- Three action buttons
- Form validation

### ActivityFeed
- Chronological list of actions
- Avatar + actor name
- Action verb and details
- Relative timestamps

### CommentsSection
- Section badge
- Display existing comments
- Add comment form (conditional)
- Comment author/timestamp info

### NotificationPreferencesComponent
- Email notification checkboxes
- In-app notification settings
- Digest frequency radio buttons
- Save button with success toast

### CollaboratorsList
- Sorted by role (owner first)
- Role badges with colors
- Remove button (owner-only)
- Role descriptions

## 🔒 Permission System

### Key Functions

```typescript
// Check specific permission
canPerformAction(userRole, action)

// Role-based checks
canView(role)
canComment(role)
canEdit(role)
canApprove(role)
canManageCollaborators(role)
canDelete(role)
canGenerateReports(role)

// Get role description
getRoleDescription(role)
```

### Permission Flow
1. Check user's role
2. Get role's permission object
3. Check specific action permission
4. Show/hide UI elements accordingly

## 🎨 UI/UX Patterns

### Status Colors
- **Green** (#16a34a): Approved
- **Red** (#dc2626): Rejected
- **Amber** (#d97706): Changes Requested
- **Blue** (#2563eb): Pending

### Form Validation
- Reject requires reason
- Changes request requires feedback
- Comment cannot be empty
- Pre-submission validation with toast

### Responsive Design
- Mobile: Single column
- Tablet: Two columns (main + sidebar)
- Desktop: Full layout with all sections
- Modals full-screen on mobile

## 🔌 API Integration Points

### TODO - Connect to Backend

```typescript
// Handle Approval Decision
POST /api/projects/{id}/approvals/{approvalId}
  {
    decision: "approve" | "reject" | "changes-requested",
    notes: string,
    approvedBy: userId
  }

// Fetch Approval Request
GET /api/projects/{id}/approvals/{approvalId}

// Add Comment
POST /api/projects/{id}/approvals/{approvalId}/comments
  { content, sectionId, userId }

// Get Activity Log
GET /api/projects/{id}/activity

// Update Notification Preferences
PUT /api/users/{userId}/notification-preferences
  { NotificationPreferences object }

// Remove Collaborator
DELETE /api/projects/{id}/collaborators/{collaboratorId}
```

## 📊 Mock Data Included

### ApprovalRequest
- Requester: Jane Doe
- Status: Pending
- 3 sections (Evidence, Competitor, Financial)
- Sample message
- Real-looking metrics

### Collaborators
- Lisa Thompson (Owner)
- Jane Doe (Editor)
- John Smith (Commenter)
- Sarah Johnson (Viewer)

### Activity Log
- 4 sample activities
- Different action types
- Realistic timestamps

### Notification Preferences
- Email notifications enabled
- Desktop notifications enabled
- Daily digest at 9 AM
- Weekly on Monday

## 🧪 Testing Checklist

- [x] All components render without errors
- [x] TypeScript types are correct
- [x] Permission checks work
- [x] Status indicators show correctly
- [x] Form validation works
- [x] Toast notifications trigger
- [x] Activity feed displays properly
- [x] Comments section functional
- [x] Collaborators list sorted by role
- [x] Notification preferences save

## 🚀 Implementation Steps

1. **Review** types and mock data
2. **Test** in development environment
3. **Connect** approval decision endpoint
4. **Implement** activity tracking
5. **Add** comment functionality
6. **Save** notification preferences
7. **Enforce** permissions on backend
8. **Deploy** to production

## 📈 Future Enhancements

1. **Inline Comments**: Comment directly on sections
2. **Email Notifications**: Send approval decisions via email
3. **Approval Workflows**: Custom multi-step approvals
4. **Audit Trail**: Detailed history with IP/location
5. **Bulk Actions**: Approve multiple projects
6. **Approval Templates**: Pre-configured workflows
7. **SLA Tracking**: Track approval wait times
8. **Escalation**: Auto-escalate overdue approvals
9. **Webhooks**: Trigger external systems
10. **API Integrations**: Connect to Slack, Teams, etc.

## 🎓 Key Learnings

This implementation demonstrates:
- Complex permission-based UIs
- Multi-step approval workflows
- Activity/audit logging patterns
- Comment systems
- Role-based access control (RBAC)
- Notification preference management
- Form validation and error handling
- Component composition for feature modules

---

**Status**: ✅ Feature complete and ready for backend integration
