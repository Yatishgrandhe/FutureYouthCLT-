import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { ADMIN_PASSWORD } from '@/lib/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://agqpnnhszjzcsosefsaz.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFncXBubmhzemp6Y3Nvc2Vmc2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MjQ1ODksImV4cCI6MjA4MjEwMDU4OX0.eHir8-4qAz2s5z2vuPx5b29BhrL1mGMiJzNu8o-JsOo'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const password = searchParams.get('password')

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const { data, error } = await supabase
    .from('volunteer_hours')
    .select(`
      *,
      events (
        title
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ volunteerHours: data })
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url)
  const password = searchParams.get('password')

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, approved } = await request.json()

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const updateData: any = { approved }
  if (approved) {
    updateData.approved_at = new Date().toISOString()
  }

  const { error } = await supabase
    .from('volunteer_hours')
    .update(updateData)
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

