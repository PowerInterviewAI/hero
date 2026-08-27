export interface Testimonial {
  /** The quote itself. Keep it to two or three sentences. */
  quote: string;
  /** Who said it. */
  name: string;
  /** Role and/or company, e.g. "Backend engineer, hired at a FAANG". */
  role: string;
  /** Optional link to the public source of the quote (review, post, thread). */
  sourceUrl?: string;
  /** Optional avatar under public/ - e.g. '/media/testimonials/name.jpg'. */
  avatar?: string;
}

/**
 * Real customer quotes only.
 *
 * TestimonialsSection renders nothing while this array is empty, so the
 * section stays invisible until there is genuine feedback to show. Do not
 * populate it with invented or paraphrased quotes: fabricated testimonials on
 * a page that also emits Product/Review structured data are both a trust
 * problem and a search-policy violation.
 *
 * Every entry should be traceable to something a real person actually wrote -
 * prefer ones with a sourceUrl.
 */
export const TESTIMONIALS: Testimonial[] = [];
