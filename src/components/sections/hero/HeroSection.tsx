'use client';

import React from 'react';

import { ArrowDown } from 'lucide-react';

import Container from '@/components/Container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Glow } from '@/components/ui/glow';

import { DownloadButton } from './DownloadButton';
import { ProductSurface } from './ProductSurface';
import { TrustStrip } from './TrustStrip';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => (
  <section id="home" className="relative isolate pb-16 pt-12 md:pb-24 md:pt-20">
    <Glow position="top" intensity="medium" grid />

    <Container>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <Badge variant="primary" size="lg" dot>
          1-hour free trial, no rate limits
        </Badge>

        <h1
          id="hero-heading"
          className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]"
        >
          Your AI interview coach, <span className="text-primary">invisible on the call</span>
        </h1>

        <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Live transcription, reply suggestions grounded in your CV and the job description, and
          coding-challenge help - in a desktop window that stays hidden from screen share. Works
          with Zoom, Google Meet and Teams.
        </p>

        <div className="mt-2 flex flex-col items-center gap-4">
          <DownloadButton />
          <Button variant="ghost" size="sm" onClick={() => scrollToSection('how-it-works')}>
            See how it works
            <ArrowDown />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Start free with live suggestions - triggered suggestions unlock on paid plans. Pay with
          coins only, no credit card required.
        </p>
      </div>

      <ProductSurface className="mx-auto mt-14 max-w-5xl" />

      <div className="mt-12">
        <TrustStrip />
      </div>
    </Container>
  </section>
);

export default HeroSection;
