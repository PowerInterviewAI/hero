import { ENV } from '@/config/constants';
import { Plan } from '@/types';

/**
 * The live credit packs.
 *
 * Lifted out of PricingSection because the home page's SoftwareApplication
 * JSON-LD needs the same numbers: its `offers` block used to hardcode
 * lowPrice 20 / highPrice 500 / offerCount 3 while the visible pricing came
 * from this endpoint, so the structured data was free to disagree with the
 * page it described. Both callers render in the same pass, and React memoizes
 * `fetch` per request, so this still makes one request.
 *
 * Returns null rather than throwing - callers degrade to omitting pricing.
 */
export async function getPlans(): Promise<Plan[] | null> {
  try {
    const response = await fetch(`${ENV.apiBaseUrl}api/payment/plans`);
    if (!response.ok) {
      throw new Error('Failed to fetch plans');
    }
    return (await response.json()) as Plan[];
  } catch (err) {
    console.error('Error fetching plans:', err);
    return null;
  }
}
