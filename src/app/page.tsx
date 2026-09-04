import type { Metadata } from 'next';

import { HomeContent } from '@/components/HomeContent';
import { SoftwareApplicationJsonLd } from '@/components/SoftwareApplicationJsonLd';
import {
  BenefitsSection,
  ContactSection,
  FeaturesSection,
  HowItWorksSection,
  PricingSection,
  TeamSection,
  TestimonialsSection,
  WhyChooseSection,
} from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Power Interview AI - AI Interview Coach & Meeting Note Taker',
  absoluteTitle: true,
  description:
    'Privacy-first AI interview coach for Zoom, Google Meet and Teams. Live transcription, reply and code suggestions, hidden from screen share. 1 hour free.',
  path: '/',
});

export default function Home() {
  return (
    <>
      {/* The page that is actually about the app carries its schema. */}
      <SoftwareApplicationJsonLd />
      <HomeContent
        howItWorksSection={<HowItWorksSection preview />}
        featuresSection={<FeaturesSection />}
        benefitsSection={<BenefitsSection />}
        whyChooseSection={<WhyChooseSection />}
        pricingSection={<PricingSection preview />}
        testimonialsSection={<TestimonialsSection />}
        contactSection={<ContactSection />}
        teamSection={<TeamSection preview />}
      />
    </>
  );
}
