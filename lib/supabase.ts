import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kwbkgvuyosdzogfhpsds.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3YmtndnV5b3Nkem9nZmhwc2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwMzI0ODIsImV4cCI6MjAyODYwODQ4Mn0.bSj12HB0z-Y5gmTXPQ-SiaourZFmBNac4WxEAIWXYvo"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})