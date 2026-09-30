import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { BackdropScene } from '@/components/common/BackdropScene';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { useAuth } from '@/context/AuthContext';

export const ForgotPasswordPage: React.FC = () => {
  const { isConfigured, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isConfigured) {
      setError('Authentication service is not connected.');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    setLoading(true);
    const result = await resetPassword(email.trim());
    setLoading(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || 'Failed to send reset link.');
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
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Reset Password
            </h2>
            <p className="text-xs sm:text-sm text-typography-bodyDark dark:text-[#A9BCD9] mt-1.5 leading-relaxed">
              Enter your registered email address and we'll send a password recovery link.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center mx-auto border border-brand-teal/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Reset Link Dispatched</h3>
              <p className="text-xs text-typography-bodyDark">
                If an account exists for {email}, a recovery link has been delivered to your inbox.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-cyan hover:underline mt-4"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Input
                label="Registered Email"
                type="email"
                icon={<Mail className="w-4 h-4" />}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isConfigured || loading}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                disabled={!isConfigured}
                className="w-full mt-2"
              >
                Send Recovery Link
              </Button>

              <div className="pt-4 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-typography-muted hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Login</span>
                </Link>
              </div>
            </form>
          )}
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
