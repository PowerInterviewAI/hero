import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';

import { TeamCards } from './TeamCards';

interface TeamSectionProps {
  /** Set on the standalone /team route so the section owns the h1. */
  standalone?: boolean;
}

/**
 * Rendered as the route-level loading.tsx fallback for /team while its JS
 * chunk loads - the only gap left to cover, now that TeamCards reads
 * hardcoded profile data instead of fetching it from GitHub.
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
 * Full team profiles (bio, stats, contact links), on the home page and /team
 * alike - not condensed to avatar/name/role with a link across, the way this
 * section used to work. With the header nav always pointing at the home
 * anchor (see NAV_LINKS in routes.ts), a reader landing here via the nav is
 * already where they're going. /team itself is unchanged - still a real,
 * indexable page for direct links and search results.
 *
 * GitHub profile data (avatar, bio, follower counts, contact links) is
 * hardcoded in TeamCards rather than fetched. That used to be 6
 * unauthenticated GitHub calls awaited server-side with no Suspense
 * boundary, which meant a slow or rate-limited GitHub response blocked
 * navigation to /team (and the home page) for every visitor. Hardcoding
 * removed the dependency entirely rather than just deferring it - see
 * TeamCards.tsx for the trade-off (a snapshot that goes stale until updated
 * by hand).
 */
export const TeamSection = ({ standalone = false }: TeamSectionProps) => (
  <Section id={SECTIONS.team} tone="muted" aria-labelledby="team-heading">
    <SectionHeading
      id="team-heading"
      as={standalone ? 'h1' : 'h2'}
      eyebrow="Team"
      title="Our Team"
      description="Meet the builders behind Power Interview AI."
    />

    <TeamCards />
  </Section>
);

export default TeamSection;
