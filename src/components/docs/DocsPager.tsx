import React from 'react';

import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

import { ROUTES, docPath } from '@/config/routes';
import type { DocNeighbours } from '@/lib/docs';

const CARD_CLASS =
  'group flex flex-1 flex-col gap-1 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

/**
 * Previous / next pager plus an explicit link back to the docs root, rendered
 * at the foot of every doc page - the point where a reader has finished and
 * needs somewhere to go next.
 */
export const DocsPager: React.FC<DocNeighbours> = ({ previous, next }) => (
  <nav aria-label="Documentation pagination" className="mt-12 border-t border-border pt-6">
    <div className="flex flex-col gap-3 sm:flex-row">
      {previous ? (
        <Link href={docPath(previous.slug)} prefetch={false} className={CARD_CLASS}>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Previous
          </span>
          <span className="font-medium capitalize text-foreground group-hover:text-primary">
            {previous.title}
          </span>
        </Link>
      ) : (
        // Keeps "next" on the right on the first page instead of letting it
        // slide left into the previous slot.
        <div className="hidden flex-1 sm:block" aria-hidden="true" />
      )}

      {next && (
        <Link
          href={docPath(next.slug)}
          prefetch={false}
          className={`${CARD_CLASS} sm:items-end sm:text-right`}
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Next
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
          <span className="font-medium capitalize text-foreground group-hover:text-primary">
            {next.title}
          </span>
        </Link>
      )}
    </div>

    <div className="mt-6 flex justify-center">
      <Link
        href={ROUTES.docs}
        prefetch={false}
        className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <LayoutGrid className="size-4" aria-hidden="true" />
        Back to all documentation
      </Link>
    </div>
  </nav>
);

export default DocsPager;
