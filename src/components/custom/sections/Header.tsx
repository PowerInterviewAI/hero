import React from 'react';

import { SiGithub, SiX } from '@icons-pack/react-simple-icons';

import Container from '@/components/custom/Container';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  theme: string;
  mobileMenuOpen: boolean;
  scrollToSection: (sectionId: string) => void;
  toggleTheme: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  mobileMenuOpen,
  scrollToSection,
  toggleTheme,
  setMobileMenuOpen,
}) => {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Power Interview Logo"
              className="h-8 w-8 rounded-xl"
            />
            <span className="text-xl font-bold">Power Interview</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            <button
              onClick={() => scrollToSection('home')}
              className="text-sm font-medium transition-colors hover:text-primary"
              aria-label="Navigate to home section"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium transition-colors hover:text-primary"
              aria-label="Navigate to features section"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('why-choose-heading')}
              className="text-sm font-medium transition-colors hover:text-primary"
              aria-label="Navigate to why choose section"
            >
              Why Us
            </button>
            <button
              onClick={() => scrollToSection('how-to-use')}
              className="text-sm font-medium transition-colors hover:text-primary"
              aria-label="Navigate to how to use section"
            >
              How to Use
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium transition-colors hover:text-primary"
              aria-label="Navigate to pricing section"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-sm font-medium transition-colors hover:text-primary"
              aria-label="Navigate to testimonials section"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-sm font-medium transition-colors hover:text-primary"
              aria-label="Navigate to FAQ section"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium transition-colors hover:text-primary"
              aria-label="Navigate to contact section"
            >
              Contact
            </button>
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
                href="https://github.com/PowerInterviewAI/client"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <SiGithub className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button size="sm" asChild>
              <a
                href="https://github.com/PowerInterviewAI/client/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </a>
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
                <SiX className="h-6 w-6" />
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
              <button
                onClick={() => scrollToSection('home')}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('why-choose-heading')}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Why Us
              </button>
              <button
                onClick={() => scrollToSection('how-to-use')}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                How to Use
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Contact
              </button>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://github.com/PowerInterviewAI/client"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <SiGithub className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a
                    href="https://github.com/PowerInterviewAI/client/releases/latest"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Started
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};
