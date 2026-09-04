'use client';

import React, { useEffect, useRef, useState } from 'react';

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

import { cn } from '@/lib/utils';

import { MEDIA_ITEMS } from './constants';

/**
 * The framed product surface under the hero copy.
 *
 * The frame carries a poster image and paints immediately; the video is the
 * LCP-safe second step. Playback controls sit in a strip below the frame
 * rather than floating over the video, so the product itself is never
 * obscured by chrome.
 */
export const ProductSurface: React.FC<{ className?: string }> = ({ className }) => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = MEDIA_ITEMS[index];

  const go = (next: number) => setIndex((next + MEDIA_ITEMS.length) % MEDIA_ITEMS.length);

  // The clips are 16-20 MB each. Starting the download at first paint pits it
  // against hydration for every visitor's bandwidth, so autoplay only turns on
  // once we know reduced motion and Data Saver - two preferences the browser
  // already knows about - are both off. Until then the poster stays up with
  // the play control live, so the demo is one click away rather than gone.
  //
  // Checked in an effect rather than a state initialiser - matchMedia doesn't
  // exist during the server render that produces the initial HTML.
  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;

    if (!reducedMotion && !connection?.saveData) setPlaying(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      video.play().catch(() => {
        // Autoplay can be refused (low power mode, reduced-motion policies).
        // The poster stays up and the play control still works.
        setPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [playing, index]);

  return (
    <div className={cn('relative', className)}>
      {/* Ambient light behind the frame, sized to bleed past its edges. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-8 -top-6 bottom-8 -z-10 rounded-[2rem] bg-primary/20 blur-3xl"
      />

      <figure className="overflow-hidden rounded-xl border border-border bg-surface-2 shadow-elevation-3">
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            key={current.src}
            className="size-full object-contain"
            src={current.src}
            poster={current.poster}
            title={current.title}
            preload={playing ? 'auto' : 'none'}
            autoPlay={playing}
            onEnded={() => go(index + 1)}
            playsInline
            muted
          />
        </div>

        <figcaption className="flex flex-col gap-3 border-t border-border bg-surface-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{current.title}</p>
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground sm:line-clamp-1">
              {current.description}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause demo' : 'Play demo'}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous demo"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ChevronLeft className="size-4" />
            </button>

            <div className="flex items-center gap-1.5 px-1" role="tablist" aria-label="Demo clips">
              {MEDIA_ITEMS.map((item, i) => (
                <button
                  key={item.src}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={item.title}
                  onClick={() => setIndex(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    i === index ? 'w-6 bg-primary' : 'w-1.5 bg-border-strong hover:bg-primary/50'
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => go(index + 1)}
              aria-label="Next demo"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default ProductSurface;
