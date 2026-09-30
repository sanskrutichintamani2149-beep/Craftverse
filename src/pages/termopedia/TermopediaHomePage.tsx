import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  BookOpen,
  ArrowRight,
  Calculator,
  X,
  ExternalLink,
} from 'lucide-react';
import { financialTerms, financialCategories, FinancialTerm } from '@/data/termsData';

export const TermopediaHomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const lang = i18n.language;

  const filteredTerms = useMemo(() => {
    return financialTerms.filter((term) => {
      const matchesCategory =
        selectedCategory === 'All' || term.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        term.name.toLowerCase().includes(q) ||
        term.nameHi.toLowerCase().includes(q) ||
        term.nameMr.toLowerCase().includes(q) ||
        term.tagline.toLowerCase().includes(q) ||
        term.slug.toLowerCase().includes(q) ||
        term.simpleExplanation.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const getLocalizedName = (term: FinancialTerm) => {
    if (lang === 'hi') return term.nameHi;
    if (lang === 'mr') return term.nameMr;
    return term.name;
  };

  const getLocalizedTagline = (term: FinancialTerm) => {
    if (lang === 'hi') return term.taglineHi;
    if (lang === 'mr') return term.taglineMr;
    return term.tagline;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">
              Core Financial Hub
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('termopedia.title')}
          </h1>
          <p className="text-sm text-typography-bodyDark dark:text-[#A9BCD9] mt-1 max-w-2xl leading-relaxed">
            {t('termopedia.subtitle')}
          </p>
        </div>
      </div>

      {/* Prominent Search Bar & Category Tabs */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-cyan/70 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('termopedia.searchPlaceholder')}
            className="w-full py-4 pl-12 pr-12 glass-input text-sm text-white placeholder:text-typography-muted dark:placeholder:text-[#6579A1] shadow-lg"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-typography-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {financialCategories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all select-none ${
                  isSelected
                    ? 'btn-gradient text-white shadow-[0_0_15px_rgba(18,184,255,0.4)]'
                    : 'glass-card text-typography-bodyDark hover:text-white hover:border-brand-cyan/40'
                }`}
              >
                {category === 'All' ? t('termopedia.allCategories') : category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Terms Grid */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTerms.map((term) => (
            <div
              key={term.slug}
              onClick={() => navigate(`/term/${term.slug}`)}
              className="glass-card p-6 flex flex-col justify-between cursor-pointer group border border-brand-cyan/30 hover:border-brand-cyan hover:shadow-[0_12px_35px_rgba(18,184,255,0.22)] transition-all duration-200"
            >
              <div>
                {/* Header badge & icon */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-2xl select-none">{term.icon}</span>
                  <div className="flex items-center gap-2">
                    {term.hasCalculator && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-md border border-brand-teal/30">
                        <Calculator className="w-3 h-3" />
                        <span>Calculator</span>
                      </span>
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-md border border-brand-cyan/25">
                      {term.category}
                    </span>
                  </div>
                </div>

                {/* Term Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">
                  {getLocalizedName(term)}
                </h3>

                {/* Concise Tagline */}
                <p className="text-xs text-typography-bodyDark dark:text-[#A0B4D8] mt-2 line-clamp-3 leading-relaxed">
                  {getLocalizedTagline(term)}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="mt-6 pt-4 border-t border-brand-cyan/15 flex items-center justify-between text-xs font-bold text-brand-cyan group-hover:text-brand-teal">
                <span>View Full Lesson</span>
                <div className="w-6 h-6 rounded-full border border-brand-cyan/30 flex items-center justify-center group-hover:bg-brand-cyan group-hover:text-brand-dark group-hover:border-transparent transition-all">
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-card p-12 text-center space-y-4 max-w-lg mx-auto border border-brand-cyan/25">
          <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto text-brand-cyan">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">{t('termopedia.noResults')}</h3>
          <p className="text-xs text-typography-muted">
            Try searching for terms like <strong>GST</strong>, <strong>TDS</strong>, <strong>CTC</strong>, <strong>SIP</strong>, or <strong>Compounding</strong>.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl btn-gradient text-xs font-semibold text-white"
          >
            {t('termopedia.clearSearch')}
          </button>
        </div>
      )}
    </div>
  );
};
