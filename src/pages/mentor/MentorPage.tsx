import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Bot,
  Send,
  Loader2,
  Sparkles,
  Info,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useFinancialData } from '@/context/FinancialDataContext';
import { apiClient } from '@/services/api/client';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { formatINR } from '@/utils/formatters';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const MentorPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { profile, salaryBreakdown, goals, termCalculations } = useFinancialData();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    'How should I invest my potential monthly savings?',
    'Explain the New vs Old Tax Regime based on my salary',
    'How much should I keep in my emergency fund?',
    'What happens if my salary increases by 20%?',
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    const prompt = location.state?.initialPrompt;
    if (prompt) {
      handleSend(prompt);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const handleCustomEvent = (e: any) => {
      if (e.detail?.prompt) {
        handleSend(e.detail.prompt);
      }
    };
    window.addEventListener('open-ai-mentor', handleCustomEvent);
    return () => window.removeEventListener('open-ai-mentor', handleCustomEvent);
  }, []);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: query };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const response = await apiClient.askMentor({
        message: query,
        history: messages,
        userContext: {
          jobTitle: profile.jobTitle,
          annualCtc: profile.annualCtc,
          monthlyInHand: salaryBreakdown?.inHandMonthly,
          monthlyExpenses: profile.monthlyExpenses,
          existingSavings: profile.existingSavings,
          goalsCount: goals.length,
          recentCalculations: termCalculations.slice(0, 3).map((c) => ({
            term: c.termName,
            result: JSON.stringify(c.outputs),
          })),
        },
        language: i18n.language,
      });

      setMessages([...updatedMessages, { role: 'assistant', content: response.reply }]);
      if (response.suggestedQuestions) {
        setSuggestedQuestions(response.suggestedQuestions);
      }
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: 'Unable to connect to the AI Mentor service. Please verify your connection or try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto h-[calc(100vh-8.5rem)] flex flex-col animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">
            Full Experience
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            {t('mentor.title')}
          </h1>
          <p className="text-xs text-typography-bodyDark dark:text-[#A9BCD9]">
            {t('mentor.subtitle')}
          </p>
        </div>

        {/* Connected Context Badge */}
        <div className="glass-card px-4 py-2 text-xs flex items-center gap-2 border border-brand-cyan/30 shrink-0">
          <Info className="w-4 h-4 text-brand-cyan" />
          <span className="text-white font-medium">
            {profile.annualCtc ? `${formatINR(profile.annualCtc)} CTC Connected` : 'No Profile CTC set'}
          </span>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 border border-brand-cyan/35 flex flex-col overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-teal flex items-center justify-center text-white shadow-[0_0_25px_rgba(18,184,255,0.4)]">
                <Bot className="w-8 h-8" />
              </div>

              <div className="space-y-1.5 max-w-md">
                <h3 className="text-xl font-bold text-white">
                  Welcome to Your AI Financial Companion
                </h3>
                <p className="text-xs text-typography-muted leading-relaxed">
                  I connect your actual CTC breakdown, savings goals, and calculations into personalized educational guidance. Ask me anything!
                </p>
              </div>

              {/* Prompt Suggestions */}
              <div className="w-full max-w-xl space-y-2 pt-4">
                <p className="text-[11px] font-bold text-brand-cyan uppercase tracking-wider text-left">
                  {t('mentor.askAbout')}:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(q)}
                      className="p-3 rounded-xl glass-tile text-xs text-white hover:border-brand-cyan hover:bg-white/5 transition-all flex items-center justify-between group"
                    >
                      <span className="line-clamp-2">{q}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-cyan/70 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-md rounded-br-none'
                      : 'glass-tile border border-brand-cyan/30 text-white rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="glass-tile p-4 rounded-2xl border border-brand-cyan/30 flex items-center gap-2 text-xs text-brand-cyan">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI Mentor is analyzing your financial records...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Disclaimer Footer */}
        <div className="px-6 py-2 bg-brand-dark/40 border-t border-brand-cyan/15 text-center text-[10px] text-typography-muted flex items-center justify-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{t('mentor.disclaimer')}</span>
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-[#040A1C]/95 border-t border-brand-cyan/25">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={t('mentor.placeholder')}
              className="flex-1 py-3 px-4 glass-input text-sm text-white placeholder:text-typography-muted"
              disabled={loading}
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!inputMessage.trim() || loading}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
