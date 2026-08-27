'use client';

import React from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

interface SectionNavLinkProps {
  label: string;
  sectionId: string;
  to: string;
  isHome: boolean;
  scrollToSection?: (sectionId: string) => void;
  /** Fired after the link is activated - used to close the mobile sheet. */
  onNavigate?: () => void;
  /** Renders the link in its current-page/current-section treatment. */
  active?: boolean;
  className?: string;
}

const BASE_CLASS =
  'relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground';

const ACTIVE_CLASS = 'text-foreground';

// Renders an in-page scroll button on the home page, or a router Link elsewhere.
export const SectionNavLink: React.FC<SectionNavLinkProps> = ({
  label,
  sectionId,
  to,
  isHome,
  scrollToSection,
  onNavigate,
  active = false,
  className,
}) => {
  const classes = cn(BASE_CLASS, active && ACTIVE_CLASS, className);

  const handleClick = () => {
    if (isHome && scrollToSection) scrollToSection(sectionId);
    onNavigate?.();
  };

  const content = (
    <>
      {label}
      <span
        aria-hidden="true"
        className={cn(
          'absolute -bottom-1.5 left-0 h-px w-full origin-left bg-primary transition-transform duration-200',
          active ? 'scale-x-100' : 'scale-x-0'
        )}
      />
    </>
  );

  return isHome && scrollToSection ? (
    <button onClick={handleClick} className={classes} aria-current={active ? 'true' : undefined}>
      {content}
    </button>
  ) : (
    <Link
      href={to}
      onClick={onNavigate}
      className={classes}
      aria-current={active ? 'page' : undefined}
    >
      {content}
    </Link>
  );
};

export default SectionNavLink;
