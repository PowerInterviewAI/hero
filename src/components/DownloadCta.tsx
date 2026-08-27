import React from 'react';

import Link from 'next/link';

import { Button, type ButtonProps } from '@/components/ui/button';
import { DOWNLOAD_HREF } from '@/config/routes';

type DownloadCtaProps = Omit<ButtonProps, 'asChild' | 'onClick'> & {
  children: React.ReactNode;
};

/**
 * The "Download" call to action used across the marketing sections.
 *
 * It replaces GoHomeButton, which was a <button> wired to `useGoHome()`: on any
 * page but the home page it pushed `/`, and on the home page it scrolled to the
 * very top. So a control labelled "Download Power Interview AI" went to the top
 * of the page you were already on and offered no download - while the footer's
 * "Download" link, three columns away, went to the GitHub releases page. Two
 * controls, one label, two destinations, and neither had a URL you could copy.
 *
 * It now points at the install panel, which is where the actual downloads are.
 * Being a link rather than a button, it also works with middle-click and
 * cmd-click, and no longer needs a client component to carry one handler.
 */
export const DownloadCta: React.FC<DownloadCtaProps> = ({ children, ...props }) => (
  <Button asChild {...props}>
    <Link href={DOWNLOAD_HREF}>{children}</Link>
  </Button>
);

export default DownloadCta;
