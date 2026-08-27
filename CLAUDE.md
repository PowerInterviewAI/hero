# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev             # Start dev server at http://localhost:3000
pnpm build           # TypeScript check + Next.js production build
pnpm start           # Serve the production build locally
pnpm lint            # ESLint (strict, zero warnings allowed)
pnpm format          # Prettier format (auto-sorts imports + Tailwind classes)
pnpm format:check    # Check formatting without writing
```

Pre-commit hooks run Prettier + ESLint on staged TypeScript files automatically via Husky.

## Architecture

This is a **Next.js App Router marketing site** for Power Interview AI — no database, deployed to Vercel with normal server rendering. All routes live under `src/app/`.

### Routing & Pages

**`src/config/routes.ts` is the single source of truth for every internal destination.** `ROUTES` (page paths), `SECTIONS` (home-page anchor ids), `NAV_LINKS`, `SITEMAP_ROUTES` and `LEGACY_ANCHOR_REDIRECTS` all live there, and the header, footer, `sitemap.ts` and `next.config.ts` read from it. They each used to keep their own hand-written list and had already drifted — the footer pointed "Pricing" at a scroll target while the header pointed it at `/pricing`. Add a route in one place; don't reintroduce a second list.

File-based routing under `src/app/`:

- `src/app/page.tsx` — home route (`/`), a Server Component rendering `HomeContent`. Both are Server Components; the async data-fetching sections are rendered by the page and passed to `HomeContent` as already-resolved elements
- `src/app/how-it-works/`, `pricing/`, `faq/`, `privacy/`, `terms/` — standalone pages
- `src/app/docs/page.tsx` + `src/app/docs/[slug]/page.tsx` — docs listing and individual doc pages (Server Components, `generateStaticParams` prerenders all slugs)
- `src/app/not-found.tsx` — 404 for unmatched paths, rendered inside `PageChrome` so it still offers the full nav
- `src/app/sitemap.ts` / `src/app/robots.ts` — generated from `SITEMAP_ROUTES` + `src/lib/docs.ts`'s slug list, not hand-maintained

Every page except the docs (which have their own sidebar layout) uses `PageChrome` (`src/components/PageChrome.tsx`) for the Header/Footer.

### The routing rules

**1. Every navigation destination is a link.** `NavLink` (`src/components/NavLink.tsx`) always renders a `next/link`. Its predecessor, `SectionNavLink`, rendered a `<button>` calling `scrollIntoView` whenever the target was a section of the page you were already on — so the same nav item was a link on `/pricing` and not a link on `/`. That cost the URL in the status bar, middle-click and cmd-click, copy-link, crawlability, and left the address bar reading `/` after you'd scrolled to Features. **Never render a nav destination as a `<button>`.**

**2. The primary nav is routes only; anchors live in the footer.** `NAV_LINKS` is How it works / Pricing / FAQ / Docs — all real pages. Features, Why Us and Contact are still home-page sections, reached by scrolling and linked from the footer as `/#features` etc., which is conventional there and is a real, shareable URL. The bar used to mix the two with identical styling, which meant one nav with two behaviours and an active state that needed two rules to describe it (`pathname` for pages, a scroll-spy for anchors). Active state is now `pathname` alone — `useScrollSpy` is gone, along with the document-wide `MutationObserver` it ran.

**3. Hash scrolling is the browser's job.** `<Link href="/#features">` emits a real `<a>` and the browser scrolls to the id. `html { scroll-behavior: smooth }` and `:target { scroll-margin-top: 5rem }` in `src/styles/index.css`, plus `scroll-mt-20` on the `Section` variants, are what used to be a `scrollToSection` callback threaded from the page down through Header/Hero/FAQ/Footer — except that version also dropped every target behind the 4rem sticky header. **Don't reintroduce a `scrollToSection` prop.**

**4. Full content lives on exactly one URL.** Sections with a page of their own take a `preview` prop for the home page — `<PricingSection preview />` drops the trial-vs-paid table, `<FAQSection preview />` shows the first five questions, `<HowItWorksSection preview />` shows one-line step summaries — and link across to the full treatment. `next.config.ts` 308s the old `/features`, `/benefits`, `/why-choose` and `/contact` routes to home-page anchors; they were exact duplicates of the home sections and competed with the home page for ranking. A sitemap must never list a URL that 3xx's, so `SITEMAP_ROUTES` excludes them.

**5. An anchor target must be unique and must survive.** `PricingSkeleton` deliberately carries no `id`: it used to be `id="pricing"` as well, so the streamed HTML held two elements with that id and `/#pricing` resolved to the fallback, which is then thrown away.

**6. One label, one destination.** Every "Download" control uses `DownloadCta` (`src/components/DownloadCta.tsx`) and goes to `DOWNLOAD_HREF` (`/#install`). It replaced `GoHomeButton`/`useGoHome`, a `<button>` that pushed `/` from other pages and scrolled to the top of the home page — so a control labelled "Download Power Interview AI" offered no download, while the footer's "Download" link three columns away went to GitHub releases.

JSON-LD is scoped the same way (`src/lib/jsonLd.ts`): `Organization` is site-wide and stays in the root layout, `SoftwareApplication` is on the home page, `FAQPage` is on `/faq`. Structured data has to describe the page it sits on — all three used to be emitted on every route, including `/privacy` and every docs page.

### Documentation System

Markdown files live in `src/content/docs/`. `src/lib/docs.ts` reads them via Node `fs` (there's no `import.meta.glob` equivalent in Next.js) and holds the **single canonical `ORDER` array** used by both the docs index and the sidebar — don't add a second one. Adding a new doc: drop the `.md` file in `src/content/docs/` and add its slug to `ORDER` in `src/lib/docs.ts`.

The markdown render pipeline (`src/app/docs/[slug]/page.tsx`) uses `react-markdown` + `remark-gfm` server-side; only the image renderer (`src/components/docs/MarkdownImage.tsx`) is a client component, since it's the only genuinely interactive piece (click-to-preview lightbox; `.mp4` sources render as a `<video>` with `controls` + `preload="metadata"` instead). Alt text doubles as the visible figure caption, so write a real description — obvious filler (`![Image](…)`) is detected and suppressed from the caption.

**Every doc surface must offer a route back to `/docs`.** The docs root is reachable from the sidebar's "All documentation" entry (`DocsSidebar`), the breadcrumb (`DocsBreadcrumb`), the foot-of-page pager (`DocsPager`, which also does prev/next from `getDocNeighbours`), and the docs-scoped 404 at `src/app/docs/[slug]/not-found.tsx`. Don't drop one without replacing it — a reader landing on a doc from search previously had no way to the index at all on mobile.

`.markdown-body` (github-markdown-css) is scoped to the `<article>` holding the rendered markdown, **not** to the whole content column. It restyles every `ol`/`ul`/`a` beneath it, which turned the breadcrumb into a numbered list and put bullets on the index cards. Keep page chrome outside it.

Demo videos live in `public/media/` (kebab-case, no tooling suffixes like `_compressed`); `public/media/docs/` holds the smaller screenshots/diagrams. Docs markdown references the shared clips in `public/media/` directly rather than keeping a second copy under `public/media/docs/`. Markdown can't carry `width`/`height`, so `src/lib/media.ts` reads each asset's intrinsic size off its file header at render time (PNG/JPEG/SVG) and stamps it on — that's what keeps screenshots from reflowing the prose as they decode. It also maps the embedded `.mp4`s to their posters; add an entry there for any new clip or it paints a black rectangle.

The six pending docs screenshots are still placeholders, generated by `node scripts/generate-placeholders.mjs`, which is the source of truth for their exact pixel sizes. `public/media/marketing/` is no longer placeholder art: the four hero posters are real frames cut from the demo clips and annotated by `python scripts/generate-posters.py` (needs ffmpeg + Pillow), and the testimonial avatar is a generated default avatar. Don't add the posters back to `generate-placeholders.mjs` — that would overwrite photographs with grid cards. Each folder's `README.md` has the details.

### Component Architecture

- `src/components/sections/` — the modular sections composing the Home page (Header, Hero, Features, Pricing, FAQ, Footer, etc.). Most are Server Components; only the genuinely interactive ones (`Header` for the mobile sheet, `InstallPanel` for the tabs and clipboard, the hero's `DownloadButton`/`ProductSurface`/`TrustStrip`) are `'use client'`. Removing the `scrollToSection` plumbing took the client boundary off the whole home page
- `src/components/ui/` — shadcn/ui base components (Button, Card) with `cva` variants
- `src/components/docs/` — `DocsLayout.tsx` + `DocsSidebar.tsx` for the docs section (client components; the doc slug list is resolved server-side in the page and passed down as a prop, since `fs` isn't available in a browser bundle)
- `cn()` utility in `src/lib/utils.ts` (clsx + tailwind-merge) — always use this for conditional classnames
- Always use `next/link`'s `Link` for internal navigation, never a raw `<a href="/...">` (a full page reload) and never a `<button>` with a scroll handler. `react-router-dom` isn't a dependency anymore
- Never nest a `<Button>` inside a `<Link>` — that renders a `<button>` inside an `<a>`. Use `<Button asChild><Link …/></Button>`

### SEO / Metadata

Every route exports `metadata` (static pages) or `generateMetadata` (`/docs/[slug]`) via `src/lib/metadata.ts`'s `buildMetadata()`, which produces consistent title/description/canonical/OG/Twitter output. There's no `Seo.tsx` component; that pattern (a client `useEffect` mutating `document.title`) meant non-JS crawlers only ever saw the homepage's tags for every route.

- **Descriptions belong in the 120–160 character band.** Google truncates the snippet around there. Home used to run 566 characters, `/how-it-works` 262, `/pricing` 182 — everything past the cut is invisible and the sentence ends mid-clause.
- **The home page passes `absoluteTitle: true`** so its title is the brand-and-value line rather than `Home - Power Interview AI`. The most valuable title on the site was spending its first four characters on the word "Home".
- **Doc descriptions come from the doc.** `getDocDescription()` in `src/lib/docs.ts` reuses `getDocExcerpt()` to take the opening paragraph as plain text. They used to be `Documentation: ${title}` — 27–39 characters, identical in shape across all seven pages, which is a snippet Google discards.
- **Any page that 404s must be `noindex`.** Both `src/app/not-found.tsx` and `src/app/docs/[slug]/not-found.tsx` set it; without it they inherit the root layout's `index, follow`.
- **`sitemap.ts` never lists a URL that 3xx's**, and doc `lastModified` comes from the markdown file's mtime (`getDocLastModified`), not `new Date()` — a lastmod that moves for pages that didn't change is a signal crawlers learn to ignore.
- **`public/llms.txt` lists routes too.** It is not generated; update it when routes change. It had been advertising `/features`, `/benefits`, `/why-choose` and `/contact` as canonical URLs long after they became redirects.

**Structured data must be true of the page it sits on and visible to a reader of that page.** `src/lib/jsonLd.ts` scopes each block: `Organization` site-wide in the root layout, `SoftwareApplication` on the home page, `FAQPage` on `/faq`. All three used to be emitted on every route, including `/privacy` and every docs page.

- `buildSoftwareApplicationJsonLd(plans)` takes the live plans from `src/lib/plans.ts` so `offers` matches the packs the page renders. It used to hardcode lowPrice 20 / highPrice 500 against an endpoint actually returning 5–150 — wrong at both ends.
- **There is deliberately no `aggregateRating`.** It claimed 4.8 from 156 ratings while `src/config/testimonials.ts` is an empty array and no rating or review appears anywhere on the site. Google requires review markup to reflect ratings genuinely visible on the page; inventing them risks a manual action against the domain. Restore it only when real ratings are collected and shown, and derive it from that data — the same rule `testimonials.ts` already states for quotes.
- Don't claim a platform there's no build for (`operatingSystem` was `Windows, macOS, Linux`) or pass a logo off as a `screenshot`.

The root layout (`src/app/layout.tsx`) holds the sitewide default metadata, `metadataBase`, the `Organization` JSON-LD, the anti-FOUC theme-init script, and Google Analytics via `next/script`.

### Model naming

Power Interview AI's own included/default models are referred to generically as **"free model"** (free-trial tier) and **"SOTA model"** (paid tier) throughout the site's copy — not by their actual underlying model name, which changes over time. Don't reintroduce a specific model name into marketing copy; vendor names in "bring your own provider" lists (OpenAI, Anthropic, Google) are a different thing and are fine to name.

### Theme System

`src/hooks/useTheme.ts` manages light/dark/system theme via localStorage. It defaults to `'dark'` during the initial render (matching the root layout's anti-FOUC script) and only reads `localStorage` inside a `useEffect` — reading it in a `useState` lazy initializer crashes during server rendering, since client components are still rendered server-side for their initial HTML.

### Configuration

- `src/config/routes.ts` — every internal route, section id and redirect (see **Routing & Pages**). Imported by `next.config.ts` directly, so it must stay free of imports and contain nothing but plain data
- `src/config/constants.ts` — `APP_CONFIG`, `ENV` (reads `NEXT_PUBLIC_*` env vars and `process.env.NODE_ENV`)
- `src/types/index.ts` — shared types: `Status`, `ApiResponse<T>`, `User`, `Plan`, `Theme`
- Path alias `@/*` maps to `src/*` (configured in `tsconfig.json`)

### Environment Variables

Copy `.env.example` to `.env.local`. Variables must be prefixed `NEXT_PUBLIC_` to be exposed to client code, accessed via `process.env.NEXT_PUBLIC_*`.

### Styling

Tailwind CSS with custom HSL CSS variables for theming (defined in `src/styles/index.css`, imported globally in `src/app/layout.tsx`). Custom scrollbar and markdown prose styles are also in that file. Tailwind config in `tailwind.config.js` uses `darkMode: 'class'`.
