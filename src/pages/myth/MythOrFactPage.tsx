import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Scale,
  Upload,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bot,
  RotateCcw,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { apiClient, MythFactResponse } from '@/services/api/client';
import { useFinancialData } from '@/context/FinancialDataContext';

export const MythOrFactPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { addMythFactVerification } = useFinancialData();

  const [claimText, setClaimText] = useState('');
  const [claimImage, setClaimImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MythFactResponse | null>(null);

  // Exact 5 locked chips from Item 9
  const sampleClaims = [
    'Paying only the minimum due on a credit card is fine',
    'Credit cards ruin your CIBIL score',
    'SIP guarantees returns in 5 years',
    'Term insurance is a waste if you survive',
    '6 months emergency fund is mandatory',
  ];

  const handleVerify = async (textToVerify?: string) => {
    const claim = textToVerify || claimText;
    if (!claim.trim() && !claimImage) return;

    setLoading(true);
    try {
      const data = await apiClient.verifyMythFact(claim, claimImage || undefined, i18n.language);
      setResult(data);

      addMythFactVerification({
        claim: claim || `[Image: ${claimImage?.name}]`,
        verdict: data.verdict,
        confidence: data.confidence,
        explanation: data.explanation,
        reasoning: data.reasoning,
        sources: data.sources,
        verifiedAt: new Date().toISOString(),
      });
    } catch {
      // Error handled gracefully
    } finally {
      setLoading(false);
    }
  };

  const handleAskMentorAboutClaim = () => {
    if (!result) return;
    const prompt = `I verified the claim: "${claimText || 'Uploaded claim'}". The verdict is ${result.verdict} (${result.confidence}% confidence). Can you elaborate on the underlying Indian financial regulations and practical implications?`;
    navigate('/mentor', { state: { initialPrompt: prompt } });
  };

  const handleReset = () => {
    setClaimText('');
    setClaimImage(null);
    setResult(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">
          AI Claim Verification
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          {t('mythOrFact.title')}
        </h1>
        <p className="text-xs sm:text-sm text-typography-bodyDark dark:text-[#A9BCD9] mt-1 max-w-2xl leading-relaxed">
          {t('mythOrFact.subtitle')}
        </p>
      </div>

      {/* Input Card */}
      <Card className="p-6 md:p-8 border border-brand-cyan/35 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-white block">
            {t('mythOrFact.enterClaim')}
          </label>
          <textarea
            rows={3}
            value={claimText}
            onChange={(e) => setClaimText(e.target.value)}
            placeholder={t('mythOrFact.claimPlaceholder')}
            className="w-full py-3 px-4 glass-input text-sm text-white resize-none"
          />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-typography-muted uppercase tracking-wider block">
            Common Financial Claims to Verify:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleClaims.map((claim, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setClaimText(claim);
                  handleVerify(claim);
                }}
                className="text-left text-xs py-1.5 px-3 rounded-xl glass-tile hover:border-brand-cyan text-typography-bodyDark hover:text-white transition-all border border-brand-cyan/20"
              >
                "{claim}"
              </button>
            ))}
          </div>
        </div>

        {/* Optional Image Upload & Action Bar */}
        <div className="pt-2 border-t border-brand-cyan/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label className="inline-flex items-center gap-2 text-xs text-brand-cyan cursor-pointer hover:underline">
            <Upload className="w-4 h-4" />
            <span>
              {claimImage ? `Attached: ${claimImage.name}` : t('mythOrFact.orUploadImage')}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setClaimImage(e.target.files[0]);
                  if (!claimText) {
                    setClaimText(`[Image: ${e.target.files[0].name}]`);
                  }
                }
              }}
            />
          </label>

          <div className="flex items-center gap-3">
            {(claimText || claimImage) && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-typography-muted hover:text-white flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

            <Button
              type="button"
              variant="primary"
              size="md"
              withArrow={true}
              isLoading={loading}
              disabled={(!claimText.trim() && !claimImage) || loading}
              onClick={() => handleVerify()}
            >
              {loading ? t('mythOrFact.verifying') : t('mythOrFact.checkBtn')}
            </Button>
          </div>
        </div>
      </Card>

      {/* Verification Output Result */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <Card
            className={`p-6 md:p-8 border ${
              result.verdict === 'FACT'
                ? 'border-brand-teal/50 bg-brand-teal/5'
                : result.verdict === 'MYTH'
                ? 'border-red-500/50 bg-red-500/5'
                : 'border-amber-500/50 bg-amber-500/5'
            }`}
          >
            {/* Header Verdict & Confidence */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    result.verdict === 'FACT'
                      ? 'bg-brand-teal/20 text-brand-teal'
                      : result.verdict === 'MYTH'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {result.verdict === 'FACT' ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : result.verdict === 'MYTH' ? (
                    <XCircle className="w-7 h-7" />
                  ) : (
                    <HelpCircle className="w-7 h-7" />
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-typography-muted">
                    {t('mythOrFact.verdict')}
                  </span>
                  <h3
                    className={`text-2xl font-extrabold tracking-tight ${
                      result.verdict === 'FACT'
                        ? 'text-brand-teal'
                        : result.verdict === 'MYTH'
                        ? 'text-red-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {result.verdict}
                  </h3>
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="flex items-center gap-3 glass-card px-4 py-2.5 rounded-2xl">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-typography-muted block">
                    {t('mythOrFact.confidence')}
                  </span>
                  <span className="text-sm font-extrabold text-brand-cyan">
                    {result.confidence}%
                  </span>
                </div>
                <div className="w-16 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-brand-cyan"
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Explanation & Mechanism */}
            <div className="space-y-4 pt-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                  {t('mythOrFact.explanation')}
                </h4>
                <p className="text-sm md:text-base text-white font-medium leading-relaxed">
                  {result.explanation}
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-tile border border-brand-cyan/25 space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cyan">
                  {t('mythOrFact.reasoning')}
                </h4>
                <p className="text-xs text-typography-bodyDark dark:text-[#A9BCD9] leading-relaxed">
                  {result.reasoning}
                </p>
              </div>

              {/* Authoritative Sources */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-typography-muted mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{t('mythOrFact.sources')}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.sources.map((source, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-brand-blue/20 text-brand-cyan border border-brand-cyan/30"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions: Check Another Claim & Discuss with AI Mentor */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <Button
                variant="secondary"
                size="sm"
                icon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={handleReset}
              >
                Check Another Claim
              </Button>

              <Button
                variant="primary"
                size="sm"
                icon={<Bot className="w-4 h-4" />}
                onClick={handleAskMentorAboutClaim}
              >
                Discuss with AI Mentor
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
