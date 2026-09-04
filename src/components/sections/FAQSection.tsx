import React from 'react';

import { SiProtonmail } from '@icons-pack/react-simple-icons';
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
import { SECTIONS, homeAnchor } from '@/config/routes';

interface FAQSectionProps {
  /** Set on the standalone /faq route so the section owns the h1. */
  standalone?: boolean;
}

/**
 * The full, category-grouped question list, on the home page and /faq alike
 * - not condensed to the first few questions with a link across, the way
 * this section used to work. With the header nav always pointing at the home
 * anchor (see NAV_LINKS in routes.ts), a reader landing here via the nav is
 * already where they're going. /faq itself is unchanged - still a real,
 * indexable page for direct links and search results.
 */
export const FAQSection: React.FC<FAQSectionProps> = ({ standalone = false }) => (
  <Section id={SECTIONS.faq} aria-labelledby="faq-heading">
    <SectionHeading
      id="faq-heading"
      as={standalone ? 'h1' : 'h2'}
      eyebrow="FAQ"
      title="Frequently asked questions"
      description="Everything worth knowing before you install."
    />

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

    <div className="mt-14 text-center">
      <p className="mb-4 text-muted-foreground">Still have questions?</p>
      {/* One destination from everywhere. This used to scroll on the home page
          and be a raw <a> - a full page reload - on /faq. */}
      <Button variant="outline" asChild>
        <Link href={homeAnchor(SECTIONS.contact)}>
          Contact us
          <SiProtonmail className="size-4" />
        </Link>
      </Button>
    </div>
  </Section>
);

export default FAQSection;
