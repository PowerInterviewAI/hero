import { Download, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { DocsBreadcrumb } from '@/components/docs/DocsBreadcrumb';
import { DocsLayout } from '@/components/docs/DocsLayout';
import { DocsPager } from '@/components/docs/DocsPager';
import { MarkdownImage } from '@/components/docs/MarkdownImage';
import { docPath } from '@/config/routes';
import {
  getDocContent,
  getDocDescription,
  getDocNavItems,
  getDocNeighbours,
  getDocSlugs,
  getDocTitle,
} from '@/lib/docs';
import { getMediaSize, getVideoPoster } from '@/lib/media';
import { buildMetadata } from '@/lib/metadata';
import { applyReleaseTokens, getLatestVersion } from '@/lib/release';

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
      path: docPath(slug),
    });
  }
  const title = getDocTitle(slug, raw);
  return buildMetadata({
    title,
    description: getDocDescription(slug),
    path: docPath(slug),
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

// Downloadable sample assets linked from the docs (the exported DOCX report).
// A bare link to a binary gives no hint that clicking it starts a download.
const DOWNLOAD_EXTENSIONS = ['.docx', '.pdf', '.zip', '.md'];

// The slice of the hast node react-markdown hands each component that we
// actually read - enough to tell an image-only paragraph from a real one.
interface MarkdownNode {
  children?: { type: string; tagName?: string; value?: string }[];
}

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
  // A standalone markdown image parses as a paragraph containing an image, and
  // MarkdownImage renders a <figure> - which is invalid inside <p> and throws a
  // hydration error. Drop the paragraph when an image is all it holds; keep it
  // when there's real prose alongside.
  p: ({ children, node }: React.HTMLAttributes<HTMLParagraphElement> & { node?: MarkdownNode }) => {
    const significant = (node?.children ?? []).filter(
      (child) => child.type !== 'text' || (child.value ?? '').trim() !== ''
    );
    const imageOnly =
      significant.length === 1 &&
      significant[0].type === 'element' &&
      significant[0].tagName === 'img';

    return imageOnly ? <>{children}</> : <p>{children}</p>;
  },
  a: ({ href, children }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const external = Boolean(href && /^https?:\/\//.test(href));
    const download = Boolean(
      href && DOWNLOAD_EXTENSIONS.some((extension) => href.toLowerCase().endsWith(extension))
    );

    return (
      <a
        href={href}
        download={download || undefined}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-1"
      >
        {children}
        {download && <Download className="size-3.5 shrink-0" aria-hidden="true" />}
        {external && <ExternalLink className="size-3 shrink-0 opacity-60" aria-hidden="true" />}
      </a>
    );
  },
  // Markdown can't carry width/height, so they're resolved from the file on
  // disk here (server side) and handed to the client component - without them
  // every screenshot reflows the prose below it as it decodes.
  img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const source = typeof src === 'string' ? src : undefined;
    const size = source ? getMediaSize(source) : null;
    return (
      <MarkdownImage
        src={source}
        alt={alt}
        width={size?.width}
        height={size?.height}
        poster={source ? getVideoPoster(source) : undefined}
      />
    );
  },
};

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const content = getDocContent(slug);
  const navItems = getDocNavItems();

  if (!content) {
    notFound();
  }

  // Docs are static markdown but the download links can't be - a pinned version
  // 404s the day the next release ships. See src/lib/release.ts.
  const rendered = applyReleaseTokens(content, await getLatestVersion());

  const { previous, next } = getDocNeighbours(slug);

  return (
    <DocsLayout docs={navItems}>
      <main className="mx-auto max-w-4xl px-2 py-4 sm:px-4">
        <DocsBreadcrumb current={getDocTitle(slug, content)} />

        <article className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {rendered}
          </ReactMarkdown>
        </article>

        <DocsPager previous={previous} next={next} />
      </main>
    </DocsLayout>
  );
}
