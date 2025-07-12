import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lqgmqliemeghrlqkxanp.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZ21xbGllbWVnaHJscWt4YW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNjkzOTYsImV4cCI6MjA2Njk0NTM5Nn0.fuxpf_RMi3Qf0m9AkhgTsMiLTcXFsgFgwUXJTyiUB7g'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 