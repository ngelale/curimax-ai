# Onboarding Feature Documentation

## Overview

The onboarding feature provides a guided tour for new users, introducing them to key features of the Curimax platform. It includes:

1. **5-Step Tutorial** - Core platform features
2. **Interactive Product Tour** - UI-focused tips with spotlight effects
3. **State Management** - localStorage-based persistence
4. **Completion Badges** - Visual recognition of progress

## Routes

- `/onboarding` - Main onboarding flow (shown after first login)
- Product tour can be launched from anywhere in the app

## Components

### OnboardingClient
Main component managing the 5-step tutorial flow.

**Features:**
- Step-by-step progression
- Back/Next navigation
- Skip option
- Progress indicators
- Completion modal with badge

**Steps:**
1. Welcome Screen
2. Create Your First Project
3. AI-Powered Evidence Gathering
4. Build Financial Models
5. Professional Reports

### ProductTour
Interactive tour component with spotlight effects.

**Features:**
- 8 contextual tips throughout the app
- Dark overlay with spotlight on target element
- Progress tracking
- "Don't show again" checkbox
- Previous/Next navigation

## Hooks

### useOnboarding()
Manages onboarding state and persistence.

```typescript
const {
  state,
  completeOnboarding,
  skipOnboarding,
  dismissProductTips,
  showOnboarding,
  showProductTips,
} = useOnboarding();
```

**Features:**
- localStorage persistence
- State management
- Completion tracking

## Data Files

### mock-data.ts
Contains:
- `onboardingSteps` - 5 tutorial steps with content
- `productTips` - 8 contextual tips

### types.ts
TypeScript interfaces:
- `OnboardingStep`
- `ProductTip`
- `OnboardingState`

## Usage

### Auto-Show on First Login
Add to your auth flow:
```typescript
if (!user.onboardingCompleted) {
  router.push('/onboarding');
}
```

### Launch Product Tour
```typescript
import { ProductTour } from '@/app/onboarding/ProductTour';
import { useOnboarding } from '@/app/onboarding/useOnboarding';

export function MyComponent() {
  const { showProductTips } = useOnboarding();
  
  return (
    <ProductTour isOpen={showProductTips} onClose={handleClose} />
  );
}
```

### Add Tour Targets
Mark UI elements with data attributes:
```tsx
<button data-tour="new-project">Create Project</button>
<div data-tour="dashboard-metrics">Metrics</div>
```

## Storage

Onboarding state is stored in localStorage as `onboarding-state`:

```json
{
  "currentStep": 1,
  "completed": false,
  "skipped": false,
  "dismissedTips": false
}
```

## Customization

### Add New Steps
Edit `mock-data.ts`:
```typescript
{
  id: 6,
  title: "New Feature",
  description: "Feature description",
  content: "Detailed content...",
  buttons: { back: true, next: true }
}
```

### Add New Tips
Edit `productTips` array:
```typescript
{
  id: 9,
  title: "New Tip",
  description: "Tip description",
  targetElement: "[data-tour='element-id']",
  position: "right"
}
```

## Styling

- Uses Tailwind CSS
- Gradient backgrounds
- Icons from lucide-react
- Responsive design

## Accessibility

- Keyboard navigation support
- Skip options available
- Clear progress indicators
- High contrast overlays

## Future Enhancements

- [ ] Video content in steps
- [ ] Animated illustrations
- [ ] Analytics tracking
- [ ] A/B testing variants
- [ ] Multi-language support
- [ ] Mobile-optimized tour
- [ ] Contextual tips in modals
- [ ] Completion rewards/points
