'use client';

import React, { useEffect, useState } from 'react';

import Container from '@/components/Container';
import { SkipToContent } from '@/components/SkipToContent';
import { FooterSection } from '@/components/sections/FooterSection';
import { Header } from '@/components/sections/Header';

import { DocNavItem, DocsSidebar } from './DocsSidebar';

interface DocsLayoutProps {
  docs: DocNavItem[];
  children?: React.ReactNode;
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({ docs, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // lock body scroll when sidebar is open on mobile
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen flex-col">
      <SkipToContent />
      <Header />

      <Container>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-8">
          {/* mobile toggle for docs sidebar */}
          <button
            className="mb-4 self-start rounded border px-3 py-1 text-sm font-medium md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            Docs menu
          </button>

          <div className="flex w-full">
            {/* desktop sidebar, hidden on small screens */}
            <DocsSidebar
              docs={docs}
              className="hidden md:block"
              onLinkClick={() => setSidebarOpen(false)}
            />

            <div id="main" className="prose markdown-body w-full max-w-none">
              {children}
            </div>
          </div>
        </div>
      </Container>

      {/* overlay sidebar for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64 bg-background p-4 shadow-lg">
            <DocsSidebar docs={docs} onLinkClick={() => setSidebarOpen(false)} />
          </div>
          <div className="flex-grow bg-black/30" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <FooterSection />
    </div>
  );
};

export default DocsLayout;
