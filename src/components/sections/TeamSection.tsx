import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Section, SectionHeading } from '@/components/ui/section';
import { ROUTES, SECTIONS } from '@/config/routes';

import { TeamCards } from './TeamCards';

interface TeamSectionProps {
  /** Set on the standalone /team route so the section owns the h1. */
  standalone?: boolean;
  /**
   * Home-page treatment: avatar, name and role only, plus a link across to
   * /team for bios, stats and contact links. Mirrors the condensed treatment
   * HowItWorksSection, PricingSection and FAQSection already use, so the same
   * profile isn't rendered in full on two URLs.
   */
  preview?: boolean;
}

/**
 * Rendered as the route-level loading.tsx fallback for /team while its JS
 * chunk loads. TeamSection itself no longer needs this: the GitHub profile
 * fetch now happens client-side in TeamCards, so this section paints
 * immediately with the same placeholder look these bars approximate.
 * Deliberately carries no id, same reasoning as PricingSkeleton: TeamSection
 * itself owns `id={SECTIONS.team}`, and an anchor target has to be the
 * element that survives.
 */
export const TeamSkeleton = () => (
  <Section aria-label="Loading team">
    <SectionHeading
      eyebrow="Team"
      title="Our Team"
      description="Meet the builders behind Power Interview AI."
    />
    <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center gap-3">
            <div className="size-14 shrink-0 animate-pulse rounded-full bg-muted" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="h-4 w-2/5 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/4 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

/**
 * GitHub profile enrichment (avatar, bio, follower counts, contact links)
 * fetches client-side in TeamCards, the same pattern TrustStrip and
 * useLatestVersion already use for this site's other GitHub/backend calls.
 * That used to be 6 unauthenticated GitHub calls awaited server-side with no
 * Suspense boundary, which meant a slow or rate-limited GitHub response
 * blocked navigation to /team (and the home page) for every visitor. This
 * section is now synchronous and paints instantly; the cards degrade to
 * `@username` + a placeholder avatar until GitHub responds, which is already
 * the look for a failed fetch, so there's nothing to flash in later but the
 * real data.
 */
export const TeamSection = ({ standalone = false, preview = false }: TeamSectionProps) => (
  <Section id={SECTIONS.team} tone="muted" aria-labelledby="team-heading">
    <SectionHeading
      id="team-heading"
      as={standalone ? 'h1' : 'h2'}
      eyebrow="Team"
      title="Our Team"
      description="Meet the builders behind Power Interview AI."
    />

    <TeamCards preview={preview} />

    {preview && (
      <div className="mt-10 flex justify-center">
        <Button variant="ghost" size="lg" asChild>
          <Link href={ROUTES.team}>
            Meet the full team
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    )}
  </Section>
);

export default TeamSection;
