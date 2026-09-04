'use client';

import React, { useState } from 'react';

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
 * Every item is a route, and every item is a link - always, including here.
 * The difference from the footer is only where that link points: while
 * already on `/`, an item with a matching home section (see NAV_LINKS in
 * routes.ts) scrolls to it instead of navigating to the standalone page,
 * since re-navigating to a page you're already looking at just to land back
 * on the same content is pointless. Anywhere else, it's a normal link to the
 * real page - which still exists, is still indexable, and is what a search
 * result or a bookmark lands on. `isActive` always compares against that real
 * page's path, never the anchor, so it only lights up on a direct visit.
 */
export const Header: React.FC = () => {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === ROUTES.home;

  const isActive = (link: (typeof NAV_LINKS)[number]) =>
    link.matchSubtree ? pathname.startsWith(link.href) : pathname === link.href;

  const linkHref = (link: (typeof NAV_LINKS)[number]) =>
    isHome && link.section ? homeAnchor(link.section) : link.href;

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
