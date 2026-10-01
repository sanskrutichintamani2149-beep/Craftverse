import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Wallet,
  TrendingUp,
  Percent,
  PiggyBank,
  Check,
  Bot,
  HelpCircle,
  Building2,
  MapPin,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Line,
  ComposedChart,
  Legend,
} from 'recharts';
import { useFinancialData } from '@/context/FinancialDataContext';
import { formatINR, formatCompactINR } from '@/utils/formatters';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

export const DashboardPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { profile, salaryBreakdown, updateFinancialProfile } = useFinancialData();

  // Form State
  const [jobTitle, setJobTitle] = useState(profile.jobTitle || '');
  const [annualCtc, setAnnualCtc] = useState<string>(
    profile.annualCtc ? String(profile.annualCtc) : ''
  );
  const [location, setLocation] = useState(profile.location || '');
  const [age, setAge] = useState<string>(profile.age ? String(profile.age) : '');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>(
    profile.monthlyExpenses ? String(profile.monthlyExpenses) : ''
  );
  const [existingSavings, setExistingSavings] = useState<string>(
    profile.existingSavings ? String(profile.existingSavings) : ''
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const ctcNum = parseFloat(annualCtc);
    const expNum = parseFloat(monthlyExpenses);
    const savNum = parseFloat(existingSavings);
    const ageNum = parseInt(age, 10);

    updateFinancialProfile({
      jobTitle: jobTitle.trim() || undefined,
      annualCtc: isNaN(ctcNum) ? 0 : Math.max(0, ctcNum),
      location: location.trim() || undefined,
      age: isNaN(ageNum) ? undefined : ageNum,
      monthlyExpenses: isNaN(expNum) ? 0 : Math.max(0, expNum),
      existingSavings: isNaN(savNum) ? 0 : Math.max(0, savNum),
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExplainSalaryWithMentor = () => {
    if (!salaryBreakdown) return;
    const prompt = `Can you explain my salary breakdown in detail? My annual CTC is ₹${salaryBreakdown.ctc.toLocaleString('en-IN')}, monthly gross is ₹${Math.round(salaryBreakdown.grossSalaryMonthly).toLocaleString('en-IN')}, deductions are ₹${Math.round(salaryBreakdown.totalDeductionsMonthly).toLocaleString('en-IN')}, and my net in-hand is ₹${Math.round(salaryBreakdown.inHandMonthly).toLocaleString('en-IN')}.`;
    const event = new CustomEvent('open-ai-mentor', { detail: { prompt } });
    window.dispatchEvent(event);
  };

  // 12-Month Projection Data: Month 1 = starting savings + (income - expenses), Month 2-12 = prev cumulative + net monthly
  const monthlyIncome = salaryBreakdown?.inHandMonthly || 0;
  const monthlyExp = profile.monthlyExpenses || 0;
  const netMonthlySavings = Math.max(0, monthlyIncome - monthlyExp);
  const startingSavings = profile.existingSavings || 0;

  const projectionData = salaryBreakdown
    ? Array.from({ length: 12 }, (_, i) => {
        const monthNum = i + 1;
        const cumulativeSavings = startingSavings + (netMonthlySavings * monthNum);
        return {
          month: lang === 'hi' ? `माह ${monthNum}` : lang === 'mr' ? `महिना ${monthNum}` : `M${monthNum}`,
          income: Math.round(monthlyIncome),
          expenses: Math.round(monthlyExp),
          monthlySavings: Math.round(netMonthlySavings),
          cumulativeSavings: Math.round(cumulativeSavings),
        };
      })
    : [];

  const pieData = salaryBreakdown
    ? [
        { name: 'In-Hand Take Home', value: Math.round(salaryBreakdown.inHandMonthly), color: '#19E3C0' },
        { name: 'Income Tax (TDS)', value: Math.round(salaryBreakdown.incomeTaxMonthly), color: '#3B82F6' },
        { name: 'Employee PF', value: Math.round(salaryBreakdown.employeePfMonthly), color: '#12B8FF' },
        { name: 'Professional Tax', value: Math.round(salaryBreakdown.professionalTaxMonthly), color: '#93C5FD' },
      ]
    : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">
            Personal Financial Command Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            {t('dashboard.title')}
          </h1>
          <p className="text-xs sm:text-sm text-typography-bodyDark dark:text-[#A9BCD9] mt-1 max-w-2xl leading-relaxed">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {salaryBreakdown && (
          <Button
            variant="secondary"
            size="sm"
            icon={<Bot className="w-4 h-4 text-brand-cyan" />}
            onClick={handleExplainSalaryWithMentor}
          >
            Explain Breakdown with AI
          </Button>
        )}
      </div>

      {/* Input Form Card */}
      <Card className="p-6 md:p-8 border border-brand-cyan/35">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-brand-cyan/15">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-cyan/15 text-brand-cyan flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white">Your Financial Profile Inputs</h2>
          </div>
          {savedSuccess && (
            <div className="flex items-center gap-1.5 text-xs text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full border border-brand-teal/30">
              <Check className="w-3.5 h-3.5" />
              <span>Saved & Recalculated Live</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="text-xs font-semibold text-white block mb-1.5">
              {t('dashboard.annualCtc')} *
            </label>
            <input
              type="number"
              min="0"
              step="10000"
              value={annualCtc}
              onChange={(e) => setAnnualCtc(e.target.value)}
              placeholder="e.g. 800000 (Enter annual CTC)"
              required
              className="w-full py-2.5 px-4 glass-input text-sm text-white"
            />
            <p className="text-[10px] text-typography-muted mt-1">Cost to Company per annum</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-white block mb-1.5">
              {t('dashboard.monthlyExpenses')}
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              placeholder="e.g. 25000 (Rent, food, bills)"
              className="w-full py-2.5 px-4 glass-input text-sm text-white"
            />
            <p className="text-[10px] text-typography-muted mt-1">Your total monthly living costs</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-white block mb-1.5">
              {t('dashboard.existingSavings')}
            </label>
            <input
              type="number"
              min="0"
              step="5000"
              value={existingSavings}
              onChange={(e) => setExistingSavings(e.target.value)}
              placeholder="e.g. 150000 (Bank + FDs)"
              className="w-full py-2.5 px-4 glass-input text-sm text-white"
            />
            <p className="text-[10px] text-typography-muted mt-1">Total liquid bank balance</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-white block mb-1.5">
              {t('dashboard.jobTitle')}
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Frontend Engineer, Analyst"
              className="w-full py-2.5 px-4 glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white block mb-1.5">
              {t('dashboard.location')}
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Bengaluru, Mumbai, Pune"
              className="w-full py-2.5 px-4 glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white block mb-1.5">
              {t('dashboard.age')}
            </label>
            <input
              type="number"
              min="16"
              max="100"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 23"
              className="w-full py-2.5 px-4 glass-input text-sm text-white"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3 flex justify-end pt-2">
            <Button type="submit" variant="primary" size="md" withArrow={true}>
              {t('dashboard.saveDetails')}
            </Button>
          </div>
        </form>
      </Card>

      {/* Content State: Either Empty State or Real Calculated Dashboard */}
      {!salaryBreakdown ? (
        /* Strict No Fake Data Empty State */
        <div className="glass-card p-12 text-center space-y-4 max-w-lg mx-auto border border-brand-blue/20 dark:border-brand-cyan/25">
          <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto text-brand-blue dark:text-brand-cyan">
            <Wallet className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'अभी तक कोई वित्तीय डेटा नहीं' : lang === 'mr' ? 'अद्याप कोणताही आर्थिक डेटा नाही' : 'No Financial Data Yet'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-typography-muted leading-relaxed">
            {lang === 'hi'
              ? 'अपना वार्षिक सिंहावलोकन देखने के लिए अपनी आय और खर्च दर्ज करें।'
              : lang === 'mr'
              ? 'तुमचा वार्षिक आढावा पाहण्यासाठी तुमचे उत्पन्न आणि खर्च नोंदवा.'
              : 'No financial data yet. Enter your income and expenses to view your yearly overview.'}
          </p>
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              const input = document.getElementById('annualCtc');
              if (input) input.focus();
            }}
            className="btn-gradient px-4 py-2 rounded-xl text-xs font-semibold text-white"
          >
            {lang === 'hi' ? 'आय व खर्च दर्ज करें' : lang === 'mr' ? 'उत्पन्न व खर्च भरा' : 'Enter Financial Data'}
          </button>
        </div>
      ) : (
        /* Real Calculated Salary Breakdown & Overview */
        <div className="space-y-8">
          {/* Salary Breakdown Flow Banner: CTC -> Gross -> Deductions -> Take-Home */}
          <div className="glass-card p-6 border-l-4 border-l-brand-cyan border border-brand-cyan/35 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-cyan">
                  {t('dashboard.salaryBreakdown')} Flow
                </span>
                <h3 className="text-base font-extrabold text-white">
                  {t('dashboard.ctcFlow')}
                </h3>
              </div>
              <div className="text-xs text-typography-muted">
                Calculated under Indian FY 2024-25 / 2025-26 New Tax Regime
              </div>
            </div>

            {/* Visual Step-by-Step Flow Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {/* Step 1: Annual CTC */}
              <div className="glass-tile p-4 border border-brand-cyan/25">
                <span className="text-[10px] font-bold uppercase tracking-wider text-typography-muted">
                  1. Annual Package (CTC)
                </span>
                <p className="text-xl font-extrabold text-white mt-1">
                  {formatINR(salaryBreakdown.ctc)}
                </p>
                <p className="text-[11px] text-brand-cyan/75 mt-0.5">
                  ₹{Math.round(salaryBreakdown.monthlyCtc).toLocaleString('en-IN')}/mo on paper
                </p>
              </div>

              {/* Step 2: Monthly Gross */}
              <div className="glass-tile p-4 border border-brand-cyan/25">
                <span className="text-[10px] font-bold uppercase tracking-wider text-typography-muted">
                  2. Gross Salary
                </span>
                <p className="text-xl font-extrabold text-white mt-1">
                  {formatINR(salaryBreakdown.grossSalaryMonthly)}
                </p>
                <p className="text-[11px] text-typography-muted mt-0.5">
                  Basic + HRA + Allowances
                </p>
              </div>

              {/* Step 3: Total Deductions */}
              <div className="glass-tile p-4 border border-amber-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  3. Total Deductions
                </span>
                <p className="text-xl font-extrabold text-amber-400 mt-1">
                  -{formatINR(salaryBreakdown.totalDeductionsMonthly)}
                </p>
                <p className="text-[11px] text-typography-muted mt-0.5">
                  PF, PT & Income Tax (TDS)
                </p>
              </div>

              {/* Step 4: Monthly In-Hand */}
              <div className="glass-tile p-4 border border-brand-teal/40 bg-brand-teal/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal">
                  4. Monthly In-Hand
                </span>
                <p className="text-2xl font-extrabold text-gradient mt-1">
                  {formatINR(salaryBreakdown.inHandMonthly)}
                </p>
                <p className="text-[11px] text-brand-teal mt-0.5 font-medium">
                  Actual liquid bank credit
                </p>
              </div>
            </div>
          </div>

          {/* 4 Financial Overview Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 border border-brand-cyan/25">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-typography-muted">
                  {t('dashboard.inHandSalary')}
                </span>
                <Wallet className="w-4 h-4 text-brand-teal" />
              </div>
              <p className="text-2xl font-extrabold text-white">
                {formatINR(salaryBreakdown.inHandMonthly)}
              </p>
              <p className="text-[11px] text-brand-cyan/80 mt-1">
                {formatINR(salaryBreakdown.inHandAnnual)} per year
              </p>
            </Card>

            <Card className="p-5 border border-brand-cyan/25">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-typography-muted">
                  {t('dashboard.monthlyExpenses')}
                </span>
                <Percent className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-extrabold text-white">
                {formatINR(salaryBreakdown.monthlyExpenses)}
              </p>
              <p className="text-[11px] text-typography-muted mt-1">
                {salaryBreakdown.inHandMonthly > 0
                  ? `${((salaryBreakdown.monthlyExpenses / salaryBreakdown.inHandMonthly) * 100).toFixed(0)}% of in-hand`
                  : '0%'}
              </p>
            </Card>

            <Card className="p-5 border border-brand-cyan/25">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-typography-muted">
                  {t('dashboard.monthlySavings')}
                </span>
                <PiggyBank className="w-4 h-4 text-brand-cyan" />
              </div>
              <p className="text-2xl font-extrabold text-gradient">
                {formatINR(salaryBreakdown.potentialMonthlySavings)}
              </p>
              <p className="text-[11px] text-brand-cyan mt-1 font-semibold">
                {salaryBreakdown.savingsRate.toFixed(0)}% Savings Rate
              </p>
            </Card>

            <Card className="p-5 border border-brand-cyan/25">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-typography-muted">
                  {t('dashboard.existingSavings')}
                </span>
                <ShieldCheck className="w-4 h-4 text-brand-teal" />
              </div>
              <p className="text-2xl font-extrabold text-white">
                {formatINR(profile.existingSavings || 0)}
              </p>
              <p className="text-[11px] text-typography-muted mt-1">
                {profile.monthlyExpenses && profile.monthlyExpenses > 0
                  ? `${((profile.existingSavings || 0) / profile.monthlyExpenses).toFixed(1)} months buffer`
                  : 'Liquid reserves'}
              </p>
            </Card>
          </div>

          {/* Detailed Itemized Deduction Breakdown Table & Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Table */}
            <Card className="p-6 lg:col-span-7 border border-brand-cyan/30">
              <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
                <span>Detailed Monthly Salary Itemization</span>
                <span className="text-xs font-normal text-brand-cyan">New Tax Regime</span>
              </h3>

              <div className="divide-y divide-white/5 text-xs">
                <div className="flex justify-between py-2.5">
                  <span className="text-typography-muted">Basic Salary (45% of CTC)</span>
                  <span className="font-semibold text-white">{formatINR(salaryBreakdown.basicSalary / 12)}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-typography-muted">House Rent Allowance (HRA 20%)</span>
                  <span className="font-semibold text-white">{formatINR(salaryBreakdown.hra / 12)}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-typography-muted">Special Allowance</span>
                  <span className="font-semibold text-white">{formatINR(salaryBreakdown.specialAllowance / 12)}</span>
                </div>
                <div className="flex justify-between py-2.5 text-white font-bold bg-white/5 px-2 rounded-lg my-1">
                  <span>Gross Salary (Monthly)</span>
                  <span>{formatINR(salaryBreakdown.grossSalaryMonthly)}</span>
                </div>
                <div className="flex justify-between py-2.5 text-amber-400">
                  <span>Employee Provident Fund (EPF 12%)</span>
                  <span>-{formatINR(salaryBreakdown.employeePfMonthly)}</span>
                </div>
                <div className="flex justify-between py-2.5 text-amber-400">
                  <span>Professional Tax (PT)</span>
                  <span>-{formatINR(salaryBreakdown.professionalTaxMonthly)}</span>
                </div>
                <div className="flex justify-between py-2.5 text-amber-400">
                  <span>Income Tax / TDS (Estimated)</span>
                  <span>-{formatINR(salaryBreakdown.incomeTaxMonthly)}</span>
                </div>
                <div className="flex justify-between py-3 text-sm font-extrabold text-gradient bg-brand-cyan/10 px-3 rounded-xl mt-2 border border-brand-cyan/30">
                  <span>Net In-Hand (Credited to Bank)</span>
                  <span>{formatINR(salaryBreakdown.inHandMonthly)}</span>
                </div>
              </div>
            </Card>

            {/* Monthly In-Hand vs Deductions Pie Chart */}
            <Card className="p-6 lg:col-span-5 border border-brand-cyan/30 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-2">Where Your Salary Goes</h3>
                <p className="text-xs text-typography-muted mb-4">
                  Visual split of Take-Home vs Withheld Deductions
                </p>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number) => formatINR(val)}
                      contentStyle={{
                        backgroundColor: '#071433',
                        borderColor: 'rgba(40,200,255,0.4)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
                {pieData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-typography-muted truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 12-Month Accumulation Projection Chart */}
          <Card className="p-6 md:p-8 border border-brand-blue/20 dark:border-brand-cyan/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t('dashboard.yearlyOverview')}
                </h3>
                <p className="text-xs text-slate-600 dark:text-typography-muted mt-0.5">
                  {lang === 'hi'
                    ? `मासिक बचत ${formatINR(netMonthlySavings)} के आधार पर 12 महीने का संचयी अनुमान`
                    : lang === 'mr'
                    ? `दरमहा बचत ${formatINR(netMonthlySavings)} वर आधारित १२ महिन्यांचा संचयी अंदाज`
                    : `12-Month projection of monthly cashflow and cumulative savings starting from ${formatINR(startingSavings)}`}
                </p>
              </div>
              <div className="text-xs font-bold text-brand-teal bg-brand-teal/10 px-3 py-1.5 rounded-xl border border-brand-teal/30">
                {lang === 'hi' ? '1-वर्ष का कुल संचय: ' : lang === 'mr' ? '१-वर्षाचा एकूण संचय: ' : '1-Year Cumulative: '}
                {formatINR((netMonthlySavings * 12) + startingSavings)}
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={projectionData} margin={{ top: 10, right: 15, left: 10, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#64789F" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#64789F"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(v) => formatCompactINR(v)}
                  />
                  <Tooltip
                    formatter={(v: number, name: string) => {
                      const labelMap: Record<string, string> = {
                        cumulativeSavings: lang === 'hi' ? 'कुल संचयी बचत' : lang === 'mr' ? 'एकूण संचयी बचत' : 'Cumulative Savings',
                        monthlySavings: lang === 'hi' ? 'मासिक बचत' : lang === 'mr' ? 'मासिक बचत' : 'Monthly Savings',
                        income: lang === 'hi' ? 'मासिक इन-हैंड' : lang === 'mr' ? 'मासिक इन-हँड' : 'Monthly In-Hand',
                        expenses: lang === 'hi' ? 'मासिक खर्च' : lang === 'mr' ? 'मासिक खर्च' : 'Monthly Expenses',
                      };
                      return [formatINR(v), labelMap[name] || name];
                    }}
                    contentStyle={{
                      backgroundColor: 'rgba(7, 20, 51, 0.95)',
                      borderColor: 'rgba(40,200,255,0.4)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Legend
                    formatter={(value) => {
                      const legendMap: Record<string, string> = {
                        monthlySavings: lang === 'hi' ? 'मासिक बचत' : lang === 'mr' ? 'मासिक बचत' : 'Monthly Savings',
                        cumulativeSavings: lang === 'hi' ? 'संचयी बचत (कुल)' : lang === 'mr' ? 'संचयी बचत (एकूण)' : 'Cumulative Savings',
                      };
                      return <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{legendMap[value] || value}</span>;
                    }}
                  />
                  <Bar dataKey="monthlySavings" name="monthlySavings" fill="#12B8FF" radius={[4, 4, 0, 0]} />
                  <Line
                    type="monotone"
                    dataKey="cumulativeSavings"
                    name="cumulativeSavings"
                    stroke="#19E3C0"
                    strokeWidth={3}
                    dot={{ fill: '#19E3C0', r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
