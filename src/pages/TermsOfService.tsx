import React, { useEffect } from 'react';

import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import Container from '@/components/custom/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Update meta tags for SEO
    document.title = 'Terms of Service - Power Interview';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        "Review Power Interview's Terms of Service to understand your rights, responsibilities, and the rules for using our AI-powered interview assistance platform."
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Terms of Service - Power Interview');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute(
        'content',
        "Review Power Interview's Terms of Service to understand your rights, responsibilities, and the rules for using our AI-powered interview assistance platform."
      );
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Terms of Service - Power Interview');
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute(
        'content',
        "Review Power Interview's Terms of Service to understand your rights, responsibilities, and the rules for using our AI-powered interview assistance platform."
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
              <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
              <CardDescription>Last Updated: February 12, 2026</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">1. Agreement to Terms</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  By accessing or using Power Interview Hero ("Service", "we", "us", or "our"), you
                  agree to be bound by these Terms of Service ("Terms"). If you disagree with any
                  part of these terms, you may not access the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">2. Description of Service</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Power Interview Hero is an AI-powered interview assistance platform that provides:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>Real-time interview transcription and assistance</li>
                  <li>Code test support and suggestions</li>
                  <li>Face swap technology for enhanced privacy</li>
                  <li>AI-powered response generation</li>
                  <li>Interview preparation tools</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">3. User Accounts</h2>
                <h3 className="mb-2 text-xl font-semibold">3.1 Account Creation</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  You must create an account to use certain features of the Service. You agree to:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>

                <h3 className="mb-2 text-xl font-semibold">3.2 Account Termination</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We reserve the right to suspend or terminate your account at any time for
                  violations of these Terms or for any other reason at our discretion.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">4. Acceptable Use</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  You agree NOT to use the Service to:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
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
                <h2 className="mb-4 text-2xl font-semibold">5. Ethical Use and Responsibility</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  <strong>IMPORTANT:</strong> Power Interview Hero is designed as a learning and
                  preparation tool. Users are responsible for:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>
                    Complying with interview guidelines and rules set by interviewers/employers
                  </li>
                  <li>Using the Service ethically and in accordance with applicable policies</li>
                  <li>
                    Understanding that misuse may result in disqualification or other consequences
                  </li>
                  <li>Respecting intellectual property rights and confidentiality agreements</li>
                </ul>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We do not condone the use of our Service to violate interview integrity, company
                  policies, or academic honesty standards.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">6. Intellectual Property</h2>
                <h3 className="mb-2 text-xl font-semibold">6.1 Our Content</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  The Service and its original content, features, and functionality are owned by
                  Power Interview Hero and are protected by international copyright, trademark,
                  patent, trade secret, and other intellectual property laws.
                </p>

                <h3 className="mb-2 text-xl font-semibold">6.2 Your Content</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  You retain ownership of content you submit to the Service. By submitting content,
                  you grant us a worldwide, non-exclusive, royalty-free license to use, modify, and
                  process your content to provide and improve the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">7. AI-Generated Content</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Our Service uses artificial intelligence to generate suggestions and responses.
                  You acknowledge that:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>AI-generated content may not always be accurate or appropriate</li>
                  <li>You are responsible for reviewing and validating all AI suggestions</li>
                  <li>We do not guarantee the quality or reliability of AI outputs</li>
                  <li>You should use AI suggestions as guidance, not as definitive answers</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">8. Payment and Subscription</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Certain features may require payment. By subscribing, you agree to:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>Provide accurate billing information</li>
                  <li>Pay all fees and applicable taxes</li>
                  <li>Authorize automatic renewal unless cancelled</li>
                  <li>Accept that fees are non-refundable except as required by law</li>
                </ul>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We reserve the right to change pricing with reasonable notice to existing
                  subscribers.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">9. Privacy and Data Protection</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Your use of the Service is also governed by our Privacy Policy. Please review our{' '}
                  <Link to="/privacy" className="text-blue-600 underline dark:text-blue-400">
                    Privacy Policy
                  </Link>{' '}
                  to understand our data practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">10. Disclaimers and Warranties</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.
                  WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>Merchantability and fitness for a particular purpose</li>
                  <li>Non-infringement of third-party rights</li>
                  <li>Accuracy, reliability, or completeness of content</li>
                  <li>Uninterrupted or error-free operation</li>
                  <li>Security or freedom from viruses</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">11. Limitation of Liability</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Interview failures or negative outcomes</li>
                  <li>Service interruptions or errors</li>
                  <li>Unauthorized access to your data</li>
                  <li>Any damages arising from use of the Service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">12. Indemnification</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  You agree to indemnify and hold harmless Power Interview Hero from any claims,
                  damages, losses, liabilities, and expenses arising from:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>Your use or misuse of the Service</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any rights of third parties</li>
                  <li>Your content or conduct</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">13. Modifications to Service</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We reserve the right to modify, suspend, or discontinue the Service (or any part
                  thereof) at any time without notice. We shall not be liable for any modification,
                  suspension, or discontinuation of the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">14. Changes to Terms</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We may update these Terms from time to time. The updated version will be indicated
                  by an updated "Last Updated" date. Your continued use of the Service after changes
                  constitutes acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">15. Governing Law</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  These Terms shall be governed by and construed in accordance with applicable laws,
                  without regard to conflict of law provisions. You agree to submit to the exclusive
                  jurisdiction of the courts in our location.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">16. Dispute Resolution</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Any disputes arising from these Terms or the Service shall be resolved through:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>Good faith negotiation</li>
                  <li>Mediation if negotiation fails</li>
                  <li>Binding arbitration if mediation is unsuccessful</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">17. Severability</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  If any provision of these Terms is found to be unenforceable or invalid, that
                  provision shall be limited or eliminated to the minimum extent necessary so that
                  these Terms shall otherwise remain in full force and effect.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">18. Contact Information</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  For questions about these Terms, please contact us at:
                </p>
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong> power-interview@protonmail.com
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Website:</strong> https://www.powerinterviewai.com/
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

export default TermsOfService;
