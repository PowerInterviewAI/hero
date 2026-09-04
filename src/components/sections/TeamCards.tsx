'use client';

import { useEffect, useState } from 'react';

import { SiGithub, SiX } from '@icons-pack/react-simple-icons';
import { LinkedinIcon, Mail, Send } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';

export interface TeamMemberConfig {
  username: string;
  role: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  telegram?: string;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
  email: string | null;
  html_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  public_repos: number;
  location: string | null;
  blog?: string;
}

interface GitHubSocialAccount {
  provider: string;
  url: string;
}

interface ContactLinks {
  email: string | null;
  x: string | null;
  telegram: string | null;
  linkedin: string | null;
}

type TeamMemberResult = { profile: GitHubUser; contacts: ContactLinks } | null;

export const TEAM: TeamMemberConfig[] = [
  {
    username: 'alpha5611331',
    role: 'Full Stack Developer',
    email: 'alpha5611331@gmail.com',
    twitter: 'https://x.com/alpha5611331',
    telegram: 'https://t.me/alpha5611331',
  },
  {
    username: 'anton-karlovskiy',
    role: 'Full Stack Developer',
    email: 'antonkarlovskiy@outlook.com',
  },
  {
    username: 'user2745',
    role: 'Full Stack Developer',
    linkedin: 'https://www.linkedin.com/in/kevin-kamto',
    twitter: 'https://twitter.com/theregoeskevin',
  },
];

function getHandleFromUrl(url: string) {
  const trimmed = url.replace(/\/+$/, '');
  const segments = trimmed.split('/');
  return segments[segments.length - 1] || trimmed;
}

function extractByRegex(value: string | null | undefined, pattern: RegExp): string | null {
  if (!value) return null;
  return value.match(pattern)?.[0] || null;
}

async function getTeamMemberProfile(member: TeamMemberConfig): Promise<TeamMemberResult> {
  try {
    const [profileResponse, socialResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${member.username}`, {
        headers: { accept: 'application/vnd.github+json' },
        signal: AbortSignal.timeout(6_000),
      }),
      fetch(`https://api.github.com/users/${member.username}/social_accounts`, {
        headers: { accept: 'application/vnd.github+json' },
        signal: AbortSignal.timeout(6_000),
      }),
    ]);

    if (!profileResponse.ok) return null;

    const profile = (await profileResponse.json()) as GitHubUser;
    const socialAccounts = socialResponse.ok
      ? ((await socialResponse.json()) as GitHubSocialAccount[])
      : [];

    const xFromSocial = socialAccounts.find((account) =>
      /(?:x\.com|twitter\.com)/i.test(account.url)
    )?.url;
    const telegramFromSocial = socialAccounts.find((account) =>
      /(?:t\.me|telegram\.me)/i.test(account.url)
    )?.url;
    const linkedinFromSocial = socialAccounts.find((account) =>
      /linkedin\.com/i.test(account.url)
    )?.url;

    const xFromText =
      extractByRegex(profile.bio, /https?:\/\/(?:x\.com|twitter\.com)\/[A-Za-z0-9_]+/i) ||
      extractByRegex(profile.blog, /https?:\/\/(?:x\.com|twitter\.com)\/[A-Za-z0-9_]+/i);
    const telegramFromText =
      extractByRegex(profile.bio, /https?:\/\/(?:t\.me|telegram\.me)\/[A-Za-z0-9_]+/i) ||
      extractByRegex(profile.blog, /https?:\/\/(?:t\.me|telegram\.me)\/[A-Za-z0-9_]+/i);

    return {
      profile,
      contacts: {
        email: profile.email || member.email || null,
        x: xFromSocial || xFromText || member.twitter || null,
        telegram: telegramFromSocial || telegramFromText || member.telegram || null,
        linkedin: linkedinFromSocial || member.linkedin || null,
      },
    };
  } catch (error) {
    console.warn(`Failed to fetch GitHub profile for ${member.username}:`, error);
    return null;
  }
}

// GitHub profiles used to be fetched server-side, which meant the /team route
// (and the home page's preview) blocked on 6 unauthenticated GitHub calls
// before Next could render anything - a slow or rate-limited response held up
// navigation for every visitor. Fetching here instead, the same way
// useLatestVersion fetches releases, means the cards paint immediately with
// their no-data fallback (already how every field below degrades) and quietly
// upgrade once GitHub responds - never blocking the page itself.
const PROFILE_CACHE_KEY = 'pia-team-profiles';
const PROFILE_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour, was next:{revalidate:3600}

function readCachedProfiles(): TeamMemberResult[] | undefined {
  try {
    const cached = window.localStorage.getItem(PROFILE_CACHE_KEY);
    if (!cached) return undefined;
    const { results, fetchedAt } = JSON.parse(cached) as {
      results: TeamMemberResult[];
      fetchedAt: number;
    };
    if (Date.now() - fetchedAt > PROFILE_CACHE_TTL_MS) return undefined;
    return results;
  } catch {
    return undefined;
  }
}

function writeCachedProfiles(results: TeamMemberResult[]): void {
  try {
    window.localStorage.setItem(
      PROFILE_CACHE_KEY,
      JSON.stringify({ results, fetchedAt: Date.now() })
    );
  } catch {
    // storage unavailable (e.g. private browsing) or full - non-fatal
  }
}

function useTeamProfiles(): (TeamMemberResult | undefined)[] {
  const [results, setResults] = useState<(TeamMemberResult | undefined)[]>(() =>
    TEAM.map(() => undefined)
  );

  useEffect(() => {
    const cached = readCachedProfiles();
    if (cached) {
      setResults(cached);
      return;
    }

    let mounted = true;

    Promise.all(TEAM.map(getTeamMemberProfile)).then((fetched) => {
      if (!mounted) return;
      setResults(fetched);
      writeCachedProfiles(fetched);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return results;
}

const LINK_CLASS =
  'inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground';

export const TeamCards: React.FC<{ preview?: boolean }> = ({ preview = false }) => {
  const results = useTeamProfiles();

  return (
    <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
      {TEAM.map((member, index) => {
        const result = results[index];
        const profile = result?.profile;
        const contact = result?.contacts;

        return (
          <Reveal key={member.username} delay={index * 80}>
            <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                {profile?.avatar_url ? (
                  <a
                    href={profile.html_url || `https://github.com/${member.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${member.username}'s GitHub profile`}
                  >
                    <img
                      src={profile.avatar_url}
                      alt=""
                      width={56}
                      height={56}
                      loading="lazy"
                      className="size-14 rounded-full border border-border transition-opacity hover:opacity-80"
                    />
                  </a>
                ) : (
                  <div className="size-14 shrink-0 rounded-full border border-border bg-muted" />
                )}
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-foreground">
                    {profile?.name || `@${member.username}`}
                  </p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>

              {preview ? null : (
                <>
                  <p className="min-h-10 text-sm leading-relaxed text-muted-foreground">
                    {profile?.bio || 'Building AI products and developer tools.'}
                  </p>

                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>{profile?.followers ?? 0} followers</span>
                    <span>{profile?.public_repos ?? 0} repos</span>
                    {profile?.location ? <span>{profile.location}</span> : null}
                  </div>

                  <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4 text-sm">
                    <a
                      href={profile?.html_url || `https://github.com/${member.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={LINK_CLASS}
                    >
                      <SiGithub className="size-4" />@{profile?.login || member.username}
                    </a>
                    {contact?.email ? (
                      <a href={`mailto:${contact.email}`} className={LINK_CLASS}>
                        <Mail className="size-4" />
                        {contact.email}
                      </a>
                    ) : null}
                    {contact?.x ? (
                      <a
                        href={contact.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={LINK_CLASS}
                      >
                        <SiX className="size-4" />@{getHandleFromUrl(contact.x)}
                      </a>
                    ) : null}
                    {contact?.telegram ? (
                      <a
                        href={contact.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={LINK_CLASS}
                      >
                        <Send className="size-4" />@{getHandleFromUrl(contact.telegram)}
                      </a>
                    ) : null}
                    {contact?.linkedin ? (
                      <a
                        href={contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={LINK_CLASS}
                      >
                        <LinkedinIcon className="size-4" />
                        {getHandleFromUrl(contact.linkedin)}
                      </a>
                    ) : null}
                  </div>
                </>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
};

export default TeamCards;
