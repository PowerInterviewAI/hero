'use client';

import { type ReactNode } from 'react';

import {
  FAQSection,
  FooterSection,
  Header,
  HeroSection,
  InstallPanel,
} from '@/components/sections';

interface HomeContentProps {
  featuresSection: ReactNode;
  howItWorksSection: ReactNode;
  benefitsSection: ReactNode;
  whyChooseSection: ReactNode;
  pricingSection: ReactNode;
  testimonialsSection: ReactNode;
  contactSection: ReactNode;
}

// Header/HeroSection/FAQSection/FooterSection stay directly imported here
// since they're genuinely interactive (nav state, carousel, accordion) and
// this whole component is already a client boundary. The rest are Server
// Components rendered by the page (src/app/page.tsx) and passed in as
// already-resolved elements - a Client Component can't import and
// instantiate a Server Component itself (and two of these are async, which
// flat out isn't supported outside a Server Component tree).
export function HomeContent({
  featuresSection,
  howItWorksSection,
  benefitsSection,
  whyChooseSection,
  pricingSection,
  testimonialsSection,
  contactSection,
}: HomeContentProps) {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Header scrollToSection={scrollToSection} />

      <main id="main" className="flex-1">
        <HeroSection scrollToSection={scrollToSection} />
        {howItWorksSection}
        {featuresSection}
        {benefitsSection}
        {whyChooseSection}
        {pricingSection}
        {testimonialsSection}
        <InstallPanel />
        <FAQSection scrollToSection={scrollToSection} />
        {contactSection}
      </main>

      <FooterSection scrollToSection={scrollToSection} />
    </div>
  );
}

export default HomeContent;
