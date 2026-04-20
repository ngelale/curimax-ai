# Template Library - UI Component Hierarchy

## Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  Program Templates                                      │
│  Start with a proven framework                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Tabs: Popular | Academic Programs | Corporate Training │
│       Government Workforce | Recently Used              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ [Search templates...                                ]  │
│                                                         │
│ [Program Level ▼] [Industry ▼] [Region ▼]              │
│                                    6 templates found   │
│                          [+ Create Custom Template]    │
└─────────────────────────────────────────────────────────┘

┌──────────────────┬──────────────────┬──────────────────┐
│                  │                  │                  │
│ 🎓 Master's in   │ 💼 Leadership    │ 🔒 Cybersecurity│
│ Data Science     │ Development      │ Certificate     │
│                  │                  │                  │
│ Academic • M.S.  │ Corporate • Cert │ Academic • Cert │
│ • Technology     │ • Business       │ • Technology    │
│                  │                  │                  │
│ Used by 47       │ Used by 23       │ Used by 89      │
│ Score: 8.2/10    │ Score: 7.5/10    │ Score: 9.1/10   │
│                  │                  │                  │
│ [Preview] [Use]  │ [Preview] [Use]  │ [Preview] [Use] │
└──────────────────┴──────────────────┴──────────────────┘

┌──────────────────┬──────────────────┬──────────────────┐
│ More templates...                                       │
└──────────────────┴──────────────────┴──────────────────┘
```

## Template Preview Modal

```
┌──────────────────────────────────────────────────────────────┐
│ Master's in Data Science - Template Preview            [✕]  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Overview                                                    │
│ ────────────────────────────────────────────────────────    │
│ Comprehensive Master's program in Data Science with proven  │
│ market demand...                                            │
│                                                              │
│ What's Included:                                            │
│ ✓ Pre-filled industry sectors (Technology, Finance)         │
│ ✓ Target regions (US: CA, NY, TX, WA, MA)                  │
│ ✓ Typical program duration: 48 weeks (12 months)            │
│ ✓ Delivery format: Hybrid (60% online, 40% in-person)       │
│ ✓ Financial model with industry benchmarks                  │
│ ✓ Common competitor programs for benchmarking              │
│                                                              │
│ Typical Results:                                            │
│ ┌──────────┬──────────┬──────────┬──────────┐             │
│ │ Demand   │ Avg Jobs │ Avg      │ Break-   │             │
│ │ Score    │ Found    │ Salary   │ even     │             │
│ │          │          │          │          │             │
│ │ 8.2/10   │ 1,200+   │ $115k    │ 14-18mo  │             │
│ └──────────┴──────────┴──────────┴──────────┘             │
│                                                              │
│ ℹ️ You can customize all fields after using this template.  │
│                                                              │
│                   [Cancel]  [Use This Template]            │
└──────────────────────────────────────────────────────────────┘
```

## Create Custom Template Modal

```
┌──────────────────────────────────────────────────────────────┐
│ Create Custom Template                                 [✕]  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Template Name *                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Master's in Sustainable Finance                     │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                              │
│ Description                                                 │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ For institutions creating finance programs with ESG  │   │
│ │ focus and sustainability components...               │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                              │
│ Category                                                    │
│ [Academic Programs ▼]                                       │
│                                                              │
│ Base this template on:                                      │
│ ◯ Current project: "Sustainable Finance"                   │
│ ◉ Start from scratch                                        │
│                                                              │
│ Sharing                                                     │
│ ◯ Private (only you)                                        │
│ ◉ Organization (visible to your team)                       │
│ ◯ Public (available to all ARBPC users)                    │
│                                                              │
│              [Cancel]  [Create Template]                    │
└──────────────────────────────────────────────────────────────┘
```

## Empty State

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                     🔍 No templates found                   │
│                                                              │
│            Try different keywords or filters                │
│                                                              │
│                  [Clear Filters] [Browse All]               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Component Composition

```
Page (page.tsx)
│
└── TemplatesList (templates-list.tsx)
    │
    ├── Tabs (TabsList + TabsContent)
    │
    ├── TemplateFilters (template-filters.tsx)
    │   ├── Input (Search)
    │   ├── DropdownMenu (Program Level)
    │   ├── DropdownMenu (Industry)
    │   └── DropdownMenu (Region)
    │
    ├── Button (Create Custom Template)
    │
    ├── TemplateCard (template-card.tsx) × N
    │   ├── Card
    │   ├── Text (Title, Category, Stats)
    │   └── Buttons (Preview, Use)
    │
    ├── EmptyState (when no results)
    │   └── Buttons (Clear Filters, Browse All)
    │
    ├── TemplatePreviewModal (template-preview-modal.tsx)
    │   ├── Dialog
    │   ├── Content (Overview, Includes, Results)
    │   └── Buttons (Cancel, Use Template)
    │
    └── CreateCustomTemplateModal (create-custom-template-modal.tsx)
        ├── Dialog
        ├── Input (Name)
        ├── Textarea (Description)
        ├── Select (Category)
        ├── RadioGroup (Base Template)
        ├── RadioGroup (Sharing)
        └── Buttons (Cancel, Create Template)
```

## Data Flow

```
TemplatesList Component
│
├── State: selectedTab, searchTerm, filters, preview, modals
│
├── Filter & Sort Templates
│   ├── By active tab
│   ├── By search term
│   ├── By program level
│   ├── By industry
│   └── By region
│
├── Render Template Cards
│   └── On card click → Show preview modal
│
├── Handle "Use Template"
│   └── Show toast → (TODO) Redirect to intake wizard
│
└── Handle "Create Custom Template"
    └── Open modal → Submit form → (TODO) Create via API
```

## Responsive Breakpoints

- **Mobile**: 1 column grid
- **Tablet**: 2 column grid
- **Desktop**: 3 column grid

All modals are responsive and mobile-friendly.
