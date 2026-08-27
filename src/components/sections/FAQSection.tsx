'use client';

import React from 'react';

import { SiProtonmail } from '@icons-pack/react-simple-icons';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Section, SectionHeading } from '@/components/ui/section';
import { FAQ_CATEGORIES, FAQ_ITEMS } from '@/config/faq';

interface FAQSectionProps {
  /** Home scrolls to the contact section; the /faq route links to it. */
  scrollToSection?: (sectionId: string) => void;
  /** Set on the standalone /faq route so the section owns the h1. */
  standalone?: boolean;
  /**
   * Home-page treatment: the first few questions, no category headings, and a
   * link to /faq for the rest. The full list lives on one indexable URL rather
   * than being duplicated in full on the home page.
   */
  preview?: boolean;
}

/** How many questions the home page shows before handing off to /faq. */
const PREVIEW_COUNT = 5;

export const FAQSection: React.FC<FAQSectionProps> = ({
  scrollToSection,
  standalone = false,
  preview = false,
}) => (
  <Section id="faq" aria-labelledby="faq-heading">
    <SectionHeading
      id="faq-heading"
      as={standalone ? 'h1' : 'h2'}
      eyebrow="FAQ"
      title="Frequently asked questions"
      description={
        preview
          ? 'The questions we get asked most.'
          : 'Everything worth knowing before you install.'
      }
    />

    {preview ? (
      <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-6">
        <Accordion type="single" collapsible className="flex flex-col gap-2">
          {FAQ_ITEMS.slice(0, PREVIEW_COUNT).map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/faq">
              All {FAQ_ITEMS.length} questions
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    ) : (
      <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-10">
        {FAQ_CATEGORIES.map((category) => {
          const items = FAQ_ITEMS.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {category}
              </h3>

              <Accordion type="single" collapsible className="flex flex-col gap-2">
                {items.map((item) => (
                  <AccordionItem key={item.question} value={item.question}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          );
        })}
      </div>
    )}

    <div className="mt-14 text-center">
      <p className="mb-4 text-muted-foreground">Still have questions?</p>
      {scrollToSection ? (
        <Button variant="outline" onClick={() => scrollToSection('contact')}>
          Contact us
          <SiProtonmail className="size-4" />
        </Button>
      ) : (
        <Button variant="outline" asChild>
          <a href="/#contact">
            Contact us
            <SiProtonmail className="size-4" />
          </a>
        </Button>
      )}
    </div>
  </Section>
);

export default FAQSection;
