import React from 'react';

import Container from '@/components/custom/Container';
import { Card, CardContent } from '@/components/ui/card';

export const LegalNoticeSection: React.FC = () => {
  return (
    <section
      className="border-y bg-amber-500/5 py-12 md:py-16"
      aria-labelledby="legal-notice-heading"
    >
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2
              id="legal-notice-heading"
              className="mb-4 text-2xl font-bold tracking-tight text-amber-900 dark:text-amber-400 sm:text-3xl"
            >
              ⚠️ Important Legal Notice
            </h2>
          </div>

          <Card className="border-amber-500/50 bg-background">
            <CardContent className="pt-6">
              <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Intended Use</h3>
                  <p>
                    Power Interview is designed as an{' '}
                    <span className="font-semibold text-foreground">educational tool</span> for
                    interview preparation and practice. This software should only be used for
                    legitimate, legal purposes in accordance with all applicable laws and
                    regulations in your jurisdiction.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    Face Swap Feature - Legal Use Only
                  </h3>
                  <p>
                    The face swap feature is particularly powerful and must be used{' '}
                    <span className="font-semibold text-amber-700 dark:text-amber-400">
                      responsibly and legally
                    </span>
                    . Using face swap technology to impersonate another person, misrepresent your
                    identity, or deceive interviewers may be{' '}
                    <span className="font-semibold text-foreground">illegal</span> and could result
                    in:
                  </p>
                  <ul className="ml-6 mt-2 list-disc space-y-1">
                    <li>Criminal charges for fraud or identity theft</li>
                    <li>Civil liability for misrepresentation</li>
                    <li>Permanent ban from hiring platforms and companies</li>
                    <li>Damage to your professional reputation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-foreground">User Responsibility</h3>
                  <p>
                    <span className="font-semibold text-foreground">
                      You are solely responsible
                    </span>{' '}
                    for ensuring your use of Power Interview complies with all applicable laws,
                    terms of service of platforms you use it with, and ethical standards. By using
                    this software, you:
                  </p>
                  <ul className="ml-6 mt-2 list-disc space-y-1">
                    <li>Agree to use it only for lawful purposes</li>
                    <li>Accept full responsibility for your actions while using the software</li>
                    <li>Acknowledge that you have read and understand this legal notice</li>
                    <li>Agree not to hold the developers liable for any misuse of the software</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Platform Compliance</h3>
                  <p>
                    Many interview platforms and companies have specific terms of service and
                    acceptable use policies. It is
                    <span className="font-semibold text-foreground"> your responsibility</span> to
                    review and comply with these terms. Violation of platform policies may result in
                    account termination, legal action, or other consequences.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-foreground">No Warranty</h3>
                  <p>
                    Power Interview is provided "as is" without warranty of any kind. The developers
                    make no representations about the suitability, reliability, availability,
                    timeliness, or accuracy of the software. Use at your own risk.
                  </p>
                </div>

                <div className="rounded-lg border-2 border-amber-500 bg-amber-500/10 p-4">
                  <p className="font-semibold text-amber-900 dark:text-amber-400">
                    ⚖️ By downloading and using Power Interview, you acknowledge that you have read,
                    understood, and agree to use this software ethically, legally, and responsibly.
                    If you do not agree to these terms, do not use this software.
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    For questions about legal use, please contact:{' '}
                    <a
                      href="mailto:power-interview@protonmail.com"
                      className="font-medium text-primary hover:underline"
                    >
                      power-interview@protonmail.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
};
