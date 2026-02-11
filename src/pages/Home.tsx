import React, { useEffect, useRef, useState } from 'react';

import {
  SiCheckmarx,
  SiDiscord,
  SiGithub,
  SiProtonmail,
  SiSuperuser,
  SiTelegram,
  SiX,
} from '@icons-pack/react-simple-icons';
import {
  ArrowRight,
  Captions,
  ChevronLeft,
  ChevronRight,
  FileDown,
  Ghost,
  MessageSquareCode,
  MessageSquareText,
  Pause,
  Play,
  UserLock,
} from 'lucide-react';

import Container from '@/components/custom/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';

// Media carousel data
const mediaItems = [
  {
    src: 'media/live.interview.assistant.mp4',
    type: 'video',
    title: 'Live Interview Assistant',
    description:
      'Real-time AI-powered interview assistance with instant suggestions and transcription',
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
    src: 'media/code.test.mp4',
    type: 'video',
    title: 'Code Test Assistance',
    description: 'AI-powered code suggestions and solutions for technical interviews',
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

  // Carousel navigation functions
  const goToNextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const goToPrevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const goToMedia = (index: number) => {
    setCurrentMediaIndex(index);
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
      {/* Sticky Header */}
      <header
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        role="banner"
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Power Interview Logo"
                className="h-8 w-8 rounded-xl"
              />
              <span className="text-xl font-bold">Power Interview</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
              <button
                onClick={() => scrollToSection('home')}
                className="text-sm font-medium transition-colors hover:text-primary"
                aria-label="Navigate to home section"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-sm font-medium transition-colors hover:text-primary"
                aria-label="Navigate to features section"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('why-choose-heading')}
                className="text-sm font-medium transition-colors hover:text-primary"
                aria-label="Navigate to why choose section"
              >
                Why Us
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-sm font-medium transition-colors hover:text-primary"
                aria-label="Navigate to pricing section"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-sm font-medium transition-colors hover:text-primary"
                aria-label="Navigate to testimonials section"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-sm font-medium transition-colors hover:text-primary"
                aria-label="Navigate to FAQ section"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-sm font-medium transition-colors hover:text-primary"
                aria-label="Navigate to contact section"
              >
                Contact
              </button>
            </nav>

            <div className="hidden items-center gap-4 md:flex">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex items-center gap-2"
              >
                {theme === 'dark' ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://github.com/PowerInterviewAI/client"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <SiGithub className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button size="sm" asChild>
                <a
                  href="https://github.com/PowerInterviewAI/client/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </Button>
            </div>

            {/* Mobile Theme Toggle & Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2">
                {theme === 'dark' ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                {mobileMenuOpen ? (
                  <SiX className="h-6 w-6" />
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="border-t py-4 md:hidden">
              <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('why-choose-heading')}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Why Us
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  FAQ
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Contact
                </button>
                <div className="flex flex-col gap-2 pt-4">
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href="https://github.com/PowerInterviewAI/client"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <SiGithub className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a
                      href="https://github.com/PowerInterviewAI/client/releases/latest"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Started
                    </a>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </Container>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="pb-16 pt-20 md:pb-24 md:pt-32" aria-labelledby="hero-heading">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full border bg-muted px-4 py-2 text-sm">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500" aria-hidden="true"></span>
                <span className="font-medium">Privacy-First AI Interview Assistant</span>
              </div>
              <h1
                id="hero-heading"
                className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Your Personal AI-Powered
                <span className="block text-primary">Interview Coach</span>
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Ace technical and behavioral interviews with real-time transcription, intelligent
                suggestions, and cutting-edge face swap technology—all while maintaining your
                privacy.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="gap-2" asChild>
                  <a
                    href="https://github.com/PowerInterviewAI/client/releases/latest"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Now
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection('features')}
                  className="gap-2"
                >
                  Learn More
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Button>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                🎁 Start with <span className="font-semibold text-foreground">30 free credits</span>{' '}
                - Pay with coins only (No credit card, PayPal, or bank required)
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 rounded-lg border bg-background/50 px-3 py-1.5">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z" />
                  </svg>
                  <span>Windows Only (MacOS & Linux Coming Soon)</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border bg-amber-500/10 px-3 py-1.5 text-amber-700 dark:text-amber-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span className="font-medium">For Legal Use Only</span>
                </div>
              </div>

              {/* Product Demo Carousel */}
              <div className="mt-12 rounded-lg border bg-muted/30 p-2">
                <div className="relative overflow-hidden rounded bg-black">
                  {/* Media Display */}
                  <div className="relative aspect-video">
                    {mediaItems[currentMediaIndex].type === 'video' ? (
                      <video
                        ref={videoRef}
                        key={mediaItems[currentMediaIndex].src}
                        className="h-full w-full object-contain"
                        src={`${import.meta.env.BASE_URL}${mediaItems[currentMediaIndex].src}`}
                        autoPlay={isPlaying}
                        onEnded={handleVideoEnded}
                        playsInline
                        muted
                      />
                    ) : (
                      <img
                        key={mediaItems[currentMediaIndex].src}
                        src={`${import.meta.env.BASE_URL}${mediaItems[currentMediaIndex].src}`}
                        alt={mediaItems[currentMediaIndex].title}
                        className="h-full w-full object-contain"
                      />
                    )}

                    {/* Navigation Arrows */}
                    <button
                      onClick={goToPrevMedia}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/75"
                      aria-label="Previous media"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={goToNextMedia}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/75"
                      aria-label="Next media"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Play/Pause Button */}
                    <button
                      onClick={togglePlayPause}
                      className="absolute bottom-4 right-4 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/75"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>

                    {/* Media Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="mb-1 text-lg font-semibold text-white">
                        {mediaItems[currentMediaIndex].title}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {mediaItems[currentMediaIndex].description}
                      </p>
                    </div>
                  </div>

                  {/* Indicators */}
                  <div className="flex items-center justify-center gap-2 bg-black/30 py-3">
                    {mediaItems.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToMedia(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentMediaIndex
                            ? 'w-8 bg-primary'
                            : 'w-2 bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to media ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="bg-muted/30 py-16 md:py-24"
          aria-labelledby="features-heading"
        >
          <Container>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2
                id="features-heading"
                className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              >
                Powerful Features
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to ace your interviews with confidence
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <SiSuperuser className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
                  <CardTitle>Real-Time Face Swap</CardTitle>
                  <CardDescription>
                    Transform your video appearance during live interviews with advanced face swap
                    technology. <span className="font-semibold text-foreground">Simple setup:</span>{' '}
                    Just install{' '}
                    <a
                      href="https://obsproject.com/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      OBS Studio
                    </a>{' '}
                    and{' '}
                    <a
                      href="https://vb-audio.com/Cable/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      VB-Cable
                    </a>{' '}
                    - no configuration needed!
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Captions className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
                  <CardTitle>Live Transcription</CardTitle>
                  <CardDescription>
                    Dual-channel transcription with automatic speaker detection and full
                    conversation history
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <MessageSquareText className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
                  <CardTitle>AI Reply Suggestions</CardTitle>
                  <CardDescription>
                    Get personalized, context-aware responses powered by comprehensive awareness of
                    your CV, job description, and{' '}
                    <span className="font-semibold text-foreground">full conversation history</span>
                    . Our AI analyzes patterns in your communication style and adapts to provide
                    more relevant, accurate suggestions that help you articulate your thoughts
                    better.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <FileDown className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
                  <CardTitle>Export Transcript</CardTitle>
                  <CardDescription>
                    <span className="font-semibold text-foreground">Smart transcript export</span>{' '}
                    with AI-powered summarization, analysis, and insights. Review your conversations
                    to identify communication patterns, understand your strengths, and improve for
                    future interviews. Exports to{' '}
                    <span className="font-semibold text-foreground">DOCX format</span> - widely
                    compatible with all word processing software.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <MessageSquareCode className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
                  <CardTitle>Code Suggestions</CardTitle>
                  <CardDescription>
                    Screenshot analysis with LLM-powered solutions for coding problems, complete
                    with syntax highlighting
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Ghost className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
                  <CardTitle>Stealth Mode</CardTitle>
                  <CardDescription>
                    Operate discreetly with hotkeys, opacity control, and smart window positioning.
                    Window is not capturable and invisible during full screen share.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <UserLock className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
                  <CardTitle>Privacy First</CardTitle>
                  <CardDescription>
                    Your data stays with you. Secure local storage, no data mining, and full control
                    over your information
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <Button size="lg" asChild>
                <a
                  href="https://github.com/PowerInterviewAI/client/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started Now
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </Button>
            </div>
          </Container>
        </section>

        {/* Benefits for Job Seekers Section */}
        <section className="py-16 md:py-24" aria-labelledby="benefits-heading">
          <Container>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2
                id="benefits-heading"
                className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              >
                Transform Your Interview Performance
              </h2>
              <p className="text-lg text-muted-foreground">
                PowerInterviewAI helps job seekers excel in every aspect of the interview process
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <CardTitle>Improve Communication Skills</CardTitle>
                  <CardDescription className="text-base">
                    Our AI analyzes your conversation patterns and provides real-time, context-aware
                    suggestions to help you articulate your thoughts more clearly and
                    professionally. Export transcripts reveal communication trends, helping you
                    continuously improve your interview technique.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <CardTitle>Boost Your Confidence</CardTitle>
                  <CardDescription className="text-base">
                    Walk into every interview knowing you have an AI coach by your side. Real-time
                    support, intelligent suggestions, and conversation history awareness eliminate
                    uncertainty and help you present your best self with unwavering confidence.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <CardTitle>Enhance Interview Performance</CardTitle>
                  <CardDescription className="text-base">
                    From technical coding challenges to behavioral questions, our comprehensive AI
                    assistance covers every interview aspect. Smart transcript analysis helps you
                    identify strengths and weaknesses, turning each interview into a learning
                    opportunity.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <CardTitle>Accelerate Your Learning</CardTitle>
                  <CardDescription className="text-base">
                    Review exported transcripts to understand what works and what doesn't.
                    AI-powered insights reveal communication patterns you might miss, helping you
                    learn faster and adapt your strategy for maximum success in your job search.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <CardTitle>Master Interview Privacy</CardTitle>
                  <CardDescription className="text-base">
                    Maintain professionalism while getting the help you need. Stealth mode keeps
                    your AI assistance completely invisible during screen sharing, while all your
                    sensitive data stays securely on your device. Interview with confidence and
                    peace of mind.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <CardTitle>Stand Out from Competition</CardTitle>
                  <CardDescription className="text-base">
                    In competitive job markets, every advantage matters. PowerInterviewAI helps you
                    deliver polished, thoughtful responses, handle technical challenges with ease,
                    and present yourself professionally - giving you the edge needed to land your
                    dream job.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-12 rounded-lg border-2 border-primary bg-primary/5 p-8 text-center">
              <p className="mb-2 text-2xl font-bold text-foreground">
                Ready to Transform Your Job Search?
              </p>
              <p className="mb-6 text-lg text-muted-foreground">
                Join thousands of successful candidates who've used PowerInterviewAI to land their
                dream jobs
              </p>
              <Button size="lg" asChild>
                <a
                  href="https://github.com/PowerInterviewAI/client/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Free with 30 Credits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Container>
        </section>

        {/* Why Choose Power Interview Section */}
        <section className="py-16 md:py-24" aria-labelledby="why-choose-heading">
          <Container>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2
                id="why-choose-heading"
                className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              >
                Why Power Interview Stands Out
              </h2>
              <p className="text-lg text-muted-foreground">
                The most advanced and privacy-focused AI interview assistant on the market
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="grid gap-6 md:gap-8">
                <Card className="border-primary/50 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SiCheckmarx className="h-6 w-6 text-primary" />
                      Unmatched Face Swap Technology
                    </CardTitle>
                    <CardDescription className="text-base">
                      Unlike basic screen recording tools or simple overlay assistants (like
                      Interview Copilot, Final Round AI), Power Interview offers{' '}
                      <span className="font-semibold text-foreground">
                        real-time face swap with OBS integration
                      </span>
                      . Other tools can't modify your video feed - we can. No complex setup required
                      - just install OBS and VB-Cable and you're ready!
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-primary/50 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SiCheckmarx className="h-6 w-6 text-primary" />
                      True Privacy Protection
                    </CardTitle>
                    <CardDescription className="text-base">
                      Most AI interview assistants (Interviewing.io, Pramp, even some
                      "privacy-focused" tools) store your data on their servers.
                      <span className="font-semibold text-foreground"> We don't.</span> All your
                      sensitive information stays on your device with encrypted local storage. No
                      data mining, no selling your information to third parties, no cloud storage
                      risks.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-primary/50 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SiCheckmarx className="h-6 w-6 text-primary" />
                      Advanced Stealth Mode
                    </CardTitle>
                    <CardDescription className="text-base">
                      While tools like Yoodli and Big Interview offer practice features, they don't
                      help during{' '}
                      <span className="font-semibold text-foreground">live interviews</span>. Our
                      stealth mode makes the window{' '}
                      <span className="font-semibold text-foreground">
                        completely invisible during screen sharing
                      </span>
                      , won't show in screenshots, and can be controlled entirely via hotkeys.
                      Perfect for real interview scenarios.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-primary/50 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SiCheckmarx className="h-6 w-6 text-primary" />
                      Cryptocurrency Payment Only
                    </CardTitle>
                    <CardDescription className="text-base">
                      No credit card required, no PayPal, no bank details. Pay with cryptocurrency
                      coins for{' '}
                      <span className="font-semibold text-foreground">
                        maximum anonymity and privacy
                      </span>
                      . Unlike subscription-based competitors (HireVue, Karat), you only pay for
                      what you need - no recurring charges, no account tracking.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-primary/50 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SiCheckmarx className="h-6 w-6 text-primary" />
                      Comprehensive AI Features
                    </CardTitle>
                    <CardDescription className="text-base">
                      Get everything in one tool: dual-channel transcription, AI reply suggestions
                      based on YOUR CV, job description, and{' '}
                      <span className="font-semibold text-foreground">
                        complete conversation history
                      </span>{' '}
                      for accurate context-aware responses,{' '}
                      <span className="font-semibold text-foreground">
                        screenshot-based code analysis with syntax highlighting
                      </span>
                      , and{' '}
                      <span className="font-semibold text-foreground">smart transcript export</span>{' '}
                      with AI-powered analysis to help you review and improve your communication
                      skills. Our AI understands patterns in how you communicate, enabling more
                      relevant suggestions. Other tools like LeetCode Premium or HackerRank only
                      cover coding - we cover the entire interview.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-primary/50 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SiCheckmarx className="h-6 w-6 text-primary" />
                      No Setup Complexity
                    </CardTitle>
                    <CardDescription className="text-base">
                      Competitors often require complex API setups, browser extensions with
                      permission risks, or cloud service configurations. Power Interview is a{' '}
                      <span className="font-semibold text-foreground">
                        standalone desktop application
                      </span>{' '}
                      - download, install, and start. Face swap? Just install OBS and VB-Cable - no
                      configuration needed.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="mt-12 rounded-lg border-2 border-primary bg-primary/5 p-6 text-center">
                <p className="text-lg font-semibold text-foreground">
                  Power Interview isn't just another interview prep tool - it's the most advanced,
                  privacy-focused, and feature-rich AI assistant built specifically for real
                  interview scenarios.
                </p>
                <Button size="lg" className="mt-6" asChild>
                  <a
                    href="https://github.com/PowerInterviewAI/client/releases/latest"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Experience the Difference
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24" aria-labelledby="pricing-heading">
          <Container>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose the plan that fits your interview preparation needs
              </p>
              <div className="mt-6 inline-flex flex-col gap-2">
                <div className="rounded-lg bg-primary/10 px-6 py-3 text-center">
                  <p className="text-sm font-semibold text-primary">
                    🎁 New users get 30 free credits to try all features!
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Credit usage: 10 credits per minute of AI assistance
                </p>
                <div className="mt-2 rounded-lg border border-primary/20 bg-background px-4 py-2 text-center">
                  <p className="text-xs font-medium text-foreground">
                    💰 Payment: Coins only - No credit card, PayPal, or bank required
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              {/* Starter Plan */}
              <Card className="relative flex flex-col transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Starter</CardTitle>
                  <CardDescription>Perfect for trying out the platform</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$20</span>
                    <span className="text-muted-foreground"> / 600 credits</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">~60 minutes of AI assistance</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">600 credits (~60 minutes)</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Real-time transcription</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">AI reply suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Code assistance</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Face swap feature</span>
                    </li>
                  </ul>
                  <Button className="mt-6 w-full" variant="outline" asChild>
                    <a
                      href="https://github.com/PowerInterviewAI/client/releases/latest"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Started
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Plan - Popular */}
              <Card className="relative flex flex-col border-primary shadow-lg transition-shadow hover:shadow-xl">
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                </div>
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl">Pro</CardTitle>
                  <CardDescription>Best value for serious job seekers</CardDescription>
                  <div className="mt-4 flex flex-wrap items-baseline gap-3">
                    <div>
                      <span className="text-4xl font-bold">$100</span>
                      <span className="text-muted-foreground"> / 6,000 credits</span>
                    </div>
                    <span className="animate-pulse rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-1.5 text-sm font-bold text-white shadow-lg ring-2 ring-green-400/50">
                      💰 Save 50%
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    ~600 minutes of AI assistance
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">6,000 credits (~600 minutes)</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Real-time transcription</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">AI reply suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Code assistance</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Face swap feature</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Priority support</span>
                    </li>
                  </ul>
                  <Button className="mt-6 w-full" asChild>
                    <a
                      href="https://github.com/PowerInterviewAI/client/releases/latest"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Started
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="relative flex flex-col transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
                  <CardDescription>For heavy users and teams</CardDescription>
                  <div className="mt-4 flex flex-wrap items-baseline gap-3">
                    <div>
                      <span className="text-4xl font-bold">$500</span>
                      <span className="text-muted-foreground"> / 60,000 credits</span>
                    </div>
                    <span className="animate-pulse rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg ring-2 ring-orange-400/50">
                      🔥 Save 75%
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    ~6,000 minutes of AI assistance
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">60,000 credits (~6,000 minutes)</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Real-time transcription</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">AI reply suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Code assistance</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Face swap feature</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Priority support</span>
                    </li>
                    <li className="flex items-start">
                      <SiCheckmarx className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Dedicated account manager</span>
                    </li>
                  </ul>
                  <Button className="mt-6 w-full" variant="outline" asChild>
                    <a
                      href="https://github.com/PowerInterviewAI/client/releases/latest"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Started
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="bg-muted/30 py-16 md:py-24"
          aria-labelledby="testimonials-heading"
        >
          <Container>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2
                id="testimonials-heading"
                className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              >
                What Our Users Say
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of successful interview candidates
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="mb-2 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-lg font-bold text-primary">SM</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">Sarah Martinez</CardTitle>
                      <CardDescription>Software Engineer @ Google</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "The Export Transcript feature was a game-changer for my interview prep! After
                    each practice interview, I reviewed the AI-generated analysis and spotted
                    patterns in my communication style. Within weeks, my confidence soared and I
                    landed my dream job at Google!"
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-lg font-bold text-primary">JC</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">James Chen</CardTitle>
                      <CardDescription>Product Manager @ Amazon</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "The stealth mode feature is a game-changer. I could get AI assistance without
                    being obvious. The window doesn't show up in screen captures or screen shares -
                    perfect for interviews!"
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-lg font-bold text-primary">EP</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">Emily Parker</CardTitle>
                      <CardDescription>Data Scientist @ Meta</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "The context awareness is incredible! The AI remembers the entire conversation
                    and provides suggestions that build on previous answers. Plus, exporting
                    transcripts in DOCX format let me share insights with my mentor. Privacy-first
                    and powerful - worth every penny!"
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-lg font-bold text-primary">MK</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">Michael Kim</CardTitle>
                      <CardDescription>Full Stack Developer @ Netflix</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "The face swap technology is incredible! I could maintain my anonymity while
                    still presenting professionally. The code suggestions saved me during the live
                    coding round."
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-lg font-bold text-primary">AP</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">Aisha Patel</CardTitle>
                      <CardDescription>DevOps Engineer @ Microsoft</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "Best investment for my career! The AI's conversation history analysis helped me
                    identify that I was being too brief in my answers. After reviewing exported
                    transcripts and adjusting my approach, my interview performance dramatically
                    improved. Got 3 offers in 2 weeks!"
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-lg font-bold text-primary">DL</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">David Lee</CardTitle>
                      <CardDescription>Security Engineer @ Apple</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "As someone who values privacy, this tool is perfect. Local data storage,
                    encrypted communications, and powerful AI features. Highly recommended!"
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://github.com/PowerInterviewAI/client/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Them Today
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
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
              {[
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
                    'Credits are consumed at a rate of 10 credits per minute when using AI-powered features like reply suggestions, code analysis, transcription, and face swap processing. For example, a 30-minute interview session would use approximately 300 credits. You can purchase credit packs starting from 600 credits ($20 for ~60 minutes) up to 60,000 credits ($500 for ~6,000 minutes).',
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
              ].map((faq, index) => (
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

        {/* Contact Form Section */}
        <section
          id="contact"
          className="bg-muted/30 py-16 md:py-24"
          aria-labelledby="contact-heading"
        >
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <h2
                  id="contact-heading"
                  className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                >
                  Get In Touch
                </h2>
                <p className="text-lg text-muted-foreground">
                  Have questions or need support? We're here to help!
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Email Card */}
                <a
                  href="mailto:power-interview@protonmail.com"
                  className="group block transition-transform hover:scale-105"
                >
                  <Card className="h-full border-2 transition-colors hover:border-primary hover:shadow-lg">
                    <CardContent className="flex flex-col items-center p-8 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <SiProtonmail className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">Email</h3>
                      <p className="text-sm text-muted-foreground group-hover:text-primary">
                        power-interview@protonmail.com
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground">
                        Send us an email for detailed inquiries
                      </p>
                    </CardContent>
                  </Card>
                </a>

                {/* GitHub Card */}
                <a
                  href="https://github.com/PowerInterviewAI/client"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block transition-transform hover:scale-105"
                >
                  <Card className="h-full border-2 transition-colors hover:border-primary hover:shadow-lg">
                    <CardContent className="flex flex-col items-center p-8 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <SiGithub className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">GitHub</h3>
                      <p className="text-sm text-muted-foreground group-hover:text-primary">
                        PowerInterviewAI/client
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground">
                        View source code, report issues, and contribute
                      </p>
                    </CardContent>
                  </Card>
                </a>

                {/* Telegram Card */}
                <a
                  href="https://t.me/power_interview_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block transition-transform hover:scale-105"
                >
                  <Card className="h-full border-2 transition-colors hover:border-primary hover:shadow-lg">
                    <CardContent className="flex flex-col items-center p-8 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <SiTelegram className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">Telegram</h3>
                      <p className="text-sm text-muted-foreground group-hover:text-primary">
                        @power_interview_ai
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground">
                        Join our Telegram community for updates
                      </p>
                    </CardContent>
                  </Card>
                </a>

                {/* Discord Card */}
                <a
                  href="https://discord.gg/HZ9sHsh2U7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block transition-transform hover:scale-105"
                >
                  <Card className="h-full border-2 transition-colors hover:border-primary hover:shadow-lg">
                    <CardContent className="flex flex-col items-center p-8 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <SiDiscord className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">Discord</h3>
                      <p className="text-sm text-muted-foreground group-hover:text-primary">
                        Power Interview AI
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground">
                        Chat with us and other users on Discord
                      </p>
                    </CardContent>
                  </Card>
                </a>
              </div>

              <div className="mt-12 rounded-lg border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-8 text-center">
                <p className="mb-2 text-lg font-semibold text-foreground">
                  Need immediate assistance?
                </p>
                <p className="text-sm text-muted-foreground">
                  Join our Discord or Telegram community for real-time support and discussions
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Legal Notice Section */}
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
                        . Using face swap technology to impersonate another person, misrepresent
                        your identity, or deceive interviewers may be{' '}
                        <span className="font-semibold text-foreground">illegal</span> and could
                        result in:
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
                        terms of service of platforms you use it with, and ethical standards. By
                        using this software, you:
                      </p>
                      <ul className="ml-6 mt-2 list-disc space-y-1">
                        <li>Agree to use it only for lawful purposes</li>
                        <li>
                          Accept full responsibility for your actions while using the software
                        </li>
                        <li>Acknowledge that you have read and understand this legal notice</li>
                        <li>
                          Agree not to hold the developers liable for any misuse of the software
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">Platform Compliance</h3>
                      <p>
                        Many interview platforms and companies have specific terms of service and
                        acceptable use policies. It is
                        <span className="font-semibold text-foreground">
                          {' '}
                          your responsibility
                        </span>{' '}
                        to review and comply with these terms. Violation of platform policies may
                        result in account termination, legal action, or other consequences.
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">No Warranty</h3>
                      <p>
                        Power Interview is provided "as is" without warranty of any kind. The
                        developers make no representations about the suitability, reliability,
                        availability, timeliness, or accuracy of the software. Use at your own risk.
                      </p>
                    </div>

                    <div className="rounded-lg border-2 border-amber-500 bg-amber-500/10 p-4">
                      <p className="font-semibold text-amber-900 dark:text-amber-400">
                        ⚖️ By downloading and using Power Interview, you acknowledge that you have
                        read, understood, and agree to use this software ethically, legally, and
                        responsibly. If you do not agree to these terms, do not use this software.
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
      </main>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16" role="contentinfo">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <img
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt="Power Interview Logo"
                  className="h-6 w-6"
                />
                <span className="text-lg font-bold">Power Interview</span>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Your personal AI-powered interview coach with real-time face swap technology.
                Privacy-first, powerful, and effective.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/PowerInterviewAI/client"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="GitHub"
                >
                  <SiGithub className="h-5 w-5" />
                </a>
                <a
                  href="https://t.me/power_interview_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="Telegram"
                >
                  <SiTelegram className="h-5 w-5" />
                </a>
                <a
                  href="https://discord.gg/HZ9sHsh2U7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="Discord"
                >
                  <SiDiscord className="h-5 w-5" />
                </a>
                <a
                  href="mailto:power-interview@protonmail.com"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="Email"
                >
                  <SiProtonmail className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection('features')}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <a
                    href="https://github.com/PowerInterviewAI/client/releases/latest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Download
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/PowerInterviewAI/client"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection('testimonials')}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('faq')}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <a
                    href="https://github.com/PowerInterviewAI/client"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/power_interview_ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Telegram Channel
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/HZ9sHsh2U7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Discord Server
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Support
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    License
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Power Interview. All rights reserved.</p>
            <p className="mt-2">
              Made to help you ace your interviews while protecting your privacy
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
