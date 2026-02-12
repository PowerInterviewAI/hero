import React from 'react';

import Container from '@/components/custom/Container';
import { Card, CardContent } from '@/components/ui/card';

export const HowToUseSection: React.FC = () => {
  return (
    <section
      id="how-to-use"
      className="bg-muted/30 py-16 md:py-24"
      aria-labelledby="how-to-use-heading"
    >
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="how-to-use-heading"
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            How to Use Power Interview
          </h2>
          <p className="text-lg text-muted-foreground">
            Follow these simple steps to ace your next interview
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            {/* Step 1 */}
            <Card className="overflow-hidden border-primary/20">
              <CardContent className="flex gap-6 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold">Run Power Interview App</h3>
                  <p className="text-muted-foreground">
                    Download and launch the Power Interview desktop application on your computer.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="overflow-hidden border-primary/20">
              <CardContent className="flex gap-6 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold">Login or Create Account</h3>
                  <p className="text-muted-foreground">
                    Sign in to your account. New users get 30 free credits to start! If you don't
                    have an account yet, create one in just a few clicks.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="overflow-hidden border-primary/20">
              <CardContent className="flex gap-6 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold">Configure Interview Profile</h3>
                  <p className="mb-3 text-muted-foreground">Set up your interview profile with:</p>
                  <ul className="ml-6 space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        <strong>Personal Info:</strong> Upload photo (will be used for{' '}
                        <strong>Face Swap</strong>), set name
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        <strong>Profile Documents:</strong> Add your CV, resume, bio, and work
                        experience
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        <strong>Interview Context:</strong> Include job description, role details,
                        and any previous dialogue
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="overflow-hidden border-primary/20">
              <CardContent className="flex gap-6 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold">Configure Audio & Video Devices</h3>
                  <p className="text-muted-foreground">
                    Select your microphone, speakers, and camera. Test your audio levels and video
                    quality to ensure everything works perfectly.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="overflow-hidden border-primary/20 bg-primary/5">
              <CardContent className="flex gap-6 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-primary">Start Assistant</h3>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">IMPORTANT:</strong> Click "Start Assistant"
                    to activate AI transcription and suggestions. Credits will be consumed at 10
                    credits per minute while the assistant is running.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 6 */}
            <Card className="overflow-hidden border-primary/20 bg-primary/5">
              <CardContent className="flex gap-6 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  6
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-primary">Begin Your Interview</h3>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Only after starting the assistant</strong>,
                    join your interview call. The AI will provide real-time transcription, smart
                    suggestions, and code assistance throughout your interview.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 7 */}
            <Card className="overflow-hidden border-primary/20">
              <CardContent className="flex gap-6 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  7
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold">Stop Assistant After Interview</h3>
                  <p className="text-muted-foreground">
                    When your interview ends, click "Stop Assistant" to immediately stop credit
                    consumption. Review your session summary and AI feedback.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 8 */}
            <Card className="overflow-hidden border-primary/20">
              <CardContent className="flex gap-6 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  8
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold">Export Interview Data</h3>
                  <p className="text-muted-foreground">
                    Export your interview transcript, AI suggestions, and performance insights for
                    future reference and improvement.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 9 */}
            <Card className="overflow-hidden border-primary/20">
              <CardContent className="flex gap-6 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  9
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold">Close the App</h3>
                  <p className="text-muted-foreground">
                    Safely close the application. All your data is stored locally on your device for
                    maximum privacy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 rounded-lg border-2 border-primary bg-primary/5 p-6 text-center">
            <h3 className="mb-3 text-xl font-semibold">💡 Pro Tip: Credit Management</h3>
            <p className="text-muted-foreground">
              Credits are only consumed while the assistant is actively running. Start it right
              before your interview and stop it immediately after to maximize your credit usage. At
              10 credits per minute, you can have up to{' '}
              <strong className="text-foreground">60 minutes</strong> of AI assistance with the
              Starter plan!
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
