'use client';

import { LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ROUTES, docPath } from '@/config/routes';
import { cn } from '@/lib/utils';

export interface DocNavItem {
  slug: string;
  title: string;
}

interface DocsSidebarProps {
  docs: DocNavItem[];
  className?: string;
  onLinkClick?: () => void;
}

const LINK_CLASS =
  'block rounded px-2 py-1 text-sm transition-colors hover:bg-muted-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

export const DocsSidebar: React.FC<DocsSidebarProps> = ({ docs, className = '', onLinkClick }) => {
  const pathname = usePathname();
  const atRoot = pathname === '/docs';

  return (
    <aside className={cn('w-64 shrink-0 border-r p-4', className)}>
      <nav aria-label="Documentation">
        <h4 className="mb-2 text-sm font-semibold">Documentation</h4>

        <ul className="flex flex-col gap-2">
          {/* The way back to the docs root. Without it a reader who lands on a
              doc page from search has no route to the index short of the
              header's Docs link, which the mobile sidebar overlay covers. */}
          <li className="mb-1 border-b pb-2">
            <Link
              href={ROUTES.docs}
              onClick={onLinkClick}
              aria-current={atRoot ? 'page' : undefined}
              className={cn(
                LINK_CLASS,
                'flex items-center gap-2',
                atRoot ? 'font-semibold text-primary' : 'text-muted-foreground'
              )}
            >
              <LayoutGrid className="size-3.5 shrink-0" aria-hidden="true" />
              All documentation
            </Link>
          </li>

          {docs.map((d) => {
            const active = pathname === `/docs/${d.slug}`;
            return (
              <li key={d.slug}>
                <Link
                  href={docPath(d.slug)}
                  onClick={onLinkClick}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    LINK_CLASS,
                    'capitalize',
                    active ? 'font-semibold text-primary' : 'text-muted-foreground'
                  )}
                >
                  {d.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default DocsSidebar;
