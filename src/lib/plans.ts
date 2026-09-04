import { ENV } from '@/config/constants';
import { Plan } from '@/types';

/**
 * The live credit packs.
 *
 * Originally shared between PricingSection and the home page's
 * SoftwareApplication JSON-LD so its `offers` block couldn't drift from the
 * visible pricing (it used to hardcode lowPrice 20 / highPrice 500 /
 * offerCount 3 against a live price list). SoftwareApplicationJsonLd still
 * calls this server-side, inside its own Suspense boundary. The visible
 * pricing cards (PricingCards.tsx) call it again independently, client-side,
 * so a slow or rate-limited response can't block navigation to /pricing the
 * way it used to - the two are separate requests now rather than one
 * memoized fetch, which is an acceptable trade for never blocking the page.
 *
 * Returns null rather than throwing - callers degrade to omitting pricing.
 */
export async function getPlans(): Promise<Plan[] | null> {
  try {
    const response = await fetch(`${ENV.apiBaseUrl}api/payment/plans`, {
      signal: AbortSignal.timeout(6_000),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch plans');
    }
    return (await response.json()) as Plan[];
  } catch (err) {
    console.error('Error fetching plans:', err);
    return null;
  }
}
