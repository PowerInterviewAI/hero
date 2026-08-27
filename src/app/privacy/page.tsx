import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { Section } from '@/components/ui/section';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    "Read Power Interview AI's Privacy Policy to understand how we protect your data, handle information, and ensure your privacy during interview preparation.",
  path: '/privacy',
});

export default function PrivacyPolicyPage() {
  return (
    <PageChrome>
      <Section size="sm">
        <div className="mx-auto max-w-3xl">
          <div className="border-b border-border pb-8">
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Last Updated: February 12, 2026</p>
          </div>

          <div className="mt-10 flex flex-col">
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">1. Introduction</h2>
              <p className="mb-4 text-muted-foreground">
                Welcome to Power Interview AI. We are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy Policy explains how
                we collect, use, disclose, and safeguard your information when you use our interview
                assistance application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">2. Information We Collect</h2>
              <h3 className="mb-2 text-xl font-semibold">2.1 Information You Provide</h3>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Account information (email, username, password)</li>
                <li>Profile data (name, professional background)</li>
                <li>Interview transcripts and recordings (when you use our services)</li>
                <li>Communication data (support requests, feedback)</li>
              </ul>

              <h3 className="mb-2 text-xl font-semibold">
                2.2 Automatically Collected Information
              </h3>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Device information (browser type, operating system)</li>
                <li>Usage data (features used, time spent)</li>
                <li>Log data (IP address, access times)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">3. How We Use Your Information</h2>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>To provide and maintain our services</li>
                <li>To improve and personalize your experience</li>
                <li>To process your interview assistance requests</li>
                <li>To communicate with you about updates and features</li>
                <li>To analyze usage patterns and optimize performance</li>
                <li>To detect and prevent fraud or abuse</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">4. Data Security</h2>
              <p className="mb-4 text-muted-foreground">
                We implement industry-standard security measures to protect your personal
                information, including:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure data storage and backup procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">5. Data Sharing and Disclosure</h2>
              <p className="mb-4 text-muted-foreground">
                We do not sell your personal information. We may share your data only in the
                following circumstances:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  <strong>Service Providers:</strong> With trusted third-party vendors who assist in
                  operating our services
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or
                  sale of assets
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you explicitly authorize us to share your
                  information
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">6. Your Rights and Choices</h2>
              <p className="mb-4 text-muted-foreground">You have the right to:</p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data (subject to legal obligations)</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Export your data in a portable format</li>
                <li>Withdraw consent at any time</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">7. Data Retention</h2>
              <p className="mb-4 text-muted-foreground">
                We retain your personal information only as long as necessary to fulfill the
                purposes outlined in this Privacy Policy, unless a longer retention period is
                required by law. Interview recordings and transcripts are automatically deleted
                after 90 days unless you choose to save them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">8. Cookies and Tracking</h2>
              <p className="mb-4 text-muted-foreground">
                We use cookies and similar technologies to enhance your experience, analyze usage,
                and personalize content. You can control cookie preferences through your browser
                settings, though disabling cookies may affect functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">9. Children's Privacy</h2>
              <p className="mb-4 text-muted-foreground">
                Our services are not intended for individuals under the age of 18. We do not
                knowingly collect personal information from children. If you believe we have
                inadvertently collected such information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">10. International Data Transfers</h2>
              <p className="mb-4 text-muted-foreground">
                Your information may be transferred to and processed in countries other than your
                own. We ensure appropriate safeguards are in place to protect your data in
                accordance with this Privacy Policy and applicable laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">11. Changes to This Policy</h2>
              <p className="mb-4 text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any
                material changes by posting the new policy on this page and updating the "Last
                Updated" date. Your continued use of our services after changes constitutes
                acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">12. Contact Us</h2>
              <p className="mb-4 text-muted-foreground">
                If you have questions or concerns about this Privacy Policy or our data practices,
                please contact us at:
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
