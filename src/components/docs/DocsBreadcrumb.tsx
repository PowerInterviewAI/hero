import React from 'react';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/config/routes';

interface DocsBreadcrumbProps {
  /** Title of the doc being read. Omit on the docs index itself. */
  current?: string;
}

const LINK_CLASS =
  'rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

/**
 * Home / Documentation / <page>.
 *
 * The middle crumb is the route back to the docs root, which previously
 * existed nowhere on a doc page.
 */
export const DocsBreadcrumb: React.FC<DocsBreadcrumbProps> = ({ current }) => (
  <nav aria-label="Breadcrumb" className="mb-6">
    <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
      <li>
        <Link href={ROUTES.home} prefetch={false} className={LINK_CLASS}>
          Home
        </Link>
      </li>

      <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />

      <li>
        {current ? (
          <Link href={ROUTES.docs} prefetch={false} className={LINK_CLASS}>
            Documentation
          </Link>
        ) : (
          <span aria-current="page" className="font-medium text-foreground">
            Documentation
          </span>
        )}
      </li>

      {current && (
        <>
          <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
          <li aria-current="page" className="font-medium capitalize text-foreground">
            {current}
          </li>
        </>
      )}
    </ol>
  </nav>
);

export default DocsBreadcrumb;
