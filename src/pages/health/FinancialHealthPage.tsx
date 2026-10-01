import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Activity,
  Flame,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Bot,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  Loader2,
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
import { apiClient, HealthDiagnosticResponse } from '@/services/api/client';

export const FinancialHealthPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { profile, salaryBreakdown } = useFinancialData();

  const [roastMode, setRoastMode] = useState(false);
  const [copiedRoast, setCopiedRoast] = useState(false);
  const [diagnostic, setDiagnostic] = useState<HealthDiagnosticResponse | null>(null);
  const [loadingDiagnostic, setLoadingDiagnostic] = useState(false);

  const healthResult: FinancialHealthResult | null =
    salaryBreakdown && profile.annualCtc
      ? evaluateFinancialHealth(salaryBreakdown, profile.existingSavings || 0)
      : null;

  useEffect(() => {
    if (healthResult && salaryBreakdown) {
      setLoadingDiagnostic(true);
      apiClient
        .getFinancialHealthDiagnostic({
          overallScore: healthResult.overallScore,
          ratingLabel: healthResult.ratingLabel,
          savingsRate: salaryBreakdown.savingsRate,
          expenseRatio:
            salaryBreakdown.inHandMonthly > 0
              ? (salaryBreakdown.monthlyExpenses / salaryBreakdown.inHandMonthly) * 100
              : 0,
          emergencyMonths:
            salaryBreakdown.monthlyExpenses > 0
              ? (profile.existingSavings || 0) / salaryBreakdown.monthlyExpenses
              : 0,
          monthlySavings: salaryBreakdown.potentialMonthlySavings,
          monthlyInHand: salaryBreakdown.inHandMonthly,
          monthlyExpenses: salaryBreakdown.monthlyExpenses,
          language: i18n.language || 'en',
          wantRoast: true,
        })
        .then((res) => setDiagnostic(res))
        .catch(() => {
          // If network error, client provides fallback
        })
        .finally(() => setLoadingDiagnostic(false));
    }
  }, [
    healthResult?.overallScore,
    salaryBreakdown?.savingsRate,
    salaryBreakdown?.potentialMonthlySavings,
    i18n.language,
  ]);

  const handleAskMentorAboutHealth = () => {
    if (!healthResult) return;
    const prompt = `My financial health score is ${healthResult.overallScore}/100 (${healthResult.ratingLabel}). Areas needing attention: ${healthResult.areasToImprove.join(' ')}. What specific 3 practical steps should I take this month?`;
    navigate('/mentor', { state: { initialPrompt: prompt } });
  };

  const handleCopyRoast = () => {
    if (!diagnostic?.roast) return;
    navigator.clipboard.writeText(`${diagnostic.roast}\n\n💡 ${diagnostic.roastPunchline}`);
    setCopiedRoast(true);
    setTimeout(() => setCopiedRoast(false), 2000);
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
        /* Empty State with exact requested copy */
        <div className="glass-card p-12 text-center space-y-4 max-w-lg mx-auto border border-brand-cyan/25">
          <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto text-brand-cyan">
            <Activity className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No financial data yet</h3>
          <p className="text-xs text-typography-muted leading-relaxed">
            Enter your salary and expenses in the Dashboard to see your Financial Health Assessment.
          </p>
          <div className="pt-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 btn-gradient px-5 py-2.5 rounded-xl text-xs font-semibold text-white shadow-lg shadow-brand-blue/30 hover:scale-[1.02] transition-transform"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        /* Health Score & Diagnostic Details */
        <div className="space-y-8">
          {/* Main Score & Radar Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Circular Score Gauge Card */}
            <Card className="p-8 lg:col-span-5 border border-brand-cyan/40 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div
                className="w-48 h-48 rounded-full border-8 flex flex-col items-center justify-center relative shadow-[0_0_35px_rgba(18,184,255,0.3)] transition-colors duration-500 bg-brand-blue/5"
                style={{ borderColor: healthResult.colorHex }}
              >
                <span className="text-5xl font-extrabold text-white tracking-tight">
                  {healthResult.overallScore}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-typography-muted mt-1">
                  {t('financialHealth.outOf100')}
                </span>
              </div>

              <div className="mt-5 space-y-1.5 flex flex-col items-center">
                <span
                  className="text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider text-brand-dark"
                  style={{ backgroundColor: healthResult.colorHex }}
                >
                  {healthResult.ratingLabel}
                </span>
                <p className="text-xs text-typography-bodyDark dark:text-[#A9BCD9] pt-1">
                  Based on ₹{profile.annualCtc?.toLocaleString('en-IN')} Annual CTC
                </p>
              </div>
            </Card>

            {/* Radar Analysis */}
            <Card className="p-6 lg:col-span-7 border border-brand-cyan/30 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Four Financial Pillars Breakdown
                </h3>
                <p className="text-xs text-typography-muted mb-4">
                  Multi-axial diagnostic across Savings Discipline, Expense Control, Emergency Readiness and Cashflow Surplus
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

          {/* Gemini Personalized Narrative Card */}
          <Card className="p-6 md:p-8 border border-brand-cyan/35 bg-gradient-to-r from-brand-blue/10 via-transparent to-brand-cyan/10 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-cyan" />
              <h3 className="text-sm font-bold text-white">
                Personalized Financial Health Diagnostic
              </h3>
              {loadingDiagnostic && <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-cyan" />}
            </div>

            <p className="text-sm text-typography-bodyDark dark:text-[#CBD8F1] leading-relaxed">
              {diagnostic?.diagnosticNarrative ||
                `Your score of ${healthResult.overallScore}/100 (${healthResult.ratingLabel}) reflects your current cashflow allocation. Generating personalized insights...`}
            </p>
          </Card>

          {/* 4 Metric Cards (one per pillar) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(healthResult.metrics).map((metric, idx) => (
              <Card
                key={idx}
                className="p-5 border border-brand-cyan/25 flex flex-col justify-between"
              >
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
                    Target: {metric.targetDisplay}
                  </p>
                  <p className="text-[11px] text-brand-cyan/70 mt-1">
                    Score: {metric.score} / {metric.maxScore}
                  </p>
                </div>
                <p className="text-[11px] text-typography-bodyDark dark:text-[#CBD8F1] mt-3 pt-2 border-t border-white/5">
                  {metric.feedback}
                </p>
              </Card>
            ))}
          </div>

          {/* Actionable Recommendations: 3 specific steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Areas That Need Attention */}
            <Card className="p-6 border border-amber-500/30 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>{t('financialHealth.areasToImprove')}</span>
              </h4>

              <div className="space-y-2.5">
                {(diagnostic?.areasToImprove && diagnostic.areasToImprove.length > 0
                  ? diagnostic.areasToImprove
                  : healthResult.areasToImprove
                ).map((item, idx) => (
                  <div
                    key={idx}
                    className="glass-tile p-3 border border-amber-500/20 text-xs text-typography-bodyDark dark:text-[#CBD8F1] leading-relaxed"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommended Next Actions (3 specific steps) */}
            <Card className="p-6 border border-brand-teal/30 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" />
                <span>{t('financialHealth.actionSteps')}</span>
              </h4>

              <div className="space-y-2.5">
                {(diagnostic?.actionSteps && diagnostic.actionSteps.length > 0
                  ? diagnostic.actionSteps.slice(0, 3)
                  : healthResult.recommendedActions.slice(0, 3)
                ).map((action, idx) => (
                  <div
                    key={idx}
                    className="glass-tile p-3 border border-brand-teal/20 text-xs text-white leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-brand-teal font-bold">{idx + 1}.</span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* AI Roast Section Toggle */}
          <Card className="p-6 border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-transparent to-brand-cyan/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Roast My Financial Habits 🔥</span>
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
                {roastMode ? 'Hide AI Roast' : 'Roast My Financial Habits 🔥'}
              </button>
            </div>

            {/* Roast Box */}
            {roastMode && (
              <div className="p-5 rounded-2xl glass-tile border border-amber-500/40 space-y-3 animate-in fade-in duration-200">
                {diagnostic?.roast ? (
                  <>
                    <p className="text-sm font-medium text-white leading-relaxed italic">
                      "{diagnostic.roast}"
                    </p>
                    {diagnostic.roastPunchline && (
                      <p className="text-xs font-bold text-amber-400 pt-1">
                        💡 {diagnostic.roastPunchline}
                      </p>
                    )}

                    <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <p className="text-[10px] text-typography-muted">
                        Just for fun — not real financial advice.
                      </p>
                      <button
                        type="button"
                        onClick={handleCopyRoast}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-tile text-xs text-brand-cyan hover:border-brand-cyan transition-colors"
                      >
                        {copiedRoast ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-brand-teal" />
                            <span>Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Roast</span>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-amber-300">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Brewing your constructive financial roast...</span>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
