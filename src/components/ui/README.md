# shadcn/ui Components

This directory contains UI components built with [shadcn/ui](https://ui.shadcn.com/).

## Available Components

### Button

A versatile button component with multiple variants and sizes.

**Variants:**

- `default` - Primary button style
- `destructive` - For destructive actions
- `outline` - Outlined button
- `secondary` - Secondary style
- `ghost` - Minimal style
- `link` - Link style

**Sizes:**

- `default` - Standard size
- `sm` - Small
- `lg` - Large
- `icon` - Icon-only button

**Example:**

```tsx
import { Button } from '@/components';

<Button variant="default" size="lg">
  Click me
</Button>;
```

### Card

A flexible card component for grouping content.

**Components:**

- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardContent` - Main content area
- `CardFooter` - Footer section

**Example:**

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
</Card>;
```

## Adding New Components

To add more shadcn/ui components:

1. Install required Radix UI dependencies manually with `--legacy-peer-deps`:

   ```bash
   npm install @radix-ui/[package-name] --legacy-peer-deps
   ```

2. Create the component file in `src/components/ui/[component-name].tsx`

3. Copy the component code from [ui.shadcn.com](https://ui.shadcn.com/)

4. Export the component in `src/components/index.ts`

## Using the CLI (Alternative)

Note: Due to peer dependency conflicts, you may need to configure npm to use `--legacy-peer-deps`:

```bash
# Create .npmrc file
echo "legacy-peer-deps=true" > .npmrc

# Then use shadcn CLI
npx shadcn@latest add [component-name]
```

## Utilities

The `cn()` utility function (in `src/lib/utils.ts`) is used for merging Tailwind CSS classes:

```tsx
import { cn } from '@/lib/utils';

<div className={cn('base-classes', conditionalClass && 'conditional-classes')} />;
```

## Theming

Colors and theme variables are defined in `src/styles/index.css`. The components automatically support dark mode through CSS variables.
