import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import Container from '@/components/Container';
import { cn } from '@/lib/utils';

// scroll-mt-20 clears the 4rem sticky header. Without it every anchor - the
// nav's, the footer's, and the /features -> /#features redirect - dropped the
// section heading behind the header bar.
const sectionVariants = cva('relative isolate scroll-mt-20', {
  variants: {
    tone: {
      /** Sits on the page background. */
      default: '',
      /** Banded - used to separate adjacent sections without a rule. */
      muted: 'bg-surface-1',
      /** Banded plus an ambient accent wash. Reserve for hero and CTA bands. */
      glow: 'glow-surface bg-surface-1',
    },
    size: {
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-24',
      lg: 'py-20 md:py-32',
    },
  },
  defaultVariants: {
    tone: 'default',
    size: 'md',
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  /** Set when the section is also a scroll target for the header nav. */
  id?: string;
  /** Skip the inner Container - for full-bleed content that manages its own width. */
  bleed?: boolean;
}

/**
 * The shared vertical rhythm for every marketing section.
 *
 * /how-it-works, /pricing and /faq re-render their section standalone inside
 * PageChrome, so a section must never depend on a neighbour for its spacing or
 * background.
 */
const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, tone, size, bleed, children, ...props }, ref) => (
    <section ref={ref} className={cn(sectionVariants({ tone, size }), className)} {...props}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  )
);
Section.displayName = 'Section';

interface SectionHeadingProps {
  /** Small uppercase label above the title. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  /** Heading level - sections rendered as their own route should use h1. */
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  as: Heading = 'h2',
  id,
  className,
}) => (
  <div
    className={cn(
      'flex flex-col gap-4',
      align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-left',
      className
    )}
  >
    {eyebrow && (
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        {eyebrow}
      </span>
    )}
    <Heading
      id={id}
      className="text-balance text-3xl font-semibold sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
    >
      {title}
    </Heading>
    {description && (
      <p
        className={cn(
          'text-pretty text-base leading-relaxed text-muted-foreground md:text-lg',
          align === 'center' && 'mx-auto'
        )}
      >
        {description}
      </p>
    )}
  </div>
);

export { Section, SectionHeading, sectionVariants };
