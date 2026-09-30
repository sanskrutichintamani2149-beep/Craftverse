import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  GraduationCap,
  Target,
  BarChart3,
  ShieldCheck,
  Mail,
  Lock,
  AlertCircle,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { FeatureTile } from '@/components/common/FeatureTile';
import { BackdropScene } from '@/components/common/BackdropScene';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { useAuth } from '@/context/AuthContext';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isConfigured, signInWithEmail, signInWithOAuth } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isConfigured) {
      setError(t('auth.authNotConnected'));
      return;
    }

    if (!identifier.trim() || !password) {
      setError('Please provide your email and password.');
      return;
    }

    setLoading(true);
    const result = await signInWithEmail(identifier.trim(), password);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Invalid credentials or user not found.');
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    if (!isConfigured) {
      setError(t('auth.authNotConnected'));
      return;
    }
    const result = await signInWithOAuth(provider);
    if (!result.success) {
      setError(result.error || `Failed to sign in with ${provider}.`);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden selection:bg-brand-cyan/30 selection:text-white">
      {/* Visual Backdrop (Mountain horizon, winding road, rising bars, sunrise) */}
      <BackdropScene variant="full" />

      {/* Top Header with Language Selector */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-20">
        <Logo size="md" showTagline={true} to="/" />
        <div className="flex items-center gap-3">
          <LanguageSelector />
        </div>
      </header>

      {/* Hero Container: Left Info Grid & Right Frosted Glass Login Card */}
      <main className="w-full max-w-7xl mx-auto px-6 py-8 flex-1 flex items-center z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT SIDE: Brand promise, Headline, Feature Tiles */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6 text-left">
            {/* Eyebrow */}
            <div className="inline-block">
              <span className="text-[11px] md:text-xs font-extrabold tracking-[0.25em] text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/30 px-3.5 py-1.5 rounded-full">
                {t('brand.eyebrow')}
              </span>
            </div>

            {/* Giant Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
                {t('hero.title1')} <br />
                <span className="text-white">in </span>
                <span className="text-gradient">{t('hero.title2')}</span>
              </h1>
              {/* Short Accent Underline */}
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-brand-cyan to-brand-teal mt-3" />
            </div>

            {/* Subtitles */}
            <div className="text-sm md:text-base text-typography-bodyDark/90 dark:text-[#B8C7E6] space-y-1 font-medium max-w-lg">
              <p className="font-semibold text-white/95">{t('hero.subtitle1')}</p>
              <p className="text-brand-cyan/80">{t('hero.subtitle2')}</p>
            </div>

            {/* 2x2 Feature Tiles matching the image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-xl">
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
          </div>

          {/* RIGHT SIDE: Large Frosted Glass Card (exact match to image) */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[460px] glass-card p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,10,40,0.8),0_0_40px_rgba(18,184,255,0.2)] border border-brand-cyan/35 rounded-[28px] relative overflow-hidden">
              {/* Subtle top glare highlight */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent" />

              {/* Card Header */}
              <div className="mb-7">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t('auth.welcomeBack')}
                </h2>
                <p className="text-xs sm:text-sm text-typography-bodyDark dark:text-[#A9BCD9] mt-1.5 leading-relaxed">
                  {t('auth.loginSubtitle')}
                </p>
              </div>

              {/* Service Not Connected Notice (Strict Rule 2.4) */}
              {!isConfigured && (
                <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5 leading-relaxed">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <strong className="font-bold block">Live Auth Disconnected</strong>
                    {t('auth.authNotConnected')}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-5 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label={t('auth.emailOrPhone')}
                  icon={<Mail className="w-4 h-4" />}
                  placeholder={t('auth.emailPlaceholder')}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={!isConfigured || loading}
                />

                <div className="space-y-1.5">
                  <Input
                    label={t('auth.password')}
                    icon={<Lock className="w-4 h-4" />}
                    isPassword={true}
                    placeholder={t('auth.passwordPlaceholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isConfigured || loading}
                  />

                  <div className="flex justify-end pt-0.5">
                    <Link
                      to="/forgot-password"
                      className="text-xs font-semibold text-brand-cyan hover:text-brand-teal transition-colors"
                    >
                      {t('auth.forgotPassword')}
                    </Link>
                  </div>
                </div>

                {/* Primary Login Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  withArrow={true}
                  isLoading={loading}
                  disabled={!isConfigured}
                  className="w-full mt-2"
                >
                  {t('auth.loginButton')}
                </Button>
              </form>

              {/* OR Divider */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="border-t border-brand-cyan/20 w-full" />
                <span className="bg-[#071433]/80 px-3 text-[11px] font-bold uppercase tracking-wider text-typography-muted">
                  {t('auth.orDivider')}
                </span>
                <div className="border-t border-brand-cyan/20 w-full" />
              </div>

              {/* Social Login Buttons (Google & GitHub) */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOAuth('google')}
                  disabled={!isConfigured}
                  className="py-2.5 px-3 rounded-xl glass-tile text-xs font-semibold text-white/90 flex items-center justify-center gap-2 hover:border-brand-cyan/60 hover:bg-white/5 transition-all disabled:opacity-50"
                >
                  {/* Google SVG */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="truncate">Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuth('github')}
                  disabled={!isConfigured}
                  className="py-2.5 px-3 rounded-xl glass-tile text-xs font-semibold text-white/90 flex items-center justify-center gap-2 hover:border-brand-cyan/60 hover:bg-white/5 transition-all disabled:opacity-50"
                >
                  {/* GitHub SVG */}
                  <svg className="w-4 h-4 shrink-0 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span className="truncate">GitHub</span>
                </button>
              </div>

              {/* Card Footer */}
              <div className="mt-7 text-center">
                <p className="text-xs text-typography-bodyDark dark:text-[#A9BCD9]">
                  {t('auth.noAccount')}{' '}
                  <Link
                    to="/signup"
                    className="font-bold text-brand-cyan hover:text-brand-teal transition-colors underline decoration-brand-cyan/40 underline-offset-4"
                  >
                    {t('auth.signUpLink')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Tagline */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center z-10">
        <p className="text-[11px] uppercase tracking-widest text-typography-muted">
          DhanaDrishti • Understand Your Money. See Your Future.
        </p>
      </footer>
    </div>
  );
};
