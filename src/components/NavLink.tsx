'use client';

import React from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

interface NavLinkProps {
  label: string;
  href: string;
  /** Renders the link in its current-page treatment. */
  active?: boolean;
  /** Draws the sliding underline used in the header bar. */
  underline?: boolean;
  /** Fired after the link is activated - used to close the mobile sheet. */
  onNavigate?: () => void;
  className?: string;
  /**
   * The header bar sits in the viewport from the moment any page paints, so
   * with the default `prefetch={true}` every item - Pricing, Team, FAQ, Docs -
   * started prefetching at once on first load. Each fetch was real network
   * work, and firing all of them together could leave a click made in that
   * first window queued behind the burst instead of instant. False here opts
   * out for exactly that bar; footer links stay lazy on their own, since nothing
   * below the fold prefetches until it's actually scrolled into view.
   */
  prefetch?: boolean;
  /** Opens the link in a new tab - for a destination that isn't a section of
   *  the page you're likely already on, currently just Docs. */
  newTab?: boolean;
}

const BASE_CLASS =
  'relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground';

/**
 * Every navigation destination on the site, header and footer alike.
 *
 * It is always an anchor. Its predecessor rendered a <button> that called
 * `scrollIntoView` whenever the target was a section of the page you were
 * already on, so the same nav item was a link on /pricing and not a link on /.
 * That cost the URL in the status bar, middle-click and cmd-click, the ability
 * to copy or share the destination, and any chance of a crawler following it -
 * and left the address bar reading `/` after you'd scrolled to Features.
 *
 * Hash targets need no JavaScript here: `<Link href="/#features">` emits a real
 * `<a href="/#features">` and the browser scrolls to the id, smoothly, because
 * of the `scroll-behavior` and `scroll-margin-top` rules in styles/index.css.
 */
export const NavLink: React.FC<NavLinkProps> = ({
  label,
  href,
  active = false,
  underline = false,
  onNavigate,
  className,
  prefetch,
  newTab = false,
}) => (
  <Link
    href={href}
    prefetch={prefetch}
    onClick={onNavigate}
    target={newTab ? '_blank' : undefined}
    rel={newTab ? 'noopener noreferrer' : undefined}
    aria-current={active ? 'page' : undefined}
    className={cn(BASE_CLASS, active && 'text-foreground', className)}
  >
    {label}
    {underline && (
      <span
        aria-hidden="true"
        className={cn(
          'absolute -bottom-1.5 left-0 h-px w-full origin-left bg-primary transition-transform duration-200',
          active ? 'scale-x-100' : 'scale-x-0'
        )}
      />
    )}
  </Link>
);

export default NavLink;
