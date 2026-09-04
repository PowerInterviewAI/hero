import React from 'react';

import { Languages, MonitorSmartphone, ShieldCheck } from 'lucide-react';

/**
 * Facts under the hero CTA.
 *
 * Used to also show a live "N interviews live now" count, polled from the
 * backend every 30s. Hardcoding that number would have meant a badge that
 * claims to be live while never changing - worse than not showing it - so it
 * was removed outright rather than frozen in place. If a genuine live count
 * is wanted back, it needs an actual live source, not a hardcoded one.
 */
export const TrustStrip: React.FC = () => (
  <div className="flex flex-col items-center gap-6">
    <dl className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <MonitorSmartphone className="size-4 shrink-0" aria-hidden="true" />
        <dt className="sr-only">Platforms</dt>
        {/* macOS isn't ready to ship yet - see MACOS_SUPPORTED in
            DownloadButton.tsx. Update both when it lands. */}
        <dd>Windows now, macOS coming soon</dd>
      </div>

      <div className="flex items-center gap-2">
        <Languages className="size-4 shrink-0" aria-hidden="true" />
        <dt className="sr-only">Interview languages</dt>
        <dd>
          <span className="font-semibold text-foreground">28</span> interview languages
        </dd>
      </div>

      <div className="flex items-center gap-2">
        <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
        <dt className="sr-only">Privacy</dt>
        <dd>Transcripts never persisted</dd>
      </div>
    </dl>

    <a
      href="https://peerpush.net/p/power-interview-ai"
      target="_blank"
      rel="noopener"
      className="opacity-80 transition-opacity hover:opacity-100"
    >
      {/*
        A plain img rather than next/image: this badge is a live rating that
        should never be optimised into a stale cached copy, and it's on a
        third-party host. The explicit width/height is what actually matters
        here - the old markup sized it with an inline style and shifted the
        layout on load.
      */}
      <img
        src="https://peerpush.net/p/power-interview-ai/rating-badge.png"
        alt="Power Interview AI rating on PeerPush"
        width={260}
        height={54}
        loading="lazy"
        decoding="async"
        className="h-auto w-[260px]"
      />
    </a>
  </div>
);

export default TrustStrip;
