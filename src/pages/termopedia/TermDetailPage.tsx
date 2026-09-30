import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Youtube,
  Search,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Sparkles,
  Bot,
  ExternalLink,
} from 'lucide-react';
import { financialTerms } from '@/data/termsData';
import { TermCalculator } from '@/components/termopedia/TermCalculator';

export const TermDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const term = financialTerms.find((t) => t.slug === slug);

  if (!term) {
    return (
      <div className="glass-card p-12 text-center space-y-4 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-white">Term Not Found</h2>
        <p className="text-sm text-typography-muted">
          The requested financial term does not exist in the Term-O-Pedia dictionary.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 btn-gradient px-4 py-2.5 rounded-xl text-xs font-semibold text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('termopedia.backToTerms')}</span>
        </Link>
      </div>
    );
  }

  const lang = i18n.language;

  const termName = lang === 'hi' ? term.nameHi : lang === 'mr' ? term.nameMr : term.name;
  const termTagline = lang === 'hi' ? term.taglineHi : lang === 'mr' ? term.taglineMr : term.tagline;
  const simpleExpl =
    lang === 'hi'
      ? term.simpleExplanationHi
      : lang === 'mr'
      ? term.simpleExplanationMr
      : term.simpleExplanation;

  const exampleScenario =
    lang === 'hi'
      ? term.example.scenarioHi
      : lang === 'mr'
      ? term.example.scenarioMr
      : term.example.scenario;

  const rememberText =
    lang === 'hi' ? term.rememberThisHi : lang === 'mr' ? term.rememberThisMr : term.rememberThis;

  const mistakeText =
    lang === 'hi' ? term.commonMistakeHi : lang === 'mr' ? term.commonMistakeMr : term.commonMistake;

  const mythText =
    lang === 'hi'
      ? term.mythVsReality.mythHi
      : lang === 'mr'
      ? term.mythVsReality.mythMr
      : term.mythVsReality.myth;

  const realityText =
    lang === 'hi'
      ? term.mythVsReality.realityHi
      : lang === 'mr'
      ? term.mythVsReality.realityMr
      : term.mythVsReality.reality;

  const relatedTerms = financialTerms.filter((item) =>
    term.relatedSlugs?.includes(item.slug)
  );

  const handleTriggerMentor = () => {
    const event = new CustomEvent('open-ai-mentor', {
      detail: {
        prompt: `Explain the concept of ${term.name} in simple terms with an example relevant to young earners in India.`,
      },
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Top Breadcrumb link: exact reference behavior */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-cyan hover:text-brand-teal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('termopedia.backToTerms')}</span>
        </Link>
      </div>

      {/* Main Term Header Card */}
      <div className="glass-card p-6 md:p-8 border border-brand-cyan/40">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl select-none">{term.icon}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan bg-brand-cyan/15 px-3 py-1 rounded-full border border-brand-cyan/30">
                {term.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {termName}
            </h1>
            <p className="text-base text-brand-cyan/90 dark:text-[#A9BCD9] mt-2 font-medium max-w-2xl leading-relaxed">
              {termTagline}
            </p>
          </div>

          {/* Ask AI Mentor CTA */}
          <button
            type="button"
            onClick={handleTriggerMentor}
            className="self-start px-4 py-2.5 rounded-xl glass-card border border-brand-cyan/40 text-brand-cyan hover:border-brand-teal hover:text-brand-teal text-xs font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(18,184,255,0.2)]"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI Mentor about {term.slug.toUpperCase()}</span>
          </button>
        </div>
      </div>

      {/* YouTube Video Section: Directly playable YouTube embed */}
      <div className="glass-card p-6 md:p-8 border border-brand-cyan/35 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <Youtube className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">
              Visual Explanation
            </h3>
          </div>

          {/* Learn More Option: leads to additional YouTube search */}
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(term.learnMoreQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:text-brand-teal transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t('termopedia.moreVideos')}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Video Embed */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-brand-cyan/30 shadow-2xl bg-black/60">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${term.youtubeVideoId}?rel=0&modestbranding=1`}
            title={`${term.name} Explanation`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>

      {/* Simple Beginner-Friendly Explanation */}
      <div className="glass-card p-6 md:p-8 space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-brand-teal" />
          <span>Core Concept Explained</span>
        </h3>
        <p className="text-sm md:text-base text-typography-bodyDark dark:text-[#CBD8F1] leading-relaxed">
          {simpleExpl}
        </p>
      </div>

      {/* Real-World / Numerical Example (labeled as editorial example) */}
      <div className="glass-tile p-6 border-l-4 border-l-brand-teal border border-brand-cyan/25 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-teal bg-brand-teal/10 px-2.5 py-1 rounded-md border border-brand-teal/30">
            {t('termopedia.editorialNote')}
          </span>
          <span className="text-xs text-typography-muted">Real-World Case Study</span>
        </div>
        <p className="text-sm font-medium text-white leading-relaxed">
          {exampleScenario}
        </p>
        <div className="p-3.5 rounded-xl bg-brand-dark/60 border border-brand-cyan/20 text-xs font-mono text-brand-cyan">
          {term.example.math}
        </div>
      </div>

      {/* 3-Column Learning Pillars: Remember This, Common Mistake, Myth vs Reality */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Remember This */}
        <div className="glass-card p-5 border border-brand-cyan/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-brand-cyan mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">{t('termopedia.rememberThis')}</h4>
            </div>
            <p className="text-xs text-typography-bodyDark dark:text-[#A9BCD9] leading-relaxed">
              {rememberText}
            </p>
          </div>
        </div>

        {/* Common Mistake */}
        <div className="glass-card p-5 border border-amber-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-3">
              <AlertTriangle className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">{t('termopedia.commonMistake')}</h4>
            </div>
            <p className="text-xs text-typography-bodyDark dark:text-[#A9BCD9] leading-relaxed">
              {mistakeText}
            </p>
          </div>
        </div>

        {/* Myth vs Reality */}
        <div className="glass-card p-5 border border-brand-teal/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-brand-teal mb-3">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">{t('termopedia.mythVsReality')}</h4>
            </div>
            <div className="space-y-2 text-xs">
              <p className="text-red-400">
                <strong className="block text-[10px] uppercase font-bold text-red-400/80">Myth:</strong>
                {mythText}
              </p>
              <p className="text-emerald-400 pt-1 border-t border-white/5">
                <strong className="block text-[10px] uppercase font-bold text-emerald-400/80">Reality:</strong>
                {realityText}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Interactive Calculator if applicable */}
      {term.hasCalculator && term.calculatorType && (
        <TermCalculator
          type={term.calculatorType}
          termSlug={term.slug}
          termName={term.name}
        />
      )}

      {/* Related Concepts */}
      {relatedTerms.length > 0 && (
        <div className="glass-card p-6 border border-brand-cyan/25 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            {t('termopedia.relatedConcepts')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedTerms.map((rel) => (
              <button
                key={rel.slug}
                onClick={() => navigate(`/term/${rel.slug}`)}
                className="text-left p-3.5 rounded-xl glass-tile hover:border-brand-cyan flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span>{rel.icon}</span>
                  <span className="text-xs font-bold text-white group-hover:text-brand-cyan truncate">
                    {rel.name}
                  </span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180 text-brand-cyan/70 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
