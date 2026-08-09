'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Check, ChevronLeft, ChevronRight, Copy, Pause, Play } from 'lucide-react';

import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import { ENV } from '@/config/constants';
import { cn } from '@/lib/utils';

import { InterviewCountBanner } from './InterviewCountBanner';

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

// Media carousel data
const mediaItems = [
  {
    src: 'media/live.interview.assistant.mp4',
    type: 'video',
    title: 'Live Interview Assistant & Smart Export',
    description:
      'Real-time AI-powered interview assistance with instant suggestions and smart export of interview summaries and insights',
  },
  {
    src: 'media/code.test.mp4',
    type: 'video',
    title: 'Code Test Assistance',
    description: 'AI-powered code suggestions and solutions for technical interviews',
  },
];

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const fetchActiveSessionsCount = async (): Promise<number | null> => {
  try {
    const response = await fetch(`${ENV.apiBaseUrl}api/health-check/active-sessions`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    const parsedCount = parseInt(text.trim(), 10);

    if (Number.isFinite(parsedCount) && parsedCount >= 0) {
      return parsedCount;
    }
  } catch (error) {
    console.warn('Failed to fetch active session count:', error);
  }

  return null;
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  size?: 'md' | 'sm';
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, size = 'md', children }) => (
  <button
    onClick={onClick}
    className={cn(
      'rounded-md font-medium transition-all',
      size === 'md' ? 'flex-1 px-3 py-1.5 text-sm' : 'px-3 py-1 text-xs',
      active
        ? 'bg-background text-foreground shadow'
        : size === 'md'
          ? 'text-muted-foreground hover:text-foreground'
          : 'bg-transparent text-muted-foreground hover:text-foreground'
    )}
  >
    {children}
  </button>
);

interface DownloadLinkProps {
  href: string;
  children: React.ReactNode;
}

const DownloadLink: React.FC<DownloadLinkProps> = ({ href, children }) => (
  <a
    href={href}
    download
    className="inline-flex w-full max-w-[40rem] items-center justify-center gap-2 rounded-md border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
  >
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
    {children}
  </a>
);

type InstallPlatform = 'windows' | 'macos';

const RELEASES_LATEST_URL = 'https://github.com/PowerInterviewAI/client-app/releases/latest';
const DOWNLOAD_BASE_URL = `${RELEASES_LATEST_URL}/download`;

// Generate install command by platform
const getInstallCommand = (version: string | null, platform: InstallPlatform): string => {
  if (platform === 'windows') {
    if (!version) {
      return '$release = Invoke-RestMethod -Uri "https://api.github.com/repos/PowerInterviewAI/client-app/releases/latest"; $asset = $release.assets | Where-Object { $_.name -like "*Setup*.exe" } | Select-Object -First 1; Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $asset.name; Start-Process ".\\$($asset.name)"';
    }
    return `curl -L -o PowerInterviewAI-Setup-${version}.exe https://github.com/PowerInterviewAI/client-app/releases/latest/download/PowerInterviewAI-Setup-${version}.exe && start "" "PowerInterviewAI-Setup-${version}.exe"`;
  }

  // electron-builder only suffixes the non-default arch, so the Intel DMG carries no arch token.
  if (version) {
    return `SUF=""; [ "$(uname -m)" = "arm64" ] && SUF="-arm64"; DMG="Power.Interview.AI-${version}$SUF.dmg"; curl -L -o "$DMG" "https://github.com/PowerInterviewAI/client-app/releases/latest/download/$DMG" && open "$DMG"`;
  }
  return 'DMGS=$(curl -s https://api.github.com/repos/PowerInterviewAI/client-app/releases/latest | grep -Eo \'https://[^"]+\\.dmg\'); if [ "$(uname -m)" = "arm64" ]; then DMG_URL=$(printf \'%s\\n\' "$DMGS" | grep -- \'-arm64\\.dmg\' | head -n 1); else DMG_URL=$(printf \'%s\\n\' "$DMGS" | grep -v -- \'-arm64\\.dmg\' | head -n 1); fi; curl -L "$DMG_URL" -o Power.Interview.AI.dmg && open "Power.Interview.AI.dmg"';
};

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [version, setVersion] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeInstallTab, setActiveInstallTab] = useState<'cli' | 'binary' | 'source'>('cli');
  const [installPlatform, setInstallPlatform] = useState<InstallPlatform>('windows');
  const [interviewCount, setInterviewCount] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interviewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isMounted = true;

    const scheduleNextUpdate = async () => {
      const delay = 5000; // poll every 5 seconds

      const count = await fetchActiveSessionsCount();
      if (isMounted && count !== null) {
        setInterviewCount(count);
      }

      if (!isMounted) return;
      interviewTimerRef.current = setTimeout(() => {
        scheduleNextUpdate();
      }, delay);
    };

    scheduleNextUpdate();

    return () => {
      isMounted = false;
      if (interviewTimerRef.current) {
        clearTimeout(interviewTimerRef.current);
      }
    };
  }, []);

  // Fetch latest version from GitHub releases API
  useEffect(() => {
    const fetchVersion = async () => {
      const cachedVersion = readCachedVersion();
      if (cachedVersion !== undefined) {
        setVersion(cachedVersion);
        return;
      }

      try {
        const response = await fetch(
          'https://api.github.com/repos/PowerInterviewAI/client-app/releases/latest'
        );
        if (response.ok) {
          const data = await response.json();
          const version = data.tag_name?.replace(/^v/, '') || null;
          setVersion(version);
          writeCachedVersion(version);
        }
      } catch (error) {
        console.error('Failed to fetch version:', error);
      }
    };

    fetchVersion();
  }, []);

  // Copy install command to clipboard
  const copyInstallCommand = async () => {
    const command = getInstallCommand(version, installPlatform);

    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Carousel navigation functions with fade effect
  const goToNextMedia = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
      setIsFading(false);
    }, 300);
  };

  const goToPrevMedia = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
      setIsFading(false);
    }, 300);
  };

  const goToMedia = (index: number) => {
    if (index !== currentMediaIndex) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentMediaIndex(index);
        setIsFading(false);
      }, 300);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Handle video ended event - auto advance to next media
  const handleVideoEnded = () => {
    goToNextMedia();
  };

  // Handle image timer - show for 5 seconds then advance
  useEffect(() => {
    const currentMedia = mediaItems[currentMediaIndex];

    if (currentMedia.type === 'image' && isPlaying) {
      imageTimerRef.current = setTimeout(() => {
        goToNextMedia();
      }, 5000); // 5 seconds for images
    }

    return () => {
      if (imageTimerRef.current) {
        clearTimeout(imageTimerRef.current);
      }
    };
  }, [currentMediaIndex, isPlaying]);

  // Handle video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((e) => console.log('Video play error:', e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentMediaIndex]);
  return (
    <section id="home" className="md:pt-22 pb-16 pt-10 md:pb-24" aria-labelledby="hero-heading">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <InterviewCountBanner count={interviewCount} />

          {/* Trial promotion banner */}
          <div className="mx-auto mb-6 flex w-fit flex-col items-center gap-1 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-sky-500/10 to-primary/10 px-5 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              New users get a full <span className="text-primary">1-hour free trial</span> with our{' '}
              <span className="text-primary">free model</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                No rate limits
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                No interruptions
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Live suggestion experience for free
              </span>
            </div>
          </div>

          <h1
            id="hero-heading"
            className="mb-6 mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your Personal AI-Powered
            <span className="block text-primary">Interview Coach & Meeting Note Taker</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Capture live interviews, mock interviews, meetings, and business calls with AI-powered
            suggestions, transcription, and smart export. Includes coding challenge assistance,
            support for your own LLM provider, and a privacy-first design built for individuals and
            enterprise use.
          </p>

          {/* PeerPush badges */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <a href="https://peerpush.net/p/power-interview-ai" target="_blank" rel="noopener">
              <img
                src="https://peerpush.net/p/power-interview-ai/badge.png"
                alt="Power Interview AI on PeerPush"
                style={{ width: '230px' }}
              />
            </a>
            <a href="https://peerpush.net/p/power-interview-ai" target="_blank" rel="noopener">
              <img
                src="https://peerpush.net/p/power-interview-ai/rating-badge.png"
                alt="Power Interview AI rating on PeerPush"
                style={{ width: '400px' }}
              />
            </a>
          </div>

          {/* Installation Options */}
          <div className="mx-auto mt-4 max-w-3xl">
            <div className="mb-3 text-center">
              <h3 className="text-md text-muted-foreground">
                Install PowerInterviewAI client using:
              </h3>
            </div>

            {/* Tab buttons */}
            <div className="mb-3 flex rounded-lg border bg-muted/30 p-1">
              <TabButton
                active={activeInstallTab === 'cli'}
                onClick={() => setActiveInstallTab('cli')}
              >
                Command Line{' '}
                <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                  Recommended
                </span>
              </TabButton>
              <TabButton
                active={activeInstallTab === 'binary'}
                onClick={() => setActiveInstallTab('binary')}
              >
                Prebuilt Installer
              </TabButton>
              <TabButton
                active={activeInstallTab === 'source'}
                onClick={() => setActiveInstallTab('source')}
              >
                Build from Source
              </TabButton>
            </div>

            {/* Tab: Command Line */}
            {activeInstallTab === 'cli' && (
              <div className="group relative rounded-lg border bg-muted/50 p-4">
                <div className="mb-3 flex justify-center gap-2">
                  <TabButton
                    size="sm"
                    active={installPlatform === 'windows'}
                    onClick={() => setInstallPlatform('windows')}
                  >
                    Windows
                  </TabButton>
                  <TabButton
                    size="sm"
                    active={installPlatform === 'macos'}
                    onClick={() => setInstallPlatform('macos')}
                  >
                    macOS
                  </TabButton>
                </div>
                <pre className="mr-8 overflow-x-auto">
                  <code className="text-md font-mono text-foreground">
                    {version
                      ? getInstallCommand(version, installPlatform)
                      : 'Loading installation command...'}
                  </code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-4 h-8 w-8 p-0 opacity-70 transition-opacity hover:opacity-100"
                  onClick={copyInstallCommand}
                  disabled={!version}
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}

            {/* Tab: Prebuilt Installer */}
            {activeInstallTab === 'binary' && (
              <div className="rounded-lg border bg-muted/50 p-6 text-center">
                <p className="mb-4 text-sm text-muted-foreground">
                  Download the installer for your OS and run it. No additional setup required.
                </p>
                <div className="flex flex-col items-center gap-3">
                  <DownloadLink
                    href={
                      version
                        ? `${DOWNLOAD_BASE_URL}/PowerInterviewAI-Setup-${version}.exe`
                        : RELEASES_LATEST_URL
                    }
                  >
                    {version
                      ? `Download PowerInterviewAI-Setup-${version}.exe`
                      : 'Download Latest Installer'}{' '}
                    (Windows)
                  </DownloadLink>
                  <DownloadLink
                    href={
                      version
                        ? `${DOWNLOAD_BASE_URL}/Power.Interview.AI-${version}-arm64.dmg`
                        : RELEASES_LATEST_URL
                    }
                  >
                    {version
                      ? `Download Power.Interview.AI-${version}-arm64.dmg`
                      : 'Open Latest Release Assets'}{' '}
                    (macOS Apple Silicon)
                  </DownloadLink>
                  <DownloadLink
                    href={
                      version
                        ? `${DOWNLOAD_BASE_URL}/Power.Interview.AI-${version}.dmg`
                        : RELEASES_LATEST_URL
                    }
                  >
                    {version
                      ? `Download Power.Interview.AI-${version}.dmg`
                      : 'Open Latest Release Assets'}{' '}
                    (macOS Intel)
                  </DownloadLink>
                  <a
                    href="https://github.com/PowerInterviewAI/client-app/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground underline hover:text-foreground"
                  >
                    View all releases on GitHub
                  </a>
                </div>
              </div>
            )}

            {/* Tab: Build from Source */}
            {activeInstallTab === 'source' && (
              <div className="rounded-lg border bg-muted/50 p-6 text-center">
                <p className="mb-4 text-sm text-muted-foreground">
                  Clone the repository and run from source. Requires Node.js&nbsp;18+.
                </p>
                <a
                  href="/docs/installation#option-c---build-from-source"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View Build Instructions
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            🎁 Start for Free to try all features - Pay with coins only (No credit card, PayPal, or
            bank required)
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('features')}
              className="gap-2"
            >
              Learn More
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
          </div>

          {/* Product Demo Carousel */}
          <div className="mt-12 rounded-lg border bg-muted/30 p-2">
            <div className="relative overflow-hidden rounded bg-black">
              <div
                className={`relative aspect-video transition-opacity duration-300 ${
                  isFading ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {mediaItems[currentMediaIndex].type === 'video' ? (
                  <video
                    ref={videoRef}
                    key={mediaItems[currentMediaIndex].src}
                    className="h-full w-full object-contain"
                    src={`/${mediaItems[currentMediaIndex].src}`}
                    autoPlay={isPlaying}
                    onEnded={handleVideoEnded}
                    playsInline
                    muted
                  />
                ) : (
                  <img
                    key={mediaItems[currentMediaIndex].src}
                    src={`/${mediaItems[currentMediaIndex].src}`}
                    alt={mediaItems[currentMediaIndex].title}
                    className="h-full w-full object-contain"
                  />
                )}

                <button
                  onClick={goToPrevMedia}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/75"
                  aria-label="Previous media"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={goToNextMedia}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/75"
                  aria-label="Next media"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="absolute bottom-4 right-4 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/75"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent px-6 py-6">
                  <h3 className="mb-2 text-2xl font-bold text-white drop-shadow-lg md:text-3xl">
                    {mediaItems[currentMediaIndex].title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-100 drop-shadow-md md:text-lg">
                    {mediaItems[currentMediaIndex].description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 bg-black/30 py-3">
                {mediaItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToMedia(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentMediaIndex
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to media ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
