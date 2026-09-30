import React, { createContext, useContext, useEffect, useState } from 'react';
import { calculateSalaryBreakdown, SalaryBreakdown } from '@/utils/calculations';

export interface UserFinancialProfile {
  jobTitle?: string;
  annualCtc?: number;
  location?: string;
  age?: number;
  monthlyExpenses?: number;
  existingSavings?: number;
}

export interface UserGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentSavings: number;
  targetMonths: number;
  createdAt: string;
}

export interface TermCalculationHistory {
  termSlug: string;
  termName: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  calculatedAt: string;
}

export interface DocumentExplanationResult {
  fileName: string;
  fileSize: number;
  documentType: string;
  summary: string;
  importantAmounts: Array<{ label: string; amount: string; note: string }>;
  deductions: Array<{ label: string; amount: string; note: string }>;
  criticalDates: Array<{ label: string; date: string }>;
  keyTerms: string[];
  takeaways: string[];
  analyzedAt: string;
}

export interface MythFactVerificationResult {
  claim: string;
  verdict: 'FACT' | 'MYTH' | 'DEPENDS ON CONTEXT';
  confidence: number;
  explanation: string;
  reasoning: string;
  sources: string[];
  verifiedAt: string;
}

interface FinancialDataContextType {
  profile: UserFinancialProfile;
  salaryBreakdown: SalaryBreakdown | null;
  goals: UserGoal[];
  termCalculations: TermCalculationHistory[];
  savedDocuments: DocumentExplanationResult[];
  savedVerifications: MythFactVerificationResult[];
  updateFinancialProfile: (updates: Partial<UserFinancialProfile>) => void;
  addGoal: (goal: Omit<UserGoal, 'id' | 'createdAt'>) => void;
  deleteGoal: (id: string) => void;
  recordTermCalculation: (record: Omit<TermCalculationHistory, 'calculatedAt'>) => void;
  addDocumentExplanation: (doc: DocumentExplanationResult) => void;
  addMythFactVerification: (verification: MythFactVerificationResult) => void;
  clearFinancialData: () => void;
}

const FinancialDataContext = createContext<FinancialDataContextType | undefined>(undefined);

const STORAGE_KEY = 'dhanadrishti_financial_data';

export const FinancialDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Empty default state - strictly NO fake or sample user data
  const [profile, setProfile] = useState<UserFinancialProfile>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_profile`);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [goals, setGoals] = useState<UserGoal[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_goals`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [termCalculations, setTermCalculations] = useState<TermCalculationHistory[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_term_calcs`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [savedDocuments, setSavedDocuments] = useState<DocumentExplanationResult[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_docs`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [savedVerifications, setSavedVerifications] = useState<MythFactVerificationResult[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_verifications`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Calculate salary breakdown deterministically whenever annualCtc or monthlyExpenses change
  const salaryBreakdown: SalaryBreakdown | null =
    profile.annualCtc !== undefined && profile.annualCtc > 0
      ? calculateSalaryBreakdown(profile.annualCtc, profile.monthlyExpenses || 0)
      : null;

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to persist profile', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_goals`, JSON.stringify(goals));
    } catch (e) {
      console.warn('Failed to persist goals', e);
    }
  }, [goals]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_term_calcs`, JSON.stringify(termCalculations));
    } catch (e) {
      console.warn('Failed to persist calculations', e);
    }
  }, [termCalculations]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_docs`, JSON.stringify(savedDocuments));
    } catch (e) {
      console.warn('Failed to persist docs', e);
    }
  }, [savedDocuments]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_verifications`, JSON.stringify(savedVerifications));
    } catch (e) {
      console.warn('Failed to persist verifications', e);
    }
  }, [savedVerifications]);

  const updateFinancialProfile = (updates: Partial<UserFinancialProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const addGoal = (newGoal: Omit<UserGoal, 'id' | 'createdAt'>) => {
    const goal: UserGoal = {
      ...newGoal,
      id: `goal_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    setGoals((prev) => [goal, ...prev]);
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const recordTermCalculation = (record: Omit<TermCalculationHistory, 'calculatedAt'>) => {
    const calc: TermCalculationHistory = {
      ...record,
      calculatedAt: new Date().toISOString(),
    };
    setTermCalculations((prev) => [calc, ...prev.slice(0, 19)]); // Keep last 20
  };

  const addDocumentExplanation = (doc: DocumentExplanationResult) => {
    setSavedDocuments((prev) => [doc, ...prev]);
  };

  const addMythFactVerification = (verification: MythFactVerificationResult) => {
    setSavedVerifications((prev) => [verification, ...prev]);
  };

  const clearFinancialData = () => {
    setProfile({});
    setGoals([]);
    setTermCalculations([]);
    setSavedDocuments([]);
    setSavedVerifications([]);
    localStorage.removeItem(`${STORAGE_KEY}_profile`);
    localStorage.removeItem(`${STORAGE_KEY}_goals`);
    localStorage.removeItem(`${STORAGE_KEY}_term_calcs`);
    localStorage.removeItem(`${STORAGE_KEY}_docs`);
    localStorage.removeItem(`${STORAGE_KEY}_verifications`);
  };

  return (
    <FinancialDataContext.Provider
      value={{
        profile,
        salaryBreakdown,
        goals,
        termCalculations,
        savedDocuments,
        savedVerifications,
        updateFinancialProfile,
        addGoal,
        deleteGoal,
        recordTermCalculation,
        addDocumentExplanation,
        addMythFactVerification,
        clearFinancialData,
      }}
    >
      {children}
    </FinancialDataContext.Provider>
  );
};

export const useFinancialData = () => {
  const context = useContext(FinancialDataContext);
  if (!context) {
    throw new Error('useFinancialData must be used within a FinancialDataProvider');
  }
  return context;
};
