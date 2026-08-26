'use client';

import { type ReactNode, useState } from 'react';

import { FAQSection, FooterSection, Header, HeroSection } from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

interface HomeContentProps {
  featuresSection: ReactNode;
  benefitsSection: ReactNode;
  whyChooseSection: ReactNode;
  pricingSection: ReactNode;
  contactSection: ReactNode;
  // coFoundersSection: ReactNode;
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
  benefitsSection,
  whyChooseSection,
  pricingSection,
  contactSection,
  // coFoundersSection,
}: HomeContentProps) {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        scrollToSection={scrollToSection}
        toggleTheme={toggleTheme}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main>
        <HeroSection scrollToSection={scrollToSection} />
        {featuresSection}
        {benefitsSection}
        {whyChooseSection}
        {pricingSection}
        <FAQSection scrollToSection={scrollToSection} />
        {contactSection}
        {/* {coFoundersSection} */}
      </main>

      <FooterSection scrollToSection={scrollToSection} />
    </div>
  );
}

export default HomeContent;
