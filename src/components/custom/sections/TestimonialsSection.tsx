import React from 'react';

import { ArrowRight } from 'lucide-react';

import Container from '@/components/custom/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="bg-muted/30 py-16 md:py-24"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="testimonials-heading"
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of successful interview candidates
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-lg font-bold text-primary">SM</span>
                </div>
                <div>
                  <CardTitle className="text-base">Sarah Martinez</CardTitle>
                  <CardDescription>Software Engineer @ Google</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                "The Export Transcript feature was a game-changer for my interview prep! After each
                practice interview, I reviewed the AI-generated analysis and spotted patterns in my
                communication style. Within weeks, my confidence soared and I landed my dream job at
                Google!"
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-lg font-bold text-primary">JC</span>
                </div>
                <div>
                  <CardTitle className="text-base">James Chen</CardTitle>
                  <CardDescription>Product Manager @ Amazon</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                "The stealth mode feature is a game-changer. I could get AI assistance without being
                obvious. The window doesn't show up in screen captures or screen shares - perfect
                for interviews!"
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-lg font-bold text-primary">EP</span>
                </div>
                <div>
                  <CardTitle className="text-base">Emily Parker</CardTitle>
                  <CardDescription>Data Scientist @ Meta</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                "The context awareness is incredible! The AI remembers the entire conversation and
                provides suggestions that build on previous answers. Plus, exporting transcripts in
                DOCX format let me share insights with my mentor. Privacy-first and powerful - worth
                every penny!"
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-lg font-bold text-primary">MK</span>
                </div>
                <div>
                  <CardTitle className="text-base">Michael Kim</CardTitle>
                  <CardDescription>Full Stack Developer @ Netflix</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                "The face swap technology is incredible! I could maintain my anonymity while still
                presenting professionally. The code suggestions saved me during the live coding
                round."
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-lg font-bold text-primary">AP</span>
                </div>
                <div>
                  <CardTitle className="text-base">Aisha Patel</CardTitle>
                  <CardDescription>DevOps Engineer @ Microsoft</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                "Best investment for my career! The AI's conversation history analysis helped me
                identify that I was being too brief in my answers. After reviewing exported
                transcripts and adjusting my approach, my interview performance dramatically
                improved. Got 3 offers in 2 weeks!"
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-lg font-bold text-primary">DL</span>
                </div>
                <div>
                  <CardTitle className="text-base">David Lee</CardTitle>
                  <CardDescription>Security Engineer @ Apple</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                "As someone who values privacy, this tool is perfect. Local data storage, encrypted
                communications, and powerful AI features. Highly recommended!"
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://github.com/PowerInterviewAI/client/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Them Today
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
};
