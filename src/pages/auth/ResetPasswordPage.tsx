import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { BackdropScene } from '@/components/common/BackdropScene';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { useAuth } from '@/context/AuthContext';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { isConfigured } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    // Password update simulation or Supabase auth update
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }, 800);
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
              Create New Password
            </h2>
            <p className="text-xs sm:text-sm text-typography-bodyDark dark:text-[#A9BCD9] mt-1.5 leading-relaxed">
              Set a strong, secure password for your account.
            </p>
          </div>

          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center mx-auto border border-brand-teal/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Password Updated</h3>
              <p className="text-xs text-typography-bodyDark">
                Your password has been changed. Redirecting to login...
              </p>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Input
                label="New Password"
                isPassword={true}
                icon={<Lock className="w-4 h-4" />}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!isConfigured || loading}
              />

              <Input
                label="Confirm New Password"
                isPassword={true}
                icon={<Lock className="w-4 h-4" />}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                Update Password
              </Button>
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
