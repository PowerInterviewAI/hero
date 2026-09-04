import { Suspense } from 'react';

import type { Metadata } from 'next';

import { HomeContent } from '@/components/HomeContent';
import { SoftwareApplicationJsonLd } from '@/components/SoftwareApplicationJsonLd';
import {
  BenefitsSection,
  ContactSection,
  FeaturesSection,
  HowItWorksSection,
  PricingSection,
  PricingSkeleton,
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
      {/* The page that is actually about the app carries its schema. Behind
          its own Suspense boundary so the plans fetch it needs (same request
          PricingSection makes; React memoizes fetch across one render, so the
          schema's prices are the ones the page renders rather than a second,
          hardcoded set that could disagree with them) can't block the rest of
          the page - including the Hero, which needs none of this data. */}
      <Suspense fallback={null}>
        <SoftwareApplicationJsonLd />
      </Suspense>
      <HomeContent
        howItWorksSection={<HowItWorksSection preview />}
        featuresSection={<FeaturesSection />}
        benefitsSection={<BenefitsSection />}
        whyChooseSection={<WhyChooseSection />}
        pricingSection={
          <Suspense fallback={<PricingSkeleton />}>
            <PricingSection preview />
          </Suspense>
        }
        testimonialsSection={<TestimonialsSection />}
        contactSection={<ContactSection />}
        teamSection={<TeamSection preview />}
      />
    </>
  );
}
