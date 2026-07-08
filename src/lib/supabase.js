import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Get these from a .env file later, but we use placeholders or Expo env vars.
// We expect the user to create a .env file with EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://hdqpmawlhhvnioxkxvpj.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_iBN9uFB_xdemug-BLp85-g_qBHO8YJj';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
