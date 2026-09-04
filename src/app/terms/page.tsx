import type { Metadata } from 'next';
import Link from 'next/link';

import { PageChrome } from '@/components/PageChrome';
import { Section } from '@/components/ui/section';
import { ROUTES } from '@/config/routes';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description:
    "Review Power Interview AI's Terms of Service to understand your rights, responsibilities, and the rules for using our AI-powered interview assistance platform.",
  path: '/terms',
});

export default function TermsOfServicePage() {
  return (
    <PageChrome>
      <Section size="sm">
        <div className="mx-auto max-w-3xl">
          <div className="border-b border-border pb-8">
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Last Updated: February 12, 2026</p>
          </div>

          <div className="mt-10 flex flex-col">
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">1. Agreement to Terms</h2>
              <p className="mb-4 text-muted-foreground">
                By accessing or using Power Interview AI ("Service", "we", "us", or "our"), you
                agree to be bound by these Terms of Service ("Terms"). If you disagree with any part
                of these terms, you may not access the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">2. Description of Service</h2>
              <p className="mb-4 text-muted-foreground">
                Power Interview AI is an AI-powered interview assistance platform that provides:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Real-time interview transcription and assistance</li>
                <li>Code test support and suggestions</li>
                <li>AI-powered response generation</li>
                <li>Interview preparation tools</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">3. User Accounts</h2>
              <h3 className="mb-2 text-xl font-semibold">3.1 Account Creation</h3>
              <p className="mb-4 text-muted-foreground">
                You must create an account to use certain features of the Service. You agree to:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>

              <h3 className="mb-2 text-xl font-semibold">3.2 Account Termination</h3>
              <p className="mb-4 text-muted-foreground">
                We reserve the right to suspend or terminate your account at any time for violations
                of these Terms or for any other reason at our discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">4. Acceptable Use</h2>
              <p className="mb-4 text-muted-foreground">You agree NOT to use the Service to:</p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Violate any laws, regulations, or third-party rights</li>
                <li>Engage in fraudulent or deceptive activities</li>
                <li>Impersonate others or misrepresent your affiliation</li>
                <li>Circumvent interview integrity or academic honesty policies</li>
                <li>Use the Service in a manner that violates interview guidelines</li>
                <li>Transmit malware, viruses, or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Scrape, crawl, or harvest data from the Service</li>
                <li>Use the Service for automated or bulk operations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">5. Ethical Use and Responsibility</h2>
              <p className="mb-4 text-muted-foreground">
                <strong>IMPORTANT:</strong> Power Interview AI is designed as a learning and
                preparation tool. Users are responsible for:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Complying with interview guidelines and rules set by interviewers/employers</li>
                <li>Using the Service ethically and in accordance with applicable policies</li>
                <li>
                  Understanding that misuse may result in disqualification or other consequences
                </li>
                <li>Respecting intellectual property rights and confidentiality agreements</li>
              </ul>
              <p className="mb-4 text-muted-foreground">
                We do not condone the use of our Service to violate interview integrity, company
                policies, or academic honesty standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">6. Intellectual Property</h2>
              <h3 className="mb-2 text-xl font-semibold">6.1 Our Content</h3>
              <p className="mb-4 text-muted-foreground">
                The Service and its original content, features, and functionality are owned by Power
                Interview AI and are protected by international copyright, trademark, patent, trade
                secret, and other intellectual property laws.
              </p>

              <h3 className="mb-2 text-xl font-semibold">6.2 Your Content</h3>
              <p className="mb-4 text-muted-foreground">
                You retain ownership of content you submit to the Service. By submitting content,
                you grant us a worldwide, non-exclusive, royalty-free license to use, modify, and
                process your content to provide and improve the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">7. AI-Generated Content</h2>
              <p className="mb-4 text-muted-foreground">
                Our Service uses artificial intelligence to generate suggestions and responses. You
                acknowledge that:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>AI-generated content may not always be accurate or appropriate</li>
                <li>You are responsible for reviewing and validating all AI suggestions</li>
                <li>We do not guarantee the quality or reliability of AI outputs</li>
                <li>You should use AI suggestions as guidance, not as definitive answers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">8. Payment and Subscription</h2>
              <p className="mb-4 text-muted-foreground">
                Certain features may require payment. By subscribing, you agree to:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Provide accurate billing information</li>
                <li>Pay all fees and applicable taxes</li>
                <li>Authorize automatic renewal unless cancelled</li>
                <li>Accept that fees are non-refundable except as required by law</li>
              </ul>
              <p className="mb-4 text-muted-foreground">
                We reserve the right to change pricing with reasonable notice to existing
                subscribers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">9. Privacy and Data Protection</h2>
              <p className="mb-4 text-muted-foreground">
                Your use of the Service is also governed by our Privacy Policy. Please review our{' '}
                <Link
                  href={ROUTES.privacy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>{' '}
                to understand our data practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">10. Disclaimers and Warranties</h2>
              <p className="mb-4 text-muted-foreground">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.
                WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Merchantability and fitness for a particular purpose</li>
                <li>Non-infringement of third-party rights</li>
                <li>Accuracy, reliability, or completeness of content</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Security or freedom from viruses</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">11. Limitation of Liability</h2>
              <p className="mb-4 text-muted-foreground">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Loss of profits, data, or business opportunities</li>
                <li>Interview failures or negative outcomes</li>
                <li>Service interruptions or errors</li>
                <li>Unauthorized access to your data</li>
                <li>Any damages arising from use of the Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">12. Indemnification</h2>
              <p className="mb-4 text-muted-foreground">
                You agree to indemnify and hold harmless Power Interview AI from any claims,
                damages, losses, liabilities, and expenses arising from:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Your use or misuse of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of third parties</li>
                <li>Your content or conduct</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">13. Modifications to Service</h2>
              <p className="mb-4 text-muted-foreground">
                We reserve the right to modify, suspend, or discontinue the Service (or any part
                thereof) at any time without notice. We shall not be liable for any modification,
                suspension, or discontinuation of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">14. Changes to Terms</h2>
              <p className="mb-4 text-muted-foreground">
                We may update these Terms from time to time. The updated version will be indicated
                by an updated "Last Updated" date. Your continued use of the Service after changes
                constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">15. Governing Law</h2>
              <p className="mb-4 text-muted-foreground">
                These Terms shall be governed by and construed in accordance with applicable laws,
                without regard to conflict of law provisions. You agree to submit to the exclusive
                jurisdiction of the courts in our location.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">16. Dispute Resolution</h2>
              <p className="mb-4 text-muted-foreground">
                Any disputes arising from these Terms or the Service shall be resolved through:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Good faith negotiation</li>
                <li>Mediation if negotiation fails</li>
                <li>Binding arbitration if mediation is unsuccessful</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">17. Severability</h2>
              <p className="mb-4 text-muted-foreground">
                If any provision of these Terms is found to be unenforceable or invalid, that
                provision shall be limited or eliminated to the minimum extent necessary so that
                these Terms shall otherwise remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">18. Contact Information</h2>
              <p className="mb-4 text-muted-foreground">
                For questions about these Terms, please contact us at:
              </p>
              <div className="rounded-lg border border-border bg-surface-1 p-4">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> team@vectorleappulse.xyz
                </p>
                <p className="text-muted-foreground">
                  <strong>Website:</strong> https://www.powerinterviewai.com/
                </p>
                <p className="text-muted-foreground">
                  <strong>X:</strong>{' '}
                  <a
                    href="https://x.com/power_interview"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @power_interview
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </Section>
    </PageChrome>
  );
}
