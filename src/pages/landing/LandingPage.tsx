import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  GraduationCap,
  Target,
  BarChart3,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Sliders,
  FileText,
  Activity,
  Scale,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/common/Button';
import { FeatureTile } from '@/components/common/FeatureTile';
import { BackdropScene } from '@/components/common/BackdropScene';
import { LanguageSelector } from '@/components/common/LanguageSelector';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden">
      <BackdropScene variant="full" />

      {/* Top Navbar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-20">
        <Logo size="md" showTagline={true} to="/" />

        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Link
            to="/login"
            className="text-xs sm:text-sm font-semibold text-white/90 hover:text-brand-cyan transition-colors"
          >
            Log In
          </Link>
          <Button
            variant="primary"
            size="sm"
            withArrow={true}
            onClick={() => navigate('/signup')}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="text-[11px] md:text-xs font-extrabold tracking-[0.25em] text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/35 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(18,184,255,0.2)]">
            {t('brand.eyebrow')}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.1] max-w-4xl tracking-tight">
          {t('hero.title1')}{' '}
          <span className="text-gradient">{t('hero.title2')}</span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-typography-bodyDark dark:text-[#B8C7E6] max-w-2xl leading-relaxed">
          {t('brand.promise')} The dedicated financial literacy, planning and decision-support platform designed for India's students, young earners, and first-time professionals.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            withArrow={true}
            onClick={() => navigate('/signup')}
            className="px-8 shadow-[0_6px_25px_rgba(19,70,224,0.5)]"
          >
            Start Your Journey Free
          </Button>
          <Button
            variant="secondary"
            size="lg"
            icon={<BookOpen className="w-4 h-4 text-brand-cyan" />}
            onClick={() => navigate('/term/gst')}
          >
            Browse Term-O-Pedia
          </Button>
        </div>

        {/* 4 Feature Tiles Grid matching image */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 text-left">
          <FeatureTile
            icon={GraduationCap}
            title={t('hero.tiles.literacy.title')}
            description={t('hero.tiles.literacy.desc')}
            onClick={() => navigate('/term/gst')}
          />
          <FeatureTile
            icon={Target}
            title={t('hero.tiles.decisions.title')}
            description={t('hero.tiles.decisions.desc')}
            onClick={() => navigate('/what-if')}
          />
          <FeatureTile
            icon={BarChart3}
            title={t('hero.tiles.habits.title')}
            description={t('hero.tiles.habits.desc')}
            onClick={() => navigate('/goal-planner')}
          />
          <FeatureTile
            icon={ShieldCheck}
            title={t('hero.tiles.security.title')}
            description={t('hero.tiles.security.desc')}
            onClick={() => navigate('/document-explainer')}
          />
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything You Need to Master Your Money
          </h2>
          <p className="text-sm text-brand-cyan/80 mt-2">
            No fluff. No fake mockups. Connected financial intelligence built for India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-card p-6 border border-brand-cyan/30 hover:border-brand-cyan/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-cyan/15 text-brand-cyan flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Term-O-Pedia</h3>
              <p className="text-xs text-typography-bodyDark mt-2 leading-relaxed">
                Visual dictionary for GST, TDS, CTC, ESOPs and compounding. Direct playable YouTube lessons and interactive calculators.
              </p>
            </div>
            <Link
              to="/term/gst"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-brand-teal"
            >
              <span>Explore Term-O-Pedia</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-6 border border-brand-cyan/30 hover:border-brand-cyan/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-teal/15 text-brand-teal flex items-center justify-center mb-4">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">What-If Simulator</h3>
              <p className="text-xs text-typography-bodyDark mt-2 leading-relaxed">
                Test salary increments, expense shocks, and SIP variations. Instantly see delta impacts on your bank balance before deciding.
              </p>
            </div>
            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-brand-teal"
            >
              <span>Simulate Scenarios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-6 border border-brand-cyan/30 hover:border-brand-cyan/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 text-brand-cyan flex items-center justify-center mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Health Score & AI Roast</h3>
              <p className="text-xs text-typography-bodyDark mt-2 leading-relaxed">
                Objective 0-100 diagnostic across savings, runway, and expenses with an optional witty AI roast to keep you grounded.
              </p>
            </div>
            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-brand-teal"
            >
              <span>Check Financial Health</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-brand-cyan/15 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 text-xs text-typography-muted">
        <Logo size="sm" showTagline={false} to="/" />
        <p>© {new Date().getFullYear()} DhanaDrishti. Simple Finance • Stronger Tomorrows.</p>
        <p className="text-brand-cyan/70">Built for Indian Students & Young Earners</p>
      </footer>
    </div>
  );
};
