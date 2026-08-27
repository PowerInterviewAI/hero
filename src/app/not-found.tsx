import { ArrowLeft, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import Container from '@/components/Container';
import { PageChrome } from '@/components/PageChrome';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';

export const metadata: Metadata = {
  title: 'Page Not Found - Power Interview AI',
  robots: { index: false, follow: false },
};

/**
 * 404 for any unmatched path.
 *
 * Rendered inside PageChrome so a reader who mistyped a URL still gets the
 * header and footer - i.e. a route to everywhere else on the site. It used to
 * be a bare centred card whose only way out was a single "Back to Home" link,
 * which is a dead end for anyone who arrived from search.
 *
 * The docs have their own 404 at src/app/docs/[slug]/not-found.tsx that keeps
 * the sidebar instead.
 */
export default function NotFound() {
  return (
    <PageChrome>
      <Container>
        <div className="mx-auto flex max-w-md flex-col items-center py-24 text-center md:py-32">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">404</p>
          <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Page not found
          </h1>
          <p className="mb-8 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {/* Was <Link><Button/></Link>, which nests a <button> inside an <a>. */}
            <Button asChild>
              <Link href={ROUTES.home}>
                <ArrowLeft className="size-4" />
                Back to home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={ROUTES.docs}>
                <BookOpen className="size-4" />
                Documentation
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </PageChrome>
  );
}
