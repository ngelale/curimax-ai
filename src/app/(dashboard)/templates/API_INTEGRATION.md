# Template Library - API Integration Points

## Currently Implemented
- ✅ UI/UX components and layouts
- ✅ Local mock data and filtering
- ✅ Modal dialogs and interactions
- ✅ TypeScript types and data structures
- ✅ Search and filtering logic
- ✅ Tab navigation
- ✅ Empty states

## API Integration TODO

### 1. **Use Template Functionality**
**Location**: `templates-list.tsx` → `handleUseTemplate()` function

**Current**: Shows toast notification
**TODO**: 
```typescript
const handleUseTemplate = async (template: Template) => {
  try {
    // POST request to save template usage
    await fetch('/api/templates/use', {
      method: 'POST',
      body: JSON.stringify({ templateId: template.id })
    });
    
    // Redirect to intake wizard with pre-filled data
    router.push('/intake-wizard?templateId=' + template.id);
    
    toast.success('Template applied! Customize before creating.');
  } catch (error) {
    toast.error('Failed to apply template');
  }
};
```

**Pre-fill Data Needed**:
- Program name
- Program level
- Industry sectors
- Target regions
- Duration
- Delivery format
- Financial assumptions
- Baseline metrics

### 2. **Create Custom Template**
**Location**: `create-custom-template-modal.tsx` → `handleCreate()` function

**Current**: Shows success toast and closes modal
**TODO**:
```typescript
const handleCreate = async () => {
  if (!templateName.trim()) {
    toast.error('Template name is required');
    return;
  }

  try {
    const response = await fetch('/api/templates/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: templateName,
        description: description,
        category: category,
        baseProjectId: baseOption === 'current-project' ? currentProjectId : undefined,
        sharing: sharing,
      })
    });

    if (!response.ok) throw new Error('Failed to create template');

    const newTemplate = await response.json();
    toast.success('Custom template created successfully!');
    
    // Optional: Update local state or redirect
    onClose();
  } catch (error) {
    toast.error('Failed to create custom template');
  }
};
```

### 3. **Fetch Templates** (Future Dynamic Loading)
**Location**: `templates-list.tsx` (optional)

**Current**: Uses mock data
**TODO for dynamic loading**:
```typescript
useEffect(() => {
  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates', {
        params: {
          search: searchTerm,
          category: selectedTab,
          programLevel: programLevelFilter,
          industry: industryFilter,
          region: regionFilter,
        }
      });
      
      const data = await response.json();
      setTemplates(data.templates);
    } catch (error) {
      toast.error('Failed to load templates');
    }
  };

  fetchTemplates();
}, [searchTerm, selectedTab, programLevelFilter, industryFilter, regionFilter]);
```

### 4. **Track Template Usage**
**Location**: `template-card.tsx` or `handleUseTemplate()`

**Purpose**: Update "Recently Used" tab and usage count

**TODO**:
```typescript
// Track when user clicks "Use Template"
POST /api/templates/{id}/track-usage

// Get recently used templates
GET /api/templates/recently-used

// Response example:
{
  templateIds: ["1", "3", "5"],
  lastUsed: ["2025-01-11T10:00:00Z", "2025-01-10T14:30:00Z", ...]
}
```

### 5. **Delete/Manage Custom Templates**
**Future Feature**: Allow users to manage their custom templates

**Endpoints needed**:
```
DELETE /api/templates/{id}
PUT /api/templates/{id} - Update custom template
GET /api/templates/my-custom - List user's custom templates
```

### 6. **Share Custom Templates**
**Future Feature**: Publish templates to organization or public

**Endpoints needed**:
```
PUT /api/templates/{id}/share
  - Change sharing: private → organization → public
  - Notify team members

GET /api/templates/organization - Get org's custom templates
GET /api/templates/explore - Browse public templates
```

---

## Required API Routes Structure

### Template Operations
```
GET    /api/templates              - List all templates (with filters)
GET    /api/templates/{id}         - Get template details
GET    /api/templates/recently-used - Get user's recently used
POST   /api/templates/create       - Create custom template
POST   /api/templates/{id}/use     - Track template usage
PUT    /api/templates/{id}         - Update custom template
DELETE /api/templates/{id}         - Delete custom template
PUT    /api/templates/{id}/share   - Update sharing settings
```

### Data Models for Backend

**Template Response**:
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "category": "string",
  "programLevel": "string",
  "industry": "string",
  "includes": ["string"],
  "regions": ["string"],
  "typicalDuration": "string",
  "usedBy": number,
  "avgDemandScore": number,
  "typicalResults": {
    "avgJobsFound": "string",
    "avgSalary": "string",
    "breakEvenMonths": "string"
  }
}
```

**Custom Template Request**:
```json
{
  "name": "string",
  "description": "string",
  "category": "string",
  "baseProjectId": "string|null",
  "sharing": "private|organization|public"
}
```

**Usage Response**:
```json
{
  "success": true,
  "redirectUrl": "string",
  "prefilledData": { /* template data */ }
}
```

---

## Frontend Dependencies for API Integration

### Already Available:
- ✅ `toast` from sonner (for notifications)
- ✅ `useRouter` from next/navigation (for redirects)
- ✅ React hooks (useState, useEffect, useCallback)

### May Need:
- 🔄 Loading states (useState for isLoading)
- 🔄 Error handling (try/catch and error states)
- 🔄 useRouter hook (already imported in some components)
- 🔄 Request cancellation for async operations

---

## Testing Checklist

Before connecting to backend, ensure:

- [ ] Mock data works correctly
- [ ] All filters function properly
- [ ] Search returns expected results
- [ ] Modals open/close correctly
- [ ] All buttons are clickable
- [ ] Empty state displays when appropriate
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Tab switching works smoothly
- [ ] Toast notifications display
- [ ] No console errors

---

## Security Considerations

1. **Enterprise Feature Gate**: Verify user is enterprise before showing "Create Custom Template"
2. **Sharing Permissions**: Verify user can only share templates with their organization
3. **Delete Protection**: Require confirmation before deleting templates
4. **Template Content**: Validate/sanitize template data on backend
5. **Rate Limiting**: Add rate limits for template creation API

---

## Performance Optimization Ideas

1. **Pagination**: Implement pagination if >50 templates
2. **Lazy Loading**: Load template details on-demand
3. **Search Debouncing**: Debounce search API calls
4. **Caching**: Cache template list if data rarely changes
5. **Infinite Scroll**: Alternative to pagination for mobile

---

## Future Enhancements

1. **Template Ratings**: Let users rate templates they've used
2. **Template Comments**: Add feedback/tips to templates
3. **Template Analytics**: Show which templates are most popular
4. **AI Recommendations**: Suggest templates based on user's industry/program
5. **Template Variants**: Support multiple versions of same template
6. **Import/Export**: Allow organizations to import custom templates
7. **Template Versioning**: Track changes to custom templates
8. **Approval Workflow**: Enterprise templates need admin approval
