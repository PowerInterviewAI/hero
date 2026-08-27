'use client';

import React, { useState } from 'react';

import { SiGithub } from '@icons-pack/react-simple-icons';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Container from '@/components/Container';
import { SectionNavLink } from '@/components/SectionNavLink';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useGoHome } from '@/hooks';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/utils';

interface HeaderProps {
  // Optional - only the home page threads in-page scrolling through.
  scrollToSection?: (sectionId: string) => void;
}

const NAV_LINKS = [
  { label: 'How it works', sectionId: 'how-it-works', to: '/how-it-works' },
  { label: 'Features', sectionId: 'features', to: '/features' },
  { label: 'Why Us', sectionId: 'why-choose-heading', to: '/why-choose' },
  { label: 'Pricing', sectionId: 'pricing', to: '/pricing' },
  { label: 'FAQ', sectionId: 'faq', to: '/faq' },
  { label: 'Contact', sectionId: 'contact', to: '/contact' },
] as const;

const SPY_IDS = NAV_LINKS.map((link) => link.sectionId);

const GITHUB_URL = 'https://github.com/PowerInterviewAI/client-app';

export const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const scrolled = useScrolled();
  const activeSection = useScrollSpy(SPY_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const goHome = useGoHome();

  const isActive = (link: (typeof NAV_LINKS)[number]) =>
    isHome ? activeSection === link.sectionId : pathname === link.to;

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
            href="/"
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
              <SectionNavLink
                key={link.sectionId}
                {...link}
                isHome={isHome}
                scrollToSection={scrollToSection}
                active={isActive(link)}
              />
            ))}
            <Link
              href="/docs"
              className={cn(
                'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                pathname.startsWith('/docs') && 'text-foreground'
              )}
            >
              Docs
            </Link>
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
            <Button size="sm" onClick={goHome} className="ml-2">
              Download
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
                    <SectionNavLink
                      key={link.sectionId}
                      {...link}
                      isHome={isHome}
                      scrollToSection={scrollToSection}
                      onNavigate={closeMenu}
                      active={isActive(link)}
                      className="w-fit text-base"
                    />
                  ))}
                  <SheetClose asChild>
                    <Link
                      href="/docs"
                      className="w-fit text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Docs
                    </Link>
                  </SheetClose>
                </nav>

                <div className="mt-auto flex flex-col gap-2 border-t border-border pt-6">
                  <Button variant="outline" asChild>
                    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                      <SiGithub className="size-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    onClick={() => {
                      closeMenu();
                      goHome();
                    }}
                  >
                    Download
                  </Button>
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
