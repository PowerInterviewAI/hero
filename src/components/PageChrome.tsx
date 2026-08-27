'use client';

import React from 'react';

import { SkipToContent } from '@/components/SkipToContent';
import { FooterSection, Header } from '@/components/sections';

interface PageChromeProps {
  children: React.ReactNode;
  scrollToSection?: (sectionId: string) => void;
}

// Shared Header/Footer for every page except Home, which needs its own in-page
// scrollToSection wiring, and the docs, which have their own sidebar layout.
// The legal pages use this too now - they previously rendered no chrome at all.
// Theme and mobile-menu state live inside Header/ThemeToggle rather than being
// drilled from here.
export const PageChrome: React.FC<PageChromeProps> = ({ children, scrollToSection }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <SkipToContent />
    <Header scrollToSection={scrollToSection} />
    <main id="main" className="flex-1">
      {children}
    </main>
    <FooterSection scrollToSection={scrollToSection} />
  </div>
);

export default PageChrome;
