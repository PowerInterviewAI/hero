'use client';

import { useCallback, useEffect, useState } from 'react';

import { Maximize2, X } from 'lucide-react';

interface MarkdownImageProps {
  src?: string;
  alt?: string;
  /** Intrinsic size, resolved server-side by getMediaSize(). */
  width?: number;
  height?: number;
  /** First frame for an .mp4 source, so the frame isn't a black box. */
  poster?: string;
}

// Alt text that says nothing about the picture. These exist in the markdown as
// filler, so they still get used as the accessible name but are never printed
// as a visible caption.
const GENERIC_ALTS = new Set(['image', 'screenshot', 'img', 'picture', 'video']);

const isGeneric = (alt?: string) => !alt || GENERIC_ALTS.has(alt.trim().toLowerCase());

/**
 * Renders markdown media inside the docs.
 *
 * `.mp4` sources become a poster-backed video the reader starts themselves -
 * the demo clips run 1-3 minutes at ~15-20 MB each, so they're
 * `preload="metadata"` rather than autoplaying; a docs page carrying several
 * would otherwise pull tens of megabytes on load.
 *
 * Everything else becomes a figure with the alt text as a visible caption, and
 * opens a fullscreen preview on click. The preview is a real dialog: Escape
 * closes it, focus isn't left stranded behind an invisible overlay, and the
 * page underneath doesn't scroll while it's open.
 */
export function MarkdownImage({ src, alt, width, height, poster }: MarkdownImageProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const close = useCallback(() => setPreviewOpen(false), []);

  useEffect(() => {
    if (!previewOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [previewOpen, close]);

  if (!src) return null;

  const caption = isGeneric(alt) ? null : alt;
  // Reserves the final box before the bytes land, so the prose below doesn't
  // jump as each screenshot decodes.
  const ratioStyle =
    width && height ? { aspectRatio: `${width} / ${height}` } : { aspectRatio: '16 / 9' };

  if (src.endsWith('.mp4')) {
    return (
      <figure className="my-6">
        <video
          src={src}
          poster={poster}
          title={alt}
          aria-label={alt}
          controls
          muted
          playsInline
          preload="metadata"
          width={width}
          height={height}
          style={ratioStyle}
          className="w-full rounded-lg border border-border bg-black object-contain shadow"
        />
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="my-6">
      <button
        type="button"
        onClick={() => setPreviewOpen(true)}
        aria-label={alt ? `Enlarge image: ${alt}` : 'Enlarge image'}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border bg-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <img
          src={src}
          alt={alt ?? ''}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          style={ratioStyle}
          className="w-full object-contain"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-2 rounded-md bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Maximize2 className="size-4" />
        </span>
      </button>

      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}

      {previewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt ? `Image preview: ${alt}` : 'Image preview'}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close preview"
            autoFocus
            className="absolute right-4 top-4 rounded-md bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="size-5" />
          </button>

          <img
            src={src}
            alt={alt ?? ''}
            // Clicking the image itself shouldn't dismiss - only the backdrop
            // and the close control do, which is what makes panning a wide
            // screenshot on touch survivable.
            onClick={(event) => event.stopPropagation()}
            className="max-h-full max-w-full cursor-default rounded-md object-contain shadow-lg"
          />
        </div>
      )}
    </figure>
  );
}

export default MarkdownImage;
