# Marketing placeholder images

Every PNG in this folder is a **placeholder** — dark card, orange border, the
word PLACEHOLDER and its pixel size printed on it. They exist so the layout is
real and nothing shifts on load; the content is meant to be replaced.

**Keep the exact dimensions when you swap them.** Each is referenced with
explicit `width`/`height` (or is a `<video poster>` inside a fixed-ratio frame),
so a different aspect ratio will either letterbox or shift the layout.

Regenerate any of them with `node scripts/generate-placeholders.mjs` (pass a
path fragment to do just one, e.g. `… poster-coding-1`). That script is the source
of truth for the sizes below — keep the two in step.

## Hero carousel posters — 1920×1080 (16:9)

Referenced from `src/components/sections/hero/constants.ts`. These are the first
paint of the hero, so they are the LCP element — export them well-compressed.
They are also what a viewer sees when autoplay is suppressed, which now happens
deliberately under `prefers-reduced-motion` and Data Saver, so they need to sell
the clip on their own.

| File | Should show |
|---|---|
| `poster-live-interview.png` | The first frame of `media/live-interview-assistant.mp4` — live assistant + smart export |
| `poster-coding-1.png` | First frame of `media/coding-challenge-1.mp4` — graph traversal |
| `poster-coding-2.png` | First frame of `media/coding-challenge-2.mp4` — connected components |
| `poster-coding-3.png` | First frame of `media/coding-challenge-3.mp4` — binary tree recursion |

> All four demo clips are **2560×1440**, so the posters must be 16:9. The docs
> screenshots that were briefly used here (`media/docs/app-overview.jpg`) are
> 1482×1083 — a 1.37 ratio that letterboxes badly inside the 16:9 frame.
> Simplest correct source: grab frame 0 of each mp4 and downscale to 1920×1080.

These same four posters are reused as the `poster` for the two demo clips
embedded in the docs — see the `VIDEO_POSTERS` map in `src/lib/media.ts`.

## Testimonial avatar — 96×96

`avatar-placeholder.png`. Rendered at 36 px, so 96 covers 2×+. Only appears if
an entry in `src/config/testimonials.ts` sets `avatar` — that file ships empty
on purpose (real quotes only).

## Open Graph card

Resolved: `public/open-graph.png` is now **1200×630**, the size the Open Graph
and Twitter `summary_large_image` conventions expect, and the `width`/`height`
pairs in `src/lib/metadata.ts` and `src/app/layout.tsx` match it. The 1235×647
original is in git history; the size-reference file that used to live here has
been deleted.

One thing that artwork still gets wrong: its mocked-up nav bar reads
*Home / Features / Why Us / Pricing / FAQ / Docs / Contact*, which is not the
site's current header (`How it works / Features / Why Us / Pricing / FAQ /
Contact`, with Docs alongside). Worth fixing next time the card is re-exported.
