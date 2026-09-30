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
  const { t } = useTranslation();
  const { profile, salaryBreakdown } = useFinancialData();

  // If user has base salary in dashboard, use it; else start with 0
  const baseCtc = profile.annualCtc || 0;
  const baseExpenses = profile.monthlyExpenses || 0;

  // Simulator controls
  const [salaryChangePercent, setSalaryChangePercent] = useState<number>(10);
  const [expenseChangeAmount, setExpenseChangeAmount] = useState<number>(0);
  const [savingsBoostMonthly, setSavingsBoostMonthly] = useState<number>(0);

  const simulation = simulateWhatIfScenario({
    baseCtc,
    baseExpenses,
    salaryChangePercent,
    expenseChangeAmount,
    savingsBoostMonthly,
  });

  const handleReset = () => {
    setSalaryChangePercent(0);
    setExpenseChangeAmount(0);
    setSavingsBoostMonthly(0);
  };

  const handleQuickPreset = (type: string) => {
    if (type === 'hike15') {
      setSalaryChangePercent(15);
      setExpenseChangeAmount(3000);
      setSavingsBoostMonthly(5000);
    } else if (type === 'costCut') {
      setSalaryChangePercent(0);
      setExpenseChangeAmount(-5000);
      setSavingsBoostMonthly(5000);
    } else if (type === 'rentSpike') {
      setSalaryChangePercent(0);
      setExpenseChangeAmount(8000);
      setSavingsBoostMonthly(0);
    }
  };

  const handleAskMentorScenario = () => {
    const prompt = `I simulated a scenario: Salary change ${salaryChangePercent}%, expense adjustment ₹${expenseChangeAmount}. This results in a monthly in-hand delta of ${formatINR(simulation.deltaInHandMonthly)} and monthly savings delta of ${formatINR(simulation.deltaSavingsMonthly)}. How should I allocate this surplus?`;
    const event = new CustomEvent('open-ai-mentor', { detail: { prompt } });
    window.dispatchEvent(event);
  };

  const comparisonChartData = [
    {
      category: 'In-Hand Pay',
      Baseline: Math.round(simulation.baseline.inHandMonthly),
      Simulated: Math.round(simulation.simulated.inHandMonthly),
    },
    {
      category: 'Monthly Expenses',
      Baseline: Math.round(simulation.baseline.monthlyExpenses),
      Simulated: Math.round(simulation.simulated.monthlyExpenses),
    },
    {
      category: 'Monthly Savings',
      Baseline: Math.round(simulation.baseline.potentialMonthlySavings),
      Simulated: Math.round(simulation.simulated.potentialMonthlySavings),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">
            Scenario Modeling
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            {t('whatIf.title')}
          </h1>
          <p className="text-xs sm:text-sm text-typography-bodyDark dark:text-[#A9BCD9] mt-1 max-w-2xl leading-relaxed">
            {t('whatIf.subtitle')}
          </p>
        </div>

        {baseCtc > 0 && (
          <Button
            variant="secondary"
            size="sm"
            icon={<Bot className="w-4 h-4 text-brand-cyan" />}
            onClick={handleAskMentorScenario}
          >
            Analyze Scenario with AI
          </Button>
        )}
      </div>

      {baseCtc === 0 ? (
        /* Empty State */
        <div className="glass-card p-12 text-center space-y-4 max-w-lg mx-auto border border-brand-cyan/25">
          <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto text-brand-cyan">
            <Sliders className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No Base Salary Configured</h3>
          <p className="text-xs text-typography-muted leading-relaxed">
            {t('whatIf.noDataPrompt')}
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 btn-gradient px-5 py-2.5 rounded-xl text-xs font-semibold text-white"
          >
            <span>Go to Dashboard & Set CTC</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        /* Simulator Interactive Engine */
        <div className="space-y-8">
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-typography-muted mr-1">Quick Scenarios:</span>
            <button
              type="button"
              onClick={() => handleQuickPreset('hike15')}
              className="px-3.5 py-1.5 rounded-xl glass-card text-xs font-semibold text-white hover:border-brand-cyan/50 hover:bg-white/5 transition-all"
            >
              +15% Appraisal Hike
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset('costCut')}
              className="px-3.5 py-1.5 rounded-xl glass-card text-xs font-semibold text-white hover:border-brand-cyan/50 hover:bg-white/5 transition-all"
            >
              Cut Expenses by ₹5,000
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset('rentSpike')}
              className="px-3.5 py-1.5 rounded-xl glass-card text-xs font-semibold text-white hover:border-brand-cyan/50 hover:bg-white/5 transition-all"
            >
              Rent Increase of ₹8,000
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-brand-cyan hover:underline ml-auto flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Interactive Controls Sliders */}
          <Card className="p-6 md:p-8 border border-brand-cyan/35 space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-teal" />
              <span>Adjust Variables in Real-Time</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Slider 1: Salary Change % */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-white">
                  <span>Salary Change (%)</span>
                  <span
                    className={`font-bold ${
                      salaryChangePercent > 0
                        ? 'text-brand-teal'
                        : salaryChangePercent < 0
                        ? 'text-red-400'
                        : 'text-brand-cyan'
                    }`}
                  >
                    {salaryChangePercent > 0 ? `+${salaryChangePercent}%` : `${salaryChangePercent}%`}
                  </span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="50"
                  step="1"
                  value={salaryChangePercent}
                  onChange={(e) => setSalaryChangePercent(Number(e.target.value))}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-typography-muted">
                  <span>-30% pay cut</span>
                  <span>0% base</span>
                  <span>+50% hike</span>
                </div>
                <p className="text-[11px] text-typography-muted pt-1">
                  New Annual CTC: {formatINR(simulation.simulated.ctc)}
                </p>
              </div>

              {/* Slider 2: Expense Adjustment */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-white">
                  <span>Monthly Expense Shift (₹)</span>
                  <span
                    className={`font-bold ${
                      expenseChangeAmount > 0
                        ? 'text-amber-400'
                        : expenseChangeAmount < 0
                        ? 'text-brand-teal'
                        : 'text-brand-cyan'
                    }`}
                  >
                    {expenseChangeAmount > 0
                      ? `+₹${expenseChangeAmount.toLocaleString('en-IN')}`
                      : expenseChangeAmount < 0
                      ? `-₹${Math.abs(expenseChangeAmount).toLocaleString('en-IN')}`
                      : '₹0'}
                  </span>
                </div>
                <input
                  type="range"
                  min="-20000"
                  max="30000"
                  step="1000"
                  value={expenseChangeAmount}
                  onChange={(e) => setExpenseChangeAmount(Number(e.target.value))}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-typography-muted">
                  <span>-₹20k savings</span>
                  <span>No change</span>
                  <span>+₹30k expense</span>
                </div>
                <p className="text-[11px] text-typography-muted pt-1">
                  New Monthly Expenses: {formatINR(simulation.simulated.monthlyExpenses)}
                </p>
              </div>

              {/* Slider 3: Savings Boost */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-white">
                  <span>Dedicated SIP Boost (₹)</span>
                  <span className="font-bold text-brand-cyan">
                    +₹{savingsBoostMonthly.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25000"
                  step="1000"
                  value={savingsBoostMonthly}
                  onChange={(e) => setSavingsBoostMonthly(Number(e.target.value))}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-typography-muted">
                  <span>₹0</span>
                  <span>+₹12.5k</span>
                  <span>+₹25k/mo</span>
                </div>
                <p className="text-[11px] text-typography-muted pt-1">
                  Extra monthly wealth generation
                </p>
              </div>
            </div>
          </Card>

          {/* Delta Impact Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1 */}
            <Card className="p-5 border border-brand-cyan/25">
              <span className="text-[10px] font-bold uppercase tracking-wider text-typography-muted">
                Monthly In-Hand Impact
              </span>
              <div className="flex items-center gap-2 mt-1">
                {simulation.deltaInHandMonthly >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-brand-teal" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-400" />
                )}
                <span
                  className={`text-2xl font-extrabold ${
                    simulation.deltaInHandMonthly >= 0 ? 'text-brand-teal' : 'text-red-400'
                  }`}
                >
                  {simulation.deltaInHandMonthly >= 0 ? '+' : ''}
                  {formatINR(simulation.deltaInHandMonthly)}
                </span>
              </div>
              <p className="text-[11px] text-typography-muted mt-1">
                New: {formatINR(simulation.simulated.inHandMonthly)}/mo
              </p>
            </Card>

            {/* Metric 2 */}
            <Card className="p-5 border border-brand-cyan/25">
              <span className="text-[10px] font-bold uppercase tracking-wider text-typography-muted">
                Monthly Savings Delta
              </span>
              <div className="flex items-center gap-2 mt-1">
                {simulation.deltaSavingsMonthly >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-brand-cyan" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-400" />
                )}
                <span
                  className={`text-2xl font-extrabold ${
                    simulation.deltaSavingsMonthly >= 0 ? 'text-brand-cyan' : 'text-red-400'
                  }`}
                >
                  {simulation.deltaSavingsMonthly >= 0 ? '+' : ''}
                  {formatINR(simulation.deltaSavingsMonthly)}
                </span>
              </div>
              <p className="text-[11px] text-typography-muted mt-1">
                New: {formatINR(simulation.simulated.potentialMonthlySavings)}/mo
              </p>
            </Card>

            {/* Metric 3 */}
            <Card className="p-5 border border-brand-cyan/25">
              <span className="text-[10px] font-bold uppercase tracking-wider text-typography-muted">
                Annual Wealth Delta
              </span>
              <p className="text-2xl font-extrabold text-gradient mt-1">
                {simulation.deltaSavingsAnnual >= 0 ? '+' : ''}
                {formatINR(simulation.deltaSavingsAnnual)}
              </p>
              <p className="text-[11px] text-brand-cyan/80 mt-1 font-semibold">
                Per year compounding difference
              </p>
            </Card>

            {/* Metric 4 */}
            <Card className="p-5 border border-brand-cyan/25">
              <span className="text-[10px] font-bold uppercase tracking-wider text-typography-muted">
                Savings Rate Shift
              </span>
              <p className="text-2xl font-extrabold text-white mt-1">
                {simulation.simulated.savingsRate.toFixed(0)}%
              </p>
              <p
                className={`text-[11px] font-semibold mt-1 ${
                  simulation.savingsRateChange >= 0 ? 'text-brand-teal' : 'text-red-400'
                }`}
              >
                {simulation.savingsRateChange >= 0 ? '+' : ''}
                {simulation.savingsRateChange.toFixed(1)}% shift
              </p>
            </Card>
          </div>

          {/* Visual Comparison: Baseline vs Simulated Bar Chart */}
          <Card className="p-6 md:p-8 border border-brand-cyan/30">
            <h3 className="text-base font-bold text-white mb-1">
              {t('whatIf.compareHeader')}
            </h3>
            <p className="text-xs text-typography-muted mb-6">
              Side-by-side comparison of baseline numbers vs newly simulated scenario
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
                      backgroundColor: '#071433',
                      borderColor: 'rgba(40,200,255,0.4)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Baseline" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Simulated" fill="#19E3C0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
