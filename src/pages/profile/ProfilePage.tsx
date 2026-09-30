import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  User,
  Mail,
  Phone,
  Wallet,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  Trash2,
  ArrowRight,
  ShieldCheck,
  History,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useFinancialData } from '@/context/FinancialDataContext';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { formatINR } from '@/utils/formatters';

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const {
    profile,
    salaryBreakdown,
    goals,
    termCalculations,
    clearFinancialData,
  } = useFinancialData();

  const [confirmClear, setConfirmClear] = useState(false);

  const userName = user?.fullName || 'User Profile';
  const userEmail = user?.email || 'user@dhanadrishti.in';
  const userPhone = user?.phoneNumber || '+91 ••••• •••••';
  const initials = user?.initials || 'DD';

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">
          Account & Context
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          {t('profile.title')}
        </h1>
        <p className="text-xs sm:text-sm text-typography-bodyDark dark:text-[#A9BCD9] mt-1">
          {t('profile.subtitle')}
        </p>
      </div>

      {/* Account Info Card */}
      <Card className="p-6 md:p-8 border border-brand-cyan/35 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-teal flex items-center justify-center text-white font-extrabold text-2xl shadow-[0_0_25px_rgba(18,184,255,0.4)] shrink-0">
          {initials}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <h2 className="text-2xl font-bold text-white">{userName}</h2>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-typography-bodyDark pt-1">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-cyan" />
              <span>{userEmail}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-cyan" />
              <span>{userPhone}</span>
            </span>
            {profile.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
                <span>{profile.location}</span>
              </span>
            )}
            {profile.jobTitle && (
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-brand-cyan" />
                <span>{profile.jobTitle}</span>
              </span>
            )}
          </div>
        </div>
      </Card>

      {/* Stored Financial Context Summary */}
      <Card className="p-6 md:p-8 border border-brand-cyan/30 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-brand-cyan/15">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Wallet className="w-4 h-4 text-brand-teal" />
            <span>Connected Financial Records</span>
          </h3>

          <Link
            to="/dashboard"
            className="text-xs font-semibold text-brand-cyan hover:text-brand-teal flex items-center gap-1"
          >
            <span>Update in Dashboard</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-tile p-4 border border-brand-cyan/20">
            <span className="text-[10px] text-typography-muted block uppercase font-bold">
              Annual CTC
            </span>
            <span className="text-lg font-bold text-white mt-1 block">
              {profile.annualCtc ? formatINR(profile.annualCtc) : 'Not configured'}
            </span>
          </div>

          <div className="glass-tile p-4 border border-brand-cyan/20">
            <span className="text-[10px] text-typography-muted block uppercase font-bold">
              Monthly In-Hand
            </span>
            <span className="text-lg font-bold text-brand-teal mt-1 block">
              {salaryBreakdown ? formatINR(salaryBreakdown.inHandMonthly) : '₹0'}
            </span>
          </div>

          <div className="glass-tile p-4 border border-brand-cyan/20">
            <span className="text-[10px] text-typography-muted block uppercase font-bold">
              Monthly Living Expenses
            </span>
            <span className="text-lg font-bold text-white mt-1 block">
              {profile.monthlyExpenses ? formatINR(profile.monthlyExpenses) : '₹0'}
            </span>
          </div>

          <div className="glass-tile p-4 border border-brand-cyan/20">
            <span className="text-[10px] text-typography-muted block uppercase font-bold">
              Active Goals
            </span>
            <span className="text-lg font-bold text-brand-cyan mt-1 block">
              {goals.length} Goals
            </span>
          </div>
        </div>

        {/* Recent Term Calculations Context */}
        {termCalculations.length > 0 && (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-typography-muted flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Recent Term Calculations (Connected to AI Mentor)</span>
            </h4>
            <div className="space-y-2">
              {termCalculations.slice(0, 5).map((calc, idx) => (
                <div
                  key={idx}
                  className="glass-tile p-3 border border-brand-cyan/15 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-white">{calc.termName}</span>
                  <span className="text-typography-muted">
                    {new Date(calc.calculatedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clear Data Danger Zone */}
        <div className="pt-6 border-t border-red-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-red-400">Clear Financial Context</h4>
            <p className="text-[11px] text-typography-muted">
              Removes saved salary, goals, and calculation history from this browser.
            </p>
          </div>

          {confirmClear ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  clearFinancialData();
                  setConfirmClear(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600"
              >
                Yes, Delete All
              </button>
              <button
                type="button"
                onClick={() => setConfirmClear(false)}
                className="px-3 py-1.5 rounded-xl glass-card text-xs text-white"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              className="px-3.5 py-2 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs font-semibold flex items-center gap-2"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Context</span>
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};
