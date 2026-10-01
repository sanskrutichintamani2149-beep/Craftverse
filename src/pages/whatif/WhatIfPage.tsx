import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Sliders,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  RefreshCw,
  Bot,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Calendar,
  Wallet,
  Clock,
  ShieldAlert,
  Loader2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { useFinancialData } from '@/context/FinancialDataContext';
import { simulateWhatIfScenario } from '@/utils/calculations';
import { formatINR, formatCompactINR } from '@/utils/formatters';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

export const WhatIfPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { profile, salaryBreakdown, updateFinancialProfile } = useFinancialData();

  // Baseline figures from user profile
  const baseCtc = profile.annualCtc || 0;
  const baseExpenses = profile.monthlyExpenses || 0;
  const existingSavings = profile.existingSavings || 0;

  // Inline baseline form state if profile not set
  const [inlineCtc, setInlineCtc] = useState<string>('');
  const [inlineExpenses, setInlineExpenses] = useState<string>('');
  const [inlineSavings, setInlineSavings] = useState<string>('');

  // Simulator controls
  const [salaryChangePercent, setSalaryChangePercent] = useState<number>(10);
  const [expenseChangeAmount, setExpenseChangeAmount] = useState<number>(0);
  const [savingsBoostMonthly, setSavingsBoostMonthly] = useState<number>(0);

  // Gemini AI Explanation state
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const simulation = simulateWhatIfScenario({
    baseCtc,
    baseExpenses,
    salaryChangePercent,
    expenseChangeAmount,
    savingsBoostMonthly,
  });

  const handleApplyInlineBaseline = (e: React.FormEvent) => {
    e.preventDefault();
    const ctc = parseFloat(inlineCtc);
    const exp = parseFloat(inlineExpenses);
    const sav = parseFloat(inlineSavings);

    updateFinancialProfile({
      annualCtc: isNaN(ctc) ? 0 : Math.max(0, ctc),
      monthlyExpenses: isNaN(exp) ? 0 : Math.max(0, exp),
      existingSavings: isNaN(sav) ? 0 : Math.max(0, sav),
    });
  };

  const handleReset = () => {
    setSalaryChangePercent(0);
    setExpenseChangeAmount(0);
    setSavingsBoostMonthly(0);
    setAiExplanation(null);
    setAiError(null);
  };

  const handleQuickPreset = (type: string) => {
    setAiExplanation(null);
    setAiError(null);
    if (type === 'hike15') {
      setSalaryChangePercent(15);
      setExpenseChangeAmount(2000);
      setSavingsBoostMonthly(5000);
    } else if (type === 'costCut') {
      setSalaryChangePercent(0);
      setExpenseChangeAmount(-5000);
      setSavingsBoostMonthly(5000);
    } else if (type === 'rentSpike') {
      setSalaryChangePercent(0);
      setExpenseChangeAmount(8000);
      setSavingsBoostMonthly(0);
    } else if (type === 'aggressiveSip') {
      setSalaryChangePercent(5);
      setExpenseChangeAmount(0);
      setSavingsBoostMonthly(10000);
    }
  };

  // Time to Goal Impact calculation (based on standard ₹5L wealth milestone)
  const milestoneTarget = 500000;
  const baseMonthlySavings = Math.max(100, simulation.baseline.potentialMonthlySavings);
  const simMonthlySavings = Math.max(100, simulation.simulated.potentialMonthlySavings);
  const baseMonthsToMilestone = Math.ceil(Math.max(0, milestoneTarget - existingSavings) / baseMonthlySavings);
  const simMonthsToMilestone = Math.ceil(Math.max(0, milestoneTarget - existingSavings) / simMonthlySavings);
  const monthsDiff = baseMonthsToMilestone - simMonthsToMilestone;

  // 1-Year and 3-Year projections
  const oneYearDelta = simulation.deltaSavingsAnnual;
  const threeYearDelta = simulation.deltaSavingsAnnual * 3;

  // Call Gemini AI for explanation
  const handleExplainWithGemini = async () => {
    setIsAiLoading(true);
    setAiError(null);

    try {
      const response = await fetch('/api/what-if/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseline: {
            ctc: baseCtc,
            inHandMonthly: simulation.baseline.inHandMonthly,
            monthlyExpenses: simulation.baseline.monthlyExpenses,
            potentialMonthlySavings: simulation.baseline.potentialMonthlySavings,
          },
          simulated: {
            ctc: simulation.simulated.ctc,
            inHandMonthly: simulation.simulated.inHandMonthly,
            monthlyExpenses: simulation.simulated.monthlyExpenses,
            potentialMonthlySavings: simulation.simulated.potentialMonthlySavings,
          },
          deltaInHandMonthly: simulation.deltaInHandMonthly,
          deltaSavingsMonthly: simulation.deltaSavingsMonthly,
          deltaSavingsAnnual: simulation.deltaSavingsAnnual,
          salaryChangePercent,
          expenseChangeAmount,
          savingsBoostMonthly,
          language: lang,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate AI scenario explanation');
      }

      setAiExplanation(data.explanation);
    } catch (err: any) {
      console.error('AI Explanation Error:', err);
      setAiError(err?.message || 'AI service temporarily unavailable. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const comparisonChartData = [
    {
      category: lang === 'hi' ? 'मासिक इन-हैंड' : lang === 'mr' ? 'मासिक इन-हँड' : 'In-Hand Pay',
      Baseline: Math.round(simulation.baseline.inHandMonthly),
      Simulated: Math.round(simulation.simulated.inHandMonthly),
    },
    {
      category: lang === 'hi' ? 'मासिक खर्च' : lang === 'mr' ? 'मासिक खर्च' : 'Monthly Expenses',
      Baseline: Math.round(simulation.baseline.monthlyExpenses),
      Simulated: Math.round(simulation.simulated.monthlyExpenses),
    },
    {
      category: lang === 'hi' ? 'मासिक बचत' : lang === 'mr' ? 'मासिक बचत' : 'Monthly Savings',
      Baseline: Math.round(simulation.baseline.potentialMonthlySavings),
      Simulated: Math.round(simulation.simulated.potentialMonthlySavings),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-blue dark:text-brand-cyan bg-brand-cyan/15 px-3 py-1 rounded-full border border-brand-cyan/30">
            {lang === 'hi' ? 'वित्तीय निर्णय प्रयोगशाला' : lang === 'mr' ? 'आर्थिक निर्णय प्रयोगशाळा' : 'Financial Decision Sandbox'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            {t('whatIf.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-[#A9BCD9] mt-1 max-w-2xl leading-relaxed">
            {t('whatIf.subtitle')}
          </p>
        </div>

        {baseCtc > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl glass-card text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 border border-slate-300 dark:border-brand-cyan/25"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('whatIf.reset')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Case 1: User has NO dashboard baseline */}
      {baseCtc <= 0 ? (
        <Card className="p-8 md:p-12 text-center max-w-xl mx-auto border border-brand-blue/25 dark:border-brand-cyan/30 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-cyan/15 border border-brand-cyan/35 flex items-center justify-center mx-auto text-brand-blue dark:text-brand-cyan">
            <Wallet className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'hi' ? 'अपनी बेसलाइन वित्तीय जानकारी दर्ज करें' : lang === 'mr' ? 'तुमची मूळ आर्थिक माहिती भरा' : 'Set Your Baseline Financial Numbers'}
            </h2>
            <p className="text-xs text-slate-600 dark:text-typography-muted leading-relaxed">
              {lang === 'hi'
                ? 'व्हाट-इफ सिम्युलेटर आपके वास्तविक डैशबोर्ड डेटा से जुड़ता है। शुरू करने के लिए अपना सीटीसी और खर्च दर्ज करें।'
                : lang === 'mr'
                ? 'व्हॉट-इफ सिम्युलेटर तुमच्या प्रत्यक्ष उत्पन्नाशी जोडला जातो. सिम्युलेशनसाठी तुमचे सीटीसी आणि खर्च भरा.'
                : 'The simulator recalculates from your real baseline. Enter your numbers below to start modeling scenarios instantly.'}
            </p>
          </div>

          <form onSubmit={handleApplyInlineBaseline} className="space-y-4 text-left max-w-md mx-auto">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                {lang === 'hi' ? 'वार्षिक सीटीसी (₹)' : lang === 'mr' ? 'वार्षिक सीटीसी (₹)' : 'Annual CTC (₹)'}
              </label>
              <input
                type="number"
                required
                value={inlineCtc}
                onChange={(e) => setInlineCtc(e.target.value)}
                placeholder="e.g. 800000"
                className="w-full py-2.5 px-4 glass-input text-sm text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                {lang === 'hi' ? 'मासिक खर्च (₹)' : lang === 'mr' ? 'मासिक खर्च (₹)' : 'Monthly Expenses (₹)'}
              </label>
              <input
                type="number"
                required
                value={inlineExpenses}
                onChange={(e) => setInlineExpenses(e.target.value)}
                placeholder="e.g. 35000"
                className="w-full py-2.5 px-4 glass-input text-sm text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                {lang === 'hi' ? 'वर्तमान बचत (₹) [वैकल्पिक]' : lang === 'mr' ? 'चालू बचत (₹) [पर्यायी]' : 'Current Savings (₹) [Optional]'}
              </label>
              <input
                type="number"
                value={inlineSavings}
                onChange={(e) => setInlineSavings(e.target.value)}
                placeholder="e.g. 100000"
                className="w-full py-2.5 px-4 glass-input text-sm text-slate-900 dark:text-white"
              />
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full justify-center">
              {lang === 'hi' ? 'बेसलाइन लागू करें और सिम्युलेटर खोलें' : lang === 'mr' ? 'माहिती लागू करा व सिम्युलेटर सुरू करा' : 'Apply Baseline & Launch Simulator'}
            </Button>
          </form>
        </Card>
      ) : (
        /* Case 2: Full Interactive Simulator */
        <div className="space-y-8">
          {/* Quick Scenario Preset Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-xs font-bold text-slate-600 dark:text-typography-muted whitespace-nowrap mr-1">
              {lang === 'hi' ? 'त्वरित परिदृश्य:' : lang === 'mr' ? 'झटपट परिस्थिती:' : 'Quick Presets:'}
            </span>
            <button
              type="button"
              onClick={() => handleQuickPreset('hike15')}
              className="px-3.5 py-1.5 rounded-xl glass-card text-xs font-semibold text-slate-800 dark:text-white hover:border-brand-cyan whitespace-nowrap transition-all border border-slate-300 dark:border-brand-cyan/20"
            >
              {lang === 'hi' ? '📈 15% वेतन वृद्धि' : lang === 'mr' ? '📈 १५% पगार वाढ' : '📈 15% Salary Hike'}
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset('costCut')}
              className="px-3.5 py-1.5 rounded-xl glass-card text-xs font-semibold text-slate-800 dark:text-white hover:border-brand-cyan whitespace-nowrap transition-all border border-slate-300 dark:border-brand-cyan/20"
            >
              {lang === 'hi' ? '✂️ खर्च में ₹5,000 कटौती' : lang === 'mr' ? '✂️ ₹५,००० खर्च कपात' : '✂️ Cut Expenses by ₹5,000'}
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset('rentSpike')}
              className="px-3.5 py-1.5 rounded-xl glass-card text-xs font-semibold text-slate-800 dark:text-white hover:border-brand-cyan whitespace-nowrap transition-all border border-slate-300 dark:border-brand-cyan/20"
            >
              {lang === 'hi' ? '🏠 किराया वृद्धि (+₹8k)' : lang === 'mr' ? '🏠 घरभाडे वाढ (+₹८k)' : '🏠 Rent Spike (+₹8,000)'}
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset('aggressiveSip')}
              className="px-3.5 py-1.5 rounded-xl glass-card text-xs font-semibold text-slate-800 dark:text-white hover:border-brand-cyan whitespace-nowrap transition-all border border-slate-300 dark:border-brand-cyan/20"
            >
              {lang === 'hi' ? '🚀 आक्रामक एसआईपी (+₹10k)' : lang === 'mr' ? '🚀 आक्रमक एसआयपी (+₹१०k)' : '🚀 Aggressive SIP (+₹10k)'}
            </button>
          </div>

          {/* Interactive Sliders Container */}
          <Card className="p-6 md:p-8 border border-brand-blue/20 dark:border-brand-cyan/30">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-blue dark:text-brand-cyan" />
              <span>{lang === 'hi' ? 'परिदृश्य नियंत्रण और स्लाइडर्स' : lang === 'mr' ? 'परिस्थिती नियंत्रक आणि स्लायडर्स' : 'Scenario Levers & Adjustments'}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Slider 1: Salary Change */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-900 dark:text-white">
                  <span>{lang === 'hi' ? 'वेतन परिवर्तन (%)' : lang === 'mr' ? 'पगार बदल (%)' : 'Salary Change (%)'}</span>
                  <span className={`font-bold ${salaryChangePercent >= 0 ? 'text-brand-teal' : 'text-red-500'}`}>
                    {salaryChangePercent >= 0 ? '+' : ''}{salaryChangePercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="60"
                  step="5"
                  value={salaryChangePercent}
                  onChange={(e) => {
                    setSalaryChangePercent(Number(e.target.value));
                    setAiExplanation(null);
                  }}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 dark:text-typography-muted">
                  <span>-30%</span>
                  <span>0%</span>
                  <span>+60%</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-typography-muted pt-1">
                  New CTC: {formatINR(simulation.simulated.ctc)}
                </p>
              </div>

              {/* Slider 2: Monthly Expense Shift */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-900 dark:text-white">
                  <span>{lang === 'hi' ? 'मासिक खर्च बदलाव (₹)' : lang === 'mr' ? 'मासिक खर्च बदल (₹)' : 'Monthly Expense Shift (₹)'}</span>
                  <span className={`font-bold ${expenseChangeAmount <= 0 ? 'text-brand-teal' : 'text-amber-500'}`}>
                    {expenseChangeAmount >= 0 ? '+' : ''}₹{Math.abs(expenseChangeAmount).toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="-20000"
                  max="30000"
                  step="1000"
                  value={expenseChangeAmount}
                  onChange={(e) => {
                    setExpenseChangeAmount(Number(e.target.value));
                    setAiExplanation(null);
                  }}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 dark:text-typography-muted">
                  <span>-₹20k cut</span>
                  <span>₹0</span>
                  <span>+₹30k hike</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-typography-muted pt-1">
                  New Expenses: {formatINR(simulation.simulated.monthlyExpenses)}
                </p>
              </div>

              {/* Slider 3: Savings Boost */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-900 dark:text-white">
                  <span>{lang === 'hi' ? 'अतिरिक्त मासिक एसआईपी (₹)' : lang === 'mr' ? 'अतिरिक्त मासिक एसआयपी (₹)' : 'Dedicated SIP Boost (₹)'}</span>
                  <span className="font-bold text-brand-blue dark:text-brand-cyan">
                    +₹{savingsBoostMonthly.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25000"
                  step="1000"
                  value={savingsBoostMonthly}
                  onChange={(e) => {
                    setSavingsBoostMonthly(Number(e.target.value));
                    setAiExplanation(null);
                  }}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 dark:text-typography-muted">
                  <span>₹0</span>
                  <span>+₹12.5k</span>
                  <span>+₹25k/mo</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-typography-muted pt-1">
                  Extra monthly wealth generation
                </p>
              </div>
            </div>
          </Card>

          {/* Delta Impact Metrics Banner: All Required Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Metric 1: Monthly In-Hand */}
            <Card className="p-5 border border-brand-blue/20 dark:border-brand-cyan/25">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-typography-muted">
                {lang === 'hi' ? 'मासिक इन-हैंड प्रभाव' : lang === 'mr' ? 'मासिक इन-हँड बदल' : 'Monthly In-Hand Impact'}
              </span>
              <div className="flex items-center gap-2 mt-1">
                {simulation.deltaInHandMonthly >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-brand-teal" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
                <span
                  className={`text-xl font-extrabold ${
                    simulation.deltaInHandMonthly >= 0 ? 'text-brand-teal' : 'text-red-500'
                  }`}
                >
                  {simulation.deltaInHandMonthly >= 0 ? '+' : ''}
                  {formatINR(simulation.deltaInHandMonthly)}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-typography-muted mt-1">
                New: {formatINR(simulation.simulated.inHandMonthly)}/mo
              </p>
            </Card>

            {/* Metric 2: Monthly Savings */}
            <Card className="p-5 border border-brand-blue/20 dark:border-brand-cyan/25">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-typography-muted">
                {lang === 'hi' ? 'मासिक बचत अंतर' : lang === 'mr' ? 'मासिक बचत फरक' : 'Monthly Savings Delta'}
              </span>
              <div className="flex items-center gap-2 mt-1">
                {simulation.deltaSavingsMonthly >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-brand-blue dark:text-brand-cyan" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
                <span
                  className={`text-xl font-extrabold ${
                    simulation.deltaSavingsMonthly >= 0 ? 'text-brand-blue dark:text-brand-cyan' : 'text-red-500'
                  }`}
                >
                  {simulation.deltaSavingsMonthly >= 0 ? '+' : ''}
                  {formatINR(simulation.deltaSavingsMonthly)}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-typography-muted mt-1">
                New: {formatINR(simulation.simulated.potentialMonthlySavings)}/mo
              </p>
            </Card>

            {/* Metric 3: Savings Rate Shift */}
            <Card className="p-5 border border-brand-blue/20 dark:border-brand-cyan/25">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-typography-muted">
                {lang === 'hi' ? 'बचत दर बदलाव' : lang === 'mr' ? 'बचत दर बदल' : 'Savings Rate Shift'}
              </span>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {simulation.simulated.savingsRate.toFixed(0)}%
              </p>
              <p
                className={`text-[11px] font-semibold mt-1 ${
                  simulation.savingsRateChange >= 0 ? 'text-brand-teal' : 'text-red-500'
                }`}
              >
                {simulation.savingsRateChange >= 0 ? '+' : ''}
                {simulation.savingsRateChange.toFixed(1)}% shift
              </p>
            </Card>

            {/* Metric 4: Time to Goal Impact */}
            <Card className="p-5 border border-brand-blue/20 dark:border-brand-cyan/25">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-typography-muted">
                {lang === 'hi' ? 'लक्ष्य अवधि प्रभाव' : lang === 'mr' ? 'ध्येय कालावधी प्रभाव' : 'Time-to-Goal Impact'}
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <Clock className="w-4 h-4 text-brand-blue dark:text-brand-cyan" />
                <span className={`text-lg font-extrabold ${monthsDiff >= 0 ? 'text-brand-teal' : 'text-amber-500'}`}>
                  {monthsDiff > 0
                    ? `${monthsDiff} ${lang === 'hi' ? 'माह पहले' : lang === 'mr' ? 'महिने आधी' : 'mo faster'}`
                    : monthsDiff < 0
                    ? `${Math.abs(monthsDiff)} ${lang === 'hi' ? 'माह देरी' : lang === 'mr' ? 'महिने उशीर' : 'mo slower'}`
                    : lang === 'hi' ? 'कोई बदलाव नहीं' : lang === 'mr' ? 'बदल नाही' : 'On schedule'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-typography-muted mt-1">
                ₹5L wealth target
              </p>
            </Card>

            {/* Metric 5: 1-Yr & 3-Yr Projected Savings Delta */}
            <Card className="p-5 border border-brand-blue/20 dark:border-brand-cyan/25">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-typography-muted">
                {lang === 'hi' ? '1 व 3 वर्ष संचयी अंतर' : lang === 'mr' ? '१ व ३ वर्ष संचयी फरक' : '1-Yr / 3-Yr Delta'}
              </span>
              <p className="text-xl font-extrabold text-gradient mt-1">
                {oneYearDelta >= 0 ? '+' : ''}{formatCompactINR(oneYearDelta)} / 1Y
              </p>
              <p className="text-[11px] text-brand-blue dark:text-brand-cyan font-semibold mt-1">
                {threeYearDelta >= 0 ? '+' : ''}{formatCompactINR(threeYearDelta)} over 3 Years
              </p>
            </Card>
          </div>

          {/* AI Explanation Trigger Card & Output */}
          <div className="glass-card p-6 md:p-8 border border-brand-blue/25 dark:border-brand-cyan/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-blue dark:text-brand-cyan flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{lang === 'hi' ? 'जेमिनी एआई परिदृश्य विश्लेषण' : lang === 'mr' ? 'जेमिनी एआय परिस्थिती विश्लेषण' : 'Gemini AI Scenario Analysis'}</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand-cyan/20 text-brand-blue dark:text-brand-cyan px-2 py-0.5 rounded-full border border-brand-cyan/30">
                      Live AI
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-typography-muted">
                    {lang === 'hi'
                      ? 'अपने नए और पुराने आंकड़ों के आधार पर निष्पक्ष वित्तीय मार्गदर्शन प्राप्त करें।'
                      : lang === 'mr'
                      ? 'तुमच्या बदललेल्या आकड्यांवर आधारित निष्पक्ष मार्गदर्शन मिळवा.'
                      : 'Get tailored, 2-3 paragraph plain-language guidance explaining trade-offs and next steps.'}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleExplainWithGemini}
                disabled={isAiLoading}
                className="shrink-0"
              >
                {isAiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{lang === 'hi' ? 'विश्लेषण हो रहा है...' : lang === 'mr' ? 'विश्लेषण चालू आहे...' : 'Analyzing Scenario...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'AI से यह परिदृश्य समझें' : lang === 'mr' ? 'AI द्वारे हा बदल समजून घ्या' : 'Explain Scenario with AI'}</span>
                  </>
                )}
              </Button>
            </div>

            {/* Error Message if AI call fails */}
            {aiError && (
              <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-700 dark:text-red-300 text-xs flex items-center justify-between gap-3 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{aiError}</span>
                </div>
                <button
                  type="button"
                  onClick={handleExplainWithGemini}
                  className="font-bold underline shrink-0 hover:text-white"
                >
                  {lang === 'hi' ? 'पुनः प्रयास करें' : lang === 'mr' ? 'पुन्हा प्रयत्न करा' : 'Retry'}
                </button>
              </div>
            )}

            {/* Display AI Explanation when available */}
            {aiExplanation && (
              <div className="p-5 md:p-6 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-blue dark:text-brand-cyan uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'निजीकृत एआई अंतर्दृष्टि' : lang === 'mr' ? 'वैयक्तिकृत एआय सल्ला' : 'Tailored AI Financial Assessment'}</span>
                </div>
                <div className="text-sm text-slate-800 dark:text-[#D5E2F7] leading-relaxed space-y-3 whitespace-pre-line font-medium">
                  {aiExplanation}
                </div>
              </div>
            )}
          </div>

          {/* Visual Comparison: Baseline vs Simulated Bar Chart */}
          <Card className="p-6 md:p-8 border border-brand-blue/20 dark:border-brand-cyan/30">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {t('whatIf.compareHeader')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-typography-muted mb-6">
              {lang === 'hi'
                ? 'मूल आंकड़ों और नए परिदृश्य का तुलनात्मक ग्राफ'
                : lang === 'mr'
                ? 'मूळ आकडेवारी आणि नवीन परिस्थितीचा तुलनात्मक आलेख'
                : 'Side-by-side comparison of baseline numbers vs newly simulated scenario'}
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonChartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <XAxis dataKey="category" stroke="#64789F" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#64789F"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(v) => formatCompactINR(v)}
                  />
                  <Tooltip
                    formatter={(v: number) => formatINR(v)}
                    contentStyle={{
                      backgroundColor: 'rgba(7, 20, 51, 0.95)',
                      borderColor: 'rgba(40,200,255,0.4)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Baseline" name={lang === 'hi' ? 'मूल स्थिति' : lang === 'mr' ? 'मूळ स्थिती' : 'Baseline'} fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Simulated" name={lang === 'hi' ? 'सिम्युलेटेड स्थिति' : lang === 'mr' ? 'नवीन स्थिती' : 'Simulated'} fill="#19E3C0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
