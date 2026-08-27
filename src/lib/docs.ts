import fs from 'node:fs';
import path from 'node:path';

// Canonical order for every doc surface (index listing, sidebar nav).
// Previously the index page and sidebar each hardcoded their own list and
// had drifted out of sync (the index was missing two slugs) - this is now
// the single source of truth for both.
const ORDER = [
  'introduction',
  'installation',
  'usage',
  'how-it-works',
  'best-practices',
  'troubleshooting',
  'mock-interview',
];

const DOCS_DIR = path.join(process.cwd(), 'src/content/docs');

export interface DocListItem {
  slug: string;
  title: string;
  excerpt: string;
}

function bySlugOrder(a: { slug: string }, b: { slug: string }): number {
  const ai = ORDER.indexOf(a.slug);
  const bi = ORDER.indexOf(b.slug);
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
}

export function getDocSlugs(): string[] {
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .sort((a, b) => bySlugOrder({ slug: a }, { slug: b }));
}

export function getDocContent(slug: string): string | null {
  const filePath = path.join(DOCS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Last-modified time of a doc's source file, for the sitemap.
 *
 * The sitemap used to stamp `new Date()` on every URL, so every route claimed
 * to have changed at the moment of the last deploy - a lastmod that moves for
 * pages that didn't change is a signal crawlers learn to ignore.
 */
export function getDocLastModified(slug: string): Date {
  const filePath = path.join(DOCS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return new Date();
  return fs.statSync(filePath).mtime;
}

export function getDocTitle(slug: string, raw: string): string {
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, ' ');
}

// Excerpts render as plain text on the index cards, so the markdown has to come
// off them first - best-practices.md opens with a blockquote and was printing a
// literal `> **Be Careful:** > >` onto its card.
function stripMarkdown(text: string): string {
  return text
    .replace(/^\s*>\s?/gm, '') // blockquote markers
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links keep their text
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // italic
    .replace(/`([^`]*)`/g, '$1') // inline code
    .replace(/\s+/g, ' ')
    .trim();
}

function getDocExcerpt(raw: string, title: string, titleMatched: boolean): string {
  const blocks = raw
    .split(/\r?\n\r?\n/)
    // Strip before collapsing newlines - the blockquote rule is per-line, and
    // a `>` on every line of a quote block survives a flatten-first order.
    .map((b) => stripMarkdown(b))
    .filter(
      (b) => b && !/^#{1,6}\s/.test(b) && !/^!\[/.test(b) && !/^\|/.test(b) && !/^---/.test(b)
    );

  let excerpt: string;
  if (titleMatched) {
    const idx = blocks.findIndex((b) => b.includes(title));
    excerpt = blocks[idx + 1] || blocks[0] || '';
  } else {
    excerpt = blocks[0] || '';
  }
  return excerpt.length > 220 ? `${excerpt.slice(0, 217).trim()}...` : excerpt;
}

/**
 * Meta description for a doc page: its opening paragraph, as plain text,
 * trimmed to a length Google will actually show.
 *
 * Doc pages used to describe themselves as `Documentation: ${title}` - 27 to 39
 * characters of nothing, identical in shape across all seven pages, which is a
 * snippet Google will discard in favour of scraping the page itself.
 */
export function getDocDescription(slug: string): string {
  const raw = getDocContent(slug);
  if (!raw) return 'Power Interview AI documentation.';

  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const excerpt = getDocExcerpt(raw, getDocTitle(slug, raw), Boolean(titleMatch));
  if (!excerpt) return 'Power Interview AI documentation.';

  if (excerpt.length <= 160) return excerpt;
  // Cut on a word boundary so the snippet doesn't end mid-word.
  const cut = excerpt.slice(0, 157);
  return `${cut.slice(0, cut.lastIndexOf(' ')).trim()}...`;
}

export function getAllDocs(): DocListItem[] {
  return getDocSlugs().map((slug) => {
    const raw = getDocContent(slug) ?? '';
    const titleMatch = raw.match(/^#\s+(.+)$/m);
    const title = getDocTitle(slug, raw);
    return { slug, title, excerpt: getDocExcerpt(raw, title, Boolean(titleMatch)) };
  });
}

// Sidebar nav titles are slug-derived (not the doc's H1), matching the
// original DocsSidebar behavior - this can differ from getAllDocs()'s
// H1-extracted titles shown on the index page.
export function getDocNavItems(): { slug: string; title: string }[] {
  return getDocSlugs().map((slug) => ({ slug, title: slug.replace(/-/g, ' ') }));
}

export interface DocNeighbours {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

/**
 * The doc before and after `slug` in ORDER, for the pager at the foot of a doc
 * page. Ends of the list return null rather than wrapping - a "next" that
 * loops back to the introduction reads like a bug to a reader working through
 * the set in order.
 */
export function getDocNeighbours(slug: string): DocNeighbours {
  const items = getDocNavItems();
  const index = items.findIndex((item) => item.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: items[index - 1] ?? null,
    next: items[index + 1] ?? null,
  };
}
