import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Bot,
  X,
  Maximize2,
  Send,
  Loader2,
  Sparkles,
  Info,
} from 'lucide-react';
import { useFinancialData } from '@/context/FinancialDataContext';
import { apiClient } from '@/services/api/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AiMentorDrawer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { profile, salaryBreakdown, goals, termCalculations } = useFinancialData();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    'How can I save more under the New Tax Regime?',
    'What should my emergency fund target be?',
    'Explain the difference between CTC and Net Take-Home',
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Listen for global custom events to open mentor (e.g. from "Explain this result" button)
  useEffect(() => {
    const handleOpenMentorEvent = (e: CustomEvent<{ prompt?: string }>) => {
      setIsOpen(true);
      if (e.detail?.prompt) {
        handleSendMessage(e.detail.prompt);
      }
    };

    window.addEventListener('open-ai-mentor' as any, handleOpenMentorEvent as any);
    return () => {
      window.removeEventListener('open-ai-mentor' as any, handleOpenMentorEvent as any);
    };
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
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
          content: 'I could not connect to the financial advisory service. Please check your network or try again shortly.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleExpandToPage = () => {
    setIsOpen(false);
    navigate('/mentor');
  };

  return (
    <>
      {/* Floating "Ask AI Mentor" Launcher */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full btn-gradient text-white font-bold text-xs md:text-sm flex items-center gap-2.5 shadow-[0_6px_25px_rgba(19,70,224,0.5),0_0_20px_rgba(25,227,192,0.4)] hover:scale-105 transition-all select-none group"
          aria-label="Open AI Mentor"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          </div>
          <span>{t('nav.askMentor')}</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal" />
          </span>
        </button>
      )}

      {/* Side Panel Drawer */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[440px] z-50 glass-card bg-[#040A1C]/95 dark:bg-[#040A1C]/95 border-l border-brand-cyan/40 shadow-2xl flex flex-col animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="p-4 px-5 border-b border-brand-cyan/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-teal flex items-center justify-center text-white shadow-[0_0_12px_rgba(18,184,255,0.4)]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{t('mentor.title')}</span>
                  <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
                </h3>
                <p className="text-[11px] text-brand-cyan/75">
                  Contextual • Grounded in Indian Finance
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleExpandToPage}
                title="Expand to Full Page"
                className="p-1.5 text-typography-muted hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-typography-muted hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Connected Context Badge */}
          <div className="px-5 py-2 bg-brand-blue/15 border-b border-brand-cyan/15 flex items-center justify-between text-[11px]">
            <span className="text-brand-cyan font-medium flex items-center gap-1">
              <Info className="w-3 h-3" />
              {profile.annualCtc
                ? `Connected: ₹${profile.annualCtc.toLocaleString('en-IN')} CTC`
                : 'No salary added in Dashboard'}
            </span>
            <span className="text-typography-muted">
              {goals.length} Goals Active
            </span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto text-brand-cyan">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">How can I help you today?</h4>
                  <p className="text-xs text-typography-muted max-w-xs mx-auto">
                    Ask me to analyze your salary deductions, explain tax regimes, or calculate practical goals.
                  </p>
                </div>

                {/* Suggested prompt chips */}
                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-semibold text-brand-cyan/80 uppercase tracking-wider">
                    Suggested Questions
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(q)}
                        className="text-left text-xs p-2.5 rounded-xl glass-tile hover:border-brand-cyan text-typography-bodyDark hover:text-white transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-md rounded-br-none'
                        : 'glass-tile border border-brand-cyan/30 text-typography-bodyDark dark:text-[#D1E0FC] rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="glass-tile p-3.5 rounded-2xl border border-brand-cyan/30 flex items-center gap-2 text-xs text-brand-cyan">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing financial context...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Disclaimer */}
          <div className="px-4 py-1.5 text-center text-[10px] text-typography-muted border-t border-brand-cyan/10">
            {t('mentor.disclaimer')}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#040A1C]/90 border-t border-brand-cyan/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t('mentor.placeholder')}
                className="flex-1 py-2.5 px-3.5 glass-input text-xs text-white placeholder:text-typography-muted"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || loading}
                className="p-2.5 rounded-xl btn-gradient text-white disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
