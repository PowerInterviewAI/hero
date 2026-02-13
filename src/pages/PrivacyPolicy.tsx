import React, { useEffect } from 'react';

import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import Container from '@/components/custom/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Update meta tags for SEO
    document.title = 'Privacy Policy - Power Interview';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        "Read Power Interview's Privacy Policy to understand how we protect your data, handle information, and ensure your privacy during interview preparation."
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Privacy Policy - Power Interview');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute(
        'content',
        "Read Power Interview's Privacy Policy to understand how we protect your data, handle information, and ensure your privacy during interview preparation."
      );
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Privacy Policy - Power Interview');
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute(
        'content',
        "Read Power Interview's Privacy Policy to understand how we protect your data, handle information, and ensure your privacy during interview preparation."
      );
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Container>
        <div className="py-12">
          <Link to="/" className="mb-8 inline-block">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <Card className="mx-auto max-w-4xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
              <CardDescription>Last Updated: February 12, 2026</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Welcome to Power Interview Hero. We are committed to protecting your privacy and
                  ensuring the security of your personal information. This Privacy Policy explains
                  how we collect, use, disclose, and safeguard your information when you use our
                  interview assistance application.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">2. Information We Collect</h2>
                <h3 className="mb-2 text-xl font-semibold">2.1 Information You Provide</h3>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>Account information (email, username, password)</li>
                  <li>Profile data (name, professional background)</li>
                  <li>Interview transcripts and recordings (when you use our services)</li>
                  <li>Communication data (support requests, feedback)</li>
                </ul>

                <h3 className="mb-2 text-xl font-semibold">
                  2.2 Automatically Collected Information
                </h3>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>Device information (browser type, operating system)</li>
                  <li>Usage data (features used, time spent)</li>
                  <li>Log data (IP address, access times)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">3. How We Use Your Information</h2>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
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
                <h2 className="mb-4 text-2xl font-semibold">4. Data Security</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We implement industry-standard security measures to protect your personal
                  information, including:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Secure data storage and backup procedures</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">5. Data Sharing and Disclosure</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We do not sell your personal information. We may share your data only in the
                  following circumstances:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Service Providers:</strong> With trusted third-party vendors who assist
                    in operating our services
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law or to protect our
                    rights
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with a merger, acquisition,
                    or sale of assets
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> When you explicitly authorize us to share
                    your information
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">6. Your Rights and Choices</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">You have the right to:</p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
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
                <h2 className="mb-4 text-2xl font-semibold">7. Data Retention</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We retain your personal information only as long as necessary to fulfill the
                  purposes outlined in this Privacy Policy, unless a longer retention period is
                  required by law. Interview recordings and transcripts are automatically deleted
                  after 90 days unless you choose to save them.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">8. Cookies and Tracking</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We use cookies and similar technologies to enhance your experience, analyze usage,
                  and personalize content. You can control cookie preferences through your browser
                  settings, though disabling cookies may affect functionality.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">9. Children's Privacy</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Our services are not intended for individuals under the age of 18. We do not
                  knowingly collect personal information from children. If you believe we have
                  inadvertently collected such information, please contact us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">10. International Data Transfers</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Your information may be transferred to and processed in countries other than your
                  own. We ensure appropriate safeguards are in place to protect your data in
                  accordance with this Privacy Policy and applicable laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">11. Changes to This Policy</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We may update this Privacy Policy from time to time. We will notify you of any
                  material changes by posting the new policy on this page and updating the "Last
                  Updated" date. Your continued use of our services after changes constitutes
                  acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">12. Contact Us</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  If you have questions or concerns about this Privacy Policy or our data practices,
                  please contact us at:
                </p>
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong> power-interview@protonmail.com
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Website:</strong> https://powerinterview.vercel.app/
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
