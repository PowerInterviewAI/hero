import React, { useEffect, useRef, useState } from 'react';

import {
  BenefitsSection,
  ContactSection,
  FAQSection,
  FeaturesSection,
  FooterSection,
  Header,
  HeroSection,
  HowToUseSection,
  LegalNoticeSection,
  PricingSection,
  TestimonialsSection,
  WhyChooseSection,
} from '@/components/custom/sections';
import { useTheme } from '@/hooks/useTheme';

// Media carousel data
const mediaItems = [
  {
    src: 'media/live.interview.assistant.mp4',
    type: 'video',
    title: 'Live Interview Assistant & Smart Export',
    description:
      'Real-time AI-powered interview assistance with instant suggestions and smart export of interview summaries and insights',
  },
  {
    src: 'media/code.test.mp4',
    type: 'video',
    title: 'Code Test Assistance',
    description: 'AI-powered code suggestions and solutions for technical interviews',
  },
  {
    src: 'media/face.henrry.mp4',
    type: 'video',
    title: 'Face Swap - Henry',
    description: 'Real-time face swap technology for enhanced privacy during interviews',
  },
  {
    src: 'media/face.tonny.mp4',
    type: 'video',
    title: 'Face Swap - Tonny',
    description: 'Seamless face replacement with natural expressions and movements',
  },
  {
    src: 'media/face.victor.mp4',
    type: 'video',
    title: 'Face Swap - Victor',
    description: 'Advanced AI face transformation maintaining professional appearance',
  },
  {
    src: 'media/meeting.henry.mp4',
    type: 'video',
    title: 'Meeting Demo - Henry',
    description: 'Full meeting demonstration with AI assistance and face swap features',
  },
  {
    src: 'media/meeting.tonny.mp4',
    type: 'video',
    title: 'Meeting Demo - Tonny',
    description: 'Complete interview scenario with real-time AI coaching and suggestions',
  },

  {
    src: 'media/meeting.tonny.face.liveassist.png',
    type: 'image',
    title: 'Live Assist Interface',
    description: 'Clean and intuitive interface showing face swap and live assistance features',
  },
];

const Home: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Carousel navigation functions with fade effect
  const goToNextMedia = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
      setIsFading(false);
    }, 300);
  };

  const goToPrevMedia = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
      setIsFading(false);
    }, 300);
  };

  const goToMedia = (index: number) => {
    if (index !== currentMediaIndex) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentMediaIndex(index);
        setIsFading(false);
      }, 300);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Handle video ended event - auto advance to next media
  const handleVideoEnded = () => {
    goToNextMedia();
  };

  // Handle image timer - show for 5 seconds then advance
  useEffect(() => {
    const currentMedia = mediaItems[currentMediaIndex];

    if (currentMedia.type === 'image' && isPlaying) {
      imageTimerRef.current = setTimeout(() => {
        goToNextMedia();
      }, 5000); // 5 seconds for images
    }

    return () => {
      if (imageTimerRef.current) {
        clearTimeout(imageTimerRef.current);
      }
    };
  }, [currentMediaIndex, isPlaying]);

  // Handle video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((e) => console.log('Video play error:', e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentMediaIndex]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        scrollToSection={scrollToSection}
        toggleTheme={toggleTheme}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main>
        {/* Hero Section */}
        <HeroSection
          mediaItems={mediaItems}
          currentMediaIndex={currentMediaIndex}
          isPlaying={isPlaying}
          isFading={isFading}
          videoRef={videoRef}
          scrollToSection={scrollToSection}
          goToNextMedia={goToNextMedia}
          goToPrevMedia={goToPrevMedia}
          goToMedia={goToMedia}
          togglePlayPause={togglePlayPause}
          handleVideoEnded={handleVideoEnded}
        />

        {/* Features Section */}
        <FeaturesSection />

        {/* Benefits for Job Seekers Section */}
        <BenefitsSection />

        {/* Why Choose Power Interview Section */}
        <WhyChooseSection />

        {/* How to Use Section */}
        <HowToUseSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection
          openFaqIndex={openFaqIndex}
          setOpenFaqIndex={setOpenFaqIndex}
          scrollToSection={scrollToSection}
        />

        {/* Contact Form Section */}
        <ContactSection />

        {/* Legal Notice Section */}
        <LegalNoticeSection />
      </main>

      {/* Footer */}
      <FooterSection scrollToSection={scrollToSection} />
    </div>
  );
};

export default Home;
