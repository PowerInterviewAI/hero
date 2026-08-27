import React from 'react';

import 'github-markdown-css/github-markdown.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

import { FAQ_ITEMS } from '@/config/faq';
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

const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Windows, macOS, Linux',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '20',
    highPrice: '500',
    priceCurrency: 'USD',
    offerCount: '3',
  },
  description:
    'Privacy-first AI interview assistant and meeting note taker with real-time transcription, mock interview practice, live AI suggestions, coding challenge assistance, and smart exports for Zoom, Google Meet, and Microsoft Teams.',
  author: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.png`,
    sameAs: ['https://github.com/PowerInterviewAI/client-app', 'https://t.me/power_interview_ai'],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '156',
  },
  screenshot: `${SITE_URL}/logo.png`,
  featureList: [
    '1-hour free trial with our free model - no rate limits, no interruptions',
    'Live transcription with speaker detection',
    'AI-powered reply and code suggestions',
    'Mock interview practice',
    'AI-powered meeting note taker for Zoom, Google Meet, Microsoft Teams',
    'Smart export with AI summaries and action items',
    'Bring your own LLM provider',
    'Stealth mode with hotkeys',
    'Privacy-first local data storage',
  ],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  description:
    'Privacy-first AI interview assistant and meeting note taker for interviews, mock interviews, and business calls. Supports Zoom, Google Meet, Microsoft Teams, and more.',
  email: 'team@vectorleappulse.xyz',
  sameAs: ['https://github.com/PowerInterviewAI/client-app', 'https://t.me/power_interview_ai'],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'team@vectorleappulse.xyz',
    contactType: 'Customer Support',
  },
};

const faqPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  // Derived from the same array FAQSection renders, so the rich result can't
  // drift from the page the way two hand-maintained copies did.
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
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
