import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { BackdropScene } from '@/components/common/BackdropScene';
import { Button } from '@/components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen relative flex flex-col justify-between p-6">
      <BackdropScene variant="subtle" />

      <header>
        <Logo size="md" to="/" />
      </header>

      <main className="max-w-md mx-auto text-center space-y-5 glass-card p-10 border border-brand-cyan/35 z-10">
        <div className="w-16 h-16 rounded-2xl bg-brand-cyan/15 text-brand-cyan flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-white">404</h1>
          <h2 className="text-lg font-bold text-gradient">Page Off Course</h2>
          <p className="text-xs text-typography-muted">
            The page or financial resource you are looking for does not exist in DhanaDrishti.
          </p>
        </div>

        <Link to="/" className="inline-block pt-2">
          <Button variant="primary" size="md" withArrow={true}>
            Return to Safety
          </Button>
        </Link>
      </main>

      <footer className="text-center text-[11px] text-typography-muted">
        DhanaDrishti • Understand Your Money. See Your Future.
      </footer>
    </div>
  );
};
