import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabaseAuthAdapter, UserProfile } from '@/services/auth/authAdapter';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isConfigured: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, password: string, metadata?: { fullName?: string; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  signInWithOAuth: (provider: 'google' | 'github') => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const adapter = supabaseAuthAdapter;

  useEffect(() => {
    let mounted = true;

    if (!adapter.isConfigured) {
      setLoading(false);
      return;
    }

    adapter.getCurrentUser().then((currentUser) => {
      if (mounted) {
        setUser(currentUser);
        setLoading(false);
      }
    });

    const unsubscribe = adapter.onAuthStateChange((updatedUser) => {
      if (mounted) {
        setUser(updatedUser);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [adapter]);

  const signInWithEmail = async (email: string, password: string) => {
    if (!adapter.isConfigured) {
      return { success: false, error: 'Authentication service is not connected.' };
    }
    const { user: authedUser, error } = await adapter.signInWithEmail(email, password);
    if (error || !authedUser) {
      return { success: false, error: error || 'Failed to sign in.' };
    }
    setUser(authedUser);
    return { success: true };
  };

  const signUpWithEmail = async (email: string, password: string, metadata?: { fullName?: string; phone?: string }) => {
    if (!adapter.isConfigured) {
      return { success: false, error: 'Authentication service is not connected.' };
    }
    const { user: createdUser, error } = await adapter.signUpWithEmail(email, password, metadata);
    if (error) {
      return { success: false, error };
    }
    if (createdUser) {
      setUser(createdUser);
    }
    return { success: true };
  };

  const signInWithOAuth = async (provider: 'google' | 'github') => {
    if (!adapter.isConfigured) {
      return { success: false, error: 'Authentication service is not connected.' };
    }
    const { error } = await adapter.signInWithOAuth(provider);
    if (error) {
      return { success: false, error };
    }
    return { success: true };
  };

  const signOut = async () => {
    await adapter.signOut();
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    if (!adapter.isConfigured) {
      return { success: false, error: 'Authentication service is not connected.' };
    }
    const { error } = await adapter.resetPassword(email);
    if (error) {
      return { success: false, error };
    }
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: adapter.isConfigured,
        signInWithEmail,
        signUpWithEmail,
        signInWithOAuth,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
