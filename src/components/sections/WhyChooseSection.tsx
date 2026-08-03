import React from 'react';

import { SiCheckmarx } from '@icons-pack/react-simple-icons';
import { ArrowRight } from 'lucide-react';

import Container from '@/components/Container';
import { GoHomeButton } from '@/components/GoHomeButton';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24" aria-labelledby="why-choose-heading">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="why-choose-heading"
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Why Power Interview AI Stands Out
          </h2>
          <p className="text-lg text-muted-foreground">
            The most advanced and privacy-focused AI interview assistant on the market
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:gap-8">
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SiCheckmarx className="h-6 w-6 text-primary" />
                  True Privacy Protection
                </CardTitle>
                <CardDescription className="text-base">
                  Most AI interview assistants (Interviewing.io, Pramp, even some "privacy-focused"
                  tools) keep a record of your interviews.
                  <span className="font-semibold text-foreground"> We don't.</span> Transcripts
                  exist only for the length of your session and are never written to disk on our
                  side. Your profile and CV are saved to your account so they follow you across
                  devices - and nothing is ever mined or sold to third parties.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SiCheckmarx className="h-6 w-6 text-primary" />
                  Advanced Stealth Mode
                </CardTitle>
                <CardDescription className="text-base">
                  While tools like Yoodli and Big Interview offer practice features, they don't help
                  during <span className="font-semibold text-foreground">live interviews</span>. Our
                  stealth mode makes the window{' '}
                  <span className="font-semibold text-foreground">
                    completely invisible during screen sharing
                  </span>
                  , won't show in screenshots, and can be controlled entirely via hotkeys. Perfect
                  for real interview scenarios.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SiCheckmarx className="h-6 w-6 text-primary" />
                  Cryptocurrency Payment Only
                </CardTitle>
                <CardDescription className="text-base">
                  No credit card required, no PayPal, no bank details. Pay with cryptocurrency coins
                  for{' '}
                  <span className="font-semibold text-foreground">
                    maximum anonymity and privacy
                  </span>
                  . Unlike subscription-based competitors (HireVue, Karat), you only pay for what
                  you need - no recurring charges, no account tracking.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SiCheckmarx className="h-6 w-6 text-primary" />
                  Comprehensive AI Features
                </CardTitle>
                <CardDescription className="text-base">
                  Get everything in one tool: dual-channel transcription, AI reply suggestions based
                  on YOUR CV, job description, and{' '}
                  <span className="font-semibold text-foreground">
                    complete conversation history
                  </span>{' '}
                  for accurate context-aware responses,{' '}
                  <span className="font-semibold text-foreground">
                    screenshot-based code analysis with syntax highlighting
                  </span>
                  , and{' '}
                  <span className="font-semibold text-foreground">smart transcript export</span>{' '}
                  with AI-powered analysis to help you review and improve your communication skills.
                  Our AI understands patterns in how you communicate, enabling more relevant
                  suggestions. Other tools like LeetCode Premium or HackerRank only cover coding -
                  we cover the entire interview.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SiCheckmarx className="h-6 w-6 text-primary" />
                  Bring Your Own Model
                </CardTitle>
                <CardDescription className="text-base">
                  Use your own LLM provider (OpenAI, Anthropic, Google, and more) with keys you
                  control. Depending on your plan, a default model is also included so you can get
                  started instantly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SiCheckmarx className="h-6 w-6 text-primary" />
                  No Setup Complexity
                </CardTitle>
                <CardDescription className="text-base">
                  Competitors often require complex API setups, browser extensions with permission
                  risks, or cloud service configurations. Power Interview AI is a{' '}
                  <span className="font-semibold text-foreground">
                    standalone desktop application
                  </span>{' '}
                  - download, install, and start.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-12 rounded-lg border-2 border-primary bg-primary/5 p-6 text-center">
            <p className="text-lg font-semibold text-foreground">
              Power Interview AI isn't just another interview prep tool - it's the most advanced,
              privacy-focused, and feature-rich AI assistant built specifically for real interview
              scenarios.
            </p>
            <GoHomeButton size="lg" className="mt-6">
              Experience the Difference
              <ArrowRight className="ml-2 h-4 w-4" />
            </GoHomeButton>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseSection;
