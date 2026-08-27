'use client';

import React from 'react';

import { FooterSection, Header } from '@/components/sections';

interface PageChromeProps {
  children: React.ReactNode;
  scrollToSection?: (sectionId: string) => void;
}

// Shared Header/Footer for every page except Home (which needs its own in-page
// scrollToSection wiring) and the legal pages. Theme and mobile-menu state now
// live inside Header/ThemeToggle rather than being drilled from here.
export const PageChrome: React.FC<PageChromeProps> = ({ children, scrollToSection }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header scrollToSection={scrollToSection} />
    <main className="flex-1">{children}</main>
    <FooterSection scrollToSection={scrollToSection} />
  </div>
);

export default PageChrome;
