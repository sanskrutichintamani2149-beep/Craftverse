import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Activity,
  Flame,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Percent,
  Clock,
  Sparkles,
  Bot,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';
import { useFinancialData } from '@/context/FinancialDataContext';
import { evaluateFinancialHealth, FinancialHealthResult } from '@/utils/calculations';
import { formatINR } from '@/utils/formatters';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { apiClient, RoastResponse } from '@/services/api/client';

export const FinancialHealthPage: React.FC = () => {
  const { t } = useTranslation();
  const { profile, salaryBreakdown } = useFinancialData();

  const [roastMode, setRoastMode] = useState(false);
  const [roastData, setRoastData] = useState<RoastResponse | null>(null);
  const [loadingRoast, setLoadingRoast] = useState(false);

  const healthResult: FinancialHealthResult | null = salaryBreakdown
    ? evaluateFinancialHealth(salaryBreakdown, profile.existingSavings || 0)
    : null;

  useEffect(() => {
    if (roastMode && salaryBreakdown && !roastData) {
      setLoadingRoast(true);
      apiClient
        .generateRoast({
          ctc: profile.annualCtc,
          monthlyInHand: salaryBreakdown.inHandMonthly,
          expenses: profile.monthlyExpenses,
          savings: profile.existingSavings,
          savingsRate: salaryBreakdown.savingsRate,
        })
        .then((res) => setRoastData(res))
        .catch(() => setRoastData({ roast: 'Could not generate roast right now.', punchline: '' }))
        .finally(() => setLoadingRoast(false));
    }
  }, [roastMode, salaryBreakdown, roastData, profile]);

  const handleAskMentorAboutHealth = () => {
    if (!healthResult) return;
    const prompt = `My financial health score is ${healthResult.overallScore}/100 (${healthResult.ratingLabel}). Areas to improve: ${healthResult.areasToImprove.join(' ')}. What specific practical steps should I take next month?`;
    const event = new CustomEvent('open-ai-mentor', { detail: { prompt } });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">
            Diagnostic Health Engine
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            {t('financialHealth.title')}
          </h1>
          <p className="text-xs sm:text-sm text-typography-bodyDark dark:text-[#A9BCD9] mt-1 max-w-2xl leading-relaxed">
            {t('financialHealth.subtitle')}
          </p>
        </div>

        {healthResult && (
          <Button
            variant="secondary"
            size="sm"
            icon={<Bot className="w-4 h-4 text-brand-cyan" />}
            onClick={handleAskMentorAboutHealth}
          >
            Review Diagnostic with Mentor
          </Button>
        )}
      </div>

      {!healthResult ? (
        /* Empty State */
        <div className="glass-card p-12 text-center space-y-4 max-w-lg mx-auto border border-brand-cyan/25">
          <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto text-brand-cyan">
            <Activity className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Diagnostic Requires Salary Data</h3>
          <p className="text-xs text-typography-muted leading-relaxed">
            {t('financialHealth.noDataYet')}
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 btn-gradient px-5 py-2.5 rounded-xl text-xs font-semibold text-white"
          >
            <span>Complete Dashboard Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        /* Health Score & Diagnostic Details */
        <div className="space-y-8">
          {/* Main Score & Status Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Score Dial Card */}
            <Card className="p-8 lg:col-span-5 border border-brand-cyan/40 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div
                className="w-48 h-48 rounded-full border-8 flex flex-col items-center justify-center relative shadow-[0_0_35px_rgba(18,184,255,0.3)] transition-colors duration-500"
                style={{ borderColor: healthResult.colorHex }}
              >
                <span className="text-5xl font-extrabold text-white tracking-tight">
                  {healthResult.overallScore}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-typography-muted mt-1">
                  {t('financialHealth.outOf100')}
                </span>
              </div>

              <div className="mt-5 space-y-1">
                <span
                  className="text-sm font-extrabold px-3 py-1 rounded-full uppercase tracking-wider text-brand-dark"
                  style={{ backgroundColor: healthResult.colorHex }}
                >
                  {healthResult.ratingLabel}
                </span>
                <p className="text-xs text-typography-bodyDark dark:text-[#A9BCD9] pt-2">
                  Based on your ₹{profile.annualCtc?.toLocaleString('en-IN')} CTC and savings discipline
                </p>
              </div>
            </Card>

            {/* Radar Analysis */}
            <Card className="p-6 lg:col-span-7 border border-brand-cyan/30 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Financial Pillar Breakdown
                </h3>
                <p className="text-xs text-typography-muted mb-4">
                  Multi-axial diagnostic across Savings, Expenses, Runway and Cashflow Surplus
                </p>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={healthResult.radarData}>
                    <PolarGrid stroke="rgba(40,200,255,0.2)" />
                    <PolarAngleAxis dataKey="subject" stroke="#A9BCD9" fontSize={11} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64789F" fontSize={9} />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#19E3C0"
                      fill="#12B8FF"
                      fillOpacity={0.4}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#071433',
                        borderColor: 'rgba(40,200,255,0.4)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* AI Roast Section Toggle */}
          <Card className="p-6 border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-transparent to-brand-cyan/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{t('financialHealth.enableRoast')}</span>
                  </h3>
                  <p className="text-xs text-typography-muted">
                    {t('financialHealth.roastSubtitle')}
                  </p>
                </div>
              </div>

              {/* Toggle switch */}
              <button
                type="button"
                onClick={() => setRoastMode(!roastMode)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  roastMode
                    ? 'bg-amber-500 text-brand-dark shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                    : 'glass-card border-brand-cyan/30 text-white hover:border-amber-400'
                }`}
              >
                {roastMode ? 'Disable AI Roast' : 'Fire Away Roast 🔥'}
              </button>
            </div>

            {/* Roast Box */}
            {roastMode && (
              <div className="mt-5 p-4 rounded-2xl glass-tile border border-amber-500/40 space-y-2 animate-in fade-in duration-200">
                {loadingRoast ? (
                  <p className="text-xs text-amber-300">Roasting your spending habits...</p>
                ) : roastData ? (
                  <>
                    <p className="text-sm font-medium text-white leading-relaxed">
                      "{roastData.roast}"
                    </p>
                    <p className="text-xs font-bold text-amber-400 pt-1">
                      💡 {roastData.punchline}
                    </p>
                    <p className="text-[10px] text-typography-muted pt-2 border-t border-white/5">
                      {t('financialHealth.roastDisclaimer')}
                    </p>
                  </>
                ) : null}
              </div>
            )}
          </Card>

          {/* 4 Health Indicator Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(healthResult.metrics).map((metric, idx) => (
              <Card key={idx} className="p-5 border border-brand-cyan/25 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-typography-muted">
                      {metric.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        metric.status === 'excellent'
                          ? 'bg-brand-teal/15 text-brand-teal'
                          : metric.status === 'good'
                          ? 'bg-brand-cyan/15 text-brand-cyan'
                          : metric.status === 'fair'
                          ? 'bg-amber-500/15 text-amber-400'
                          : 'bg-red-500/15 text-red-400'
                      }`}
                    >
                      {metric.status}
                    </span>
                  </div>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {metric.valueDisplay}
                  </p>
                  <p className="text-[11px] text-typography-muted mt-0.5">
                    Benchmark: {metric.targetDisplay}
                  </p>
                </div>
                <p className="text-[11px] text-brand-cyan/80 mt-3 pt-2 border-t border-white/5">
                  {metric.feedback}
                </p>
              </Card>
            ))}
          </div>

          {/* Actionable Next Steps & Areas of Improvement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Areas That Need Attention */}
            <Card className="p-6 border border-amber-500/30 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>{t('financialHealth.areasToImprove')}</span>
              </h4>

              <div className="space-y-2.5">
                {healthResult.areasToImprove.map((item, idx) => (
                  <div key={idx} className="glass-tile p-3 border border-amber-500/20 text-xs text-typography-bodyDark dark:text-[#CBD8F1] leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommended Next Actions */}
            <Card className="p-6 border border-brand-teal/30 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" />
                <span>{t('financialHealth.actionSteps')}</span>
              </h4>

              <div className="space-y-2.5">
                {healthResult.recommendedActions.map((action, idx) => (
                  <div key={idx} className="glass-tile p-3 border border-brand-teal/20 text-xs text-white leading-relaxed flex items-start gap-2">
                    <span className="text-brand-teal font-bold">{idx + 1}.</span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
