import React from 'react';

import { SiDiscord, SiGithub, SiProtonmail, SiTelegram, SiX } from '@icons-pack/react-simple-icons';
import { ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';

interface Channel {
  icon: typeof SiGithub;
  name: string;
  handle: string;
  blurb: string;
  href: string;
  external?: boolean;
}

const CHANNELS: Channel[] = [
  {
    icon: SiProtonmail,
    name: 'Email',
    handle: 'team@vectorleappulse.xyz',
    blurb: 'Detailed enquiries, billing, and refunds',
    href: 'mailto:team@vectorleappulse.xyz',
  },
  {
    icon: SiGithub,
    name: 'GitHub',
    handle: 'PowerInterviewAI/client-app',
    blurb: 'Releases, issues, and source',
    href: 'https://github.com/PowerInterviewAI/client-app',
    external: true,
  },
  {
    icon: SiTelegram,
    name: 'Telegram',
    handle: '@power_interview_ai',
    blurb: 'Announcements and quick questions',
    href: 'https://t.me/power_interview_ai',
    external: true,
  },
  {
    icon: SiDiscord,
    name: 'Discord',
    handle: 'Community server',
    blurb: 'Chat with other candidates and the team',
    href: 'https://discord.gg/TJJp5azK7Z',
    external: true,
  },
  {
    icon: SiX,
    name: 'X',
    handle: '@power_interview',
    blurb: 'Product updates',
    href: 'https://x.com/power_interview',
    external: true,
  },
];

export const ContactSection: React.FC = () => (
  <Section id="contact" tone="muted" aria-labelledby="contact-heading">
    <SectionHeading
      id="contact-heading"
      eyebrow="Contact"
      title="Get in touch"
      description="Questions, billing, or a bug during a call - pick whichever channel suits you."
    />

    <div className="mx-auto mt-14 grid max-w-4xl gap-3 sm:grid-cols-2">
      {CHANNELS.map((channel, index) => (
        <Reveal key={channel.name} delay={Math.min(index, 4) * 60}>
          <a
            href={channel.href}
            target={channel.external ? '_blank' : undefined}
            rel={channel.external ? 'noopener noreferrer' : undefined}
            className="group flex h-full items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
              <channel.icon className="size-5" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span className="font-medium text-foreground">{channel.name}</span>
                <ArrowUpRight
                  className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-0.5 block truncate font-mono text-xs text-primary">
                {channel.handle}
              </span>
              <span className="mt-1.5 block text-sm text-muted-foreground">{channel.blurb}</span>
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default ContactSection;
