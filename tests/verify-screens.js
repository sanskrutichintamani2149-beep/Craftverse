import { calculateSalaryBreakdown, calculateGst, calculateGoalPlan, simulateWhatIfScenario, evaluateFinancialHealth, calculateSip, calculateEmi } from '../src/utils/calculations.ts';
import { formatINR, formatCompactINR } from '../src/utils/formatters.ts';
import { financialTerms } from '../src/data/termsData.ts';

console.log('=== Running DhanaDrishti Calculation & Logic Tests ===');

// 1. Salary breakdown test: ₹12,00,000 CTC
const salary12L = calculateSalaryBreakdown(1200000, 30000);
console.log('Test 1: 12 LPA Salary Breakdown');
console.log(`- CTC: ${formatINR(salary12L.ctc)}`);
console.log(`- Monthly Gross: ${formatINR(salary12L.grossSalaryMonthly)}`);
console.log(`- Total Deductions: ${formatINR(salary12L.totalDeductionsMonthly)}`);
console.log(`- Monthly In-Hand: ${formatINR(salary12L.inHandMonthly)}`);
console.log(`- Potential Monthly Savings: ${formatINR(salary12L.potentialMonthlySavings)}`);
console.log(`- Savings Rate: ${salary12L.savingsRate.toFixed(1)}%`);

if (salary12L.inHandMonthly <= 0 || salary12L.inHandMonthly > salary12L.grossSalaryMonthly) {
  throw new Error('Salary breakdown math failed: in-hand must be positive and less than gross');
}

// 2. GST test: ₹1,000 with 18% GST exclusive
const gstTest = calculateGst(1000, 18, false);
console.log('\nTest 2: GST Exclusive');
console.log(`- Base: ${formatINR(gstTest.baseAmount)} | GST: ${formatINR(gstTest.gstAmount)} | Total: ${formatINR(gstTest.totalAmount)}`);
if (gstTest.totalAmount !== 1180 || gstTest.cgst !== 90 || gstTest.sgst !== 90) {
  throw new Error(`GST calculation mismatch. Expected 1180 total, got ${gstTest.totalAmount}`);
}

// 3. Goal Planner test: iPhone in 6 months (Target ₹80,000, current ₹20,000)
const goalTest = calculateGoalPlan(80000, 20000, 6);
console.log('\nTest 3: Goal Planner');
console.log(`- Target: ₹80,000 | Current: ₹20,000 | Remaining: ${formatINR(goalTest.amountStillRequired)}`);
console.log(`- Required Monthly: ${formatINR(goalTest.requiredMonthlySavings)}`);
if (goalTest.amountStillRequired !== 60000 || Math.round(goalTest.requiredMonthlySavings) !== 10000) {
  throw new Error('Goal planner monthly requirement mismatch');
}

// 4. What-If Simulation: +10% salary hike on 12 LPA
const whatIfTest = simulateWhatIfScenario({
  baseCtc: 1200000,
  baseExpenses: 30000,
  salaryChangePercent: 10,
  expenseChangeAmount: 0,
  savingsBoostMonthly: 0,
});
console.log('\nTest 4: What-If Simulation');
console.log(`- Baseline In-Hand: ${formatINR(whatIfTest.baseline.inHandMonthly)}`);
console.log(`- Simulated In-Hand: ${formatINR(whatIfTest.simulated.inHandMonthly)}`);
console.log(`- Delta In-Hand: +${formatINR(whatIfTest.deltaInHandMonthly)}`);
if (whatIfTest.deltaInHandMonthly <= 0) {
  throw new Error('Salary hike did not increase in-hand salary');
}

// 5. Financial Health Evaluation
const healthTest = evaluateFinancialHealth(salary12L, 180000);
console.log('\nTest 5: Financial Health Diagnostic');
console.log(`- Overall Score: ${healthTest.overallScore}/100 (${healthTest.ratingLabel})`);
console.log(`- Savings Score: ${healthTest.metrics.savingsRate.score}/25`);
console.log(`- Runway Score: ${healthTest.metrics.emergencyRunway.score}/25`);
if (healthTest.overallScore < 0 || healthTest.overallScore > 100) {
  throw new Error('Health score out of bounds');
}

// 6. Term-O-Pedia Editorial Database check
console.log('\nTest 6: Term-O-Pedia Database');
console.log(`- Total terms loaded: ${financialTerms.length}`);
if (financialTerms.length < 12) {
  throw new Error('Expected at least 12 terms');
}

console.log('\nAll DhanaDrishti mathematical and data integrity tests PASSED successfully!');
