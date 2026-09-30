import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BookOpen,
  LayoutDashboard,
  Sliders,
  Target,
  FileText,
  Activity,
  Scale,
  X,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';

interface SidebarProps {
  onCloseMobile?: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile, className = '' }) => {
  const { t } = useTranslation();
  const location = useLocation();

  // Exact 7 navigation items (8th is Dark/Light Mode toggle row at the bottom)
  const navItems = [
    {
      to: '/',
      label: t('nav.termopedia'),
      icon: BookOpen,
      exact: true,
      isActiveMatch: (path: string) => path === '/' || path.startsWith('/term/'),
    },
    {
      to: '/dashboard',
      label: t('nav.dashboard'),
      icon: LayoutDashboard,
      isActiveMatch: (path: string) => path.startsWith('/dashboard'),
    },
    {
      to: '/what-if',
      label: t('nav.whatIf'),
      icon: Sliders,
      isActiveMatch: (path: string) => path.startsWith('/what-if'),
    },
    {
      to: '/goal-planner',
      label: t('nav.goalPlanner'),
      icon: Target,
      isActiveMatch: (path: string) => path.startsWith('/goal-planner'),
    },
    {
      to: '/document-explainer',
      label: t('nav.documentExplainer'),
      icon: FileText,
      isActiveMatch: (path: string) => path.startsWith('/document-explainer'),
    },
    {
      to: '/financial-health',
      label: t('nav.financialHealth'),
      icon: Activity,
      isActiveMatch: (path: string) => path.startsWith('/financial-health'),
    },
    {
      to: '/myth-or-fact',
      label: t('nav.mythOrFact'),
      icon: Scale,
      isActiveMatch: (path: string) => path.startsWith('/myth-or-fact'),
    },
  ];

  return (
    <aside
      className={`w-72 shrink-0 h-screen sticky top-0 flex flex-col justify-between p-5 border-r border-surface-darkBorder/40 dark:border-brand-cyan/20 bg-[#040A1C]/90 dark:bg-[#040A1C]/90 backdrop-blur-xl z-40 ${className}`}
    >
      {/* Top Header / Logo */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Logo size="md" to="/" />
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-2 rounded-xl text-typography-muted hover:text-white"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation list (Exact items 1 through 7) */}
        <nav className="flex flex-col gap-1.5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = item.isActiveMatch(location.pathname);
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 group relative ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-brand-blue/40 via-brand-cyan/25 to-brand-teal/20 border border-brand-cyan/50 shadow-[0_0_20px_rgba(18,184,255,0.25)]'
                    : 'text-typography-bodyDark hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                    isActive
                      ? 'bg-brand-cyan text-brand-dark shadow-[0_0_12px_rgba(18,184,255,0.4)]'
                      : 'bg-brand-cyan/10 text-brand-cyan group-hover:bg-brand-cyan/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="truncate">{item.label}</span>

                {isActive && (
                  <div className="absolute right-3 w-1.5 h-6 rounded-full bg-gradient-to-b from-brand-cyan to-brand-teal" />
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Item 8: Dark / Light Mode (Appearance toggle row) */}
      <div className="pt-4 border-t border-brand-cyan/15">
        <ThemeToggle isSidebarRow />
      </div>
    </aside>
  );
};
