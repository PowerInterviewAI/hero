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
 *
 * Everything asserted here must be true of the page it sits on and visible to a
 * reader of that page. Markup that contradicts the page - invented ratings,
 * prices that don't match the ones rendered, platforms with no build - is a
 * Search policy violation, and the penalty lands on the whole domain.
 */
import { FAQ_ITEMS } from '@/config/faq';
import { Plan } from '@/types';

const SITE_URL = 'https://www.powerinterviewai.com';
const SITE_NAME = 'Power Interview AI';

/**
 * The home page's SoftwareApplication block.
 *
 * Takes the live plans so `offers` describes the packs the page actually
 * renders. It used to hardcode lowPrice 20 / highPrice 500 / offerCount 3
 * against a price list fetched at request time, so the markup was free to
 * drift from the visible pricing - and structured data that contradicts the
 * page is a Search policy violation, not just a stale number.
 *
 * There is deliberately no `aggregateRating`. It used to claim 4.8 from 156
 * ratings while `src/config/testimonials.ts` is an empty array and no rating,
 * review or vote appears anywhere on the site. Google requires review markup to
 * reflect ratings genuinely visible on the page; inventing them risks a manual
 * action against the whole domain. That file's own comment already spells this
 * out - "fabricated testimonials on a page that also emits Product/Review
 * structured data are both a trust problem and a search-policy violation" - and
 * this block was the violation it was warning about. Restore it only when real
 * ratings are collected and shown, and derive it from that same data.
 */
export function buildSoftwareApplicationJsonLd(plans: Plan[] | null) {
  const prices = (plans ?? []).map((plan) => plan.price_usd).filter((n) => Number.isFinite(n));

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    applicationCategory: 'BusinessApplication',
    // The site ships installers for these two only - the third was never
    // offered, and claiming a platform you don't build for is a support ticket.
    operatingSystem: 'Windows, macOS',
    description:
      'Privacy-first AI interview assistant and meeting note taker with real-time transcription, mock interview practice, live AI suggestions, coding challenge assistance, and smart exports for Zoom, Google Meet, and Microsoft Teams.',
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
      sameAs: ['https://github.com/PowerInterviewAI/client-app', 'https://t.me/power_interview_ai'],
    },
    // Real frames from the demo clips. This was /logo.png, which is not a
    // screenshot of anything.
    screenshot: [
      `${SITE_URL}/media/marketing/poster-live-interview.jpg`,
      `${SITE_URL}/media/marketing/poster-coding-1.jpg`,
    ],
    ...(prices.length > 0 && {
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: String(Math.min(...prices)),
        highPrice: String(Math.max(...prices)),
        priceCurrency: 'USD',
        offerCount: String(prices.length),
      },
    }),
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
}

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
