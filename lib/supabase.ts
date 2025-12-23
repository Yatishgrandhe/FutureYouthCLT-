import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://agqpnnhszjzcsosefsaz.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFncXBubmhzemp6Y3Nvc2Vmc2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MjQ1ODksImV4cCI6MjA4MjEwMDU4OX0.eHir8-4qAz2s5z2vuPx5b29BhrL1mGMiJzNu8o-JsOo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin password - stored in code as requested
export const ADMIN_PASSWORD = 'FutureYouth2025!'

