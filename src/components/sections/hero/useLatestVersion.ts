'use client';

import { useEffect, useState } from 'react';

import { RELEASES_API_URL } from './constants';

// This fetch runs client-side (inside a useEffect), so Next.js's server-side
// fetch cache (`next: { revalidate }`) doesn't apply - cache the result in
// localStorage instead, keyed with a fetch timestamp.
const RELEASE_VERSION_CACHE_KEY = 'pia-latest-release-version';
const RELEASE_VERSION_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function readCachedVersion(): string | null | undefined {
  try {
    const cached = window.localStorage.getItem(RELEASE_VERSION_CACHE_KEY);
    if (!cached) return undefined;
    const { version, fetchedAt } = JSON.parse(cached) as {
      version: string | null;
      fetchedAt: number;
    };
    if (Date.now() - fetchedAt > RELEASE_VERSION_CACHE_TTL_MS) return undefined;
    return version;
  } catch {
    return undefined;
  }
}

function writeCachedVersion(version: string | null): void {
  try {
    window.localStorage.setItem(
      RELEASE_VERSION_CACHE_KEY,
      JSON.stringify({ version, fetchedAt: Date.now() })
    );
  } catch {
    // storage unavailable (e.g. private browsing) or full - non-fatal
  }
}

/**
 * Latest published release version, or null while loading and if the GitHub
 * API is unreachable. Every consumer must degrade to the releases page on
 * null rather than building an asset URL from a missing version.
 */
export function useLatestVersion(): string | null {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersion = async () => {
      const cachedVersion = readCachedVersion();
      if (cachedVersion !== undefined) {
        setVersion(cachedVersion);
        return;
      }

      try {
        const response = await fetch(RELEASES_API_URL);
        if (response.ok) {
          const data = await response.json();
          const tag = data.tag_name?.replace(/^v/, '') || null;
          setVersion(tag);
          writeCachedVersion(tag);
        }
      } catch (error) {
        console.error('Failed to fetch version:', error);
      }
    };

    fetchVersion();
  }, []);

  return version;
}
