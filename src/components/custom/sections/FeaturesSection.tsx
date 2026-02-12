import React from 'react';

import { SiSuperuser } from '@icons-pack/react-simple-icons';
import {
  Captions,
  FileDown,
  Ghost,
  MessageSquareCode,
  MessageSquareText,
  UserLock,
} from 'lucide-react';

import Container from '@/components/custom/Container';
import { Button } from '@/components/ui/button';
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
            Everything you need to ace your interviews with confidence
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <Captions className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle>Live Transcription</CardTitle>
              <CardDescription>
                Dual-channel transcription with automatic speaker detection and full conversation
                history
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
                relevant, accurate suggestions that help you articulate your thoughts better.
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
              <CardTitle>Export Transcript</CardTitle>
              <CardDescription>
                <span className="font-semibold text-foreground">Smart transcript export</span> with
                AI-powered summarization, analysis, and insights. Review your conversations to
                identify communication patterns, understand your strengths, and improve for future
                interviews. Exports to{' '}
                <span className="font-semibold text-foreground">DOCX format</span> - widely
                compatible with all word processing software.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <SiSuperuser className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle>Real-Time Face Swap</CardTitle>
              <CardDescription>
                Transform your video appearance during live interviews with advanced face swap
                technology. <span className="font-semibold text-foreground">Simple setup:</span>{' '}
                Just install{' '}
                <a
                  href="https://obsproject.com/download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  OBS Studio
                </a>{' '}
                and{' '}
                <a
                  href="https://vb-audio.com/Cable/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  VB-Cable
                </a>{' '}
                - no configuration needed!
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <UserLock className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle>Privacy First</CardTitle>
              <CardDescription>
                Your data stays with you. Secure local storage, no data mining, and full control
                over your information
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" asChild>
            <a
              href="https://github.com/PowerInterviewAI/client/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started Now
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
};
