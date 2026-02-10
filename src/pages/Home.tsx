import React from 'react';

import { ArrowRight, BookOpen, Brain, Target } from 'lucide-react';

import Container from '@/components/custom/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_CONFIG } from '@/config/constants';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Container>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-5xl font-bold tracking-tight">{APP_CONFIG.name}</h1>
            <p className="text-lg text-muted-foreground">{APP_CONFIG.description}</p>
          </div>

          <div className="mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight">
              Get Started with Your Interview Preparation
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Build your skills, practice with confidence, and ace your next interview. Our
              comprehensive platform provides you with the tools and resources you need to succeed.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          <div className="grid w-full max-w-5xl gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Brain className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Smart Practice</CardTitle>
                <CardDescription>
                  AI-powered questions tailored to your skill level and target role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Explore
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  Monitor your improvement with detailed analytics and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  View Stats
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Learn & Grow</CardTitle>
                <CardDescription>
                  Access curated resources and expert tips for interview success
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Resources
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center text-sm text-muted-foreground">
            <p>Version {APP_CONFIG.version}</p>
          </div>
        </main>
      </Container>
    </div>
  );
};

export default Home;
