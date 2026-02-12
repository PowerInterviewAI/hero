import React from 'react';

import { SiDiscord, SiGithub, SiProtonmail, SiTelegram } from '@icons-pack/react-simple-icons';
import { Link } from 'react-router-dom';

import Container from '@/components/custom/Container';

interface FooterSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ scrollToSection }) => {
  return (
    <footer className="border-t py-12 md:py-16" role="contentinfo">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Power Interview Logo"
                className="h-6 w-6"
              />
              <span className="text-lg font-bold">Power Interview</span>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Your personal AI-powered interview coach with real-time face swap technology.
              Privacy-first, powerful, and effective.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/PowerInterviewAI/client"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="GitHub"
              >
                <SiGithub className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/+uQuuBdrsIYBjY2Qx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Telegram"
              >
                <SiTelegram className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/BB3mSBa9hZ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Discord"
              >
                <SiDiscord className="h-5 w-5" />
              </a>
              <a
                href="mailto:power-interview@protonmail.com"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Email"
              >
                <SiProtonmail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Pricing
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/PowerInterviewAI/client/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Download
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/PowerInterviewAI/client"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  FAQ
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/PowerInterviewAI/client"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/+uQuuBdrsIYBjY2Qx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Telegram Channel
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/BB3mSBa9hZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Discord Server
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Support
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/PowerInterviewAI/client/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  License
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Power Interview. All rights reserved.</p>
          <p className="mt-2">Made to help you ace your interviews while protecting your privacy</p>
        </div>
      </Container>
    </footer>
  );
};
