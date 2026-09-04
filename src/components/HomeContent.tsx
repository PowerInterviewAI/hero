import { type ReactNode } from 'react';

import { SkipToContent } from '@/components/SkipToContent';
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
  teamSection: ReactNode;
}

// The sections that fetch data are async Server Components, so the page
// (src/app/page.tsx) renders them and passes them in as already-resolved
// elements. The rest are imported directly.
//
// This was a Client Component purely to own `scrollToSection`, a DOM helper
// threaded down into Header, HeroSection, FAQSection and FooterSection so the
// nav could scroll rather than navigate. Those are all ordinary links now, so
// the callback - and the client boundary around the whole home page - is gone.
export function HomeContent({
  featuresSection,
  howItWorksSection,
  benefitsSection,
  whyChooseSection,
  pricingSection,
  testimonialsSection,
  contactSection,
  teamSection,
}: HomeContentProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SkipToContent />

      <Header />

      <main id="main" className="flex-1 scroll-mt-20">
        <HeroSection />
        {howItWorksSection}
        {featuresSection}
        {benefitsSection}
        {whyChooseSection}
        {pricingSection}
        {testimonialsSection}
        <InstallPanel />
        <FAQSection />
        {contactSection}
        {teamSection}
      </main>

      <FooterSection />
    </div>
  );
}

export default HomeContent;
