'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Languages, MonitorSmartphone, ShieldCheck } from 'lucide-react';

import { ENV } from '@/config/constants';

// A marketing page doesn't need second-by-second accuracy; the old 5s poll ran
// for as long as the tab was open.
const POLL_INTERVAL_MS = 30_000;

const fetchActiveSessionsCount = async (): Promise<number | null> => {
  try {
    const response = await fetch(`${ENV.apiBaseUrl}api/health-check/active-sessions`, {
      method: 'POST',
      headers: { accept: 'application/json' },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const parsedCount = parseInt((await response.text()).trim(), 10);
    if (Number.isFinite(parsedCount) && parsedCount >= 0) return parsedCount;
  } catch (error) {
    console.warn('Failed to fetch active session count:', error);
  }

  return null;
};

/**
 * Facts under the hero CTA.
 *
 * The live session count renders only once the API has returned a real number
 * - if the endpoint is down or returns 0 the item is dropped rather than
 * advertising "0 live interviews".
 */
export const TrustStrip: React.FC = () => {
  const [liveCount, setLiveCount] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let mounted = true;

    const poll = async () => {
      const count = await fetchActiveSessionsCount();
      if (!mounted) return;

      setLiveCount(count);
      timerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
    };

    poll();

    return () => {
      mounted = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <dl className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
        {liveCount !== null && liveCount > 0 && (
          <div className="flex items-center gap-2">
            <span
              className="size-2 shrink-0 animate-pulse rounded-full bg-success"
              aria-hidden="true"
            />
            <dt className="sr-only">Live interviews right now</dt>
            <dd>
              <span className="font-semibold text-foreground">{liveCount}</span> interviews live now
            </dd>
          </div>
        )}

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
};

export default TrustStrip;
