'use client';

import React, { useEffect, useState } from 'react';

import { Apple, Download, Monitor } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { RELEASES_URL, getDownloadUrl } from './constants';
import { useLatestVersion } from './useLatestVersion';

type DetectedOS = 'windows' | 'macos' | 'other';

/**
 * Best-effort client-side OS detection.
 *
 * userAgentData is the modern path but is Chromium-only, so the userAgent
 * string stays as the fallback. 'other' (Linux, mobile, anything unrecognised)
 * gets the neutral label and the full releases page rather than a guess.
 */
function detectOS(): DetectedOS {
  if (typeof navigator === 'undefined') return 'other';

  const uaData = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData;
  const platform = (uaData?.platform || navigator.userAgent || '').toLowerCase();

  if (platform.includes('win')) return 'windows';
  if (platform.includes('mac')) return 'macos';
  return 'other';
}

interface DownloadButtonProps {
  className?: string;
  size?: 'lg' | 'xl';
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ className, size = 'xl' }) => {
  const version = useLatestVersion();
  // Starts as 'other' so the server render and the first client render agree;
  // the effect narrows it once we're in the browser.
  const [os, setOS] = useState<DetectedOS>('other');

  useEffect(() => {
    setOS(detectOS());
  }, []);

  const primary = {
    windows: {
      label: 'Download for Windows',
      href: getDownloadUrl(version, 'windows'),
      Icon: Monitor,
    },
    macos: {
      label: 'Download for macOS',
      href: getDownloadUrl(version, 'macos-arm64'),
      Icon: Apple,
    },
    other: {
      label: 'Download',
      href: RELEASES_URL,
      Icon: Download,
    },
  }[os];

  const { Icon } = primary;

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <Button size={size} asChild>
        <a href={primary.href} download={os !== 'other' && version ? '' : undefined}>
          <Icon />
          {primary.label}
        </a>
      </Button>

      <p className="text-xs text-muted-foreground">
        {version ? (
          <span className="font-mono">v{version}</span>
        ) : (
          <span className="font-mono">latest</span>
        )}
        {' · '}
        {os !== 'windows' && (
          <>
            <a
              href={getDownloadUrl(version, 'windows')}
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Windows
            </a>
            {' · '}
          </>
        )}
        {os !== 'macos' && (
          <>
            <a
              href={getDownloadUrl(version, 'macos-arm64')}
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              macOS
            </a>
            {' · '}
          </>
        )}
        {os === 'macos' && (
          <>
            <a
              href={getDownloadUrl(version, 'macos-x64')}
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Intel Mac
            </a>
            {' · '}
          </>
        )}
        <a
          href={RELEASES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          All releases
        </a>
      </p>
    </div>
  );
};

export default DownloadButton;
