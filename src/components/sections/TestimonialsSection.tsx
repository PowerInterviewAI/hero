import React from 'react';

import { Quote } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { TESTIMONIALS } from '@/config/testimonials';

/**
 * Renders nothing until src/config/testimonials.ts holds real quotes.
 *
 * The layout is finished and waiting - drop entries into TESTIMONIALS and the
 * section appears. See the comment in that file before adding any.
 */
export const TestimonialsSection: React.FC = () => {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <Section id="testimonials" tone="muted" aria-labelledby="testimonials-heading">
      <SectionHeading
        id="testimonials-heading"
        eyebrow="Testimonials"
        title="What candidates say"
      />

      <ul className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <Reveal as="li" key={`${testimonial.name}-${index}`} delay={index * 80}>
            <figure className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6">
              <Quote className="size-5 shrink-0 text-primary/60" aria-hidden="true" />

              <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                {testimonial.quote}
              </blockquote>

              <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt=""
                    width={36}
                    height={36}
                    loading="lazy"
                    className="size-9 shrink-0 rounded-full object-cover"
                  />
                )}
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {testimonial.name}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {testimonial.role}
                  </span>
                </span>
                {testimonial.sourceUrl && (
                  <a
                    href={testimonial.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto shrink-0 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Source
                  </a>
                )}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
};

export default TestimonialsSection;
