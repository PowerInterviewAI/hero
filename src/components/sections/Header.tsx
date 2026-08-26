'use client';

import React from 'react';

import { SiGithub } from '@icons-pack/react-simple-icons';
import { X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Container from '@/components/Container';
import { SectionNavLink } from '@/components/SectionNavLink';
import { Button } from '@/components/ui/button';
import { useGoHome } from '@/hooks';

interface HeaderProps {
  theme: string;
  mobileMenuOpen: boolean;
  scrollToSection?: (sectionId: string) => void; // optional - retained for Home in-page scrolling
  toggleTheme: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

const NAV_LINKS = [
  { label: 'Home', sectionId: 'home', to: '/' },
  { label: 'Features', sectionId: 'features', to: '/features' },
  { label: 'Why Us', sectionId: 'why-choose-heading', to: '/why-choose' },
  { label: 'Pricing', sectionId: 'pricing', to: '/pricing' },
  { label: 'FAQ', sectionId: 'faq', to: '/faq' },
] as const;

const NAV_LINKS_TAIL = [
  { label: 'Contact', sectionId: 'contact', to: '/contact' },
  // { label: 'Our Team', sectionId: 'co-founders', to: '/#co-founders' },
] as const;

export const Header: React.FC<HeaderProps> = ({
  theme,
  mobileMenuOpen,
  scrollToSection,
  toggleTheme,
  setMobileMenuOpen,
}) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const handleGetStarted = useGoHome();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Power Interview AI Logo" className="h-8 w-8 rounded-xl" />
            <span className="text-xl font-bold">Power Interview AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <SectionNavLink
                key={link.sectionId}
                {...link}
                isHome={isHome}
                scrollToSection={scrollToSection}
              />
            ))}

            <Link href="/docs" className="text-sm font-medium transition-colors hover:text-primary">
              Docs
            </Link>

            {NAV_LINKS_TAIL.map((link) => (
              <SectionNavLink
                key={link.sectionId}
                {...link}
                isHome={isHome}
                scrollToSection={scrollToSection}
              />
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex items-center gap-2"
            >
              {theme === 'dark' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://github.com/PowerInterviewAI/client-app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <SiGithub className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button size="sm" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>

          {/* Mobile Theme Toggle & Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2">
              {theme === 'dark' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <SectionNavLink
                  key={link.sectionId}
                  {...link}
                  isHome={isHome}
                  scrollToSection={scrollToSection}
                />
              ))}

              {NAV_LINKS_TAIL.map((link) => (
                <SectionNavLink
                  key={link.sectionId}
                  {...link}
                  isHome={isHome}
                  scrollToSection={scrollToSection}
                />
              ))}

              <Link
                href="/docs"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Docs
              </Link>

              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://github.com/PowerInterviewAI/client-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <SiGithub className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button size="sm" onClick={handleGetStarted}>
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
