'use client';

import React, { useState } from 'react';

import { Check, Copy, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Section, SectionHeading } from '@/components/ui/section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  DOWNLOAD_BASE_URL,
  type InstallPlatform,
  RELEASES_LATEST_URL,
  RELEASES_URL,
  type WindowsShell,
  getInstallCommand,
} from './constants';
import { useLatestVersion } from './useLatestVersion';

interface DownloadRowProps {
  href: string;
  label: string;
  note: string;
}

const DownloadRow: React.FC<DownloadRowProps> = ({ href, label, note }) => (
  <a
    href={href}
    download
    className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary/50 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    <span className="min-w-0">
      <span className="block truncate text-sm font-medium text-foreground">{label}</span>
      <span className="block truncate font-mono text-xs text-muted-foreground">{note}</span>
    </span>
    <ExternalLink className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
  </a>
);

/**
 * The three install routes, below the fold.
 *
 * This used to sit above the fold inside the hero as a 3x3 nest of tab groups.
 * Nobody chooses between a shell one-liner, an installer and a source build
 * before they've decided to install, so the hero now carries a single download
 * button and the detail lives here.
 */
export const InstallPanel: React.FC<{ id?: string }> = ({ id = 'install' }) => {
  const version = useLatestVersion();
  const [platform, setPlatform] = useState<InstallPlatform>('windows');
  const [shell, setShell] = useState<WindowsShell>('cmd');
  const [copied, setCopied] = useState(false);

  const command = getInstallCommand(version, platform, shell);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Section id={id} tone="muted" size="sm">
      <SectionHeading
        eyebrow="Install"
        title="Three ways to get it running"
        description="Pick whichever fits how you work. The one-liner downloads the latest release and launches the installer for you."
      />

      <div className="mx-auto mt-10 max-w-3xl">
        <Tabs defaultValue="cli">
          <TabsList className="w-full">
            <TabsTrigger value="cli" className="flex-1">
              Command line
            </TabsTrigger>
            <TabsTrigger value="binary" className="flex-1">
              Installer
            </TabsTrigger>
            <TabsTrigger value="source" className="flex-1">
              From source
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cli">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Tabs
                  value={platform}
                  onValueChange={(value) => setPlatform(value as InstallPlatform)}
                >
                  <TabsList>
                    <TabsTrigger value="windows">Windows</TabsTrigger>
                    <TabsTrigger value="macos">macOS</TabsTrigger>
                  </TabsList>
                </Tabs>

                {platform === 'windows' && (
                  <Tabs value={shell} onValueChange={(value) => setShell(value as WindowsShell)}>
                    <TabsList>
                      <TabsTrigger value="cmd">cmd</TabsTrigger>
                      <TabsTrigger value="powershell">PowerShell</TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
              </div>

              {/* The button sits BESIDE the scroll area, not on top of it. It used
                  to be absolutely positioned over the <pre>, and since it's a
                  ghost button - no background - the command scrolled visibly
                  underneath the icon and neither could be read. The pr-14 that
                  was meant to reserve room only padded the end of the scrolling
                  content, so it did nothing at the right edge of the box. */}
              <div className="flex items-start gap-2 rounded-md border border-border bg-surface-1">
                <pre className="min-w-0 flex-1 overflow-x-auto p-4">
                  <code className="font-mono text-xs leading-relaxed text-foreground">
                    {command}
                  </code>
                </pre>
                <Button
                  size="icon"
                  variant="ghost"
                  className="m-2 shrink-0"
                  onClick={copyCommand}
                  aria-label={copied ? 'Copied' : 'Copy install command'}
                  title={copied ? 'Copied' : 'Copy install command'}
                >
                  {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                </Button>
              </div>

              {!version && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Showing the version-agnostic command - the release lookup runs at install time.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="binary">
            <div className="flex flex-col gap-2">
              <DownloadRow
                href={
                  version
                    ? `${DOWNLOAD_BASE_URL}/PowerInterviewAI-Setup-${version}.exe`
                    : RELEASES_LATEST_URL
                }
                label="Windows installer"
                note={version ? `PowerInterviewAI-Setup-${version}.exe` : 'latest release'}
              />
              <DownloadRow
                href={
                  version
                    ? `${DOWNLOAD_BASE_URL}/Power.Interview.AI-${version}-arm64.dmg`
                    : RELEASES_LATEST_URL
                }
                label="macOS - Apple Silicon"
                note={version ? `Power.Interview.AI-${version}-arm64.dmg` : 'latest release'}
              />
              <DownloadRow
                href={
                  version
                    ? `${DOWNLOAD_BASE_URL}/Power.Interview.AI-${version}-x64.dmg`
                    : RELEASES_LATEST_URL
                }
                label="macOS - Intel"
                note={version ? `Power.Interview.AI-${version}-x64.dmg` : 'latest release'}
              />
              <a
                href={RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-center text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                View all releases on GitHub
              </a>
            </div>
          </TabsContent>

          <TabsContent value="source">
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="mb-4 text-sm text-muted-foreground">
                Clone the repository and run from source. Requires Node.js&nbsp;22.15+.
              </p>
              <Button variant="outline" asChild>
                <a href="/docs/installation#option-c---build-from-source">
                  View build instructions
                </a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
};

export default InstallPanel;
