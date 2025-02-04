import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://srczszyvrvvuiykswnii.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyY3pzenl2cnZ2dWl5a3N3bmlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyNzgxOTIsImV4cCI6MjA0ODg1NDE5Mn0.RrxwvsJ3fOCoygltDn4kyfXMPYa_dcZI7j4aikPIJRU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})