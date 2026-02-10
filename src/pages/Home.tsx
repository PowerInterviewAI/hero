import React, { useState } from 'react';

import {
  ArrowRight,
  Brain,
  Check,
  ChevronDown,
  Code,
  Lock,
  Mail,
  Menu,
  Mic,
  Shield,
  Video,
  X,
} from 'lucide-react';

import Container from '@/components/custom/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_CONFIG } from '@/config/constants';

const Home: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    window.location.href = `mailto:power-interview@protonmail.com?subject=Contact from ${formData.name}&body=${formData.message}`;
  };

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
              <img src="/logo.png" alt="Power Interview Logo" className="h-8 w-8 rounded-xl" />
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
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://github.com/PowerInterviewAI/client"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
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

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
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
                    >
                      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>GitHub</title>
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
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
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection('features')}
                  className="gap-2"
                >
                  Learn More
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-12 rounded-lg border bg-muted/30 p-2">
                <div
                  className="flex aspect-video items-center justify-center rounded bg-muted"
                  role="img"
                  aria-label="Product demo video placeholder"
                >
                  <Video className="h-20 w-20 text-muted-foreground" aria-hidden="true" />
                  <span className="ml-4 text-muted-foreground">Product Demo Placeholder</span>
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
                  <Video className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
                  <CardTitle>Real-Time Face Swap</CardTitle>
                  <CardDescription>
                    Transform your video appearance during live interviews with advanced face swap
                    technology and virtual camera integration
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Mic className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
                  <CardTitle>Live Transcription</CardTitle>
                  <CardDescription>
                    Dual-channel transcription with automatic speaker detection and full
                    conversation history
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Brain className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
                  <CardTitle>AI Reply Suggestions</CardTitle>
                  <CardDescription>
                    Get personalized, context-aware responses based on your CV, job description, and
                    conversation flow
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Code className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
                  <CardTitle>Code Suggestions</CardTitle>
                  <CardDescription>
                    Screenshot analysis with LLM-powered solutions for coding problems, complete
                    with syntax highlighting
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Shield className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
                  <CardTitle>Stealth Mode</CardTitle>
                  <CardDescription>
                    Operate discreetly with hotkeys, opacity control, and smart window positioning
                    without losing focus
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Lock className="mb-2 h-10 w-10 text-primary" aria-hidden="true" />
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
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
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
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">600 AI credits</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Real-time transcription</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">AI reply suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Code assistance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
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
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$100</span>
                    <span className="text-muted-foreground"> / 6,000 credits</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">6,000 AI credits</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Real-time transcription</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">AI reply suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Code assistance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Face swap feature</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
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
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$500</span>
                    <span className="text-muted-foreground"> / 60,000 credits</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">60,000 AI credits</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Real-time transcription</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">AI reply suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Code assistance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Face swap feature</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">Priority support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
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
                    "Power Interview helped me ace my technical interviews with real-time code
                    suggestions. The AI understood my background perfectly and provided relevant
                    answers. Landed my dream job!"
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
                    being obvious. The transcription feature helped me review and improve my
                    responses."
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
                    "Privacy was my biggest concern, and Power Interview delivered. All my data
                    stays on my device, yet I get powerful AI assistance. Worth every penny!"
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
                    "Best investment for my career! The AI suggestions were spot-on and helped me
                    articulate my thoughts better. The hotkeys made everything so seamless."
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
                  <ArrowRight className="ml-2 h-4 w-4" />
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
                    'The face swap feature uses advanced AI to replace your face in real-time video with a photo you provide. It integrates with virtual camera software like OBS, allowing you to use it in any video conferencing application. Perfect for privacy protection or personal presentation preferences.',
                },
                {
                  question: 'Do I need special hardware to run Power Interview?',
                  answer:
                    'Power Interview runs on most modern computers. You will need Node.js (v18+), Python (v3.12), and optionally OBS Virtual Camera for the face swap feature and VB-Audio Virtual Cable for audio routing. Detailed installation instructions are provided.',
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
                    'Stealth mode allows you to operate the assistant discreetly during interviews. You can control everything via hotkeys, adjust window opacity, and position windows strategically—all without losing focus on your interview tab or application.',
                },
                {
                  question: 'How do credits work?',
                  answer:
                    'Credits are used for AI-powered features like reply suggestions, code analysis, and face swap processing. Different actions consume different amounts of credits. You can purchase credit packs starting from 600 credits ($20) up to 60,000 credits ($500).',
                },
                {
                  question: 'Is there a free trial?',
                  answer:
                    'While we do not offer a traditional free trial, you can start with our Starter plan at $20 for 600 credits to test all features. This is a low-risk way to experience the full capabilities of Power Interview.',
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
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          openFaqIndex === index ? 'rotate-180' : ''
                        }`}
                      />
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
                <Mail className="ml-2 h-4 w-4" />
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
            <div className="mx-auto max-w-2xl">
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

              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleFormChange}
                        rows={5}
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Send Message
                      <Mail className="ml-2 h-4 w-4" />
                    </Button>
                  </form>

                  <div className="mt-6 space-y-4 border-t pt-6">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <a
                          href="mailto:power-interview@protonmail.com"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          power-interview@protonmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-muted-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>GitHub</title>
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">GitHub</p>
                        <a
                          href="https://github.com/PowerInterviewAI/client"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          github.com/PowerInterviewAI/client
                        </a>
                      </div>
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
                <img src="/logo.png" alt="Power Interview Logo" className="h-6 w-6" />
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
                  <svg
                    className="h-5 w-5 text-muted-foreground"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
                <a
                  href="mailto:power-interview@protonmail.com"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
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
            <p>
              &copy; {new Date().getFullYear()} Power Interview. All rights reserved. Version{' '}
              {APP_CONFIG.version}
            </p>
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
