import type { Metadata } from 'next';
import Link from 'next/link';

import { DocsBreadcrumb } from '@/components/docs/DocsBreadcrumb';
import { DocsLayout } from '@/components/docs/DocsLayout';
import { getAllDocs, getDocNavItems } from '@/lib/docs';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Documentation',
  description: 'Power Interview AI documentation and usage guides.',
  path: '/docs',
});

export default function DocsIndexPage() {
  const list = getAllDocs();
  const navItems = getDocNavItems();

  return (
    <DocsLayout docs={navItems}>
      <main className="mx-auto max-w-6xl px-2 py-4 sm:px-4">
        <DocsBreadcrumb />

        <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight">Documentation</h1>
        <p className="mb-8 text-muted-foreground">
          A quick overview of guides and reference material - click any card to read more.
        </p>

        <ul className="grid gap-4 sm:grid-cols-2">
          {list.map((doc) => (
            <li key={doc.slug}>
              <Link
                href={`/docs/${doc.slug}`}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <h2 className="text-lg font-semibold capitalize text-foreground">{doc.title}</h2>
                {doc.excerpt ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {doc.excerpt}
                  </p>
                ) : (
                  <p className="mt-2 text-sm italic text-muted-foreground">No preview available.</p>
                )}
                <span className="mt-auto pt-4 text-sm font-medium text-primary">Read more →</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </DocsLayout>
  );
}
