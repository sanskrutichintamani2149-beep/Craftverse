import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from 'react-i18next';

interface ThemeToggleProps {
  isSidebarRow?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isSidebarRow = false,
  className = '',
}) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  if (isSidebarRow) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all duration-200 group text-typography-bodyDark hover:bg-white/10 dark:hover:bg-white/5 hover:text-white ${className}`}
        aria-label="Toggle Dark and Light theme"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan group-hover:scale-105 transition-transform">
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </div>
          <span className="text-sm font-medium">
            {t('nav.appearance')}
          </span>
        </div>

        {/* Switch Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-navy/60 border border-brand-cyan/25 text-brand-cyan">
          <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`glass-pill p-2 text-typography-bodyDark hover:text-brand-cyan hover:border-brand-cyan/50 transition-all ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="w-4 h-4 text-brand-cyan" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500" />
      )}
    </button>
  );
};
