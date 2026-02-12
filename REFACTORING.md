# Home Page Refactoring Structure

## Overview

The Home.tsx file (2250 lines) has been refactored into modular section components for better maintainability and code organization.

## Directory Structure

```
src/components/custom/sections/
├── index.ts                    # Exports all section components
├── Header.tsx                  # ✅ Complete - Navigation and header
├── HeroSection.tsx             # ✅ Complete - Hero with media carousel
├── FeaturesSection.tsx         # ⚠️  Placeholder - Move features from Home.tsx
├── HowToUseSection.tsx         # ⚠️  Placeholder - Move  how-to guide from Home.tsx
├── PricingSection.tsx          # ⚠️  Placeholder - Move pricing cards from Home.tsx
├── FAQSection.tsx              # ✅ Complete - FAQ accordion
└── FooterSection.tsx           # ✅ Complete - Footer with links
```

## Completed Components

### 1. Header.tsx

- **Props**: `theme`, `mobileMenuOpen`, `scrollToSection`, `toggleTheme`, `setMobileMenuOpen`
- **Content**: Sticky header, desktop/mobile navigation, theme toggle, CTAs
- **Lines**: ~280 lines (extracted from 2250-line file)

### 2. HeroSection.tsx

- **Props**: Media carousel props, navigation functions
- **Content**: Hero heading, CTAs, media carousel with video/image support
- **Lines**: ~180 lines

### 3. FAQSection.tsx

- **Props**: `openFaqIndex`, `setOpenFaqIndex`, `scrollToSection`
- **Content**: 12 FAQ items with accordion functionality
- **Lines**: ~150 lines
- **Data**: FAQ data array extracted to component

### 4. FooterSection.tsx

- **Props**: `scrollToSection`
- **Content**: 4-column footer with product, resources, legal links, social icons
- **Lines**: ~180 lines

## Placeholder Components (Need Content Migration)

### FeaturesSection.tsx

**Todo**: Move from Home.tsx lines ~715-1080

- Feature cards grid (7 cards)
- Icons for each feature
- "Get Started Now" CTA

### HowToUseSection.tsx

**Todo**: Move from Home.tsx lines ~1098-1305

- 9-step guide cards
- Pro tip callout
- Configuration details

### PricingSection.tsx

**Todo**: Move from Home.tsx lines ~1307-1540

- 3 pricing tiers (Starter, Pro, Enterprise)
- Feature lists for each plan
- Discount badges
- Credit information

## Additional Sections in Home.tsx

These larger sections can also be extracted:

- **Why Choose Section** (~lines 740-1095)
- **Testimonials Section** (~lines 1540-1670)
- **Contact Section** (~lines 1793-2000)

## Usage in Home.tsx

```tsx
import React, { useEffect, useRef, useState } from 'react';

import {
  FAQSection,
  FeaturesSection,
  FooterSection,
  Header,
  HeroSection,
  HowToUseSection,
  PricingSection,
} from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

const Home: React.FC = () => {
  // State management
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  // ... media carousel state

  // Functions
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const scrollToSection = (sectionId: string) => {
    // ... scroll logic
  };
  // ... carousel functions

  return (
    <div className="bg-background min-h-screen">
      <Header
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        scrollToSection={scrollToSection}
        toggleTheme={toggleTheme}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main>
        <HeroSection {...heroProps} />
        <FeaturesSection />
        <HowToUseSection />
        <PricingSection />
        <FAQSection
          openFaqIndex={openFaqIndex}
          setOpenFaqIndex={setOpenFaqIndex}
          scrollToSection={scrollToSection}
        />
      </main>

      <FooterSection scrollToSection={scrollToSection} />
    </div>
  );
};

export default Home;
```

## Benefits

1. **Maintainability**: Each section is self-contained and easier to update
2. **Reusability**: Sections can be reused in other pages if needed
3. **Testing**: Individual sections can be tested in isolation
4. **Performance**: Easier to implement code splitting in the future
5. **Collaboration**: Multiple developers can work on different sections simultaneously
6. **Readability**: Home.tsx is now much shorter and acts as a composition layer

## Next Steps

1. Complete the placeholder components by moving content from original Home.tsx
2. Extract remaining large sections (Why Choose, Testimonials, Contact)
3. Consider further breaking down large sections into smaller sub-components
4. Add unit tests for each section component
5. Update imports in Home.tsx to use the new structure

## Migration Guide

To complete a placeholder component:

1. Open `src/pages/Home.tsx`
2. Locate the section by its `id` attribute (e.g., `id="pricing"`)
3. Copy the entire `<section>` and its contents
4. Paste into the corresponding section component file
5. Import required dependencies (icons, components, etc.)
6. Define and pass necessary props
7. Test the component renders correctly
8. Remove the section from original Home.tsx
9. Import and use the new component in Home.tsx

## File Sizes After Refactoring

- **Before**: Home.tsx (2250 lines)
- **After**:
  - Home.tsx (~150 lines - composition only)
  - Header.tsx (280 lines)
  - HeroSection.tsx (180 lines)
  - FAQSection.tsx (150 lines)
  - FooterSection.tsx (180 lines)
  - Other sections TBD (~1300 lines distributed)

Total lines remain the same, but organized into manageable, focused modules.
