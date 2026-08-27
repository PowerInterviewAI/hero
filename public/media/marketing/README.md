# Marketing placeholder images

Every PNG in this folder is a **placeholder** — dark card, orange border, the
word PLACEHOLDER and its pixel size printed on it. They exist so the layout is
real and nothing shifts on load; the content is meant to be replaced.

**Keep the exact dimensions when you swap them.** Each is referenced with
explicit `width`/`height` (or is a `<video poster>` inside a fixed-ratio frame),
so a different aspect ratio will either letterbox or shift the layout.

## Hero carousel posters — 1920×1080 (16:9)

Referenced from `src/components/sections/hero/constants.ts`. These are the first
paint of the hero, so they are the LCP element — export them well-compressed.

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

## Features bento tiles — 1600×900 (16:9)

Referenced from `src/components/sections/FeaturesSection.tsx`. Both wide tiles
share a ratio so the grid rows line up — don't give one a different one.

| File | Should show |
|---|---|
| `feature-stealth.png` | The stealth overlay sitting over a call, ideally mid screen-share so the point lands |
| `feature-export.png` | An exported DOCX report — summary, action items, speaker-labelled transcript |

There are real screenshots at `media/docs/stealth-mode.png` (2544×1336) and
`media/docs/export-example.png` (1280×887) that could be recropped to 16:9
rather than shot fresh.

## How it works steps — 800×450 (16:9)

Referenced from `src/components/sections/HowItWorksSection.tsx`. Rendered at
roughly 380 px wide, so 800 covers 2×. Marked `alt=""` — they repeat the heading
next to them, so they're decorative.

| File | Should show |
|---|---|
| `step-install.png` | The installer, or the app's first-run screen |
| `step-context.png` | The CV / job-description configuration screen |
| `step-live.png` | A live call with a suggestion arriving in the overlay |

## Testimonial avatar — 96×96

`avatar-placeholder.png`. Rendered at 36 px, so 96 covers 2×+. Only appears if
an entry in `src/config/testimonials.ts` sets `avatar` — that file ships empty
on purpose (real quotes only).

## Open Graph card — 1200×630

`open-graph-spec-1200x630.png` is a **size reference only**, not wired into
anything.

The live card is `public/open-graph.png` and it is real artwork — but it's
**1235×647**, and the Open Graph / Twitter `summary_large_image` convention is
**1200×630**. Every scraper rescales it. Re-export the real card at 1200×630,
replace `public/open-graph.png`, then update the two `width`/`height` pairs in
`src/lib/metadata.ts` and `src/app/layout.tsx`. Delete this spec file once
that's done.

## Regenerating

The generator is not checked in — these are one-off scaffolding. If you need
them again, any 16:9 grey box at the sizes above will do.
