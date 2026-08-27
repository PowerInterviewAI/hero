import { ArrowLeft, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

import { DocsBreadcrumb } from '@/components/docs/DocsBreadcrumb';
import { DocsLayout } from '@/components/docs/DocsLayout';
import { Button } from '@/components/ui/button';
import { getAllDocs, getDocNavItems } from '@/lib/docs';

/**
 * 404 for an unknown /docs/<slug>.
 *
 * The root not-found only offers "Back to Home", which drops a reader who
 * mistyped a doc URL all the way out of the documentation. This keeps the
 * docs chrome - sidebar included - and points at the index.
 */
export default function DocNotFound() {
  const navItems = getDocNavItems();
  const suggestions = getAllDocs().slice(0, 4);

  return (
    <DocsLayout docs={navItems}>
      <main className="mx-auto max-w-4xl px-2 py-4 sm:px-4">
        <DocsBreadcrumb current="Not found" />

        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">404</p>
        <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight">
          This page isn&apos;t in the docs
        </h1>
        <p className="mb-8 text-muted-foreground">
          The guide you&apos;re looking for doesn&apos;t exist or has been renamed. Start from the
          documentation index, or pick up one of these.
        </p>

        <div className="mb-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/docs">
              <LayoutGrid className="size-4" />
              All documentation
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </Button>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {suggestions.map((doc) => (
            <li key={doc.slug}>
              <Link
                href={`/docs/${doc.slug}`}
                className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40"
              >
                <span className="font-medium capitalize text-foreground">{doc.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </DocsLayout>
  );
}
