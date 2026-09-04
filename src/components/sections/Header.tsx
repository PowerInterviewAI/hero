'use client';

import React, { useEffect, useState } from 'react';

import { SiGithub } from '@icons-pack/react-simple-icons';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Container from '@/components/Container';
import { NavLink } from '@/components/NavLink';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DOWNLOAD_HREF, NAV_LINKS, ROUTES, homeAnchor } from '@/config/routes';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/utils';

const GITHUB_URL = 'https://github.com/PowerInterviewAI/client-app';

/**
 * An item with a matching home section (see NAV_LINKS in routes.ts) always
 * links to its `/#section` anchor here, from any page - clicking Pricing
 * from /faq goes to `/#pricing`, not `/pricing`. The standalone route itself
 * is untouched: still indexable, still what a search result or a bookmark
 * lands on, still what the footer links to directly (see FooterSection,
 * which isn't part of this and links to the real route always). This is
 * only about where the header's own links point.
 *
 * On the home page, `isActive` compares against the URL hash instead of the
 * path, since every item there shares the same path ("/") and only the hash
 * tells them apart - it updates on `hashchange`, which fires for both a nav
 * click and a direct visit to `/#pricing`. This tracks the hash the address
 * bar shows, not which section has scrolled into view - it won't follow a
 * reader who scrolls past Pricing without clicking anything, only
 * intentional navigation to a section. Off the home page, `isActive` falls
 * back to comparing the path against the item's real route, so landing on
 * /faq directly still lights up FAQ correctly.
 */
export const Header: React.FC = () => {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState('');
  const isHome = pathname === ROUTES.home;

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  const isActive = (link: (typeof NAV_LINKS)[number]) => {
    if (link.matchSubtree) return pathname.startsWith(link.href);
    if (isHome) return link.section ? hash === `#${link.section}` : hash === '';
    return pathname === link.href;
  };

  // Every item with a home section always links to its anchor, from any
  // page - the standalone route (link.href) still exists, is still indexed,
  // and is still what a search result, a bookmark or a footer link lands on
  // (see FooterSection, which links to link.href directly and is unaffected
  // by this). The header just never uses it for its own links anymore.
  const linkHref = (link: (typeof NAV_LINKS)[number]) =>
    link.section ? homeAnchor(link.section) : link.href;

  // Same-page hash links skip Next's router entirely - see plainAnchor on
  // NavLink for the concatenated-hash bug this avoids. A hash link that also
  // changes the page (clicking Pricing from /faq) doesn't hit that bug -
  // Next's router only mishandles a hash change on the *same* route - so it
  // stays a <Link> for the fast client-side transition.
  const isPlainAnchor = (link: (typeof NAV_LINKS)[number]) => isHome && !!link.section;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-colors duration-300',
        // Transparent over the hero, then resolving into a solid bar on scroll.
        scrolled
          ? 'border-border bg-background/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      )}
      role="banner"
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href={ROUTES.home}
            className="flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-lg"
              priority
            />
            <span className="font-display text-base font-semibold tracking-tight">
              Power Interview AI
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                href={linkHref(link)}
                underline
                active={isActive(link)}
                prefetch={false}
                plainAnchor={isPlainAnchor(link)}
              />
            ))}
          </nav>

          <div className="hidden items-center gap-1 md:flex">
            <ThemeToggle />
            <Button variant="ghost" size="icon" asChild>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Power Interview AI on GitHub"
                className="text-muted-foreground hover:text-foreground"
              >
                <SiGithub className="size-4" />
              </a>
            </Button>
            <Button size="sm" className="ml-2" asChild>
              <Link href={DOWNLOAD_HREF}>Download</Link>
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent title="Navigation menu">
                <nav className="mt-8 flex flex-col gap-5" aria-label="Mobile navigation">
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.href}
                      {...link}
                      href={linkHref(link)}
                      onNavigate={closeMenu}
                      active={isActive(link)}
                      className="w-fit text-base"
                      prefetch={false}
                      plainAnchor={isPlainAnchor(link)}
                    />
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-2 border-t border-border pt-6">
                  <Button variant="outline" asChild>
                    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                      <SiGithub className="size-4" />
                      GitHub
                    </a>
                  </Button>
                  <SheetClose asChild>
                    <Button asChild>
                      <Link href={DOWNLOAD_HREF}>Download</Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
