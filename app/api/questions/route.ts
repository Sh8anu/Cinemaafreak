import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const mode = searchParams.get('mode');

  let query = supabaseAdmin
    .from('questions')
    .select('id, category, mode, prompt, difficulty'); // Deliberately omit answers

  if (category) query = query.eq('category', category);
  if (mode) query = query.eq('mode', mode);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}