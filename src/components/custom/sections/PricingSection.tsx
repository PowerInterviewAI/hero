import React from 'react';

import { SiCheckmarx } from '@icons-pack/react-simple-icons';

import Container from '@/components/custom/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-16 md:py-24" aria-labelledby="pricing-heading">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your interview preparation needs
          </p>
          <div className="mt-6 inline-flex flex-col gap-2">
            <div className="rounded-lg bg-primary/10 px-6 py-3 text-center">
              <p className="text-sm font-semibold text-primary">
                🎁 New users get 30 free credits to try all features!
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Credit usage: 10 credits per minute of AI assistance
            </p>
            <div className="mt-2 rounded-lg border border-primary/20 bg-background px-4 py-2 text-center">
              <p className="text-xs font-medium text-foreground">
                💰 Payment: Coins only - No credit card, PayPal, or bank required
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {/* Starter Plan */}
          <Card className="relative flex flex-col transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Starter</CardTitle>
              <CardDescription>Perfect for trying out the platform</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-muted-foreground"> / 600 credits</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">~60 minutes of AI assistance</p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">600 credits (~60 minutes)</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Real-time transcription</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">AI reply suggestions</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Code assistance</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Face swap feature</span>
                </li>
              </ul>
              <Button className="mt-6 w-full" variant="outline" asChild>
                <a
                  href="https://github.com/PowerInterviewAI/client/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan - Popular */}
          <Card className="relative flex flex-col border-primary shadow-lg transition-shadow hover:shadow-xl">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                Most Popular
              </span>
            </div>
            <CardHeader className="pt-8">
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>Best value for serious job seekers</CardDescription>
              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <div>
                  <span className="text-4xl font-bold">$70</span>
                  <span className="text-muted-foreground"> / 6,000 credits</span>
                </div>
                <span className="animate-pulse rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-1.5 text-sm font-bold text-white shadow-lg ring-2 ring-green-400/50">
                  💰 Save 22%
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">~600 minutes of AI assistance</p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">6,000 credits (~600 minutes)</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Real-time transcription</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">AI reply suggestions</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Code assistance</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Face swap feature</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <Button className="mt-6 w-full" asChild>
                <a
                  href="https://github.com/PowerInterviewAI/client/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative flex flex-col transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription>For heavy users and teams</CardDescription>
              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <div>
                  <span className="text-4xl font-bold">$500</span>
                  <span className="text-muted-foreground"> / 60,000 credits</span>
                </div>
                <span className="animate-pulse rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg ring-2 ring-orange-400/50">
                  🔥 Save 45%
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">~6,000 minutes of AI assistance</p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">60,000 credits (~6,000 minutes)</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Real-time transcription</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">AI reply suggestions</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Code assistance</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Face swap feature</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Priority support</span>
                </li>
                <li className="flex items-start">
                  <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Dedicated account manager</span>
                </li>
              </ul>
              <Button className="mt-6 w-full" variant="outline" asChild>
                <a
                  href="https://github.com/PowerInterviewAI/client/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
};
