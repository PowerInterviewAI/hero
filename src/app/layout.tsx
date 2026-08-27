import React from 'react';

import 'github-markdown-css/github-markdown.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

import { ThemeProvider } from '@/components/ThemeProvider';
import { organizationJsonLd } from '@/lib/jsonLd';
import { cn } from '@/lib/utils';
import '@/styles/index.css';

// next/font self-hosts these at build time, so there's no request to Google and
// no swap-in flash. Each is exposed as a CSS variable that tailwind.config.js
// maps to font-sans / font-display / font-mono.
const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fontDisplay = Inter_Tight({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

// Mono carries real weight on this site: install commands, version strings and
// hotkey chips all render in it.
const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = 'https://www.powerinterviewai.com';
const SITE_NAME = 'Power Interview AI';
const DEFAULT_TITLE =
  'Power Interview AI - Interview Coach & AI Meeting Note Taker | Zoom, Google Meet, Teams';
const DEFAULT_DESCRIPTION =
  'New users get a full 1-hour free trial with our free model - no rate limits, no interruptions. Privacy-first AI interview coach and meeting note taker for Zoom, Google Meet, Microsoft Teams. Real-time transcription, AI reply suggestions, mock interview practice, and smart exports.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'AI interview assistant',
    'interview coach',
    'meeting note taker',
    'AI note taker',
    'mock interview',
    'free trial',
    '1-hour free trial',
    'free model',
    'no rate limits',
    'technical interview help',
    'coding interview assistant',
    'live coding challenge',
    'real-time transcription',
    'AI reply suggestions',
    'behavioral interview practice',
    'Zoom meeting notes',
    'Google Meet transcript',
    'Microsoft Teams recording',
    'smart export',
    'interview transcription',
    'stealth mode',
    'privacy-first',
    'cryptocurrency payment',
    'interview practice software',
    'desktop application',
    'Windows',
    'Mac',
    'interview companion',
    'bring your own LLM',
    'OpenAI',
    'Anthropic',
    'Google',
    'interview preparation',
    'FAANG interview prep',
    'coding interview prep',
    'system design interview',
    'interview confidence',
    'get hired faster',
    'ace interviews',
  ],
  authors: [{ name: SITE_NAME }],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  applicationName: SITE_NAME,
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Power Interview AI - Interview Coach & Meeting Note Taker',
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: '/open-graph.png',
        width: 1200,
        height: 630,
        alt: 'Power Interview AI - AI interview coach and meeting note taker',
      },
    ],
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Power Interview AI - Interview Coach & AI Note Taker',
    description:
      'New users get a full 1-hour free trial with our free model - no rate limits, no interruptions. Privacy-first AI interview coach for Zoom, Google Meet, Teams. Real-time transcription, AI suggestions, mock interviews, and smart exports.',
    images: ['/open-graph.png'],
  },
};

// Kept in sync with --background in src/styles/index.css and with
// public/manifest.json - all three used to disagree.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff8f0' },
    { media: '(prefers-color-scheme: dark)', color: '#110f0e' },
  ],
};

// Sets the dark/light class on <html> before hydration to avoid a flash of the wrong theme.
const themeInitScript = `
(function () {
  const theme = localStorage.getItem('theme') || 'dark';
  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.add('light');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(fontSans.variable, fontDisplay.variable, fontMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Organization is the only schema true of every route. The
            SoftwareApplication and FAQPage blocks moved to the pages whose
            content they describe - see src/lib/jsonLd.ts. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V6LKZ75M3J"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V6LKZ75M3J');
          `}
        </Script>
      </body>
    </html>
  );
}
