import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import { formatINR } from '@/utils/formatters';
import { calculateGst, calculateSip, calculateEmi } from '@/utils/calculations';
import { useFinancialData } from '@/context/FinancialDataContext';

interface TermCalculatorProps {
  type: 'gst' | 'sip' | 'emi' | 'tds' | 'compounding' | 'inflation';
  termSlug: string;
  termName: string;
}

export const TermCalculator: React.FC<TermCalculatorProps> = ({
  type,
  termSlug,
  termName,
}) => {
  const { t } = useTranslation();
  const { recordTermCalculation } = useFinancialData();
  const [savedSuccess, setSavedSuccess] = useState(false);

  // GST state
  const [gstAmount, setGstAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInclusive, setIsInclusive] = useState<boolean>(false);

  // SIP state
  const [sipMonthly, setSipMonthly] = useState<number>(5000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  // EMI state
  const [loanPrincipal, setLoanPrincipal] = useState<number>(500000);
  const [loanRate, setLoanRate] = useState<number>(9.5);
  const [loanMonths, setLoanMonths] = useState<number>(36);

  // TDS state
  const [tdsAmount, setTdsAmount] = useState<number>(50000);
  const [tdsRate, setTdsRate] = useState<number>(10);

  // Inflation state
  const [currentCost, setCurrentCost] = useState<number>(1000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [futureYears, setFutureYears] = useState<number>(10);

  const handleSaveCalculation = (inputs: Record<string, any>, outputs: Record<string, any>) => {
    recordTermCalculation({
      termSlug,
      termName,
      inputs,
      outputs,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="glass-card p-6 md:p-8 mt-8 border border-brand-cyan/40">
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-brand-cyan/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 border border-brand-cyan/35 flex items-center justify-center text-brand-cyan">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white dark:text-white">
              {termName} {t('termopedia.interactiveCalculator')}
            </h3>
            <p className="text-xs text-brand-cyan/70 dark:text-[#8FA5CB]">
              Test numbers with exact mathematical precision. Stored to your AI Mentor context.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-brand-teal bg-brand-teal/10 px-3 py-1.5 rounded-full border border-brand-teal/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Saved to Context</span>
          </div>
        )}
      </div>

      {/* GST CALCULATOR */}
      {type === 'gst' && (() => {
        const result = calculateGst(gstAmount, gstRate, isInclusive);
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-typography-headingDark dark:text-white block mb-1.5">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={gstAmount || ''}
                  onChange={(e) => setGstAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full py-2.5 px-4 glass-input text-sm text-white"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-typography-headingDark dark:text-white block mb-1.5">
                  GST Rate Slab
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[0, 5, 12, 18, 28].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setGstRate(rate)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                        gstRate === rate
                          ? 'bg-brand-cyan text-brand-dark border-brand-cyan shadow-[0_0_12px_rgba(18,184,255,0.4)]'
                          : 'border-brand-cyan/20 text-typography-bodyDark hover:bg-white/5'
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs text-typography-bodyDark">Tax Type:</span>
                <button
                  type="button"
                  onClick={() => setIsInclusive(false)}
                  className={`px-3 py-1.5 text-xs rounded-lg border ${
                    !isInclusive ? 'bg-brand-blue/30 text-white border-brand-cyan' : 'border-white/10 text-typography-muted'
                  }`}
                >
                  Exclusive (Add GST)
                </button>
                <button
                  type="button"
                  onClick={() => setIsInclusive(true)}
                  className={`px-3 py-1.5 text-xs rounded-lg border ${
                    isInclusive ? 'bg-brand-blue/30 text-white border-brand-cyan' : 'border-white/10 text-typography-muted'
                  }`}
                >
                  Inclusive (Already included)
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleSaveCalculation({ amount: gstAmount, rate: gstRate, isInclusive }, result)}
                className="w-full mt-3 py-2.5 btn-gradient rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
              >
                <span>Save Calculation to Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Results Box */}
            <div className="glass-tile p-5 space-y-3.5 border border-brand-cyan/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cyan">
                Calculation Breakdown
              </h4>
              <div className="flex justify-between items-center text-sm py-1 border-b border-white/5">
                <span className="text-typography-muted">Net Base Amount:</span>
                <span className="font-semibold text-white">{formatINR(result.baseAmount, true)}</span>
              </div>
              <div className="flex justify-between items-center text-sm py-1 border-b border-white/5">
                <span className="text-typography-muted">CGST (Central {gstRate / 2}%):</span>
                <span className="font-semibold text-brand-cyan">{formatINR(result.cgst, true)}</span>
              </div>
              <div className="flex justify-between items-center text-sm py-1 border-b border-white/5">
                <span className="text-typography-muted">SGST (State {gstRate / 2}%):</span>
                <span className="font-semibold text-brand-cyan">{formatINR(result.sgst, true)}</span>
              </div>
              <div className="flex justify-between items-center text-sm py-1 border-b border-white/5">
                <span className="text-typography-muted">Total GST Component:</span>
                <span className="font-semibold text-amber-400">{formatINR(result.gstAmount, true)}</span>
              </div>
              <div className="flex justify-between items-center text-base pt-2 font-extrabold text-white">
                <span>Final Invoiced Amount:</span>
                <span className="text-gradient text-lg">{formatINR(result.totalAmount, true)}</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* SIP / COMPOUNDING CALCULATOR */}
      {(type === 'sip' || type === 'compounding') && (() => {
        const result = calculateSip(sipMonthly, sipRate, sipYears);
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-white block mb-1.5">
                  Monthly SIP Contribution (₹)
                </label>
                <input
                  type="number"
                  min="500"
                  step="500"
                  value={sipMonthly || ''}
                  onChange={(e) => setSipMonthly(Math.max(0, Number(e.target.value)))}
                  className="w-full py-2.5 px-4 glass-input text-sm text-white"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-white mb-1.5">
                  <span>Expected Return Rate (p.a.)</span>
                  <span className="text-brand-cyan font-bold">{sipRate}%</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="25"
                  step="0.5"
                  value={sipRate}
                  onChange={(e) => setSipRate(Number(e.target.value))}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-white mb-1.5">
                  <span>Investment Time Horizon</span>
                  <span className="text-brand-cyan font-bold">{sipYears} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  value={sipYears}
                  onChange={(e) => setSipYears(Number(e.target.value))}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={() => handleSaveCalculation({ monthly: sipMonthly, rate: sipRate, years: sipYears }, result)}
                className="w-full mt-3 py-2.5 btn-gradient rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
              >
                <span>Save SIP Projection to Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="glass-tile p-5 space-y-3.5 border border-brand-cyan/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cyan">
                Projected Wealth Creation
              </h4>
              <div className="flex justify-between items-center text-sm py-1 border-b border-white/5">
                <span className="text-typography-muted">Total Invested:</span>
                <span className="font-semibold text-white">{formatINR(result.totalInvested)}</span>
              </div>
              <div className="flex justify-between items-center text-sm py-1 border-b border-white/5">
                <span className="text-typography-muted">Estimated Gains:</span>
                <span className="font-semibold text-brand-teal">+{formatINR(result.estimatedReturns)}</span>
              </div>
              <div className="flex justify-between items-center text-base pt-2 font-extrabold text-white">
                <span>Total Maturity Corpus:</span>
                <span className="text-gradient text-xl">{formatINR(result.totalMaturityValue)}</span>
              </div>
              <p className="text-[11px] text-typography-muted pt-2 border-t border-white/10">
                Educational estimate based on monthly compound frequency. Mutual fund investments are subject to market risks.
              </p>
            </div>
          </div>
        );
      })()}

      {/* EMI CALCULATOR */}
      {type === 'emi' && (() => {
        const result = calculateEmi(loanPrincipal, loanRate, loanMonths);
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-white block mb-1.5">
                  Loan Amount / Principal (₹)
                </label>
                <input
                  type="number"
                  min="10000"
                  step="10000"
                  value={loanPrincipal || ''}
                  onChange={(e) => setLoanPrincipal(Math.max(0, Number(e.target.value)))}
                  className="w-full py-2.5 px-4 glass-input text-sm text-white"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-white mb-1.5">
                  <span>Interest Rate (% p.a.)</span>
                  <span className="text-brand-cyan font-bold">{loanRate}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="24"
                  step="0.25"
                  value={loanRate}
                  onChange={(e) => setLoanRate(Number(e.target.value))}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-white mb-1.5">
                  <span>Tenure ({loanMonths} Months / {(loanMonths / 12).toFixed(1)} Years)</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="360"
                  step="6"
                  value={loanMonths}
                  onChange={(e) => setLoanMonths(Number(e.target.value))}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={() => handleSaveCalculation({ principal: loanPrincipal, rate: loanRate, months: loanMonths }, result)}
                className="w-full mt-3 py-2.5 btn-gradient rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
              >
                <span>Save EMI to Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="glass-tile p-5 space-y-3.5 border border-brand-cyan/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cyan">
                EMI Cost Breakdown
              </h4>
              <div className="flex justify-between items-center text-sm py-1 border-b border-white/5">
                <span className="text-typography-muted">Principal Borrowed:</span>
                <span className="font-semibold text-white">{formatINR(result.principal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm py-1 border-b border-white/5">
                <span className="text-typography-muted">Total Interest Paid:</span>
                <span className="font-semibold text-red-400">+{formatINR(result.totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center text-sm py-1 border-b border-white/5">
                <span className="text-typography-muted">Total Repaid to Bank:</span>
                <span className="font-semibold text-white">{formatINR(result.totalPayment)}</span>
              </div>
              <div className="flex justify-between items-center text-base pt-2 font-extrabold text-white">
                <span>Monthly EMI:</span>
                <span className="text-gradient text-xl">{formatINR(result.emi)}</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* TDS CALCULATOR */}
      {type === 'tds' && (() => {
        const cut = tdsAmount * (tdsRate / 100);
        const netDisbursed = Math.max(0, tdsAmount - cut);
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-white block mb-1.5">
                  Gross Payment / Invoice Amount (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={tdsAmount || ''}
                  onChange={(e) => setTdsAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full py-2.5 px-4 glass-input text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white block mb-1.5">
                  TDS Section Rate (%)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 5, 10, 20, 30].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setTdsRate(rate)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                        tdsRate === rate
                          ? 'bg-brand-cyan text-brand-dark border-brand-cyan shadow-[0_0_12px_rgba(18,184,255,0.4)]'
                          : 'border-brand-cyan/20 text-typography-bodyDark hover:bg-white/5'
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSaveCalculation({ invoice: tdsAmount, rate: tdsRate }, { cut, netDisbursed })}
                className="w-full mt-3 py-2.5 btn-gradient rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
              >
                <span>Save TDS Breakdown to Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="glass-tile p-5 space-y-3.5 border border-brand-cyan/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cyan">
                Disbursement & Tax Credit
              </h4>
              <div className="flex justify-between items-center text-sm py-1 border-b border-white/5">
                <span className="text-typography-muted">Gross Invoice:</span>
                <span className="font-semibold text-white">{formatINR(tdsAmount)}</span>
              </div>
              <div className="flex justify-between items-center text-sm py-1 border-b border-white/5">
                <span className="text-typography-muted">TDS Withheld ({tdsRate}%):</span>
                <span className="font-semibold text-amber-400">-{formatINR(cut)}</span>
              </div>
              <div className="flex justify-between items-center text-base pt-2 font-extrabold text-white">
                <span>Net Credited to Bank:</span>
                <span className="text-gradient text-xl">{formatINR(netDisbursed)}</span>
              </div>
              <p className="text-[11px] text-typography-muted pt-2 border-t border-white/10">
                The ₹{cut.toLocaleString('en-IN')} withheld is credited to your PAN and visible on Income Tax Portal Form 26AS.
              </p>
            </div>
          </div>
        );
      })()}

      {/* INFLATION CALCULATOR */}
      {type === 'inflation' && (() => {
        const futureCost = currentCost * Math.pow(1 + inflationRate / 100, futureYears);
        const erodedPurchasingPower = currentCost / Math.pow(1 + inflationRate / 100, futureYears);
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-white block mb-1.5">
                  Current Price of Item / Living Cost (₹)
                </label>
                <input
                  type="number"
                  min="1"
                  value={currentCost || ''}
                  onChange={(e) => setCurrentCost(Math.max(1, Number(e.target.value)))}
                  className="w-full py-2.5 px-4 glass-input text-sm text-white"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-white mb-1.5">
                  <span>Annual Inflation Rate</span>
                  <span className="text-brand-cyan font-bold">{inflationRate}%</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="0.5"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-white mb-1.5">
                  <span>Years into Future</span>
                  <span className="text-brand-cyan font-bold">{futureYears} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={futureYears}
                  onChange={(e) => setFutureYears(Number(e.target.value))}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={() => handleSaveCalculation({ cost: currentCost, rate: inflationRate, years: futureYears }, { futureCost })}
                className="w-full mt-3 py-2.5 btn-gradient rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
              >
                <span>Save Inflation Impact to Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="glass-tile p-5 space-y-3.5 border border-brand-cyan/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cyan">
                Purchasing Power Impact
              </h4>
              <div className="flex justify-between items-center text-sm py-1 border-b border-white/5">
                <span className="text-typography-muted">Today's Cost:</span>
                <span className="font-semibold text-white">{formatINR(currentCost)}</span>
              </div>
              <div className="flex justify-between items-center text-sm py-1 border-b border-white/5">
                <span className="text-typography-muted">Cost in {futureYears} Years:</span>
                <span className="font-semibold text-red-400">{formatINR(futureCost)}</span>
              </div>
              <div className="flex justify-between items-center text-base pt-2 font-extrabold text-white">
                <span>Value of ₹{currentCost.toLocaleString('en-IN')} in Future:</span>
                <span className="text-gradient text-xl">{formatINR(erodedPurchasingPower)}</span>
              </div>
              <p className="text-[11px] text-typography-muted pt-2 border-t border-white/10">
                To maintain the exact same lifestyle, your investments must yield a net CAGR higher than {inflationRate}%.
              </p>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
