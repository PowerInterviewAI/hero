/**
 * JSON-LD blocks, one per thing they describe.
 *
 * These used to all live in the root layout, which meant every route - /privacy,
 * /terms, every docs page - claimed to be a SoftwareApplication AND an FAQPage.
 * Structured data is supposed to describe the page it is on, so each block is
 * now mounted only where its content actually is:
 *
 *   Organization         root layout (site-wide identity, correct everywhere)
 *   SoftwareApplication  the home page, which is the page about the app
 *   FAQPage              /faq, the page that renders the full question list
 */
import { FAQ_ITEMS } from '@/config/faq';

const SITE_URL = 'https://www.powerinterviewai.com';
const SITE_NAME = 'Power Interview AI';

export const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Windows, macOS, Linux',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '20',
    highPrice: '500',
    priceCurrency: 'USD',
    offerCount: '3',
  },
  description:
    'Privacy-first AI interview assistant and meeting note taker with real-time transcription, mock interview practice, live AI suggestions, coding challenge assistance, and smart exports for Zoom, Google Meet, and Microsoft Teams.',
  author: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.png`,
    sameAs: ['https://github.com/PowerInterviewAI/client-app', 'https://t.me/power_interview_ai'],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '156',
  },
  screenshot: `${SITE_URL}/logo.png`,
  featureList: [
    '1-hour free trial with our free model - no rate limits, no interruptions',
    'Live transcription with speaker detection',
    'AI-powered reply and code suggestions',
    'Mock interview practice',
    'AI-powered meeting note taker for Zoom, Google Meet, Microsoft Teams',
    'Smart export with AI summaries and action items',
    'Bring your own LLM provider',
    'Stealth mode with hotkeys',
    'Privacy-first local data storage',
  ],
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  description:
    'Privacy-first AI interview assistant and meeting note taker for interviews, mock interviews, and business calls. Supports Zoom, Google Meet, Microsoft Teams, and more.',
  email: 'team@vectorleappulse.xyz',
  sameAs: ['https://github.com/PowerInterviewAI/client-app', 'https://t.me/power_interview_ai'],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'team@vectorleappulse.xyz',
    contactType: 'Customer Support',
  },
};

export const faqPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  // Derived from the same array FAQSection renders, so the rich result can't
  // drift from the page the way two hand-maintained copies did.
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};
