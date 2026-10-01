import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Target,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Bot,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
} from 'lucide-react';
import { useFinancialData, UserGoal } from '@/context/FinancialDataContext';
import { calculateGoalPlan, GoalPlanResult } from '@/utils/calculations';
import { formatINR } from '@/utils/formatters';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

export const GoalPlannerPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { goals, addGoal, deleteGoal, profile, salaryBreakdown } = useFinancialData();

  // Form State for new/editing goal - starts completely empty
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState<string>('');
  const [currentSavings, setCurrentSavings] = useState<string>('');
  const [targetMonths, setTargetMonths] = useState<string>('');

  const parsedTargetAmount = parseFloat(targetAmount) || 0;
  const parsedCurrentSavings = parseFloat(currentSavings) || 0;
  const parsedTargetMonths = parseInt(targetMonths, 10) || 0;

  // Live dynamic calculation for the active form inputs
  const livePlan = useMemo(() => {
    if (parsedTargetAmount <= 0) return null;

    const remaining = Math.max(0, parsedTargetAmount - parsedCurrentSavings);
    const months = parsedTargetMonths > 0 ? parsedTargetMonths : 1;
    const requiredMonthly = Math.ceil(remaining / months);
    const requiredWeekly = Math.ceil(requiredMonthly / 4.33);

    // Projected completion date
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + (parsedTargetMonths > 0 ? parsedTargetMonths : 0));
    const completionMonthYear = targetDate.toLocaleDateString(
      lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN',
      { month: 'long', year: 'numeric' }
    );

    // Feasibility status based on user's dashboard surplus
    let feasibilityStatus: 'REACHED' | 'ACHIEVABLE' | 'TIGHT' | 'DEFICIT' | 'NO_INCOME' = 'ACHIEVABLE';
    let feasibilityNote = '';

    if (parsedCurrentSavings >= parsedTargetAmount) {
      feasibilityStatus = 'REACHED';
      feasibilityNote = lang === 'hi'
        ? '🎉 लक्ष्य पहले ही पूरा हो चुका है! आपकी आवंटित बचत लक्ष्य राशि से अधिक है।'
        : lang === 'mr'
        ? '🎉 ध्येय आधीच पूर्ण झाले आहे! तुमची बचत लक्ष्यापेक्षा जास्त आहे.'
        : 'Goal Already Reached! Your allocated savings exceed the target.';
    } else if (!salaryBreakdown || salaryBreakdown.inHandMonthly <= 0) {
      feasibilityStatus = 'NO_INCOME';
      feasibilityNote = lang === 'hi'
        ? 'बजट व्यवहार्यता की सटीक जांच के लिए कृपया डैशबोर्ड में अपनी आय दर्ज करें।'
        : lang === 'mr'
        ? 'बजेट सुसंगतता तपासण्यासाठी कृपया डॅशबोर्डवर तुमचे उत्पन्न नोंदवा.'
        : 'Enter your income in the Dashboard to check budget feasibility.';
    } else if (requiredMonthly <= salaryBreakdown.potentialMonthlySavings) {
      feasibilityStatus = 'ACHIEVABLE';
      feasibilityNote = lang === 'hi'
        ? `✅ आपकी वर्तमान मासिक बचत (${formatINR(salaryBreakdown.potentialMonthlySavings)}/माह) के भीतर पूरी तरह साध्य।`
        : lang === 'mr'
        ? `✅ चालू मासिक बचतीच्या मर्यादेत (${formatINR(salaryBreakdown.potentialMonthlySavings)}/महिना) सहज शक्य.`
        : `Achievable within current budget (₹${Math.round(salaryBreakdown.potentialMonthlySavings).toLocaleString('en-IN')}/mo surplus available).`;
    } else if (requiredMonthly <= salaryBreakdown.inHandMonthly) {
      const cutNeeded = requiredMonthly - salaryBreakdown.potentialMonthlySavings;
      const cutPercent = ((cutNeeded / (profile.monthlyExpenses || 1)) * 100).toFixed(0);
      feasibilityStatus = 'TIGHT';
      feasibilityNote = lang === 'hi'
        ? `⚠️ बजट सीमित है — इसे पूरा करने के लिए मासिक खर्चों में ${formatINR(cutNeeded)} (~${cutPercent}%) की कटौती करनी होगी।`
        : lang === 'mr'
        ? `⚠️ कसरत करावी लागेल — दरमहा खर्चात ${formatINR(cutNeeded)} (~${cutPercent}%) कपात आवश्यक आहे.`
        : `Tight - requires reducing monthly expenses by ${formatINR(cutNeeded)} (~${cutPercent}% expense cut).`;
    } else {
      feasibilityStatus = 'DEFICIT';
      feasibilityNote = lang === 'hi'
        ? `❌ घाटा — आवश्यक मासिक बचत आपकी पूरी इन-हैंड सैलरी (${formatINR(salaryBreakdown.inHandMonthly)}) से अधिक है। कृपया समय सीमा बढ़ाएं।`
        : lang === 'mr'
        ? `❌ तुटवडा — आवश्यक मासिक बचत संपूर्ण पगारापेक्षा (${formatINR(salaryBreakdown.inHandMonthly)}) जास्त आहे. मुदत वाढवणे आवश्यक आहे.`
        : `Deficit - target requires more than your entire take-home pay (${formatINR(salaryBreakdown.inHandMonthly)}). Consider a longer timeline or additional income.`;
    }

    return {
      remaining,
      requiredMonthly,
      requiredWeekly,
      completionMonthYear,
      feasibilityStatus,
      feasibilityNote,
    };
  }, [parsedTargetAmount, parsedCurrentSavings, parsedTargetMonths, salaryBreakdown, profile.monthlyExpenses, lang]);

  const handleUseDashboardSavings = () => {
    if (profile.existingSavings && profile.existingSavings > 0) {
      setCurrentSavings(String(profile.existingSavings));
    }
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName.trim() || parsedTargetAmount <= 0) return;

    if (editingGoalId) {
      // Delete old and add updated
      deleteGoal(editingGoalId);
    }

    addGoal({
      name: goalName.trim(),
      targetAmount: parsedTargetAmount,
      currentSavings: Math.max(0, parsedCurrentSavings),
      targetMonths: Math.max(1, parsedTargetMonths || 1),
    });

    // Reset Form
    setEditingGoalId(null);
    setGoalName('');
    setTargetAmount('');
    setCurrentSavings('');
    setTargetMonths('');
  };

  const handleStartEditGoal = (goal: UserGoal) => {
    setEditingGoalId(goal.id);
    setGoalName(goal.name);
    setTargetAmount(String(goal.targetAmount));
    setCurrentSavings(String(goal.currentSavings));
    setTargetMonths(String(goal.targetMonths));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingGoalId(null);
    setGoalName('');
    setTargetAmount('');
    setCurrentSavings('');
    setTargetMonths('');
  };

  const handleAskMentorAboutGoal = (goal: UserGoal) => {
    const prompt = `I have set a financial goal: "${goal.name}" for target amount ${formatINR(goal.targetAmount)} in ${goal.targetMonths} months with ${formatINR(goal.currentSavings)} already saved. How can I optimize my monthly cash flow to ensure I achieve this target safely?`;
    const event = new CustomEvent('open-ai-mentor', { detail: { prompt } });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-blue dark:text-brand-cyan bg-brand-cyan/15 px-3 py-1 rounded-full border border-brand-cyan/30">
            {lang === 'hi' ? 'लक्ष्य-आधारित वित्तीय योजना' : lang === 'mr' ? 'ध्येय-आधारित आर्थिक नियोजन' : 'Goal-Based Financial Planner'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            {t('goalPlanner.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-[#A9BCD9] mt-1 max-w-2xl leading-relaxed">
            {t('goalPlanner.subtitle')}
          </p>
        </div>
      </div>

      {/* Goal Creation / Editing Form: Starts completely empty */}
      <Card className="p-6 md:p-8 border border-brand-blue/20 dark:border-brand-cyan/35 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-brand-blue dark:text-brand-teal" />
            <span>
              {editingGoalId
                ? lang === 'hi' ? 'वित्तीय लक्ष्य संपादित करें' : lang === 'mr' ? 'आर्थिक ध्येय संपादित करा' : 'Edit Financial Goal'
                : lang === 'hi' ? 'नया वित्तीय लक्ष्य जोड़ें' : lang === 'mr' ? 'नवीन आर्थिक ध्येय जोडा' : 'Add a New Financial Goal'}
            </span>
          </h2>
          {editingGoalId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              {lang === 'hi' ? 'रद्द करें' : lang === 'mr' ? 'रद्द करा' : 'Cancel Edit'}
            </button>
          )}
        </div>

        <form onSubmit={handleSaveGoal} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            {/* Field 1: Goal Name */}
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-white block mb-1.5">
                {lang === 'hi' ? 'लक्ष्य का नाम *' : lang === 'mr' ? 'ध्येयाचे नाव *' : 'Goal Name *'}
              </label>
              <input
                type="text"
                required
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="Enter goal name"
                className="w-full py-2.5 px-3.5 glass-input text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#6579A1]"
              />
            </div>

            {/* Field 2: Target Amount */}
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-white block mb-1.5">
                {lang === 'hi' ? 'लक्ष्य राशि (₹) *' : lang === 'mr' ? 'लक्ष्य रक्कम (₹) *' : 'Target Amount (₹) *'}
              </label>
              <input
                type="number"
                required
                min="500"
                step="500"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="Enter target amount"
                className="w-full py-2.5 px-3.5 glass-input text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#6579A1]"
              />
            </div>

            {/* Field 3: Target Timeline */}
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-white block mb-1.5">
                {lang === 'hi' ? 'समय सीमा (महीने) *' : lang === 'mr' ? 'कालावधी (महिने) *' : 'Target Timeline (Months) *'}
              </label>
              <input
                type="number"
                required
                min="1"
                max="360"
                value={targetMonths}
                onChange={(e) => setTargetMonths(e.target.value)}
                placeholder="Enter months (e.g. 12)"
                className="w-full py-2.5 px-3.5 glass-input text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#6579A1]"
              />
            </div>

            {/* Field 4: Current Savings Allocated */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-white block">
                  {lang === 'hi' ? 'आवंटित वर्तमान बचत (₹)' : lang === 'mr' ? 'सध्याची बचत रक्कम (₹)' : 'Current Savings Allocated (₹)'}
                </label>
              </div>
              <input
                type="number"
                min="0"
                step="500"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                placeholder="Enter current savings"
                className="w-full py-2.5 px-3.5 glass-input text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#6579A1]"
              />
              {profile.existingSavings && profile.existingSavings > 0 && (
                <button
                  type="button"
                  onClick={handleUseDashboardSavings}
                  className="text-[10px] font-bold text-brand-blue dark:text-brand-cyan hover:underline mt-1 block"
                >
                  {lang === 'hi'
                    ? `+ डैशबोर्ड बचत का उपयोग करें (${formatINR(profile.existingSavings)})`
                    : lang === 'mr'
                    ? `+ डॅशबोर्ड बचत वापरा (${formatINR(profile.existingSavings)})`
                    : `+ Use dashboard savings (${formatINR(profile.existingSavings)})`}
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Live Calculation Card: Appears as user enters numbers */}
          {livePlan && (
            <div className="p-4 md:p-5 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 space-y-3 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue dark:text-brand-cyan flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'लाइव गणना और व्यवहार्यता' : lang === 'mr' ? 'थेट हिशोब व सुसंगतता' : 'Live Recalculation & Feasibility'}</span>
                </span>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {lang === 'hi' ? 'अनुमानित पूर्णता:' : lang === 'mr' ? 'अपेक्षित पूर्णता:' : 'Estimated Completion:'} <strong>{livePlan.completionMonthYear}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="glass-tile p-3 rounded-xl border border-brand-cyan/20">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-typography-muted block">
                    {lang === 'hi' ? 'आवश्यक मासिक बचत' : lang === 'mr' ? 'लागणारी मासिक बचत' : 'Required Monthly Savings'}
                  </span>
                  <span className="text-lg font-black text-gradient">
                    {formatINR(livePlan.requiredMonthly)} / mo
                  </span>
                </div>
                <div className="glass-tile p-3 rounded-xl border border-brand-cyan/20">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-typography-muted block">
                    {lang === 'hi' ? 'साप्ताहिक योगदान' : lang === 'mr' ? 'साप्ताहिक बचत' : 'Weekly Contribution'}
                  </span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    {formatINR(livePlan.requiredWeekly)} / wk
                  </span>
                </div>
                <div className="glass-tile p-3 rounded-xl border border-brand-cyan/20">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-typography-muted block">
                    {lang === 'hi' ? 'शेष बचत राशि' : lang === 'mr' ? 'शिल्लक बचत रक्कम' : 'Remaining Required'}
                  </span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    {formatINR(livePlan.remaining)}
                  </span>
                </div>
              </div>

              <div className="text-xs font-medium pt-1">
                <p className={`${
                  livePlan.feasibilityStatus === 'ACHIEVABLE' || livePlan.feasibilityStatus === 'REACHED'
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : livePlan.feasibilityStatus === 'TIGHT'
                    ? 'text-amber-700 dark:text-amber-300'
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  {livePlan.feasibilityNote}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" size="md">
              {editingGoalId
                ? lang === 'hi' ? 'लक्ष्य अपडेट करें' : lang === 'mr' ? 'ध्येय अपडेट करा' : 'Update Goal'
                : lang === 'hi' ? 'लक्ष्य सेव करें' : lang === 'mr' ? 'ध्येय सेव्ह करा' : 'Save Goal to Roadmap'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Goals List or Empty State */}
      {goals.length === 0 ? (
        <div className="glass-card p-12 text-center space-y-4 max-w-lg mx-auto border border-brand-blue/20 dark:border-brand-cyan/25">
          <div className="w-16 h-16 rounded-2xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center mx-auto text-brand-blue dark:text-brand-cyan">
            <Target className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'अभी तक कोई लक्ष्य नहीं' : lang === 'mr' ? 'अद्याप कोणतेही ध्येय नाही' : 'No Goals Saved Yet'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-typography-muted leading-relaxed">
            {lang === 'hi'
              ? 'अपनी बचत योजना की रूपरेखा बनाने के लिए ऊपर दिए गए फॉर्म से अपना पहला वित्तीय लक्ष्य (जैसे इमरजेंसी फंड, शिक्षा या वाहन) जोड़ें।'
              : lang === 'mr'
              ? 'तुमच्या बचतीचा मार्ग आखण्यासाठी वरील फॉर्ममधून पहिले ध्येय (उदा. इमर्जन्सी फंड, उच्च शिक्षण) जोडा.'
              : 'Add a concrete milestone using the form above to calculate your required savings schedule.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{lang === 'hi' ? 'आपके सक्रिय वित्तीय लक्ष्य' : lang === 'mr' ? 'तुमची चालू आर्थिक ध्येये' : 'Your Active Financial Goals'}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-cyan/15 text-brand-blue dark:text-brand-cyan">
                {goals.length}
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {goals.map((goal) => {
              const remaining = Math.max(0, goal.targetAmount - goal.currentSavings);
              const months = Math.max(1, goal.targetMonths);
              const reqMonthly = Math.ceil(remaining / months);
              const progressPercent = Math.min(
                100,
                goal.targetAmount > 0 ? (goal.currentSavings / goal.targetAmount) * 100 : 0
              );

              const isReached = goal.currentSavings >= goal.targetAmount;
              const isAffordable = salaryBreakdown && salaryBreakdown.potentialMonthlySavings >= reqMonthly;

              return (
                <Card
                  key={goal.id}
                  className="p-6 border border-brand-blue/20 dark:border-brand-cyan/30 flex flex-col justify-between hover:border-brand-cyan transition-all"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue dark:text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/25">
                          {goal.targetMonths} {lang === 'hi' ? 'महीने की योजना' : lang === 'mr' ? 'महिन्यांची योजना' : 'Months Plan'}
                        </span>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{goal.name}</h4>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleStartEditGoal(goal)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-brand-blue dark:hover:text-brand-cyan transition-colors"
                          title="Edit Goal"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteGoal(goal.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-500 transition-colors"
                          title="Delete Goal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600 dark:text-typography-muted">
                          Saved: <strong>{formatINR(goal.currentSavings)}</strong>
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          Target: {formatINR(goal.targetAmount)} ({progressPercent.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-teal transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Savings Requirement Breakdown */}
                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="glass-tile p-3 border border-brand-blue/15 dark:border-brand-cyan/20">
                        <span className="text-[10px] text-slate-500 dark:text-typography-muted block">
                          {lang === 'hi' ? 'आवश्यक मासिक बचत' : lang === 'mr' ? 'लागणारी मासिक बचत' : 'Required Monthly'}
                        </span>
                        <span className="text-base font-extrabold text-gradient">
                          {isReached ? '₹0' : `${formatINR(reqMonthly)}/mo`}
                        </span>
                      </div>
                      <div className="glass-tile p-3 border border-brand-blue/15 dark:border-brand-cyan/20">
                        <span className="text-[10px] text-slate-500 dark:text-typography-muted block">
                          {lang === 'hi' ? 'शेष आवश्यक राशि' : lang === 'mr' ? 'शिल्लक आवश्यक रक्कम' : 'Amount Remaining'}
                        </span>
                        <span className="text-base font-extrabold text-slate-900 dark:text-white">
                          {formatINR(remaining)}
                        </span>
                      </div>
                    </div>

                    {/* Budget Feasibility indicator */}
                    <div className="text-[11px] pt-1">
                      {isReached ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{lang === 'hi' ? 'लक्ष्य पूरा हो चुका है!' : lang === 'mr' ? 'ध्येय पूर्ण झाले आहे!' : 'Target already reached!'}</span>
                        </span>
                      ) : salaryBreakdown ? (
                        isAffordable ? (
                          <span className="text-brand-teal font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{lang === 'hi' ? 'वर्तमान मासिक बचत के भीतर साध्य' : lang === 'mr' ? 'चालू बचतीमध्ये शक्य' : 'Fits comfortably in monthly surplus'}</span>
                          </span>
                        ) : (
                          <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{lang === 'hi' ? 'वर्तमान बचत से अधिक (खर्च में कटौती आवश्यक)' : lang === 'mr' ? 'चालू बचतीपेक्षा जास्त (खर्चात कपात हवी)' : 'Exceeds current potential savings'}</span>
                          </span>
                        )
                      ) : null}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-200 dark:border-brand-cyan/15">
                    <button
                      type="button"
                      onClick={() => handleStartEditGoal(goal)}
                      className="text-xs font-semibold text-brand-blue dark:text-brand-cyan hover:underline"
                    >
                      {lang === 'hi' ? 'लक्ष्य समायोजित करें' : lang === 'mr' ? 'बदल करा' : 'Adjust Target'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAskMentorAboutGoal(goal)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-card text-xs font-semibold text-slate-800 dark:text-white hover:border-brand-teal hover:text-brand-teal transition-colors"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>Ask AI Mentor</span>
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
