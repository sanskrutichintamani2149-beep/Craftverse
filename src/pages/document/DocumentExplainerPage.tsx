import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FileText,
  UploadCloud,
  Loader2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Bot,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { apiClient, ExplainDocumentResponse } from '@/services/api/client';
import { useFinancialData } from '@/context/FinancialDataContext';

export const DocumentExplainerPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { addDocumentExplanation } = useFinancialData();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docLanguage, setDocLanguage] = useState(i18n.language || 'en');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ExplainDocumentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select or drag a document first.');
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      const data = await apiClient.explainDocument(selectedFile, docLanguage);
      setResult(data);

      addDocumentExplanation({
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        documentType: data.documentType,
        summary: data.summary,
        importantAmounts: data.importantAmounts,
        deductions: data.deductions,
        criticalDates: data.criticalDates,
        keyTerms: data.keyTerms,
        takeaways: data.takeaways,
        analyzedAt: new Date().toISOString(),
      });
    } catch {
      setError('Failed to analyze document. Please check the file and try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleAskMentorAboutDoc = () => {
    if (!result) return;
    const prompt = `I uploaded a ${result.documentType}. It contains key amounts: ${result.importantAmounts.map((a) => `${a.label}: ${a.amount}`).join(', ')}. Can you explain what clauses I should be careful about?`;
    const event = new CustomEvent('open-ai-mentor', { detail: { prompt } });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">
          Document Intelligence
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          {t('documentExplainer.title')}
        </h1>
        <p className="text-xs sm:text-sm text-typography-bodyDark dark:text-[#A9BCD9] mt-1 max-w-2xl leading-relaxed">
          {t('documentExplainer.subtitle')}
        </p>
      </div>

      {/* Upload Zone & Configuration Card */}
      <Card className="p-6 md:p-8 border border-brand-cyan/35 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-brand-cyan" />
            <h2 className="text-sm font-bold text-white">Upload Financial Document</h2>
          </div>

          {/* Explanation Language Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-typography-muted">{t('documentExplainer.selectLanguage')}:</span>
            <select
              value={docLanguage}
              onChange={(e) => setDocLanguage(e.target.value)}
              className="py-1.5 px-3 glass-input text-xs text-white bg-[#071433]"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
            </select>
          </div>
        </div>

        {/* Dropzone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-brand-cyan/35 hover:border-brand-cyan rounded-2xl p-8 text-center bg-brand-blue/5 hover:bg-brand-blue/10 transition-all cursor-pointer relative"
        >
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan/15 text-brand-cyan flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>

            {selectedFile ? (
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">{selectedFile.name}</p>
                <p className="text-xs text-brand-teal">
                  {(selectedFile.size / 1024).toFixed(1)} KB • Ready to analyze
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">
                  {t('documentExplainer.dropPrompt')}
                </p>
                <p className="text-xs text-typography-muted">
                  {t('documentExplainer.fileTypes')}
                </p>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            variant="primary"
            size="md"
            withArrow={true}
            isLoading={analyzing}
            disabled={!selectedFile || analyzing}
            onClick={handleAnalyze}
          >
            {analyzing ? t('documentExplainer.analyzing') : t('documentExplainer.explainBtn')}
          </Button>
        </div>
      </Card>

      {/* Analysis Results Display */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header Summary */}
          <Card className="p-6 md:p-8 border border-brand-teal/40 bg-brand-teal/5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-brand-teal/15 px-2.5 py-1 rounded-md border border-brand-teal/30">
                  {result.documentType}
                </span>
                <h3 className="text-xl font-bold text-white mt-1.5">
                  Beginner-Friendly Document Analysis
                </h3>
              </div>
              <Button
                variant="secondary"
                size="sm"
                icon={<Bot className="w-4 h-4 text-brand-cyan" />}
                onClick={handleAskMentorAboutDoc}
              >
                Discuss Document with Mentor
              </Button>
            </div>

            <p className="text-sm text-typography-bodyDark dark:text-[#CBD8F1] leading-relaxed">
              {result.summary}
            </p>
          </Card>

          {/* 2-Column: Key Amounts & Deductions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Amounts */}
            <Card className="p-6 border border-brand-cyan/30 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-brand-cyan" />
                <span>{t('documentExplainer.importantAmounts')}</span>
              </h4>

              <div className="space-y-3">
                {result.importantAmounts.map((item, idx) => (
                  <div key={idx} className="glass-tile p-3 border border-brand-cyan/20">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-white">{item.label}</span>
                      <span className="font-extrabold text-brand-cyan">{item.amount}</span>
                    </div>
                    <p className="text-[11px] text-typography-muted mt-1 leading-snug">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Deductions & Charges */}
            <Card className="p-6 border border-amber-500/30 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>{t('documentExplainer.importantDeductions')}</span>
              </h4>

              <div className="space-y-3">
                {result.deductions.map((item, idx) => (
                  <div key={idx} className="glass-tile p-3 border border-amber-500/20">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-white">{item.label}</span>
                      <span className="font-extrabold text-amber-400">{item.amount}</span>
                    </div>
                    <p className="text-[11px] text-typography-muted mt-1 leading-snug">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Dates & Takeaways */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Important Dates */}
            <Card className="p-6 border border-brand-cyan/30 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-teal" />
                <span>{t('documentExplainer.criticalDates')}</span>
              </h4>

              <div className="space-y-2">
                {result.criticalDates.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-2 border-b border-white/5">
                    <span className="text-typography-muted">{item.label}</span>
                    <span className="font-semibold text-white">{item.date}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* What you must understand */}
            <Card className="p-6 border border-brand-cyan/30 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" />
                <span>{t('documentExplainer.whatYouShouldKnow')}</span>
              </h4>

              <ul className="space-y-2 text-xs text-typography-bodyDark dark:text-[#A9BCD9]">
                {result.takeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-brand-teal mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Key Financial Terms in this document */}
          <Card className="p-6 border border-brand-cyan/30 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cyan flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{t('documentExplainer.keyTermsFound')}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.keyTerms.map((term, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl glass-tile text-xs font-medium text-white border border-brand-cyan/25"
                >
                  {term}
                </span>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
