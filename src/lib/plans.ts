import { Plan } from '@/types';

/**
 * The credit packs, mirrored from backend/app/cfg/payment.py's CREDIT_PLANS
 * (as of writing: starter $5/600, pro $20/3000 - popular, enterprise
 * $150/30000).
 *
 * This used to be fetched live on every page load/click, which meant /pricing
 * and the home page waited on a backend round trip just to show a price list
 * that changes rarely. Hardcoded instead - there is no shared source between
 * the two repos, so if CREDIT_PLANS changes in the backend, update this list
 * to match by hand.
 */
const PLANS: Plan[] = [
  { plan: 'starter', credits: 600, price_usd: 5, popular: false },
  { plan: 'pro', credits: 3000, price_usd: 20, popular: true },
  { plan: 'enterprise', credits: 30000, price_usd: 150, popular: false },
];

export function getPlans(): Plan[] {
  return PLANS;
}
