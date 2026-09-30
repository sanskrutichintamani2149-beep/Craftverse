import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Mail, Phone, Lock, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { BackdropScene } from '@/components/common/BackdropScene';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { useAuth } from '@/context/AuthContext';

export const SignUpPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isConfigured, signUpWithEmail } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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

    if (!email.trim() || !password) {
      setError('Please provide email and password.');
      return;
    }

    setLoading(true);
    const result = await signUpWithEmail(email.trim(), password, {
      fullName: fullName.trim(),
      phone: phone.trim(),
    });
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Failed to create account.');
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden">
      <BackdropScene variant="full" />

      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-20">
        <Logo size="md" to="/" />
        <LanguageSelector />
      </header>

      <main className="w-full max-w-md mx-auto px-6 py-8 flex-1 flex items-center z-10">
        <div className="w-full glass-card p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,10,40,0.8),0_0_40px_rgba(18,184,255,0.2)] border border-brand-cyan/35 rounded-[28px] relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-teal/60 to-transparent" />

          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t('auth.createAccount')}
            </h2>
            <p className="text-xs sm:text-sm text-typography-bodyDark dark:text-[#A9BCD9] mt-1.5 leading-relaxed">
              {t('auth.signupSubtitle')}
            </p>
          </div>

          {!isConfigured && (
            <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <strong className="font-bold block">Live Auth Disconnected</strong>
                {t('auth.authNotConnected')}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('auth.name')}
              icon={<User className="w-4 h-4" />}
              placeholder={t('auth.namePlaceholder')}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!isConfigured || loading}
            />

            <Input
              label="Email Address"
              type="email"
              icon={<Mail className="w-4 h-4" />}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isConfigured || loading}
            />

            <Input
              label={t('auth.phone')}
              type="tel"
              icon={<Phone className="w-4 h-4" />}
              placeholder={t('auth.phonePlaceholder')}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isConfigured || loading}
            />

            <Input
              label={t('auth.password')}
              icon={<Lock className="w-4 h-4" />}
              isPassword={true}
              placeholder={t('auth.passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isConfigured || loading}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              withArrow={true}
              isLoading={loading}
              disabled={!isConfigured}
              className="w-full mt-3"
            >
              {t('auth.signupButton')}
            </Button>
          </form>

          <div className="mt-7 text-center">
            <p className="text-xs text-typography-bodyDark dark:text-[#A9BCD9]">
              {t('auth.haveAccount')}{' '}
              <Link
                to="/login"
                className="font-bold text-brand-cyan hover:text-brand-teal transition-colors underline decoration-brand-cyan/40 underline-offset-4"
              >
                {t('auth.logInLink')}
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-7xl mx-auto px-6 py-4 text-center z-10">
        <p className="text-[11px] uppercase tracking-widest text-typography-muted">
          DhanaDrishti • Understand Your Money. See Your Future.
        </p>
      </footer>
    </div>
  );
};
