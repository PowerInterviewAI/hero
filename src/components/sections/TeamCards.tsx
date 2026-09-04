import { SiGithub, SiX } from '@icons-pack/react-simple-icons';
import { LinkedinIcon, Mail, Send } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';

interface TeamMember {
  username: string;
  role: string;
  avatarUrl: string;
  profileUrl: string;
  name: string;
  bio: string;
  followers: number;
  repos: number;
  location: string;
  email: string | null;
  x: string | null;
  telegram: string | null;
  linkedin: string | null;
}

/**
 * GitHub profile data (avatar, bio, follower counts, contact links) used to
 * be fetched live, client-side, on every visit - 6 unauthenticated GitHub
 * calls (3 members x profile + social_accounts) that could be slow or hit
 * GitHub's per-IP rate limit. These bios barely change, so it's hardcoded
 * instead: a snapshot taken from api.github.com on 2026-09-04. Update by hand
 * if a bio, avatar or contact link changes - there is no live source behind
 * this anymore.
 */
const TEAM: TeamMember[] = [
  {
    username: 'alpha5611331',
    role: 'Full Stack Developer',
    avatarUrl: 'https://avatars.githubusercontent.com/u/156915037?v=4',
    profileUrl: 'https://github.com/alpha5611331',
    name: 'alpha',
    bio: 'Senior Software Engineer | Agentic AI • LLM • Backend • Frontend',
    followers: 11,
    repos: 74,
    location: 'Universe',
    email: 'alpha5611331@gmail.com',
    x: 'https://x.com/alpha5611331',
    telegram: 'https://t.me/alpha5611331',
    linkedin: null,
  },
  {
    username: 'anton-karlovskiy',
    role: 'Full Stack Developer',
    avatarUrl: 'https://avatars.githubusercontent.com/u/49653735?v=4',
    profileUrl: 'https://github.com/anton-karlovskiy',
    name: 'Anton K.',
    bio: 'Full-stack AI/Blockchain/Web Engineer',
    followers: 518,
    repos: 160,
    location: 'Universe',
    email: 'antonkarlovskiy@outlook.com',
    x: 'https://x.com/antonkarlovskiy',
    telegram: 'https://t.me/anton_karlovskiy',
    linkedin: 'https://www.linkedin.com/in/anton-karlovskiy',
  },
  {
    username: 'user2745',
    role: 'Full Stack Developer',
    avatarUrl: 'https://avatars.githubusercontent.com/u/37010601?v=4',
    profileUrl: 'https://github.com/user2745',
    name: 'Math',
    bio: 'Building AI products and developer tools.',
    followers: 35,
    repos: 100,
    location: 'Global',
    email: null,
    x: 'https://twitter.com/theregoeskevin',
    telegram: null,
    linkedin: 'https://www.linkedin.com/in/kevin-kamto',
  },
];

function getHandleFromUrl(url: string) {
  const trimmed = url.replace(/\/+$/, '');
  const segments = trimmed.split('/');
  return segments[segments.length - 1] || trimmed;
}

const LINK_CLASS =
  'inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground';

export const TeamCards: React.FC = () => (
  <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
    {TEAM.map((member, index) => (
      <Reveal key={member.username} delay={index * 80}>
        <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <a
              href={member.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${member.username}'s GitHub profile`}
            >
              <img
                src={member.avatarUrl}
                alt=""
                width={56}
                height={56}
                loading="lazy"
                className="size-14 rounded-full border border-border transition-opacity hover:opacity-80"
              />
            </a>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-foreground">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>

          <p className="min-h-10 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>

          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>{member.followers} followers</span>
            <span>{member.repos} repos</span>
            <span>{member.location}</span>
          </div>

          <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4 text-sm">
            <a
              href={member.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS}
            >
              <SiGithub className="size-4" />@{member.username}
            </a>
            {member.email ? (
              <a href={`mailto:${member.email}`} className={LINK_CLASS}>
                <Mail className="size-4" />
                {member.email}
              </a>
            ) : null}
            {member.x ? (
              <a href={member.x} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                <SiX className="size-4" />@{getHandleFromUrl(member.x)}
              </a>
            ) : null}
            {member.telegram ? (
              <a
                href={member.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASS}
              >
                <Send className="size-4" />@{getHandleFromUrl(member.telegram)}
              </a>
            ) : null}
            {member.linkedin ? (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASS}
              >
                <LinkedinIcon className="size-4" />
                {getHandleFromUrl(member.linkedin)}
              </a>
            ) : null}
          </div>
        </div>
      </Reveal>
    ))}
  </div>
);

export default TeamCards;
