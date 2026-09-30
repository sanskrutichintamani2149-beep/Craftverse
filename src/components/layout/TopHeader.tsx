import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, User, LogOut } from 'lucide-react';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { useAuth } from '@/context/AuthContext';

interface TopHeaderProps {
  onOpenMobileSidebar: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenMobileSidebar }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const userInitials = user?.initials || 'DD';
  const userName = user?.fullName || 'User';
  const userEmail = user?.email || 'user@dhanadrishti.in';

  return (
    <header className="h-18 px-6 lg:px-10 flex items-center justify-between border-b border-surface-darkBorder/30 dark:border-brand-cyan/15 bg-[#040A1C]/70 dark:bg-[#040A1C]/70 backdrop-blur-md sticky top-0 z-30">
      {/* Mobile Hamburger Button */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-xl glass-card text-brand-cyan hover:border-brand-cyan"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Breadcrumb or empty space on desktop */}
      <div className="hidden lg:flex items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-brand-cyan font-bold">
          DhanaDrishti Platform
        </span>
      </div>

      {/* TOP-RIGHT CONTROLS: Language selector + User Profile Avatar */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <LanguageSelector />

        {/* Profile Avatar and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1 rounded-full glass-card hover:border-brand-cyan/60 transition-all select-none"
            aria-expanded={isProfileOpen}
            aria-label="User profile menu"
          >
            {/* Initials Badge */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-teal flex items-center justify-center text-white font-bold text-xs shadow-[0_0_12px_rgba(18,184,255,0.4)]">
              {userInitials}
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2.5 w-64 glass-card p-3 shadow-2xl border border-brand-cyan/35 z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* User info snippet */}
              <div className="px-3 py-2 border-b border-white/10 mb-2">
                <p className="text-sm font-bold text-white truncate">{userName}</p>
                <p className="text-xs text-brand-cyan/80 truncate mt-0.5">{userEmail}</p>
              </div>

              {/* Exact two actions allowed: View Profile and Sign out */}
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-typography-bodyDark hover:text-white hover:bg-white/10 dark:hover:bg-white/5 rounded-xl transition-colors"
                >
                  <User className="w-4 h-4 text-brand-cyan" />
                  <span>{t('nav.profile')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    handleSignOut();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>{t('nav.signOut')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
