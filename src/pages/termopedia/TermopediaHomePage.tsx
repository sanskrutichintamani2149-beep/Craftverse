import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  BookOpen,
  ArrowRight,
  Calculator,
  X,
  Compass,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Video,
  Clock,
  Layers,
  GraduationCap,
  Sliders,
  Activity,
} from 'lucide-react';
import {
  financialTerms,
  financialCategories,
  professionTracks,
  FinancialTerm,
} from '@/data/termsData';

export const TermopediaHomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const lang = i18n.language;

  // Aggregate curated flashcards across all terms for the Quick Flashcards carousel
  const allFlashcards = useMemo(() => {
    const list: Array<{
      termSlug: string;
      termName: string;
      termNameHi: string;
      termNameMr: string;
      front: string;
      back: string;
      frontHi: string;
      backHi: string;
      frontMr: string;
      backMr: string;
    }> = [];
    financialTerms.forEach((term) => {
      term.flashcards.forEach((fc) => {
        list.push({
          termSlug: term.slug,
          termName: term.name,
          termNameHi: term.nameHi,
          termNameMr: term.nameMr,
          front: fc.front,
          back: fc.back,
          frontHi: fc.frontHi,
          backHi: fc.backHi,
          frontMr: fc.frontMr,
          backMr: fc.backMr,
        });
      });
    });
    return list;
  }, []);

  const currentFlashcard = allFlashcards[flashcardIndex] || allFlashcards[0];

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % allFlashcards.length);
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + allFlashcards.length) % allFlashcards.length);
  };

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
        term.taglineHi.toLowerCase().includes(q) ||
        term.taglineMr.toLowerCase().includes(q) ||
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
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* 1. Hero Section: Exact Reference Parity */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-blue dark:text-brand-cyan bg-brand-cyan/15 px-3 py-1 rounded-full border border-brand-cyan/30">
            {lang === 'hi' ? 'वित्तीय ज्ञानकोष • टर्म-ओ-पीडिया' : lang === 'mr' ? 'आर्थिक शब्दकोश • टर्म-ओ-पीडिया' : 'The Definitive Indian Financial Glossary'}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {t('termopedia.title')}{' '}
          <span className="text-gradient">
            {lang === 'hi' ? 'आसान भाषा में' : lang === 'mr' ? 'सोप्या भाषेत' : 'Explained Simply'}
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-[#A9BCD9] leading-relaxed max-w-2xl mx-auto font-medium">
          {t('termopedia.subtitle')}
        </p>
      </div>

      {/* 2. Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="glass-card p-4 text-center border border-brand-blue/15 dark:border-brand-cyan/25">
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{financialTerms.length}</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-typography-muted mt-1">
            {lang === 'hi' ? 'वित्तीय संकल्पनाएं' : lang === 'mr' ? 'आर्थिक संकल्पना' : 'Financial Terms'}
          </div>
        </div>
        <div className="glass-card p-4 text-center border border-brand-blue/15 dark:border-brand-cyan/25">
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{professionTracks.length}</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-typography-muted mt-1">
            {lang === 'hi' ? 'करियर रोडमैप' : lang === 'mr' ? 'करिअर रोडमॅप' : 'Career Tracks'}
          </div>
        </div>
        <div className="glass-card p-4 text-center border border-brand-blue/15 dark:border-brand-cyan/25">
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">100%</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-typography-muted mt-1">
            {lang === 'hi' ? 'वीडियो व्याख्या' : lang === 'mr' ? 'व्हिडिओ स्पष्टीकरण' : 'Video Explainers'}
          </div>
        </div>
        <div className="glass-card p-4 text-center border border-brand-blue/15 dark:border-brand-cyan/25">
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{allFlashcards.length}</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-typography-muted mt-1">
            {lang === 'hi' ? 'इंटरैक्टिव फ्लैशकार्ड्स' : lang === 'mr' ? 'स्मरण फ्लॅशकार्ड्स' : 'Interactive Cards'}
          </div>
        </div>
      </div>

      {/* 3. Quick Flashcards Section with Flip Interaction and Pager */}
      {currentFlashcard && (
        <div className="glass-card p-6 md:p-8 max-w-3xl mx-auto border border-brand-blue/20 dark:border-brand-cyan/35 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-blue dark:text-brand-teal" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {lang === 'hi' ? 'त्वरित वित्तीय फ्लैशकार्ड' : lang === 'mr' ? 'झटपट आर्थिक फ्लॅशकार्ड' : 'Quick Financial Flashcards'}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-typography-muted">
              <span>
                {flashcardIndex + 1} / {allFlashcards.length}
              </span>
            </div>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`min-h-[180px] p-6 rounded-2xl cursor-pointer border transition-all duration-300 flex flex-col justify-between select-none ${
              isFlipped
                ? 'bg-gradient-to-br from-brand-blue/25 via-brand-cyan/20 to-brand-teal/20 border-brand-cyan shadow-[0_8px_30px_rgba(18,184,255,0.25)]'
                : 'glass-tile border-brand-blue/20 dark:border-brand-cyan/30 hover:border-brand-cyan'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-brand-blue dark:text-brand-cyan uppercase tracking-wider">
                {lang === 'hi'
                  ? currentFlashcard.termNameHi
                  : lang === 'mr'
                  ? currentFlashcard.termNameMr
                  : currentFlashcard.termName}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                <RotateCw className="w-3 h-3" />
                {isFlipped
                  ? lang === 'hi' ? 'प्रश्न देखने के लिए क्लिक करें' : lang === 'mr' ? 'प्रश्न पाहण्यासाठी क्लिक करा' : 'Click to see Question'
                  : lang === 'hi' ? 'उत्तर जानने के लिए क्लिक करें' : lang === 'mr' ? 'उत्तर पाहण्यासाठी क्लिक करा' : 'Click to Reveal Answer'}
              </span>
            </div>

            <div className="py-4">
              <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
                {isFlipped
                  ? lang === 'hi'
                    ? currentFlashcard.backHi
                    : lang === 'mr'
                    ? currentFlashcard.backMr
                    : currentFlashcard.back
                  : lang === 'hi'
                  ? currentFlashcard.frontHi
                  : lang === 'mr'
                  ? currentFlashcard.frontMr
                  : currentFlashcard.front}
              </p>
            </div>

            <div className="text-[11px] font-bold text-slate-500 dark:text-typography-muted uppercase tracking-wider">
              {isFlipped
                ? lang === 'hi' ? 'मुख्य उत्तर' : lang === 'mr' ? 'महत्त्वाचे उत्तर' : 'Answer Key'
                : lang === 'hi' ? 'अवधारणा प्रश्न' : lang === 'mr' ? 'संकल्पना प्रश्न' : 'Concept Question'}
            </div>
          </div>

          {/* Flashcard Prev/Next controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handlePrevFlashcard}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-card text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-brand-cyan transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{lang === 'hi' ? 'पिछला कार्ड' : lang === 'mr' ? 'मागील कार्ड' : 'Previous'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(`/term/${currentFlashcard.termSlug}`)}
              className="text-xs font-bold text-brand-blue dark:text-brand-cyan hover:underline"
            >
              {lang === 'hi' ? 'पूरा पाठ पढ़ें' : lang === 'mr' ? 'संपूर्ण धडा वाचा' : 'Read Full Term'}
            </button>

            <button
              type="button"
              onClick={handleNextFlashcard}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-card text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-brand-cyan transition-all"
            >
              <span>{lang === 'hi' ? 'अगला कार्ड' : lang === 'mr' ? 'पुढील कार्ड' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. Profession Tracks Section: Exact Reference Parity */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2">
            <Compass className="w-4 h-4 text-brand-blue dark:text-brand-cyan" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue dark:text-brand-cyan">
              {lang === 'hi' ? 'करियर अनुसार अध्ययन' : lang === 'mr' ? 'करिअरनुसार अभ्यास' : 'Tailored Learning'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'अपना प्रोफेशन ट्रैक चुनें' : lang === 'mr' ? 'तुमचा प्रोफेशन ट्रॅक निवडा' : 'Pick Your Profession Track'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-typography-muted">
            {lang === 'hi'
              ? 'आपकी वर्तमान आजीविका और वित्तीय प्राथमिकताओं के अनुसार तैयार किया गया संरचित रोडमैप।'
              : lang === 'mr'
              ? 'तुमच्या चालू उत्पन्नाच्या स्वरूपावर आधारित खास तयार केलेला मार्गदर्शन मार्ग.'
              : 'Structured roadmaps designed specifically for your current career stage and income model.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {professionTracks.map((track) => {
            const trTitle = lang === 'hi' ? track.titleHi : lang === 'mr' ? track.titleMr : track.title;
            const trTagline = lang === 'hi' ? track.taglineHi : lang === 'mr' ? track.taglineMr : track.tagline;
            const trBadge = lang === 'hi' ? track.badgeHi : lang === 'mr' ? track.badgeMr : track.badge;

            return (
              <div
                key={track.slug}
                onClick={() => navigate(`/track/${track.slug}`)}
                className="glass-card p-6 flex flex-col justify-between cursor-pointer group border border-brand-blue/15 dark:border-brand-cyan/25 hover:border-brand-cyan hover:shadow-[0_12px_35px_rgba(18,184,255,0.22)] transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-3xl select-none">{track.icon}</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-blue dark:text-brand-cyan bg-brand-cyan/15 px-2.5 py-0.5 rounded-full border border-brand-cyan/30">
                      {trBadge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-cyan transition-colors">
                    {trTitle}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-[#A0B4D8] leading-relaxed line-clamp-3">
                    {trTagline}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-brand-cyan/15 flex items-center justify-between text-xs font-bold text-brand-blue dark:text-brand-cyan group-hover:text-brand-teal">
                  <span>{track.terms.length} {lang === 'hi' ? 'मुख्य पाठ' : lang === 'mr' ? 'महत्त्वाचे धडे' : 'Core Lessons'}</span>
                  <div className="w-6 h-6 rounded-full border border-brand-cyan/30 flex items-center justify-center group-hover:bg-brand-cyan group-hover:text-brand-dark group-hover:border-transparent transition-all">
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Browse the Financial Dictionary */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-brand-blue dark:text-brand-cyan" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue dark:text-brand-cyan">
                {lang === 'hi' ? 'संपूर्ण वित्तीय शब्दकोश' : lang === 'mr' ? 'संपूर्ण आर्थिक शब्दकोश' : 'Browse Financial Dictionary'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {lang === 'hi' ? 'सभी वित्तीय शब्द' : lang === 'mr' ? 'सर्व आर्थिक संकल्पना' : 'Explore All Financial Terms'}
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-600 dark:text-typography-muted">
            {filteredTerms.length} {lang === 'hi' ? 'शब्द उपलब्ध' : lang === 'mr' ? 'संकल्पना उपलब्ध' : 'terms listed'}
          </span>
        </div>

        {/* Live Search & Category Tabs */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-brand-cyan/70 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('termopedia.searchPlaceholder')}
              className="w-full py-4 pl-12 pr-12 glass-input text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#6579A1] shadow-lg"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
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
                      : 'glass-card text-slate-700 dark:text-typography-bodyDark hover:text-slate-900 dark:hover:text-white hover:border-brand-cyan/40'
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
                className="glass-card p-6 flex flex-col justify-between cursor-pointer group border border-brand-blue/15 dark:border-brand-cyan/30 hover:border-brand-cyan hover:shadow-[0_12px_35px_rgba(18,184,255,0.22)] transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-2xl select-none">{term.icon}</span>
                    <div className="flex items-center gap-2">
                      {term.hasCalculator && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-md border border-brand-teal/30">
                          <Calculator className="w-3 h-3" />
                          <span>Calculator</span>
                        </span>
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue dark:text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-md border border-brand-cyan/25">
                        {term.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-cyan transition-colors">
                    {getLocalizedName(term)}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-[#A0B4D8] mt-2 line-clamp-3 leading-relaxed">
                    {getLocalizedTagline(term)}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-brand-cyan/15 flex items-center justify-between text-xs font-bold text-brand-blue dark:text-brand-cyan group-hover:text-brand-teal">
                  <div className="flex items-center gap-1 text-slate-500 dark:text-typography-muted font-normal text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{lang === 'hi' ? term.readTimeHi : lang === 'mr' ? term.readTimeMr : term.readTime}</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-brand-cyan/30 flex items-center justify-center group-hover:bg-brand-cyan group-hover:text-brand-dark group-hover:border-transparent transition-all">
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center space-y-4 max-w-lg mx-auto border border-brand-blue/20 dark:border-brand-cyan/25">
            <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto text-brand-blue dark:text-brand-cyan">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('termopedia.noResults')}</h3>
            <p className="text-xs text-slate-500 dark:text-typography-muted">
              Try searching for terms like <strong>GST</strong>, <strong>TDS</strong>, <strong>CTC</strong>, <strong>SIP</strong>, or <strong>Index Funds</strong>.
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

      {/* 6. Closing CTA Card */}
      <div className="glass-card p-8 md:p-10 text-center space-y-5 border border-brand-blue/25 dark:border-brand-cyan/35 max-w-4xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-blue dark:text-brand-cyan flex items-center justify-center mx-auto">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'सीखे हुए ज्ञान को व्यवहार में लाएं' : lang === 'mr' ? 'शिकलेल्या ज्ञानाचा प्रत्यक्ष सराव करा' : 'Put Your Financial Knowledge Into Practice'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-typography-muted leading-relaxed">
            {lang === 'hi'
              ? 'अपनी व्यक्तिगत वित्तीय स्थिति का विश्लेषण करें, व्हाट-इफ सिम्युलेटर से निर्णय जांचें और अपना फाइनेंशियल हेल्थ स्कोर जानें।'
              : lang === 'mr'
              ? 'स्वतःच्या आर्थिक स्थितीचे विश्लेषण करा, व्हॉट-इफ सिम्युलेटरने निर्णय तपासा आणि हेल्थ स्कोअर जाणून घ्या.'
              : 'Test real financial scenarios on your actual income, model salary adjustments in the What-If Simulator, and check your comprehensive Financial Health Score.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/what-if')}
            className="btn-gradient px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2"
          >
            <Sliders className="w-4 h-4" />
            <span>{lang === 'hi' ? 'व्हाट-इफ सिम्युलेटर खोलें' : lang === 'mr' ? 'व्हॉट-इफ सिम्युलेटर उघडा' : 'Launch What-If Simulator'}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/financial-health')}
            className="glass-card border border-brand-blue/30 dark:border-brand-cyan/40 px-5 py-2.5 rounded-xl text-xs font-bold text-brand-blue dark:text-brand-cyan hover:border-brand-teal transition-all flex items-center gap-2"
          >
            <Activity className="w-4 h-4" />
            <span>{lang === 'hi' ? 'हेल्थ स्कोर जांचें' : lang === 'mr' ? 'हेल्थ स्कोअर तपासा' : 'Check Health Score'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
