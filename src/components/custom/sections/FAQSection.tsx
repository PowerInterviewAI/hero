import React from 'react';

import { SiProtonmail } from '@icons-pack/react-simple-icons';

import Container from '@/components/custom/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FAQSectionProps {
  openFaqIndex: number | null;
  setOpenFaqIndex: (index: number | null) => void;
  scrollToSection: (sectionId: string) => void;
}

const faqData = [
  {
    question: 'Is Power Interview legal to use?',
    answer:
      'Power Interview is designed for legitimate educational and interview preparation purposes. However, you are responsible for ensuring your use complies with applicable laws and the terms of service of platforms you use. Always use ethically and legally.',
  },
  {
    question: 'How does the privacy protection work?',
    answer:
      'Your data stays with you. All sensitive information is stored locally on your device using encrypted storage. Only necessary data (transcripts, screenshots) is sent to our AI services for suggestions. We never collect, sell, or share your personal information.',
  },
  {
    question: 'What is the face swap feature and how does it work?',
    answer:
      'The face swap feature uses advanced AI to replace your face in real-time video with a photo you provide. Setup is incredibly simple: just install OBS Studio (https://obsproject.com/download) and VB-Cable (https://vb-audio.com/Cable/) - no configuration needed! Once installed, the feature works seamlessly with any video conferencing application. Perfect for privacy protection or personal presentation preferences.',
  },
  {
    question: 'What platforms are supported?',
    answer:
      'Currently, Power Interview is available for Windows only. We are actively working on MacOS and Linux versions. Stay tuned for updates! Follow our GitHub repository or join our Telegram channel to be notified when new platform versions are released.',
  },
  {
    question: 'Do I need special hardware to run Power Interview?',
    answer:
      'Power Interview runs on most modern Windows computers without special hardware requirements. For the face swap feature, simply install OBS Studio (https://obsproject.com/download) and VB-Cable (https://vb-audio.com/Cable/) - both free and require no configuration. Detailed installation instructions are provided in the documentation.',
  },
  {
    question: 'How accurate is the AI transcription?',
    answer:
      'Our real-time transcription uses advanced ASR (Automatic Speech Recognition) with dual-channel support and speaker detection. Accuracy depends on audio quality, but it performs excellently in typical interview scenarios with clear audio.',
  },
  {
    question: 'Can I use this for coding interviews?',
    answer:
      'Absolutely! Power Interview includes specialized code suggestion features. It can analyze screenshots of coding problems and provide LLM-powered solutions with proper syntax highlighting. Perfect for technical interviews.',
  },
  {
    question: 'What is stealth mode?',
    answer:
      'Stealth mode allows you to operate the assistant discreetly during interviews. You can control everything via hotkeys, adjust window opacity, and position windows strategically—all without losing focus on your interview tab or application. Additionally, the window is not capturable in screenshots and remains invisible during full screen sharing, ensuring complete privacy during your interview.',
  },
  {
    question: 'How do credits work?',
    answer:
      'Credits are consumed at a rate of 10 credits per minute when using AI-powered features like reply suggestions, code analysis, transcription, and face swap processing. For example, a 30-minute interview session would use approximately 300 credits. You can purchase credit packs starting from 600 credits ($9 for ~60 minutes) up to 60,000 credits ($500 for ~6,000 minutes).',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept cryptocurrency coins only. No credit card, PayPal, or traditional bank payments are required. This ensures maximum privacy and security for your transactions. Simply purchase coins and use them to buy credit packs within the application.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes! All new users receive 30 free credits to try out all features (approximately 3 minutes of AI assistance). This allows you to experience the full capabilities of Power Interview risk-free, with no payment information needed. After that, you can choose from our affordable pricing plans starting at just $20 for 600 credits, payable with coins only.',
  },
  {
    question: 'Can I get a refund?',
    answer:
      'We stand behind our product. If you are not satisfied with Power Interview, please contact us at power-interview@protonmail.com within 14 days of purchase to discuss refund options.',
  },
];

export const FAQSection: React.FC<FAQSectionProps> = ({
  openFaqIndex,
  setOpenFaqIndex,
  scrollToSection,
}) => {
  return (
    <section id="faq" className="py-16 md:py-24" aria-labelledby="faq-heading">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="faq-heading"
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about Power Interview
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqData.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                className="w-full text-left"
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-semibold">{faq.question}</CardTitle>
                  <svg
                    className={`h-5 w-5 transition-transform ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </CardHeader>
              </button>
              {openFaqIndex === index && (
                <CardContent className="pt-0">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">Still have questions?</p>
          <Button variant="outline" onClick={() => scrollToSection('contact')}>
            Contact Us
            <SiProtonmail className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
};
