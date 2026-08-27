export const RELEASES_URL = 'https://github.com/PowerInterviewAI/client-app/releases';
export const RELEASES_LATEST_URL = `${RELEASES_URL}/latest`;
export const DOWNLOAD_BASE_URL = `${RELEASES_LATEST_URL}/download`;
export const RELEASES_API_URL =
  'https://api.github.com/repos/PowerInterviewAI/client-app/releases/latest';

export type InstallPlatform = 'windows' | 'macos';
export type WindowsShell = 'cmd' | 'powershell';

// Media carousel data - every item is an .mp4 under public/media/, paired with
// a poster so the frame paints before any video bytes arrive.
//
// All four clips are 2560x1440, so posters must be 16:9 or the frame
// letterboxes. These are 1920x1080 placeholders - see
// public/media/marketing/README.md for what to replace them with.
export interface MediaItem {
  src: string;
  poster: string;
  title: string;
  description: string;
}

export const MEDIA_ITEMS: MediaItem[] = [
  {
    src: '/media/live-interview-assistant.mp4',
    poster: '/media/marketing/poster-live-interview.png',
    title: 'Live Interview Assistant & Smart Export',
    description:
      'Real-time AI-powered interview assistance with instant suggestions and smart export of interview summaries and insights',
  },
  {
    src: '/media/coding-challenge-1.mp4',
    poster: '/media/marketing/poster-coding-1.png',
    title: 'Coding Challenge - Graph Traversal',
    description:
      'Capture the problem from your screen and read a syntax-highlighted solution streamed into the stealth overlay while you type',
  },
  {
    src: '/media/coding-challenge-2.mp4',
    poster: '/media/marketing/poster-coding-2.png',
    title: 'Coding Challenge - Connected Components',
    description:
      'Multi-screenshot context lets the AI pick up the full problem statement, constraints, and starter signature before it answers',
  },
  {
    src: '/media/coding-challenge-3.mp4',
    poster: '/media/marketing/poster-coding-3.png',
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

/** Direct asset URL for a platform, falling back to the releases page. */
export const getDownloadUrl = (
  version: string | null,
  target: 'windows' | 'macos-arm64' | 'macos-x64'
): string => {
  if (!version) return RELEASES_LATEST_URL;

  switch (target) {
    case 'windows':
      return `${DOWNLOAD_BASE_URL}/PowerInterviewAI-Setup-${version}.exe`;
    case 'macos-arm64':
      return `${DOWNLOAD_BASE_URL}/Power.Interview.AI-${version}-arm64.dmg`;
    case 'macos-x64':
      return `${DOWNLOAD_BASE_URL}/Power.Interview.AI-${version}-x64.dmg`;
  }
};
