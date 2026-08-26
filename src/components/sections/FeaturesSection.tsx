import React from 'react';

import { SiSuperuser } from '@icons-pack/react-simple-icons';
import {
  Captions,
  FileDown,
  Ghost,
  KeyRound,
  Languages,
  MessageSquareCode,
  MessageSquareText,
  UserLock,
} from 'lucide-react';

import Container from '@/components/Container';
import { GoHomeButton } from '@/components/GoHomeButton';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const FeaturesSection: React.FC = () => {
  return (
    <section
      id="features"
      className="bg-muted/30 py-16 md:py-24"
      aria-labelledby="features-heading"
    >
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="features-heading"
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to ace your interviews and capture meeting insights with AI
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <Captions className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle>Live Transcription</CardTitle>
              <CardDescription>
                Dual-channel transcription with automatic speaker detection and full conversation
                history. Change your microphone{' '}
                <span className="font-semibold text-foreground">mid-interview</span> without
                stopping the session - no gap in the transcript, nothing to restart.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <MessageSquareText className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle>AI Reply Suggestions</CardTitle>
              <CardDescription>
                Get personalized, context-aware responses powered by comprehensive awareness of your
                CV, job description, and{' '}
                <span className="font-semibold text-foreground">full conversation history</span>.
                Our AI analyzes patterns in your communication style and adapts to provide more
                relevant, accurate suggestions that help you articulate your thoughts better. Toggle{' '}
                <span className="font-semibold text-foreground">Professional Mode</span> for
                at-a-glance hints - a headline plus keyword bullets - instead of full sentences.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <Languages className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle>28 Interview Languages</CardTitle>
              <CardDescription>
                Interview in{' '}
                <span className="font-semibold text-foreground">your own language</span> - one
                setting drives all three: which speech model transcribes the call, the language your
                suggestions come back in, and the language of your exported report. Switch it{' '}
                <span className="font-semibold text-foreground">mid-interview</span>, not just
                before you start. Full right-to-left support for Arabic and Hebrew.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <Ghost className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle>Stealth Mode</CardTitle>
              <CardDescription>
                Operate discreetly with hotkeys, opacity control, and smart window positioning.
                Window is not capturable and invisible during full screen share.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <MessageSquareCode className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle>Code Suggestions</CardTitle>
              <CardDescription>
                Screenshot analysis with LLM-powered solutions for coding problems, complete with
                syntax highlighting
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <FileDown className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle>AI Note Taker Export</CardTitle>
              <CardDescription>
                <span className="font-semibold text-foreground">Smart meeting export</span> for
                interviews, mock interviews, and video calls. AI-generated summaries, action items,
                speaker-labeled transcripts, and follow-up notes. Exports to{' '}
                <span className="font-semibold text-foreground">DOCX format</span> for easy sharing
                across individuals and enterprise teams.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <SiSuperuser className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle>Mock Interview</CardTitle>
              <CardDescription>
                Practice with AI-guided mock interviews and get exportable performance notes. Learn
                more in the{' '}
                <a className="font-semibold text-primary underline" href="/docs/mock-interview">
                  mock interview guide
                </a>
                .
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <KeyRound className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle>Plan-Based Access</CardTitle>
              <CardDescription>
                Trial users get live suggestions free under rate limit (5 suggestions per hour).
                Paid users unlock no limit, triggered suggestions, and provided SOTA models.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <UserLock className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle>Privacy First</CardTitle>
              <CardDescription>
                Transcripts are never retained after your session. No data mining, and full control
                over your information
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <GoHomeButton size="lg">
            Get Started Now
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </GoHomeButton>
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
