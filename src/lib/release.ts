import {
  DownloadTarget,
  RELEASES_API_URL,
  RELEASES_LATEST_URL,
  RELEASES_URL,
  getAssetName,
} from '@/components/sections/hero/constants';

/**
 * Latest published release version (no leading "v"), or null if GitHub is
 * unreachable.
 *
 * The server-side twin of `useLatestVersion` in the hero. That one runs in a
 * useEffect and caches in localStorage; this one is a plain server fetch, so it
 * can use Next's own fetch cache instead. Callers must degrade to the releases
 * page on null rather than building an asset URL out of a missing version - a
 * guessed filename is a 404, which is exactly what hardcoding a version into
 * the docs produced.
 */
export async function getLatestVersion(): Promise<string | null> {
  try {
    const response = await fetch(RELEASES_API_URL, {
      // Re-checked at most hourly; a release landing mid-hour just means the
      // docs catch up on the next revalidation.
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;

    const data = (await response.json()) as { tag_name?: string };
    return data.tag_name?.replace(/^v/, '') || null;
  } catch {
    // Offline build, rate limit, DNS - all non-fatal, the tokens fall back.
    return null;
  }
}

/**
 * Per-tag asset URL, e.g. .../releases/download/v1.7.0/PowerInterviewAI-Setup-1.7.0.exe
 *
 * The hero uses `/releases/latest/download/<asset>` instead, which always
 * serves the newest build - correct there, because it resolves the version in
 * the browser on every visit. Docs pages are cached for up to an hour, so the
 * same form would 404 for anyone who loads a stale page just after a release.
 * A per-tag URL can't: worst case a reader gets the previous release, which
 * exists, instead of a broken link.
 */
function pinnedDownloadUrl(version: string | null, target: DownloadTarget): string {
  if (!version) return RELEASES_LATEST_URL;
  return `${RELEASES_URL}/download/v${version}/${getAssetName(version, target)}`;
}

/**
 * Placeholder shown when the version couldn't be resolved. Deliberately not a
 * real-looking number: a stale-but-plausible version silently sends people to a
 * 404, whereas this reads as "fill this in".
 */
const VERSION_PLACEHOLDER = 'X.Y.Z';

/**
 * Substitutes release tokens in a markdown doc before it is rendered.
 *
 * Docs are static markdown, so they can't call `getDownloadUrl` themselves;
 * this is the seam that lets them stay version-free. Supported tokens:
 *
 *   {{version}}          1.7.0        (or X.Y.Z when unresolved)
 *   {{downloadWindows}}  .exe asset   (or the releases page when unresolved)
 *   {{downloadMacArm}}   arm64 .dmg   ("")
 *   {{downloadMacIntel}} x64 .dmg     ("")
 */
export function applyReleaseTokens(markdown: string, version: string | null): string {
  const tokens: Record<string, string> = {
    '{{version}}': version ?? VERSION_PLACEHOLDER,
    '{{downloadWindows}}': pinnedDownloadUrl(version, 'windows'),
    '{{downloadMacArm}}': pinnedDownloadUrl(version, 'macos-arm64'),
    '{{downloadMacIntel}}': pinnedDownloadUrl(version, 'macos-x64'),
  };

  return Object.entries(tokens).reduce(
    (out, [token, value]) => out.split(token).join(value),
    markdown
  );
}
