import React from 'react';

import 'github-markdown-css/github-markdown.css';
import type { Metadata } from 'next';
import Script from 'next/script';

import '@/styles/index.css';

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
        width: 1235,
        height: 647,
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
  other: {
    'theme-color': '#1a0f0a',
  },
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
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Power Interview AI legal to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Power Interview AI is designed for legitimate educational and interview preparation purposes. However, you are responsible for ensuring your use complies with applicable laws and the terms of service of platforms you use. Always use ethically and legally.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the privacy protection work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your interview configuration - full name, profile/CV, and context - is saved to your account so it follows you across devices. Transcripts and screenshots are sent to our AI services when you request a suggestion, and transcripts are never persisted on our servers: they exist only for the length of your session. Your session token and device settings stay on your machine. We never sell or share your personal information.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use my own LLM provider?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All users can bring their own provider (OpenAI, Anthropic, Google, and more) using API keys they control. Depending on your plan, a default model is also included so you can get started instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What platforms are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Power Interview AI supports both Windows and macOS.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need special hardware to run Power Interview AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Power Interview AI runs on most modern Windows and macOS computers without special hardware requirements. A stable internet connection improves streaming performance, but you do not need a dedicated GPU.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate is the AI transcription?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our real-time transcription uses advanced ASR (Automatic Speech Recognition) with dual-channel support and speaker detection. Accuracy depends on audio quality, but it performs excellently in typical interview scenarios with clear audio.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use this for coding interviews?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! Power Interview includes specialized code suggestion features. It can analyze screenshots of coding problems and provide LLM-powered solutions with proper syntax highlighting. Perfect for technical interviews.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is stealth mode?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stealth mode allows you to operate the assistant discreetly during interviews. You can control everything via hotkeys, adjust window opacity, and position windows strategically-all without losing focus on your interview tab or application. Additionally, the window is not capturable in screenshots and remains invisible during full screen sharing, ensuring complete privacy during your interview.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do credits work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Credits are consumed at a rate of 10 credits per minute when using AI-powered features like reply suggestions, code analysis, and transcription. For example, a 30-minute interview session would use approximately 300 credits.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept cryptocurrency coins only. No credit card, PayPal, or traditional bank payments are required. This ensures maximum privacy and security for your transactions. Simply purchase coins and use them to buy credit packs within the application.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a free trial?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! New users get a full 1-hour free trial powered by our free model - with no rate limits and no interruptions. The trial includes live suggestions; triggered suggestions are available on paid plans.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get a refund?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We stand behind our product. If you are not satisfied with Power Interview, please contact us at team@vectorleappulse.xyz within 14 days of purchase to discuss refund options.',
      },
    },
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
    <html lang="en" suppressHydrationWarning>
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
