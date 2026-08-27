'use client';

import React from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

interface SectionNavLinkProps {
  label: string;
  sectionId: string;
  to: string;
  isHome: boolean;
  /** True when `to` is a route of its own rather than a home-page anchor. */
  page?: boolean;
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

// A scroll button only for home-page anchors while on the home page; anything
// with a page of its own is always a router Link, from everywhere.
export const SectionNavLink: React.FC<SectionNavLinkProps> = ({
  label,
  sectionId,
  to,
  isHome,
  page = false,
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

  return !page && isHome && scrollToSection ? (
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
