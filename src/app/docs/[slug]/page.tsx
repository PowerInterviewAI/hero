import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { DocsBreadcrumb } from '@/components/docs/DocsBreadcrumb';
import { DocsLayout } from '@/components/docs/DocsLayout';
import { DocsPager } from '@/components/docs/DocsPager';
import { MarkdownImage } from '@/components/docs/MarkdownImage';
import {
  getDocContent,
  getDocNavItems,
  getDocNeighbours,
  getDocSlugs,
  getDocTitle,
} from '@/lib/docs';
import { buildMetadata } from '@/lib/metadata';

interface DocPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const raw = getDocContent(slug);
  if (!raw) {
    return buildMetadata({
      title: 'Not Found',
      description: 'No documentation found for this page.',
      path: `/docs/${slug}`,
    });
  }
  const title = getDocTitle(slug, raw);
  return buildMetadata({
    title,
    description: `Documentation: ${title}`,
    path: `/docs/${slug}`,
  });
}

// Convert heading text to a URL-friendly id
const slugify = (text: React.ReactNode): string =>
  String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const heading =
  (Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') =>
  ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(children);
    return (
      <Tag id={id} className="group relative">
        {children}
        <a
          href={`#${id}`}
          className="ml-2 text-primary no-underline opacity-0 transition-opacity group-hover:opacity-60"
          aria-label="Link to section"
        >
          #
        </a>
      </Tag>
    );
  };

const markdownComponents = {
  h1: heading('h1'),
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  h5: heading('h5'),
  h6: heading('h6'),
  table: ({ children }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-4 w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-muted text-foreground">{children}</thead>
  ),
  tbody: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-border">{children}</tbody>
  ),
  tr: ({ children }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="even:bg-muted/40">{children}</tr>
  ),
  th: ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border px-3 py-2 text-foreground">{children}</td>
  ),
  img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <MarkdownImage src={typeof src === 'string' ? src : undefined} alt={alt} />
  ),
};

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const content = getDocContent(slug);
  const navItems = getDocNavItems();

  if (!content) {
    notFound();
  }

  const { previous, next } = getDocNeighbours(slug);

  return (
    <DocsLayout docs={navItems}>
      <main className="mx-auto max-w-4xl px-2 py-4 sm:px-4">
        <DocsBreadcrumb current={getDocTitle(slug, content)} />

        <article className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {content}
          </ReactMarkdown>
        </article>

        <DocsPager previous={previous} next={next} />
      </main>
    </DocsLayout>
  );
}
