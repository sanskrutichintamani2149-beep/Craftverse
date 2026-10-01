import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Compass,
  ArrowRight,
  BookOpen,
  Clock,
  Sparkles,
  Layers,
} from 'lucide-react';
import { professionTracks, financialTerms } from '@/data/termsData';

export const TrackDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const track = professionTracks.find((tr) => tr.slug === slug);

  if (!track) {
    return (
      <div className="glass-card p-12 text-center space-y-4 max-w-lg mx-auto border border-brand-cyan/25">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Track Not Found</h2>
        <p className="text-sm text-slate-600 dark:text-typography-muted">
          The requested profession track does not exist.
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

  const trackTitle = lang === 'hi' ? track.titleHi : lang === 'mr' ? track.titleMr : track.title;
  const trackTagline = lang === 'hi' ? track.taglineHi : lang === 'mr' ? track.taglineMr : track.tagline;
  const trackDesc = lang === 'hi' ? track.descriptionHi : lang === 'mr' ? track.descriptionMr : track.description;
  const trackBadge = lang === 'hi' ? track.badgeHi : lang === 'mr' ? track.badgeMr : track.badge;

  // Ordered roadmap terms
  const roadmapTerms = track.terms
    .map((termSlug) => financialTerms.find((ft) => ft.slug === termSlug))
    .filter(Boolean);

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Top Breadcrumb link */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue dark:text-brand-cyan hover:text-brand-teal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('termopedia.backToTerms')}</span>
        </Link>
      </div>

      {/* Track Hero Banner */}
      <div className="glass-card p-6 md:p-10 border border-brand-blue/20 dark:border-brand-cyan/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="text-4xl select-none">{track.icon}</span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue dark:text-brand-cyan bg-brand-cyan/15 px-3 py-1 rounded-full border border-brand-cyan/30">
                {trackBadge}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {trackTitle}
            </h1>
            <p className="text-base font-semibold text-brand-blue dark:text-brand-cyan">
              {trackTagline}
            </p>
            <p className="text-sm text-slate-700 dark:text-[#A9BCD9] leading-relaxed">
              {trackDesc}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/25 shrink-0 flex md:flex-col items-center justify-center gap-2 text-center">
            <Layers className="w-6 h-6 text-brand-blue dark:text-brand-cyan" />
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{roadmapTerms.length}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-typography-muted">
                Roadmap Lessons
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ordered Learning Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-blue dark:text-brand-teal" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === 'hi' ? 'सीखने का क्रमवार रोडमैप' : lang === 'mr' ? 'क्रमवार शिकण्याचा रोडमॅप' : 'Structured Learning Roadmap'}
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-typography-muted">
            {lang === 'hi' ? 'चरण-दर-चरण महारत' : lang === 'mr' ? 'टप्प्याटप्प्याने अभ्यास' : 'Step-by-step Mastery'}
          </span>
        </div>

        <div className="space-y-3.5">
          {roadmapTerms.map((term, index) => {
            if (!term) return null;
            const termName = lang === 'hi' ? term.nameHi : lang === 'mr' ? term.nameMr : term.name;
            const termTagline = lang === 'hi' ? term.taglineHi : lang === 'mr' ? term.taglineMr : term.tagline;
            const termReadTime = lang === 'hi' ? term.readTimeHi : lang === 'mr' ? term.readTimeMr : term.readTime;

            return (
              <div
                key={term.slug}
                onClick={() => navigate(`/term/${term.slug}`)}
                className="glass-card p-5 md:p-6 border border-brand-blue/15 dark:border-brand-cyan/30 hover:border-brand-cyan hover:shadow-[0_8px_30px_rgba(18,184,255,0.2)] transition-all duration-200 cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  {/* Step Number Badge */}
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-blue dark:text-brand-cyan font-black text-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xl select-none">{term.icon}</span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-cyan transition-colors">
                        {termName}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue dark:text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/20">
                        {term.category}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 bg-slate-200/60 dark:bg-white/10 px-2 py-0.5 rounded">
                        {term.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-[#A9BCD9] leading-relaxed line-clamp-2 max-w-2xl">
                      {termTagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-typography-muted">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{termReadTime}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-brand-blue/30 dark:border-brand-cyan/40 flex items-center justify-center text-brand-blue dark:text-brand-cyan group-hover:bg-brand-cyan group-hover:text-brand-dark group-hover:border-transparent transition-all">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Other tracks switcher strip */}
      <div className="glass-card p-6 border border-slate-200 dark:border-brand-cyan/20 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-teal" />
          <span>{lang === 'hi' ? 'अन्य करियर व प्रोफेशन ट्रैक' : lang === 'mr' ? 'इतर करिअर व प्रोफेशन ट्रॅक' : 'Explore Other Profession Tracks'}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {professionTracks
            .filter((t) => t.slug !== track.slug)
            .map((other) => {
              const oTitle = lang === 'hi' ? other.titleHi : lang === 'mr' ? other.titleMr : other.title;
              return (
                <button
                  key={other.slug}
                  onClick={() => navigate(`/track/${other.slug}`)}
                  className="text-left p-3.5 rounded-xl glass-tile hover:border-brand-cyan flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-lg">{other.icon}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-cyan truncate">
                      {oTitle}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-cyan group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};
