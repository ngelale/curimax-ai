# Template Library - Developer Quick Start Guide

## 🚀 Quick Navigation

### View the Feature
```
URL: http://localhost:3000/templates
```

### Find Files
```
src/app/(dashboard)/templates/
├── page.tsx                 ← Entry point
├── types.ts                 ← Data types
├── mock-data.ts             ← Sample templates
└── _components/
    ├── templates-list.tsx   ← Main component
    ├── template-card.tsx    ← Template card UI
    ├── template-filters.tsx ← Search & filters
    ├── template-preview-modal.tsx  ← Detail view
    └── create-custom-template-modal.tsx ← Enterprise form
```

---

## 🔄 Key State Management

### In `templates-list.tsx`:

```typescript
// Tab state
const [selectedTab, setSelectedTab] = useState<TemplateCategory>("popular");

// Search state
const [searchTerm, setSearchTerm] = useState("");

// Filter states
const [programLevelFilter, setProgramLevelFilter] = useState("");
const [industryFilter, setIndustryFilter] = useState("");
const [regionFilter, setRegionFilter] = useState("");

// Modal states
const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
```

---

## 🔍 Filter Logic

The `getFilteredTemplates()` function:
1. **Starts** with all templates from `mock-data.ts`
2. **Filters by tab** (Academic, Corporate, Government, etc.)
3. **Filters by search term** (title + description)
4. **Filters by program level** (Bachelor's, Master's, etc.)
5. **Filters by industry** (Technology, Business, etc.)
6. **Filters by region** (US, Canada, Global, etc.)

All filters combine with AND logic (all must match).

---

## 🔌 Connecting to Backend

### Step 1: Update `handleUseTemplate()`

**Current** (Line ~121 in templates-list.tsx):
```typescript
const handleUseTemplate = (template: Template) => {
  toast.success(`Template applied! Review and customize before creating.`);
  console.log("Using template:", template);
  setPreviewTemplate(null);
};
```

**Change to**:
```typescript
const handleUseTemplate = async (template: Template) => {
  try {
    // Call API to track usage
    const response = await fetch('/api/templates/use', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateId: template.id })
    });

    if (!response.ok) throw new Error('Failed to use template');

    const { redirectUrl, prefilledData } = await response.json();

    // Store pre-filled data in session/state
    // Then redirect to intake wizard
    router.push(redirectUrl);

    toast.success('Template applied! Review and customize before creating.');
  } catch (error) {
    toast.error('Failed to apply template');
    console.error(error);
  }

  setPreviewTemplate(null);
};
```

### Step 2: Update `handleCreate()` in create-custom-template-modal.tsx

**Current** (Line ~58):
```typescript
const handleCreate = () => {
  if (!templateName.trim()) {
    toast.error("Template name is required");
    return;
  }
  toast.success("Template created successfully!");
  // Reset form
  setTemplateName("");
  // ... etc
  onClose();
};
```

**Change to**:
```typescript
const handleCreate = async () => {
  if (!templateName.trim()) {
    toast.error("Template name is required");
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
    
    toast.success("Custom template created successfully!");
    
    // Reset form
    setTemplateName("");
    setDescription("");
    setCategory("academic-programs");
    setBaseOption("scratch");
    setSharing("organization");
    
    onClose();
  } catch (error) {
    toast.error('Failed to create custom template');
    console.error(error);
  }
};
```

---

## 📊 Template Data Structure

```typescript
// From types.ts
interface Template {
  id: string;
  title: string;
  icon: string;                    // Emoji
  category: string;                // "Academic Programs", etc
  programLevel: ProgramLevel;       // "Master's", "Certificate"
  industry: Industry;               // "Technology", "Finance"
  description: string;
  includes: string[];               // Features/components
  regions: Region[];                // Target regions
  typicalDuration: string;          // "48 weeks"
  usedBy: number;                   // Institution count
  avgDemandScore: number;           // 7.0-9.2
  typicalResults?: {
    avgDemandScore: number;
    avgJobsFound: string;
    avgSalary: string;
    breakEvenMonths: string;
  };
  deliveryFormat?: string;
  usageCount?: number;
  createdAt?: string;
}
```

---

## 🎬 User Interaction Flow

```
User visits /templates
    ↓
TemplatesList renders with:
  - Tabs for categories
  - Search input
  - Filter dropdowns
  - Template cards in grid
    ↓
User searches/filters
    ↓
Templates update via useMemo
    ↓
User clicks "Preview"
    ↓
TemplatePreviewModal opens
    ↓
User clicks "Use Template"
    ↓
handleUseTemplate() → API call → Redirect to intake wizard
    ↓
OR User clicks "Create Custom Template"
    ↓
CreateCustomTemplateModal opens
    ↓
User fills form → Clicks "Create Template"
    ↓
handleCreate() → API call → Save to database → Close modal
```

---

## 🧪 Testing the Feature

### Without Backend:
```bash
# Run dev server
npm run dev

# Navigate to
http://localhost:3000/templates

# Test:
✅ Search by typing in search box
✅ Click filter dropdowns
✅ Switch between tabs
✅ Click "Preview" button
✅ Click "Use Template" button (shows toast)
✅ Click "Create Custom Template" button
✅ Fill form and click "Create" (shows toast)
```

### With Backend:
```bash
# Ensure your API endpoints exist:
POST /api/templates/use
  - Body: { templateId: string }
  - Response: { redirectUrl: string, prefilledData: {...} }

POST /api/templates/create
  - Body: { name, description, category, baseProjectId?, sharing }
  - Response: { id, ...template }

# Then test:
✅ Click "Use Template" → Should redirect
✅ Click "Create Template" → Should add to database
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module" errors
**Solution**: Check import paths. From `_components/` you need:
```typescript
import { Button } from "../../../components/ui/button";
```

### Issue: Types not recognized
**Solution**: Ensure `types.ts` exports are used:
```typescript
import { type Template, type TemplateCategory } from "../types";
```

### Issue: Toast not showing
**Solution**: Ensure `sonner` is installed:
```bash
npm install sonner
```

### Issue: Filters not working
**Solution**: Check that `regionFilter` includes type casting:
```typescript
filtered = filtered.filter((t) => t.regions.includes(regionFilter as any));
```

---

## 📈 Mock Data Reference

Located in `mock-data.ts`:
- 6 templates with complete data
- `recentlyUsedTemplateIds` array for "Recently Used" tab
- Easy to extend with more templates

To add a new template:
```typescript
export const mockTemplates: Template[] = [
  // ... existing templates
  {
    id: "7",
    title: "Your Template Title",
    icon: "🎓",
    category: "Academic Programs",
    programLevel: "Master's",
    // ... rest of properties
  }
];
```

---

## 🎯 Core Concepts

### Tabs
- Filter templates by category
- 5 tab categories defined in `TAB_CATEGORIES`
- Active tab stored in state

### Search
- Real-time filtering by title + description
- Case-insensitive
- Triggers update via useMemo

### Filters
- Three separate dropdown filters
- Combine using AND logic
- Each dropdown has "All" option to clear

### Modals
- Preview modal: Read-only template details
- Create modal: Form for new templates
- Both use Dialog component

### Cards
- Reusable component for each template
- Responsive, truncates long text
- Two action buttons

---

## 🚀 Performance Tips

1. **Use useMemo** for filtering (already done)
2. **Lazy load** template images if added
3. **Debounce** search if connecting to API
4. **Paginate** if more than 50 templates
5. **Memoize** template cards to prevent re-renders

---

## 🔐 Security Notes

1. **Enterprise Gate**: Check user plan before showing create button
   ```typescript
   {isEnterprise && (
     <Button onClick={() => setIsCreateModalOpen(true)}>
       Create Custom Template
     </Button>
   )}
   ```

2. **Validate** template data before sending to API
3. **Check permissions** before allowing template deletion
4. **Sanitize** user input in template descriptions
5. **Rate limit** template creation API

---

## 📚 Related Documentation

- See `TEMPLATES_IMPLEMENTATION.md` - Full feature documentation
- See `UI_STRUCTURE.md` - Component hierarchy
- See `API_INTEGRATION.md` - Detailed API endpoints
- See `TEMPLATE_LIBRARY_SUMMARY.md` - Complete overview

---

## ✅ Deployment Checklist

Before deploying:

- [ ] All API endpoints implemented
- [ ] Error handling in place
- [ ] Loading states visible
- [ ] Toast notifications working
- [ ] Enterprise feature gating active
- [ ] Database persistence confirmed
- [ ] Tests passing
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Accessibility check done
- [ ] Performance optimized
- [ ] Security review passed

---

**Happy coding!** 🎉
