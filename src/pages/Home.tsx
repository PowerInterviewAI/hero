import React from 'react';

import { Button, Container } from '@/components';
import { APP_CONFIG } from '@/config/constants';

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Container>
        <main className="flex min-h-screen w-full flex-col items-center justify-between py-32">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-50">
              {APP_CONFIG.name}
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {APP_CONFIG.description}
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="max-w-2xl text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Get Started with Your Interview Preparation
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Build your skills, practice with confidence, and ace your next interview. Our
              comprehensive platform provides you with the tools and resources you need to succeed.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>

          <div className="mt-16 text-center text-sm text-zinc-500 dark:text-zinc-600">
            <p>Version {APP_CONFIG.version}</p>
          </div>
        </main>
      </Container>
    </div>
  );
};

export default Home;
