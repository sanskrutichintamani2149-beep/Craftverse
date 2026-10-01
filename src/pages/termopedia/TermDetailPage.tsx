import React, { useState } from 'react';
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
  BookOpen,
  RotateCw,
  HelpCircle,
  Check,
  X,
  Clock,
  Award,
} from 'lucide-react';
import { financialTerms } from '@/data/termsData';
import { TermCalculator } from '@/components/termopedia/TermCalculator';

export const TermDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Interactive Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  // Term Flashcards flip state
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCardFlip = (index: number) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const term = financialTerms.find((t) => t.slug === slug);

  if (!term) {
    return (
      <div className="glass-card p-12 text-center space-y-4 max-w-lg mx-auto border border-brand-cyan/25">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Term Not Found</h2>
        <p className="text-sm text-slate-600 dark:text-typography-muted">
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

  const deepDiveText =
    lang === 'hi' ? term.deepDiveHi : lang === 'mr' ? term.deepDiveMr : term.deepDive;

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

  const readTime =
    lang === 'hi' ? term.readTimeHi : lang === 'mr' ? term.readTimeMr : term.readTime;

  // Quiz localization
  const quiz = term.quiz;
  const quizQuestion =
    lang === 'hi' ? quiz.questionHi : lang === 'mr' ? quiz.questionMr : quiz.question;
  const quizOptions =
    lang === 'hi' ? quiz.optionsHi : lang === 'mr' ? quiz.optionsMr : quiz.options;
  const quizExplanation =
    lang === 'hi' ? quiz.explanationHi : lang === 'mr' ? quiz.explanationMr : quiz.explanation;

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

  const handleSelectQuizOption = (index: number) => {
    setSelectedQuizOption(index);
    setIsQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedQuizOption(null);
    setIsQuizSubmitted(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* 1. Top Breadcrumb link: exact reference behavior */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue dark:text-brand-cyan hover:text-brand-teal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('termopedia.backToTerms')}</span>
        </Link>
      </div>

      {/* 2. Main Term Header Card */}
      <div className="glass-card p-6 md:p-8 border border-brand-blue/20 dark:border-brand-cyan/40">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-3xl select-none">{term.icon}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-cyan bg-brand-cyan/15 px-3 py-1 rounded-full border border-brand-cyan/30">
                {term.category}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 bg-slate-200/70 dark:bg-white/10 px-3 py-1 rounded-full">
                {term.difficulty}
              </span>
              <div className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-typography-muted ml-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{readTime}</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {termName}
            </h1>
            <p className="text-base text-brand-blue dark:text-brand-cyan/90 font-medium max-w-2xl leading-relaxed">
              {termTagline}
            </p>
          </div>

          {/* Ask AI Mentor CTA */}
          <button
            type="button"
            onClick={handleTriggerMentor}
            className="self-start px-4 py-2.5 rounded-xl glass-card border border-brand-blue/30 dark:border-brand-cyan/40 text-brand-blue dark:text-brand-cyan hover:border-brand-teal hover:text-brand-teal text-xs font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(18,184,255,0.2)] shrink-0"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI Mentor about {term.slug.toUpperCase()}</span>
          </button>
        </div>
      </div>

      {/* 3. YouTube Video Section: Directly playable YouTube embed */}
      <div className="glass-card p-6 md:p-8 border border-brand-blue/20 dark:border-brand-cyan/35 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-500 flex items-center justify-center border border-red-500/30">
              <Youtube className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {lang === 'hi' ? 'वीडियो व्याख्या' : lang === 'mr' ? 'व्हिडिओ स्पष्टीकरण' : 'Visual Video Explanation'}
            </h3>
          </div>

          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(term.learnMoreQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue dark:text-brand-cyan hover:text-brand-teal transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t('termopedia.moreVideos')}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Video Embed */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-300 dark:border-brand-cyan/30 shadow-2xl bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${term.youtubeVideoId}?rel=0&modestbranding=1`}
            title={`${term.name} Explanation`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>

      {/* 4. Core Concept Plain-Language Explanation */}
      <div className="glass-card p-6 md:p-8 space-y-3 border border-slate-200 dark:border-brand-cyan/20">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-brand-teal" />
          <span>{lang === 'hi' ? 'मूल अवधारणा का सार' : lang === 'mr' ? 'संकल्पनेचा मूळ गाभा' : 'Core Concept Explained'}</span>
        </h3>
        <p className="text-sm md:text-base text-slate-700 dark:text-[#CBD8F1] leading-relaxed">
          {simpleExpl}
        </p>
      </div>

      {/* 5. Deep-Dive Section */}
      <div className="glass-card p-6 md:p-8 space-y-3 border border-slate-200 dark:border-brand-cyan/20">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-blue dark:text-brand-cyan" />
          <span>{lang === 'hi' ? 'विस्तृत तकनीकी विश्लेषण' : lang === 'mr' ? 'सखोल तांत्रिक विश्लेषण' : 'In-Depth Regulatory & Market Mechanics'}</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-[#A9BCD9] leading-relaxed">
          {deepDiveText}
        </p>
      </div>

      {/* 6. Real-World / Numerical Example (labeled as editorial example) */}
      <div className="glass-tile p-6 border-l-4 border-l-brand-teal border border-brand-blue/20 dark:border-brand-cyan/25 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-teal bg-brand-teal/10 px-2.5 py-1 rounded-md border border-brand-teal/30">
            {t('termopedia.editorialNote')}
          </span>
          <span className="text-xs text-slate-500 dark:text-typography-muted">
            {lang === 'hi' ? 'वास्तविक केस स्टडी' : lang === 'mr' ? 'वास्तविक उदाहरण' : 'Real-World Worked Example'}
          </span>
        </div>
        <p className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
          {exampleScenario}
        </p>
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-brand-dark/70 border border-slate-300 dark:border-brand-cyan/25 text-xs font-mono text-brand-blue dark:text-brand-cyan font-semibold">
          {term.example.math}
        </div>
      </div>

      {/* 7. 3-Column Learning Pillars: Remember This, Common Mistake, Myth vs Reality */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Remember This */}
        <div className="glass-card p-5 border border-brand-blue/25 dark:border-brand-cyan/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-brand-blue dark:text-brand-cyan mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">{t('termopedia.rememberThis')}</h4>
            </div>
            <p className="text-xs text-slate-700 dark:text-[#A9BCD9] leading-relaxed">
              {rememberText}
            </p>
          </div>
        </div>

        {/* Common Mistake */}
        <div className="glass-card p-5 border border-amber-500/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 mb-3">
              <AlertTriangle className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">{t('termopedia.commonMistake')}</h4>
            </div>
            <p className="text-xs text-slate-700 dark:text-[#A9BCD9] leading-relaxed">
              {mistakeText}
            </p>
          </div>
        </div>

        {/* Myth vs Reality */}
        <div className="glass-card p-5 border border-brand-teal/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-brand-teal mb-3">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">{t('termopedia.mythVsReality')}</h4>
            </div>
            <div className="space-y-2 text-xs">
              <p className="text-red-600 dark:text-red-400">
                <strong className="block text-[10px] uppercase font-bold text-red-600/90 dark:text-red-400/80">Myth:</strong>
                {mythText}
              </p>
              <p className="text-emerald-700 dark:text-emerald-400 pt-1 border-t border-slate-200 dark:border-white/5">
                <strong className="block text-[10px] uppercase font-bold text-emerald-700/90 dark:text-emerald-400/80">Reality:</strong>
                {realityText}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Term Flashcards Section with Flip Interaction */}
      {term.flashcards && term.flashcards.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-brand-blue dark:text-brand-cyan" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {lang === 'hi' ? `${termName} के फ्लैशकार्ड्स` : lang === 'mr' ? `${termName} चे फ्लॅशकार्ड्स` : `Interactive Flashcards for ${term.name}`}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {term.flashcards.map((fc, idx) => {
              const flipped = !!flippedCards[idx];
              const frontText = lang === 'hi' ? fc.frontHi : lang === 'mr' ? fc.frontMr : fc.front;
              const backText = lang === 'hi' ? fc.backHi : lang === 'mr' ? fc.backMr : fc.back;

              return (
                <div
                  key={idx}
                  onClick={() => toggleCardFlip(idx)}
                  className={`min-h-[160px] p-5 rounded-2xl cursor-pointer border transition-all duration-300 flex flex-col justify-between select-none ${
                    flipped
                      ? 'bg-gradient-to-br from-brand-blue/20 via-brand-cyan/15 to-brand-teal/15 border-brand-cyan shadow-[0_4px_20px_rgba(18,184,255,0.2)]'
                      : 'glass-tile border-brand-blue/15 dark:border-brand-cyan/25 hover:border-brand-cyan'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-brand-blue dark:text-brand-cyan uppercase tracking-wider">
                      Card 0{idx + 1}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <RotateCw className="w-3 h-3" />
                      {flipped
                        ? lang === 'hi' ? 'प्रश्न देखें' : lang === 'mr' ? 'प्रश्न पहा' : 'Show Question'
                        : lang === 'hi' ? 'उत्तर देखें' : lang === 'mr' ? 'उत्तर पहा' : 'Reveal Answer'}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white my-3 leading-relaxed">
                    {flipped ? backText : frontText}
                  </p>

                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-typography-muted">
                    {flipped
                      ? lang === 'hi' ? 'मुख्य उत्तर' : lang === 'mr' ? 'उत्तर' : 'Answer'
                      : lang === 'hi' ? 'अवधारणा प्रश्न' : lang === 'mr' ? 'प्रश्न' : 'Question'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 9. Quick Quiz Section with Instant Answer Validation */}
      {quiz && (
        <div className="glass-card p-6 md:p-8 border border-brand-blue/25 dark:border-brand-cyan/35 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brand-blue dark:text-brand-teal" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {lang === 'hi' ? 'त्वरित समझ जांच (Quick Quiz)' : lang === 'mr' ? 'झटपट चाचणी (Quick Quiz)' : 'Quick Comprehension Quiz'}
              </h3>
            </div>
            {isQuizSubmitted && (
              <button
                type="button"
                onClick={handleResetQuiz}
                className="text-xs font-bold text-brand-blue dark:text-brand-cyan hover:underline"
              >
                {lang === 'hi' ? 'दोबारा प्रयास करें' : lang === 'mr' ? 'पुन्हा सोडवा' : 'Try Again'}
              </button>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {quizQuestion}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quizOptions.map((opt, oIndex) => {
                const isSelected = selectedQuizOption === oIndex;
                const isCorrect = oIndex === quiz.correctIndex;

                let btnStyle = 'glass-tile text-slate-800 dark:text-slate-200 border-slate-300 dark:border-brand-cyan/25 hover:border-brand-cyan';
                if (isQuizSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-red-500/20 text-red-800 dark:text-red-300 border-red-500 font-bold';
                  } else {
                    btnStyle = 'opacity-50 glass-card border-transparent text-slate-500 dark:text-slate-400';
                  }
                }

                return (
                  <button
                    key={oIndex}
                    type="button"
                    onClick={() => !isQuizSubmitted && handleSelectQuizOption(oIndex)}
                    disabled={isQuizSubmitted}
                    className={`p-3.5 rounded-xl text-xs text-left font-medium transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isQuizSubmitted && isCorrect && (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                    {isQuizSubmitted && isSelected && !isCorrect && (
                      <X className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answering */}
            {isQuizSubmitted && (
              <div className="p-4 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-xs text-slate-800 dark:text-slate-200 space-y-1 animate-in fade-in duration-200">
                <span className="font-bold text-brand-blue dark:text-brand-cyan block uppercase tracking-wider text-[11px]">
                  {selectedQuizOption === quiz.correctIndex
                    ? lang === 'hi' ? '✅ सही उत्तर!' : lang === 'mr' ? '✅ बरोबर उत्तर!' : '✅ Correct!'
                    : lang === 'hi' ? '❌ गलत उत्तर - सही व्याख्या पढ़ें:' : lang === 'mr' ? '❌ चूक - योग्य स्पष्टीकरण वाचा:' : '❌ Incorrect - Review Explanation:'}
                </span>
                <p className="leading-relaxed">{quizExplanation}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 10. Embedded Interactive Calculator if applicable */}
      {term.hasCalculator && term.calculatorType && (
        <TermCalculator
          type={term.calculatorType}
          termSlug={term.slug}
          termName={term.name}
        />
      )}

      {/* 11. Related Concepts Strip */}
      {relatedTerms.length > 0 && (
        <div className="glass-card p-6 border border-slate-200 dark:border-brand-cyan/25 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            {t('termopedia.relatedConcepts')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedTerms.map((rel) => (
              <button
                key={rel.slug}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate(`/term/${rel.slug}`);
                }}
                className="text-left p-3.5 rounded-xl glass-tile hover:border-brand-cyan flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span>{rel.icon}</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-cyan truncate">
                    {lang === 'hi' ? rel.nameHi : lang === 'mr' ? rel.nameMr : rel.name}
                  </span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180 text-brand-blue dark:text-brand-cyan/70 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
