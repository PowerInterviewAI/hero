import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

export interface MediaSize {
  width: number;
  height: number;
}

/**
 * Posters for the demo clips embedded in the docs.
 *
 * Without one a `<video preload="metadata">` paints a black rectangle until
 * the reader presses play. The clips are 2560x1440 and the posters 1920x1080,
 * so both are 16:9 - see public/media/marketing/README.md.
 */
const VIDEO_POSTERS: Record<string, string> = {
  '/media/live-interview-assistant.mp4': '/media/marketing/poster-live-interview.png',
  '/media/coding-challenge-1.mp4': '/media/marketing/poster-coding-1.png',
  '/media/coding-challenge-2.mp4': '/media/marketing/poster-coding-2.png',
  '/media/coding-challenge-3.mp4': '/media/marketing/poster-coding-3.png',
};

export function getVideoPoster(src: string): string | undefined {
  return VIDEO_POSTERS[src];
}

// Reading a header off disk on every render would be wasteful during a build
// that prerenders every doc slug; the files never change within a build.
const sizeCache = new Map<string, MediaSize | null>();

function readPngSize(buffer: Buffer): MediaSize | null {
  // 8-byte signature, then the IHDR chunk: 4 length + 4 type + width + height.
  if (buffer.length < 24 || buffer.toString('ascii', 12, 16) !== 'IHDR') return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function readJpegSize(buffer: Buffer): MediaSize | null {
  // Walk the segment chain to the first start-of-frame marker, which is the
  // only place a baseline or progressive JPEG records its dimensions.
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    // SOF0-SOF15, minus the non-frame markers that share the range.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }

    offset += 2 + buffer.readUInt16BE(offset + 2);
  }
  return null;
}

function readSvgSize(buffer: Buffer): MediaSize | null {
  const head = buffer.toString('utf-8', 0, 2048);

  const viewBox = head.match(
    /viewBox\s*=\s*["']\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/
  );
  if (viewBox) return { width: Math.round(+viewBox[1]), height: Math.round(+viewBox[2]) };

  const width = head.match(/\swidth\s*=\s*["'](\d+(?:\.\d+)?)(?:px)?["']/);
  const height = head.match(/\sheight\s*=\s*["'](\d+(?:\.\d+)?)(?:px)?["']/);
  if (width && height) return { width: Math.round(+width[1]), height: Math.round(+height[1]) };

  return null;
}

/**
 * Intrinsic pixel size of an asset under public/, read straight from its
 * header - no image library, and no hand-maintained dimension table to drift
 * out of sync with the files.
 *
 * Docs markdown can't carry width/height, so the renderer resolves them here
 * and stamps them onto the element. Without that every screenshot on a docs
 * page reflows the text below it as it decodes.
 *
 * `.mp4` resolves through its poster, which shares the clip's aspect ratio.
 * Returns null for anything unreadable; callers fall back to an
 * aspect-ratio-free image rather than failing the render.
 */
export function getMediaSize(src: string): MediaSize | null {
  if (!src.startsWith('/')) return null;

  const resolved = src.endsWith('.mp4') ? (getVideoPoster(src) ?? src) : src;
  const cached = sizeCache.get(resolved);
  if (cached !== undefined) return cached;

  let size: MediaSize | null = null;
  try {
    const filePath = path.join(PUBLIC_DIR, resolved);
    // Guard against a markdown path escaping public/ via `..`.
    if (filePath.startsWith(PUBLIC_DIR)) {
      const buffer = fs.readFileSync(filePath);
      const extension = path.extname(resolved).toLowerCase();

      if (extension === '.png') size = readPngSize(buffer);
      else if (extension === '.jpg' || extension === '.jpeg') size = readJpegSize(buffer);
      else if (extension === '.svg') size = readSvgSize(buffer);
    }
  } catch {
    // Missing or unreadable file - the <img> will surface it on its own.
    size = null;
  }

  sizeCache.set(resolved, size);
  return size;
}
