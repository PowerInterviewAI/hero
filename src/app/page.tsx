import { Suspense } from 'react';

import type { Metadata } from 'next';

import { HomeContent } from '@/components/HomeContent';
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
import { buildSoftwareApplicationJsonLd } from '@/lib/jsonLd';
import { buildMetadata } from '@/lib/metadata';
import { getPlans } from '@/lib/plans';

export const metadata: Metadata = buildMetadata({
  title: 'Power Interview AI - AI Interview Coach & Meeting Note Taker',
  absoluteTitle: true,
  description:
    'Privacy-first AI interview coach for Zoom, Google Meet and Teams. Live transcription, reply and code suggestions, hidden from screen share. 1 hour free.',
  path: '/',
});

export default async function Home() {
  // Same request PricingSection makes; React memoizes fetch across one render,
  // so the schema's prices are the ones the page renders rather than a second,
  // hardcoded set that could disagree with them.
  const plans = await getPlans();

  return (
    <>
      {/* The page that is actually about the app carries its schema. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildSoftwareApplicationJsonLd(plans)),
        }}
      />
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
