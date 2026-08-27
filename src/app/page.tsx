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
  TestimonialsSection,
  WhyChooseSection,
} from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Home',
  description:
    'New users get a full 1-hour free trial with our free model - no rate limits, no interruptions. Transform your interview performance with Power Interview AI, a privacy-first AI interview assistant and meeting note taker with real-time transcription, intelligent reply and code suggestions, and exportable session reports. Use your own LLM provider (OpenAI, Anthropic, Google, etc.) and get started instantly with included models based on your plan. Perfect for technical interviews, mock interviews, coding assessments, behavioral interviews, and meeting note taking.',
  path: '/',
});

export default function Home() {
  return (
    <HomeContent
      howItWorksSection={<HowItWorksSection />}
      featuresSection={<FeaturesSection />}
      benefitsSection={<BenefitsSection />}
      whyChooseSection={<WhyChooseSection />}
      pricingSection={
        <Suspense fallback={<PricingSkeleton />}>
          <PricingSection />
        </Suspense>
      }
      testimonialsSection={<TestimonialsSection />}
      contactSection={<ContactSection />}
    />
  );
}
