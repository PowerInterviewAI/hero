import React from 'react';

import { ArrowRight } from 'lucide-react';

import Container from '@/components/custom/Container';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24" aria-labelledby="benefits-heading">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="benefits-heading"
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Transform Your Interview Performance
          </h2>
          <p className="text-lg text-muted-foreground">
            PowerInterviewAI helps job seekers excel in every aspect of the interview process
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <CardTitle>Improve Communication Skills</CardTitle>
              <CardDescription className="text-base">
                Our AI analyzes your conversation patterns and provides real-time, context-aware
                suggestions to help you articulate your thoughts more clearly and professionally.
                Export transcripts reveal communication trends, helping you continuously improve
                your interview technique.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <CardTitle>Boost Your Confidence</CardTitle>
              <CardDescription className="text-base">
                Walk into every interview knowing you have an AI coach by your side. Real-time
                support, intelligent suggestions, and conversation history awareness eliminate
                uncertainty and help you present your best self with unwavering confidence.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <CardTitle>Enhance Interview Performance</CardTitle>
              <CardDescription className="text-base">
                From technical coding challenges to behavioral questions, our comprehensive AI
                assistance covers every interview aspect. Smart transcript analysis helps you
                identify strengths and weaknesses, turning each interview into a learning
                opportunity.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <CardTitle>Accelerate Your Learning</CardTitle>
              <CardDescription className="text-base">
                Review exported transcripts to understand what works and what doesn't. AI-powered
                insights reveal communication patterns you might miss, helping you learn faster and
                adapt your strategy for maximum success in your job search.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <CardTitle>Master Interview Privacy</CardTitle>
              <CardDescription className="text-base">
                Maintain professionalism while getting the help you need. Stealth mode keeps your AI
                assistance completely invisible during screen sharing, while all your sensitive data
                stays securely on your device. Interview with confidence and peace of mind.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <CardTitle>Stand Out from Competition</CardTitle>
              <CardDescription className="text-base">
                In competitive job markets, every advantage matters. PowerInterviewAI helps you
                deliver polished, thoughtful responses, handle technical challenges with ease, and
                present yourself professionally - giving you the edge needed to land your dream job.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-12 rounded-lg border-2 border-primary bg-primary/5 p-8 text-center">
          <p className="mb-2 text-2xl font-bold text-foreground">
            Ready to Transform Your Job Search?
          </p>
          <p className="mb-6 text-lg text-muted-foreground">
            Join thousands of successful candidates who've used PowerInterviewAI to land their dream
            jobs
          </p>
          <Button size="lg" asChild>
            <a
              href="https://github.com/PowerInterviewAI/client/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Free with 30 Credits
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
};
