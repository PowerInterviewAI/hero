import { buildSoftwareApplicationJsonLd } from '@/lib/jsonLd';
import { getPlans } from '@/lib/plans';

/**
 * Split out of page.tsx so the plans fetch it needs sits behind its own
 * Suspense boundary instead of blocking the whole home page (including the
 * Hero, which needs none of this data) on every request.
 */
export async function SoftwareApplicationJsonLd() {
  const plans = await getPlans();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildSoftwareApplicationJsonLd(plans)),
      }}
    />
  );
}

export default SoftwareApplicationJsonLd;
