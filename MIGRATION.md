# Component Migration Guide

## Overview

All custom components have been migrated to use **shadcn/ui** while maintaining backward compatibility with existing code.

## Migrated Components

### Button Component

**Location:** `src/components/Button.tsx`

The Button component now wraps the shadcn/ui Button, providing:

- ✅ All shadcn/ui features (accessibility, variants, Radix UI)
- ✅ Backward compatibility with original variant names
- ✅ Dark mode support
- ✅ Enhanced functionality (destructive, ghost, link variants)

**Variant Mapping:**

```tsx
// Original variants still work
'primary'   → 'default'  (shadcn)
'secondary' → 'secondary' (shadcn)
'outline'   → 'outline'   (shadcn)

// New variants available
'ghost'       → 'ghost'       (shadcn)
'destructive' → 'destructive' (shadcn)
'link'        → 'link'        (shadcn)
```

**Size Mapping:**

```tsx
'sm' → 'sm'      (shadcn)
'md' → 'default' (shadcn)
'lg' → 'lg'      (shadcn)
```

**Usage Examples:**

Old code continues to work:

```tsx
<Button variant="primary" size="md">
  Click me
</Button>
```

New variants available:

```tsx
<Button variant="destructive" size="lg">
  Delete
</Button>

<Button variant="ghost">
  Cancel
</Button>

<Button variant="link">
  Read more
</Button>
```

### Container Component

**Location:** `src/components/Container.tsx`

Updated to use the `cn()` utility function for better class name merging.

**Changes:**

- Uses `cn()` from `@/lib/utils` for proper Tailwind class merging
- Maintains same functionality and API
- Better handling of conditional classes

**Usage (unchanged):**

```tsx
<Container className="custom-class">
  <YourContent />
</Container>
```

## Component Exports

**Location:** `src/components/index.ts`

All components are exported for easy imports:

```tsx
// Custom wrapped components
import { Button, Container } from '@/components';
// Direct shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from '@/components';
// Or import shadcn Button directly if needed
import { Button as ShadcnButton } from '@/components';
```

## Benefits of Migration

### 1. Enhanced Accessibility

- Built on Radix UI primitives
- Proper ARIA attributes
- Keyboard navigation support

### 2. Consistent Design System

- Uses CSS variables for theming
- Automatic dark mode support
- Consistent spacing and sizing

### 3. Better Developer Experience

- TypeScript support with proper types
- Intellisense for all props
- Comprehensive variant system

### 4. Backward Compatibility

- Existing code continues to work
- No breaking changes to API
- Gradual migration path

### 5. Future-Ready

- Easy to add new shadcn components
- Maintained component library
- Active community support

## Adding New shadcn Components

1. Install required Radix UI dependencies:

   ```bash
   npm install @radix-ui/[component-name] --legacy-peer-deps
   ```

2. Create component file in `src/components/ui/[name].tsx`

3. Copy code from [ui.shadcn.com](https://ui.shadcn.com/)

4. Export in `src/components/index.ts`:

   ```tsx
   export * from './ui/[name]';
   ```

5. Use directly or create custom wrapper for compatibility

## Migration Checklist

- [x] Button component migrated and wrapped
- [x] Container component updated with cn()
- [x] Component exports organized
- [x] Backward compatibility maintained
- [x] TypeScript types updated
- [x] Code formatted and linted
- [x] No errors in build
- [x] Documentation updated

## Testing

All existing code using Button and Container should work without changes:

```tsx
// This still works ✅
<Button variant="primary" size="lg">
  Get Started
</Button>

// This also works ✅
<Container>
  <YourContent />
</Container>
```

New features are available immediately:

```tsx
// New variants ✨
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Cancel</Button>

// With icons (using lucide-react) ✨
import { ArrowRight } from 'lucide-react';

<Button>
  Next
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>
```

## Troubleshooting

### Type Errors

If you see TypeScript errors, ensure:

- All imports are from `@/components`
- Variant names are correct
- Props match ButtonProps interface

### Styling Issues

If styles don't apply correctly:

- Check that CSS variables are loaded (`src/styles/index.css`)
- Verify Tailwind config includes shadcn theme
- Use `cn()` for conditional classes

### Dark Mode

Dark mode is automatic via CSS variables. To customize:

- Edit `src/styles/index.css` dark mode variables
- Or use the `useTheme` hook from `@/hooks`

## Next Steps

1. **Review the changes** in your dev server
2. **Test existing functionality** to ensure compatibility
3. **Explore new variants** available in Button
4. **Add more shadcn components** as needed
5. **Update other custom components** to use shadcn when beneficial

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Components](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
