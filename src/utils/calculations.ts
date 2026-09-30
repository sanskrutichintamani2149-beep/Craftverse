/**
 * Pure deterministic financial calculation functions
 * Rule: Deterministic calculations come from app logic, never hallucinated by AI.
 */

export interface SalaryBreakdown {
  ctc: number;
  monthlyCtc: number;
  basicSalary: number;
  hra: number;
  specialAllowance: number;
  grossSalaryAnnual: number;
  grossSalaryMonthly: number;
  employeePfAnnual: number;
  employeePfMonthly: number;
  employerPfAnnual: number;
  professionalTaxAnnual: number;
  professionalTaxMonthly: number;
  standardDeduction: number;
  taxableIncome: number;
  incomeTaxAnnual: number;
  incomeTaxMonthly: number;
  totalDeductionsAnnual: number;
  totalDeductionsMonthly: number;
  inHandAnnual: number;
  inHandMonthly: number;
  monthlyExpenses: number;
  potentialMonthlySavings: number;
  yearlySavings: number;
  savingsRate: number; // percentage (0 - 100)
}

/**
 * Calculates Indian salary components from annual CTC using FY 2024-25/2025-26 New Tax Regime
 */
export const calculateSalaryBreakdown = (
  annualCtc: number,
  monthlyExpenses = 0
): SalaryBreakdown => {
  const ctc = Math.max(0, annualCtc);
  const monthlyCtc = ctc / 12;

  // Typical Indian salary component breakdown
  // Basic is ~45% of CTC
  const basicSalary = ctc * 0.45;
  // HRA is ~20% of CTC
  const hra = ctc * 0.20;
  // Employer PF is 12% of basic (capped optionally, but standard in CTC package)
  const employerPfAnnual = Math.min(basicSalary * 0.12, 1800 * 12);
  // Special Allowance makes up the remaining gross
  const specialAllowance = Math.max(0, ctc - basicSalary - hra - employerPfAnnual);

  // Gross Salary = Basic + HRA + Special Allowance (CTC minus employer PF component)
  const grossSalaryAnnual = basicSalary + hra + specialAllowance;
  const grossSalaryMonthly = grossSalaryAnnual / 12;

  // Deductions from Employee:
  // 1. Employee PF: 12% of Basic
  const employeePfAnnual = Math.min(basicSalary * 0.12, 1800 * 12);
  const employeePfMonthly = employeePfAnnual / 12;

  // 2. Professional Tax: ₹2,400/yr (₹200/mo) standard in most states
  const professionalTaxAnnual = ctc > 0 ? 2400 : 0;
  const professionalTaxMonthly = professionalTaxAnnual / 12;

  // 3. Income Tax under New Tax Regime:
  // Standard Deduction: ₹75,000 for salaried employees
  const standardDeduction = ctc > 75000 ? 75000 : ctc;
  const taxableIncome = Math.max(0, grossSalaryAnnual - standardDeduction - employeePfAnnual);

  let rawTax = 0;
  // New Regime Slabs:
  // 0 - 3L: 0%
  // 3L - 7L: 5%
  // 7L - 10L: 10%
  // 10L - 12L: 15%
  // 12L - 15L: 20%
  // > 15L: 30%
  // Rebate u/s 87A: If taxable income <= 7,00,000, tax liability is NIL.
  if (taxableIncome <= 700000) {
    rawTax = 0;
  } else {
    let remaining = taxableIncome;
    if (remaining > 1500000) {
      rawTax += (remaining - 1500000) * 0.30;
      remaining = 1500000;
    }
    if (remaining > 1200000) {
      rawTax += (remaining - 1200000) * 0.20;
      remaining = 1200000;
    }
    if (remaining > 1000000) {
      rawTax += (remaining - 1000000) * 0.15;
      remaining = 1000000;
    }
    if (remaining > 700000) {
      rawTax += (remaining - 700000) * 0.10;
      remaining = 700000;
    }
    if (remaining > 300000) {
      rawTax += (remaining - 300000) * 0.05;
      remaining = 300000;
    }
  }

  // Add 4% Health & Education Cess
  const incomeTaxAnnual = rawTax > 0 ? rawTax * 1.04 : 0;
  const incomeTaxMonthly = incomeTaxAnnual / 12;

  // Total Deductions
  const totalDeductionsAnnual = employeePfAnnual + professionalTaxAnnual + incomeTaxAnnual;
  const totalDeductionsMonthly = totalDeductionsAnnual / 12;

  // In-Hand Take-Home
  const inHandAnnual = Math.max(0, grossSalaryAnnual - totalDeductionsAnnual);
  const inHandMonthly = inHandAnnual / 12;

  const potentialMonthlySavings = Math.max(0, inHandMonthly - monthlyExpenses);
  const yearlySavings = potentialMonthlySavings * 12;
  const savingsRate = inHandMonthly > 0 ? Math.min(100, (potentialMonthlySavings / inHandMonthly) * 100) : 0;

  return {
    ctc,
    monthlyCtc,
    basicSalary,
    hra,
    specialAllowance,
    grossSalaryAnnual,
    grossSalaryMonthly,
    employeePfAnnual,
    employeePfMonthly,
    employerPfAnnual,
    professionalTaxAnnual,
    professionalTaxMonthly,
    standardDeduction,
    taxableIncome,
    incomeTaxAnnual,
    incomeTaxMonthly,
    totalDeductionsAnnual,
    totalDeductionsMonthly,
    inHandAnnual,
    inHandMonthly,
    monthlyExpenses,
    potentialMonthlySavings,
    yearlySavings,
    savingsRate,
  };
};

/**
 * GST Calculation Engine
 */
export interface GstCalculation {
  baseAmount: number;
  rate: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  totalAmount: number;
  isInclusive: boolean;
}

export const calculateGst = (
  amount: number,
  ratePercent: number,
  isInclusive = false
): GstCalculation => {
  const safeAmount = Math.max(0, amount);
  const rate = Math.max(0, ratePercent);

  let baseAmount = safeAmount;
  let gstAmount = 0;
  let totalAmount = safeAmount;

  if (isInclusive) {
    // Total includes GST
    baseAmount = safeAmount / (1 + rate / 100);
    gstAmount = safeAmount - baseAmount;
    totalAmount = safeAmount;
  } else {
    // Total excludes GST
    gstAmount = safeAmount * (rate / 100);
    totalAmount = safeAmount + gstAmount;
    baseAmount = safeAmount;
  }

  const halfGst = gstAmount / 2;

  return {
    baseAmount,
    rate,
    gstAmount,
    cgst: halfGst,
    sgst: halfGst,
    totalAmount,
    isInclusive,
  };
};

/**
 * Goal-Based Planner calculation
 */
export interface GoalPlanResult {
  goalAmount: number;
  currentSavings: number;
  amountStillRequired: number;
  targetMonths: number;
  requiredMonthlySavings: number;
  requiredWeeklyContribution: number;
  dailyRequirement: number;
  isAchievable: boolean;
}

export const calculateGoalPlan = (
  goalAmount: number,
  currentSavings = 0,
  targetMonths = 6
): GoalPlanResult => {
  const safeTarget = Math.max(0, goalAmount);
  const safeCurrent = Math.max(0, Math.min(currentSavings, safeTarget));
  const safeMonths = Math.max(1, targetMonths);

  const amountStillRequired = Math.max(0, safeTarget - safeCurrent);
  const requiredMonthlySavings = amountStillRequired / safeMonths;
  const requiredWeeklyContribution = requiredMonthlySavings / 4.33;
  const dailyRequirement = requiredMonthlySavings / 30;

  return {
    goalAmount: safeTarget,
    currentSavings: safeCurrent,
    amountStillRequired,
    targetMonths: safeMonths,
    requiredMonthlySavings,
    requiredWeeklyContribution,
    dailyRequirement,
    isAchievable: amountStillRequired >= 0,
  };
};

/**
 * What-If Simulation Engine
 */
export interface WhatIfScenarioInput {
  baseCtc: number;
  baseExpenses: number;
  salaryChangePercent: number; // e.g. +10, -5
  expenseChangeAmount: number; // e.g. +5000, -2000
  savingsBoostMonthly: number; // e.g. +3000
}

export interface WhatIfComparison {
  baseline: SalaryBreakdown;
  simulated: SalaryBreakdown;
  deltaInHandMonthly: number;
  deltaExpensesMonthly: number;
  deltaSavingsMonthly: number;
  deltaSavingsAnnual: number;
  savingsRateChange: number;
}

export const simulateWhatIfScenario = (
  input: WhatIfScenarioInput
): WhatIfComparison => {
  const baseline = calculateSalaryBreakdown(input.baseCtc, input.baseExpenses);

  const newCtc = Math.max(0, input.baseCtc * (1 + input.salaryChangePercent / 100));
  const newExpenses = Math.max(0, input.baseExpenses + input.expenseChangeAmount);

  const simulated = calculateSalaryBreakdown(newCtc, newExpenses);

  // Apply savings boost if user intentionally directs money into savings
  const effectiveSimulatedMonthlySavings = simulated.potentialMonthlySavings + input.savingsBoostMonthly;
  simulated.potentialMonthlySavings = effectiveSimulatedMonthlySavings;
  simulated.yearlySavings = effectiveSimulatedMonthlySavings * 12;

  const deltaInHandMonthly = simulated.inHandMonthly - baseline.inHandMonthly;
  const deltaExpensesMonthly = simulated.monthlyExpenses - baseline.monthlyExpenses;
  const deltaSavingsMonthly = simulated.potentialMonthlySavings - baseline.potentialMonthlySavings;
  const deltaSavingsAnnual = simulated.yearlySavings - baseline.yearlySavings;
  const savingsRateChange = simulated.savingsRate - baseline.savingsRate;

  return {
    baseline,
    simulated,
    deltaInHandMonthly,
    deltaExpensesMonthly,
    deltaSavingsMonthly,
    deltaSavingsAnnual,
    savingsRateChange,
  };
};

/**
 * Financial Health Assessment Engine (0 - 100 score + diagnostics)
 */
export interface FinancialHealthMetric {
  name: string;
  score: number; // 0 - 25
  maxScore: number;
  status: 'excellent' | 'good' | 'fair' | 'critical';
  valueDisplay: string;
  targetDisplay: string;
  feedback: string;
}

export interface FinancialHealthResult {
  overallScore: number; // 0 - 100
  ratingLabel: string;
  colorHex: string;
  metrics: {
    savingsRate: FinancialHealthMetric;
    expenseRatio: FinancialHealthMetric;
    emergencyRunway: FinancialHealthMetric;
    stability: FinancialHealthMetric;
  };
  areasToImprove: string[];
  recommendedActions: string[];
  radarData: Array<{ subject: string; score: number; fullMark: number }>;
}

export const evaluateFinancialHealth = (
  salary: SalaryBreakdown,
  existingSavings = 0
): FinancialHealthResult => {
  const monthlyInHand = salary.inHandMonthly;
  const monthlyExpenses = salary.monthlyExpenses;

  // 1. Savings Rate Metric (Pillar 1: 25 pts)
  // Target: >= 30% savings rate
  const savingsRate = salary.savingsRate;
  let savingsScore = 0;
  let savingsStatus: FinancialHealthMetric['status'] = 'critical';
  if (savingsRate >= 30) {
    savingsScore = 25;
    savingsStatus = 'excellent';
  } else if (savingsRate >= 20) {
    savingsScore = 19;
    savingsStatus = 'good';
  } else if (savingsRate >= 10) {
    savingsScore = 13;
    savingsStatus = 'fair';
  } else {
    savingsScore = Math.max(0, Math.round((savingsRate / 10) * 8));
    savingsStatus = 'critical';
  }

  // 2. Expense to Income Ratio (Pillar 2: 25 pts)
  // Target: <= 50%
  const expenseRatio = monthlyInHand > 0 ? (monthlyExpenses / monthlyInHand) * 100 : 100;
  let expenseScore = 0;
  let expenseStatus: FinancialHealthMetric['status'] = 'critical';
  if (expenseRatio <= 50) {
    expenseScore = 25;
    expenseStatus = 'excellent';
  } else if (expenseRatio <= 65) {
    expenseScore = 18;
    expenseStatus = 'good';
  } else if (expenseRatio <= 80) {
    expenseScore = 12;
    expenseStatus = 'fair';
  } else {
    expenseScore = Math.max(2, Math.round(25 - (expenseRatio - 80)));
    expenseStatus = 'critical';
  }

  // 3. Emergency Runway (Months of expenses covered by existing savings) (Pillar 3: 25 pts)
  // Target: >= 6 months
  const emergencyMonths = monthlyExpenses > 0 ? existingSavings / monthlyExpenses : 0;
  let runwayScore = 0;
  let runwayStatus: FinancialHealthMetric['status'] = 'critical';
  if (emergencyMonths >= 6) {
    runwayScore = 25;
    runwayStatus = 'excellent';
  } else if (emergencyMonths >= 3) {
    runwayScore = 18;
    runwayStatus = 'good';
  } else if (emergencyMonths >= 1) {
    runwayScore = 10;
    runwayStatus = 'fair';
  } else {
    runwayScore = Math.max(0, Math.round((emergencyMonths / 1) * 6));
    runwayStatus = 'critical';
  }

  // 4. Financial Cushion & Surplus (Pillar 4: 25 pts)
  let stabilityScore = 0;
  let stabilityStatus: FinancialHealthMetric['status'] = 'critical';
  if (salary.potentialMonthlySavings > 15000 && emergencyMonths >= 3) {
    stabilityScore = 25;
    stabilityStatus = 'excellent';
  } else if (salary.potentialMonthlySavings > 5000) {
    stabilityScore = 18;
    stabilityStatus = 'good';
  } else if (salary.potentialMonthlySavings > 0) {
    stabilityScore = 11;
    stabilityStatus = 'fair';
  } else {
    stabilityScore = 4;
    stabilityStatus = 'critical';
  }

  const overallScore = Math.min(100, savingsScore + expenseScore + runwayScore + stabilityScore);

  let ratingLabel = 'Needs Immediate Attention';
  let colorHex = '#EF4444'; // Red
  if (overallScore >= 80) {
    ratingLabel = 'Rock Solid & Thriving';
    colorHex = '#19E3C0'; // Aqua
  } else if (overallScore >= 60) {
    ratingLabel = 'Healthy with Room to Grow';
    colorHex = '#12B8FF'; // Cyan
  } else if (overallScore >= 40) {
    ratingLabel = 'Moderate / Vulnerable to Shocks';
    colorHex = '#F59E0B'; // Amber
  }

  const areasToImprove: string[] = [];
  const recommendedActions: string[] = [];

  if (emergencyMonths < 6) {
    areasToImprove.push(`Emergency Fund is low (${emergencyMonths.toFixed(1)} months covered vs ideal 6 months).`);
    recommendedActions.push('Prioritize building a 3 to 6-month liquid emergency cushion before aggressive investing.');
  }

  if (savingsRate < 20) {
    areasToImprove.push(`Savings rate is ${savingsRate.toFixed(0)}%, which falls below the recommended 20-30% bracket.`);
    recommendedActions.push('Review recurring subscriptions and dining out expenses to liberate 5-10% more cashflow.');
  }

  if (expenseRatio > 65) {
    areasToImprove.push(`Expenses consume ${expenseRatio.toFixed(0)}% of your monthly take-home pay.`);
    recommendedActions.push('Cap fixed living expenses and explore salary negotiation or skill upgrades.');
  }

  if (areasToImprove.length === 0) {
    areasToImprove.push('Your financial foundation is robust! Keep avoiding lifestyle inflation as income expands.');
    recommendedActions.push('Automate your monthly mutual fund SIPs and review annual term & health insurance coverage.');
  }

  const radarData = [
    { subject: 'Savings Rate', score: Math.round((savingsScore / 25) * 100), fullMark: 100 },
    { subject: 'Expense Control', score: Math.round((expenseScore / 25) * 100), fullMark: 100 },
    { subject: 'Emergency Runway', score: Math.round((runwayScore / 25) * 100), fullMark: 100 },
    { subject: 'Income Surplus', score: Math.round((stabilityScore / 25) * 100), fullMark: 100 },
  ];

  return {
    overallScore,
    ratingLabel,
    colorHex,
    metrics: {
      savingsRate: {
        name: 'Savings Rate',
        score: savingsScore,
        maxScore: 25,
        status: savingsStatus,
        valueDisplay: `${savingsRate.toFixed(1)}%`,
        targetDisplay: '≥ 25%',
        feedback: savingsRate >= 25 ? 'High savings momentum.' : 'Increase savings margin.',
      },
      expenseRatio: {
        name: 'Expense to Income',
        score: expenseScore,
        maxScore: 25,
        status: expenseStatus,
        valueDisplay: `${expenseRatio.toFixed(1)}%`,
        targetDisplay: '≤ 50%',
        feedback: expenseRatio <= 50 ? 'Expenses well contained.' : 'Living costs are eating into wealth creation.',
      },
      emergencyRunway: {
        name: 'Emergency Cushion',
        score: runwayScore,
        maxScore: 25,
        status: runwayStatus,
        valueDisplay: `${emergencyMonths.toFixed(1)} mo`,
        targetDisplay: '6 mo',
        feedback: emergencyMonths >= 6 ? 'Safely sheltered from shocks.' : 'Emergency cushion needed.',
      },
      stability: {
        name: 'Monthly Net Surplus',
        score: stabilityScore,
        maxScore: 25,
        status: stabilityStatus,
        valueDisplay: `₹${Math.round(salary.potentialMonthlySavings).toLocaleString('en-IN')}`,
        targetDisplay: 'Positive',
        feedback: salary.potentialMonthlySavings > 0 ? 'Consistent monthly surplus.' : 'No cashflow surplus left.',
      },
    },
    areasToImprove,
    recommendedActions,
    radarData,
  };
};

/**
 * SIP Compound Growth Engine (for SIP/Compounding term calculators)
 */
export interface SipCalculation {
  monthlyInvestment: number;
  annualRate: number;
  tenureYears: number;
  totalInvested: number;
  estimatedReturns: number;
  totalMaturityValue: number;
}

export const calculateSip = (
  monthlyInvestment: number,
  expectedReturnRate: number,
  tenureYears: number
): SipCalculation => {
  const p = Math.max(0, monthlyInvestment);
  const i = Math.max(0, expectedReturnRate) / 12 / 100;
  const n = Math.max(1, tenureYears) * 12;

  let totalMaturityValue = 0;
  if (i === 0) {
    totalMaturityValue = p * n;
  } else {
    totalMaturityValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  }

  const totalInvested = p * n;
  const estimatedReturns = Math.max(0, totalMaturityValue - totalInvested);

  return {
    monthlyInvestment: p,
    annualRate: expectedReturnRate,
    tenureYears,
    totalInvested,
    estimatedReturns,
    totalMaturityValue,
  };
};

/**
 * Loan EMI Engine (for EMI/Loan term calculators)
 */
export interface EmiCalculation {
  principal: number;
  annualRate: number;
  tenureMonths: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

export const calculateEmi = (
  principal: number,
  annualRate: number,
  tenureMonths: number
): EmiCalculation => {
  const p = Math.max(0, principal);
  const r = Math.max(0, annualRate) / 12 / 100;
  const n = Math.max(1, tenureMonths);

  let emi = 0;
  if (r === 0) {
    emi = p / n;
  } else {
    emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPayment = emi * n;
  const totalInterest = Math.max(0, totalPayment - p);

  return {
    principal: p,
    annualRate,
    tenureMonths: n,
    emi,
    totalInterest,
    totalPayment,
  };
};
