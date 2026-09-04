import React from 'react';

import { SiDiscord, SiGithub, SiProtonmail, SiTelegram, SiX } from '@icons-pack/react-simple-icons';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/Container';
import { DownloadCta } from '@/components/DownloadCta';
import { NavLink } from '@/components/NavLink';
import { Glow } from '@/components/ui/glow';
import { DOWNLOAD_HREF, ROUTES, SECTIONS, homeAnchor } from '@/config/routes';

const LINK_CLASS = 'text-sm text-muted-foreground transition-colors hover:text-foreground';

const SOCIALS = [
  { icon: SiGithub, label: 'GitHub', href: 'https://github.com/PowerInterviewAI/client-app' },
  { icon: SiTelegram, label: 'Telegram', href: 'https://t.me/power_interview_ai' },
  { icon: SiX, label: 'X', href: 'https://x.com/power_interview' },
  { icon: SiDiscord, label: 'Discord', href: 'https://discord.gg/TJJp5azK7Z' },
  { icon: SiProtonmail, label: 'Email', href: 'mailto:team@vectorleappulse.xyz' },
] as const;

const RESOURCE_LINKS = [
  { label: 'GitHub', href: 'https://github.com/PowerInterviewAI/client-app' },
  { label: 'Telegram channel', href: 'https://t.me/power_interview_ai' },
  { label: 'Discord server', href: 'https://discord.gg/TJJp5azK7Z' },
] as const;

/**
 * Anchors live here rather than in the header.
 *
 * A footer linking to `/#features` is conventional and unambiguous - it is a
 * real, copyable URL that behaves the same on every route. The header is
 * routes only; see src/config/routes.ts.
 */
export const FooterSection: React.FC = () => {
  return (
    <>
      {/* Pre-footer CTA band */}
      <section className="glow-surface relative isolate border-t border-border bg-surface-1 py-16 md:py-20">
        <Glow position="bottom" intensity="subtle" />
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
            <h2 className="text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Your next interview is the one to get right
            </h2>
            <p className="text-pretty text-muted-foreground">
              One hour free on us, running against a real call. Windows and macOS.
            </p>
            <DownloadCta size="lg">
              Download Power Interview AI
              <ArrowRight />
            </DownloadCta>
          </div>
        </Container>
      </section>

      <footer className="border-t border-border py-12 md:py-16" role="contentinfo">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <Link href={ROUTES.home} className="mb-4 flex w-fit items-center gap-2.5">
                <Image
                  src="/logo.png"
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 rounded-md"
                />
                <span className="font-display font-semibold">Power Interview AI</span>
              </Link>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                Your personal AI-powered interview coach. Privacy-first, and invisible on the call.
              </p>
              <div className="flex gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label={social.label}
                  >
                    <social.icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <nav aria-labelledby="footer-product">
              <h3 id="footer-product" className="mb-4 text-sm font-semibold">
                Product
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <NavLink
                    label="How it works"
                    href={ROUTES.howItWorks}
                    className={LINK_CLASS}
                    prefetch={false}
                  />
                </li>
                <li>
                  <NavLink
                    label="Features"
                    href={homeAnchor(SECTIONS.features)}
                    className={LINK_CLASS}
                    prefetch={false}
                  />
                </li>
                <li>
                  <NavLink
                    label="Pricing"
                    href={ROUTES.pricing}
                    className={LINK_CLASS}
                    prefetch={false}
                  />
                </li>
                <li>
                  {/* Same destination as the header's Download button. These
                      two used to disagree - the header scrolled to the top of
                      the home page, this one left for GitHub. */}
                  <NavLink
                    label="Download"
                    href={DOWNLOAD_HREF}
                    className={LINK_CLASS}
                    prefetch={false}
                  />
                </li>
                <li>
                  <Link href={ROUTES.docs} prefetch={false} className={LINK_CLASS}>
                    Documentation
                  </Link>
                </li>
                <li>
                  <NavLink
                    label="Our Team"
                    href={ROUTES.team}
                    className={LINK_CLASS}
                    prefetch={false}
                  />
                </li>
              </ul>
            </nav>

            <nav aria-labelledby="footer-resources">
              <h3 id="footer-resources" className="mb-4 text-sm font-semibold">
                Resources
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <NavLink label="FAQ" href={ROUTES.faq} className={LINK_CLASS} prefetch={false} />
                </li>
                {RESOURCE_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={LINK_CLASS}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <NavLink
                    label="Support"
                    href={homeAnchor(SECTIONS.contact)}
                    className={LINK_CLASS}
                    prefetch={false}
                  />
                </li>
              </ul>
            </nav>

            <nav aria-labelledby="footer-legal">
              <h3 id="footer-legal" className="mb-4 text-sm font-semibold">
                Legal
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href={ROUTES.privacy} prefetch={false} className={LINK_CLASS}>
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href={ROUTES.terms} prefetch={false} className={LINK_CLASS}>
                    Terms of service
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/PowerInterviewAI/client-app/blob/main/LICENSE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    License
                  </a>
                </li>
                <li>
                  <NavLink
                    label="Contact"
                    href={homeAnchor(SECTIONS.contact)}
                    className={LINK_CLASS}
                    prefetch={false}
                  />
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-12 flex flex-col items-center gap-2 border-t border-border pt-8 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
            <p>
              &copy; {new Date().getFullYear()} VectorLeap Pulse Innovation LTD. All rights
              reserved.
            </p>
            <p>Made to help you ace your interviews while protecting your privacy.</p>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default FooterSection;
