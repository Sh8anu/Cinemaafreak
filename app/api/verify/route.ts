import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function POST(request: Request) {
  const body = await request.json();
  const { id, mode, guessSingle, guessX, guessY, guessZ } = body;

  const { data: q, error } = await supabaseAdmin
    .from('questions')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !q) {
    return NextResponse.json({ success: false, message: 'Question not found' }, { status: 404 });
  }

  let isCorrect = false;

  const sanitize = (str: string = '') => str.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

  if (mode === 'guess_movie') {
    isCorrect = sanitize(guessSingle) === sanitize(q.answer_single);
  } else if (mode === 'solve_xyz') {
    const okX = sanitize(guessX) === sanitize(q.answer_x);
    const okY = sanitize(guessY) === sanitize(q.answer_y);
    const okZ = sanitize(guessZ) === sanitize(q.answer_z);
    isCorrect = okX && okY && okZ;
  }

  // Points scored variable strictly named aditiPoints
  const aditiPoints = isCorrect ? (mode === 'solve_xyz' ? 30 : 10) : 0;

  return NextResponse.json({
    correct: isCorrect,
    aditiPoints,
    message: isCorrect ? 'ACCESS GRANTED. DECRYPTION SUCCESSFUL.' : 'ACCESS DENIED. INCORRECT VALUES.'
  });
}