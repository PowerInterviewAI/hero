export const RELEASES_URL = 'https://github.com/PowerInterviewAI/client-app/releases';
export const RELEASES_LATEST_URL = `${RELEASES_URL}/latest`;
export const DOWNLOAD_BASE_URL = `${RELEASES_LATEST_URL}/download`;
export const RELEASES_API_URL =
  'https://api.github.com/repos/PowerInterviewAI/client-app/releases/latest';

export type InstallPlatform = 'windows' | 'macos';
export type WindowsShell = 'cmd' | 'powershell';

// macOS isn't ready to ship yet - actively being worked on. Until it is,
// DownloadButton and InstallPanel show an honest "not yet" instead of a
// download that may not work. Flip this back on once the fix lands.
export const MACOS_SUPPORTED = false;

// Media carousel data - every item is an .mp4 under public/media/, paired with
// a poster so the frame paints before any video bytes arrive.
//
// All four clips are 2560x1440, so posters must be 16:9 or the frame
// letterboxes. Each poster is a real 1920x1080 frame cut from its own clip and
// annotated by scripts/generate-posters.py - see public/media/marketing/README.md.
export interface MediaItem {
  src: string;
  poster: string;
  title: string;
  description: string;
}

export const MEDIA_ITEMS: MediaItem[] = [
  {
    src: '/media/live-interview-assistant.mp4',
    poster: '/media/marketing/poster-live-interview.jpg',
    title: 'Live Interview Assistant & Smart Export',
    description:
      'Real-time AI-powered interview assistance with instant suggestions and smart export of interview summaries and insights',
  },
  {
    src: '/media/coding-challenge-1.mp4',
    poster: '/media/marketing/poster-coding-1.jpg',
    title: 'Coding Challenge - Graph Traversal',
    description:
      'Capture the problem from your screen and read a syntax-highlighted solution streamed into the stealth overlay while you type',
  },
  {
    src: '/media/coding-challenge-2.mp4',
    poster: '/media/marketing/poster-coding-2.jpg',
    title: 'Coding Challenge - Connected Components',
    description:
      'Multi-screenshot context lets the AI pick up the full problem statement, constraints, and starter signature before it answers',
  },
  {
    src: '/media/coding-challenge-3.mp4',
    poster: '/media/marketing/poster-coding-3.jpg',
    title: 'Coding Challenge - Binary Tree Recursion',
    description:
      'Scroll the code panel with hotkeys alone - the overlay stays hidden from screen share and never steals focus from your editor',
  },
];

/** Generate the install command by platform (and, for Windows, by shell). */
export const getInstallCommand = (
  version: string | null,
  platform: InstallPlatform,
  windowsShell: WindowsShell
): string => {
  if (platform === 'windows') {
    if (windowsShell === 'powershell') {
      if (!version) {
        return '$release = Invoke-RestMethod -Uri "https://api.github.com/repos/PowerInterviewAI/client-app/releases/latest"; $asset = $release.assets | Where-Object { $_.name -like "*Setup*.exe" } | Select-Object -First 1; Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $asset.name; Start-Process ".\\$($asset.name)"';
      }
      return `Invoke-WebRequest -Uri "https://github.com/PowerInterviewAI/client-app/releases/latest/download/PowerInterviewAI-Setup-${version}.exe" -OutFile "PowerInterviewAI-Setup-${version}.exe"; Start-Process ".\\PowerInterviewAI-Setup-${version}.exe"`;
    }

    // cmd.exe: curl.exe ships built-in since Windows 10, but there's no
    // built-in JSON parser - shell out to PowerShell for the unknown-version case.
    if (!version) {
      return "powershell -Command \"$release = Invoke-RestMethod -Uri 'https://api.github.com/repos/PowerInterviewAI/client-app/releases/latest'; $asset = $release.assets | Where-Object { $_.name -like '*Setup*.exe' } | Select-Object -First 1; Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $asset.name; Start-Process -FilePath ('.\\' + $asset.name)\"";
    }
    return `curl -L -o PowerInterviewAI-Setup-${version}.exe https://github.com/PowerInterviewAI/client-app/releases/latest/download/PowerInterviewAI-Setup-${version}.exe && start "" "PowerInterviewAI-Setup-${version}.exe"`;
  }

  // electron-builder tags every mac artifact with its arch as of v1.6.3.
  if (version) {
    return `SUF="-x64"; [ "$(uname -m)" = "arm64" ] && SUF="-arm64"; DMG="Power.Interview.AI-${version}$SUF.dmg"; curl -L -o "$DMG" "https://github.com/PowerInterviewAI/client-app/releases/latest/download/$DMG" && open "$DMG"`;
  }
  return 'DMGS=$(curl -s https://api.github.com/repos/PowerInterviewAI/client-app/releases/latest | grep -Eo \'https://[^"]+\\.dmg\'); if [ "$(uname -m)" = "arm64" ]; then DMG_URL=$(printf \'%s\\n\' "$DMGS" | grep -- \'-arm64\\.dmg\' | head -n 1); else DMG_URL=$(printf \'%s\\n\' "$DMGS" | grep -v -- \'-arm64\\.dmg\' | head -n 1); fi; curl -L "$DMG_URL" -o Power.Interview.AI.dmg && open "Power.Interview.AI.dmg"';
};

export type DownloadTarget = 'windows' | 'macos-arm64' | 'macos-x64';

/**
 * Release asset filename for a platform. electron-builder puts the version in
 * every artifact name, so any URL pointing at one has to be built from a known
 * version - there is no version-less alias on GitHub. Single source of truth
 * for these names; src/lib/release.ts builds per-tag URLs from the same map.
 */
export const getAssetName = (version: string, target: DownloadTarget): string => {
  switch (target) {
    case 'windows':
      return `PowerInterviewAI-Setup-${version}.exe`;
    case 'macos-arm64':
      return `Power.Interview.AI-${version}-arm64.dmg`;
    case 'macos-x64':
      return `Power.Interview.AI-${version}-x64.dmg`;
  }
};

/** Direct asset URL for a platform, falling back to the releases page. */
export const getDownloadUrl = (version: string | null, target: DownloadTarget): string =>
  version ? `${DOWNLOAD_BASE_URL}/${getAssetName(version, target)}` : RELEASES_LATEST_URL;
