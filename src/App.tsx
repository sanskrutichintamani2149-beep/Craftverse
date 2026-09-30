import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

// Lazy loaded page components
const LandingPage = lazy(() => import('@/pages/landing/LandingPage').then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const SignUpPage = lazy(() => import('@/pages/auth/SignUpPage').then(m => ({ default: m.SignUpPage })));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));
const TermopediaHomePage = lazy(() => import('@/pages/termopedia/TermopediaHomePage').then(m => ({ default: m.TermopediaHomePage })));
const TermDetailPage = lazy(() => import('@/pages/termopedia/TermDetailPage').then(m => ({ default: m.TermDetailPage })));
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage').then(m => ({ default: m.DashboardPage })));
const WhatIfPage = lazy(() => import('@/pages/whatif/WhatIfPage').then(m => ({ default: m.WhatIfPage })));
const GoalPlannerPage = lazy(() => import('@/pages/goals/GoalPlannerPage').then(m => ({ default: m.GoalPlannerPage })));
const DocumentExplainerPage = lazy(() => import('@/pages/document/DocumentExplainerPage').then(m => ({ default: m.DocumentExplainerPage })));
const FinancialHealthPage = lazy(() => import('@/pages/health/FinancialHealthPage').then(m => ({ default: m.FinancialHealthPage })));
const MythOrFactPage = lazy(() => import('@/pages/myth/MythOrFactPage').then(m => ({ default: m.MythOrFactPage })));
const MentorPage = lazy(() => import('@/pages/mentor/MentorPage').then(m => ({ default: m.MentorPage })));
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage').then(m => ({ default: m.ProfilePage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center text-brand-cyan">
    <Loader2 className="w-8 h-8 animate-spin" />
  </div>
);

// Root route switcher: signed-out visitors see Landing; signed-in users see Term-O-Pedia
const RootRoute: React.FC = () => {
  const { user } = useAuth();
  if (user) {
    return <TermopediaHomePage />;
  }
  return <LandingPage />;
};

// Auth Guard for public login/signup pages (signed-in users redirect to /)
const PublicAuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Auth Routes */}
          <Route
            path="/login"
            element={
              <PublicAuthRoute>
                <LoginPage />
              </PublicAuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicAuthRoute>
                <SignUpPage />
              </PublicAuthRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Authenticated Platform Shell Routes */}
          <Route element={<AppShell />}>
            <Route path="/" element={<RootRoute />} />
            <Route path="/term/:slug" element={<TermDetailPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/what-if" element={<WhatIfPage />} />
            <Route path="/goal-planner" element={<GoalPlannerPage />} />
            <Route path="/document-explainer" element={<DocumentExplainerPage />} />
            <Route path="/financial-health" element={<FinancialHealthPage />} />
            <Route path="/myth-or-fact" element={<MythOrFactPage />} />
            <Route path="/mentor" element={<MentorPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
