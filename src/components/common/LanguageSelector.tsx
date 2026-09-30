import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { supportedLanguages } from '@/i18n';

export const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = supportedLanguages.find((l) => l.code === i18n.language) || supportedLanguages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      {/* Frosted Glass Pill Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="glass-pill px-3.5 py-1.5 flex items-center gap-2 text-xs font-semibold text-white/90 dark:text-white/90 light:text-[#0B1B4A] hover:border-brand-cyan/60 hover:shadow-[0_0_15px_rgba(18,184,255,0.3)] transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-3.5 h-3.5 text-brand-cyan" />
        <span className="tracking-wide">{currentLang.native}</span>
        <ChevronDown className={`w-3 h-3 text-brand-cyan/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 glass-card p-1.5 z-50 shadow-2xl border border-brand-cyan/30 animate-in fade-in zoom-in-95 duration-150">
          {supportedLanguages.map((lang) => {
            const isSelected = lang.code === currentLang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full text-left px-3 py-2 text-xs rounded-xl flex items-center justify-between font-medium transition-colors ${
                  isSelected
                    ? 'bg-brand-cyan/20 text-brand-cyan font-bold'
                    : 'text-typography-bodyDark hover:bg-white/10 dark:hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{lang.native}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-brand-cyan" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
