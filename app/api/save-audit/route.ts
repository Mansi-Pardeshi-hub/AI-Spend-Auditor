import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Agar import error aaye toh '../../lib/supabase' use karein

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { audit_id, user_email, input_stack, output_result, pricing_snapshot_used } = body;

    // Hard Constraint Validation
    if (!audit_id || !user_email || !input_stack || !output_result || !pricing_snapshot_used) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert data into Supabase 'audits' table
    const { data, error } = await supabase
      .from('audits')
      .insert([
        {
          audit_id,
          user_email,
          input_stack,
          output_result,
          pricing_snapshot_used,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase Insertion Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error('API Internal Server Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}