import { createClient, SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
  initials: string;
  createdAt: string;
}

export interface AuthAdapter {
  isConfigured: boolean;
  getCurrentUser: () => Promise<UserProfile | null>;
  signInWithEmail: (email: string, password: string) => Promise<{ user: UserProfile | null; error?: string }>;
  signUpWithEmail: (email: string, password: string, metadata?: { fullName?: string; phone?: string }) => Promise<{ user: UserProfile | null; error?: string }>;
  signInWithOAuth: (provider: 'google' | 'github') => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  onAuthStateChange: (callback: (user: UserProfile | null) => void) => () => void;
}

// Read public environment variables safely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

let supabase: SupabaseClient | null = null;
if (isSupabaseConfigured && supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
  }
}

const mapSupabaseUser = (user: SupabaseUser | null): UserProfile | null => {
  if (!user) return null;
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  const names = fullName.trim().split(' ');
  const initials = names.length > 1
    ? (names[0][0] + names[names.length - 1][0]).toUpperCase()
    : fullName.substring(0, 2).toUpperCase();

  return {
    id: user.id,
    email: user.email || '',
    fullName,
    phoneNumber: user.phone || user.user_metadata?.phone,
    initials,
    createdAt: user.created_at,
  };
};

export const supabaseAuthAdapter: AuthAdapter = {
  isConfigured: isSupabaseConfigured && supabase !== null,

  async getCurrentUser() {
    if (!supabase) return null;
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) return null;
    return mapSupabaseUser(session.user);
  },

  async signInWithEmail(email, password) {
    if (!supabase) {
      return { user: null, error: 'Authentication service is not connected. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { user: null, error: error.message };
    }
    return { user: mapSupabaseUser(data.user) };
  },

  async signUpWithEmail(email, password, metadata) {
    if (!supabase) {
      return { user: null, error: 'Authentication service is not connected. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata?.fullName,
          phone: metadata?.phone,
        },
      },
    });
    if (error) {
      return { user: null, error: error.message };
    }
    return { user: mapSupabaseUser(data.user) };
  },

  async signInWithOAuth(provider) {
    if (!supabase) {
      return { error: 'Authentication service is not connected.' };
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      return { error: error.message };
    }
    return {};
  },

  async signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  },

  async resetPassword(email) {
    if (!supabase) {
      return { error: 'Authentication service is not connected.' };
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      return { error: error.message };
    }
    return {};
  },

  onAuthStateChange(callback) {
    if (!supabase) {
      callback(null);
      return () => {};
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(mapSupabaseUser(session?.user || null));
    });
    return () => subscription.unsubscribe();
  },
};
