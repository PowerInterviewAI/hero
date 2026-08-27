import React from 'react';

import { SkipToContent } from '@/components/SkipToContent';
import { FooterSection, Header } from '@/components/sections';

interface PageChromeProps {
  children: React.ReactNode;
}

// Shared Header/Footer for every page except the docs, which have their own
// sidebar layout. Theme and mobile-menu state live inside Header/ThemeToggle.
//
// This used to accept and forward a `scrollToSection` callback so the header
// could scroll instead of navigate on the home page. Nav items are plain links
// now, so there is nothing to thread through and nothing here that needs the
// browser - it is a Server Component again.
export const PageChrome: React.FC<PageChromeProps> = ({ children }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <SkipToContent />
    <Header />
    <main id="main" className="flex-1 scroll-mt-20">
      {children}
    </main>
    <FooterSection />
  </div>
);

export default PageChrome;
