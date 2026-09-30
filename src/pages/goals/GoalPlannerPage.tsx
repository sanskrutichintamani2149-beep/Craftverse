import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Target,
  Plus,
  Trash2,
  Calendar,
  CheckCircle2,
  Bot,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useFinancialData, UserGoal } from '@/context/FinancialDataContext';
import { calculateGoalPlan, GoalPlanResult } from '@/utils/calculations';
import { formatINR } from '@/utils/formatters';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

export const GoalPlannerPage: React.FC = () => {
  const { t } = useTranslation();
  const { goals, addGoal, deleteGoal, salaryBreakdown } = useFinancialData();

  // Form State for new goal
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState<string>('');
  const [currentSavings, setCurrentSavings] = useState<string>('');
  const [targetMonths, setTargetMonths] = useState<number>(6);

  // Active Interactive Goal for dynamic slider recalculation
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [sliderAmount, setSliderAmount] = useState<number>(100000);
  const [sliderCurrent, setSliderCurrent] = useState<number>(15000);
  const [sliderMonths, setSliderMonths] = useState<number>(6);

  const activePlan: GoalPlanResult = calculateGoalPlan(sliderAmount, sliderCurrent, sliderMonths);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(targetAmount);
    const curr = parseFloat(currentSavings) || 0;
    if (!goalName.trim() || isNaN(amount) || amount <= 0) return;

    addGoal({
      name: goalName.trim(),
      targetAmount: amount,
      currentSavings: curr,
      targetMonths: Math.max(1, targetMonths),
    });

    // Reset Form
    setGoalName('');
    setTargetAmount('');
    setCurrentSavings('');
    setTargetMonths(6);
  };

  const handleSelectGoalToTweak = (goal: UserGoal) => {
    setSelectedGoalId(goal.id);
    setSliderAmount(goal.targetAmount);
    setSliderCurrent(goal.currentSavings);
    setSliderMonths(goal.targetMonths);
  };

  const handleAskMentorAboutGoal = (goal: UserGoal, plan: GoalPlanResult) => {
    const prompt = `I have a financial goal "${goal.name}" for ${formatINR(plan.goalAmount)} in ${plan.targetMonths} months. I need to save ${formatINR(plan.requiredMonthlySavings)} every month. Based on my monthly take-home salary, how can I adjust my budget to achieve this?`;
    const event = new CustomEvent('open-ai-mentor', { detail: { prompt } });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">
            Target-Driven Savings
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            {t('goalPlanner.title')}
          </h1>
          <p className="text-xs sm:text-sm text-typography-bodyDark dark:text-[#A9BCD9] mt-1 max-w-2xl leading-relaxed">
            {t('goalPlanner.subtitle')}
          </p>
        </div>
      </div>

      {/* Add New Goal Card Form */}
      <Card className="p-6 md:p-8 border border-brand-cyan/35">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-brand-teal" />
          <span>Add a Financial Target</span>
        </h2>

        <form onSubmit={handleAddGoal} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="text-xs font-semibold text-white block mb-1.5">
              {t('goalPlanner.goalName')} *
            </label>
            <input
              type="text"
              required
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder={t('goalPlanner.goalNamePlaceholder')}
              className="w-full py-2.5 px-3.5 glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white block mb-1.5">
              {t('goalPlanner.targetAmount')} *
            </label>
            <input
              type="number"
              required
              min="1000"
              step="500"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="e.g. 80000"
              className="w-full py-2.5 px-3.5 glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white block mb-1.5">
              {t('goalPlanner.currentSavings')}
            </label>
            <input
              type="number"
              min="0"
              step="500"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              placeholder="e.g. 10000"
              className="w-full py-2.5 px-3.5 glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white block mb-1.5">
              {t('goalPlanner.targetMonths')} ({targetMonths} Mo)
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={targetMonths}
              onChange={(e) => setTargetMonths(Math.max(1, Number(e.target.value)))}
              className="w-full py-2.5 px-3.5 glass-input text-sm text-white"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-4 flex justify-end pt-2">
            <Button type="submit" variant="primary" size="md" withArrow={true}>
              {t('goalPlanner.calculateBtn')}
            </Button>
          </div>
        </form>
      </Card>

      {/* Goals List or Empty State */}
      {goals.length === 0 ? (
        <div className="glass-card p-12 text-center space-y-4 max-w-lg mx-auto border border-brand-cyan/25">
          <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto text-brand-cyan">
            <Target className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">{t('goalPlanner.emptyGoals')}</h3>
          <p className="text-xs text-typography-muted">
            Add a concrete milestone (e.g. emergency fund, bike, certification, travel) to calculate your required savings schedule.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white">Your Active Financial Goals</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {goals.map((goal) => {
              const plan = calculateGoalPlan(
                goal.targetAmount,
                goal.currentSavings,
                goal.targetMonths
              );
              const progressPercent = Math.min(
                100,
                goal.targetAmount > 0 ? (goal.currentSavings / goal.targetAmount) * 100 : 0
              );
              const monthlyAffordable =
                salaryBreakdown && salaryBreakdown.potentialMonthlySavings >= plan.requiredMonthlySavings;

              return (
                <Card
                  key={goal.id}
                  className="p-6 border border-brand-cyan/30 flex flex-col justify-between hover:border-brand-cyan/60 transition-all"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/25">
                          {goal.targetMonths} Months Plan
                        </span>
                        <h4 className="text-lg font-bold text-white mt-1">{goal.name}</h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteGoal(goal.id)}
                        className="p-1.5 rounded-lg text-typography-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete Goal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-typography-muted">
                          Saved: {formatINR(goal.currentSavings)}
                        </span>
                        <span className="font-semibold text-white">
                          Target: {formatINR(goal.targetAmount)} ({progressPercent.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-brand-teal transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Savings Requirement Breakdown */}
                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="glass-tile p-3 border border-brand-cyan/20">
                        <span className="text-[10px] text-typography-muted block">
                          {t('goalPlanner.requiredMonthly')}
                        </span>
                        <span className="text-base font-extrabold text-gradient">
                          {formatINR(plan.requiredMonthlySavings)}/mo
                        </span>
                      </div>
                      <div className="glass-tile p-3 border border-brand-cyan/20">
                        <span className="text-[10px] text-typography-muted block">
                          {t('goalPlanner.requiredWeekly')}
                        </span>
                        <span className="text-base font-extrabold text-white">
                          {formatINR(plan.requiredWeeklyContribution)}/wk
                        </span>
                      </div>
                    </div>

                    {/* Affordability check against salary if available */}
                    {salaryBreakdown && (
                      <div className="text-[11px] flex items-center gap-1.5 pt-1">
                        {monthlyAffordable ? (
                          <span className="text-brand-teal flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Fits in your {formatINR(salaryBreakdown.potentialMonthlySavings)} monthly savings
                          </span>
                        ) : (
                          <span className="text-amber-400 flex items-center gap-1">
                            Exceeds current potential savings ({formatINR(salaryBreakdown.potentialMonthlySavings)}/mo)
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-brand-cyan/15">
                    <button
                      type="button"
                      onClick={() => handleSelectGoalToTweak(goal)}
                      className="text-xs font-semibold text-brand-cyan hover:underline"
                    >
                      Adjust sliders live
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAskMentorAboutGoal(goal, plan)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-card text-xs font-semibold text-white hover:border-brand-teal hover:text-brand-teal transition-colors"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>Ask AI Mentor</span>
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Interactive Dynamic Goal Tweaker Box */}
          <Card className="p-6 md:p-8 border border-brand-teal/40 bg-brand-teal/5 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-teal">
                  Dynamic Recalculation Engine
                </span>
                <h4 className="text-base font-bold text-white">
                  Adjust Plan Duration & Target
                </h4>
              </div>
              <div className="text-xs font-bold text-gradient">
                Required: {formatINR(activePlan.requiredMonthlySavings)} / month
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between text-xs text-white mb-1.5">
                  <span>Target Goal Amount</span>
                  <span className="font-bold text-brand-cyan">{formatINR(sliderAmount)}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="1000000"
                  step="5000"
                  value={sliderAmount}
                  onChange={(e) => setSliderAmount(Number(e.target.value))}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-white mb-1.5">
                  <span>Current Savings Allocated</span>
                  <span className="font-bold text-brand-cyan">{formatINR(sliderCurrent)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={sliderAmount}
                  step="2000"
                  value={sliderCurrent}
                  onChange={(e) => setSliderCurrent(Number(e.target.value))}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-white mb-1.5">
                  <span>Target Timeframe</span>
                  <span className="font-bold text-brand-teal">{sliderMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={sliderMonths}
                  onChange={(e) => setSliderMonths(Number(e.target.value))}
                  className="w-full accent-brand-teal cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="glass-tile p-3">
                <span className="text-typography-muted text-[11px] block">Still to Save</span>
                <span className="font-bold text-white text-sm">{formatINR(activePlan.amountStillRequired)}</span>
              </div>
              <div className="glass-tile p-3">
                <span className="text-typography-muted text-[11px] block">Daily Savings Target</span>
                <span className="font-bold text-brand-cyan text-sm">{formatINR(activePlan.dailyRequirement)} / day</span>
              </div>
              <div className="glass-tile p-3">
                <span className="text-typography-muted text-[11px] block">Weekly Contribution</span>
                <span className="font-bold text-brand-teal text-sm">{formatINR(activePlan.requiredWeeklyContribution)} / week</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
