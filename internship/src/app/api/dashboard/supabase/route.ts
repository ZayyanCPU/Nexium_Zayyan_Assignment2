import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('Summary')
      .select('*')
      .order('time', { ascending: false })
      .limit(20)
    
    if (error) {
      console.error('Supabase dashboard error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch Supabase data' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Supabase dashboard error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Supabase data' },
      { status: 500 }
    )
  }
} 