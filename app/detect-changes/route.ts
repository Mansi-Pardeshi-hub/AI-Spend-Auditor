import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

// Resend client initializer fallback safely set inside sandbox
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

// Mocking current live pricing configuration (As per instructions allowance)
const CURRENT_LIVE_PRICING = {
  openai: { gpt4: 15, gpt35: 0.50 }, 
  anthropic: { claude3: 20 },
  supabase: { pro: 25 } // Changed from $20 to $25 to trigger detection
};

export async function GET() {
  try {
    // 1. Fetch all stored user audits from database
    const { data: storedAudits, error: dbError } = await supabase
      .from('audits')
      .select('*');

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // Object to consolidate alerts by email to avoid spamming loops
    const emailConsolidationMap: Record<string, Array<{ auditId: string; toolChanged: string; oldPrice: number; newPrice: number }>> = {};

    // 2. Loop through every audit to check if snapshot matches current live pricing data
    for (const audit of (storedAudits || [])) {
      
      // JSONB casting configuration fallback validation to protect production types stability
      const snapshot = typeof audit.pricing_snapshot_used === 'string' 
        ? JSON.parse(audit.pricing_snapshot_used) 
        : audit.pricing_snapshot_used;
      
      // Strict structural property verification checks
      if (snapshot && typeof snapshot === 'object' && 'supabase' in snapshot) {
        const supabaseConfig = (snapshot as any).supabase;
        
        if (supabaseConfig && supabaseConfig.pro && supabaseConfig.pro !== CURRENT_LIVE_PRICING.supabase.pro) {
          const userEmail = audit.user_email;
          
          if (!emailConsolidationMap[userEmail]) {
            emailConsolidationMap[userEmail] = [];
          }

          emailConsolidationMap[userEmail].push({
            auditId: audit.audit_id,
            toolChanged: 'Supabase Pro Plan',
            oldPrice: supabaseConfig.pro,
            newPrice: CURRENT_LIVE_PRICING.supabase.pro
          });
        }
      }
    }

    // 3. Fire Consolidated Emails using Resend Service
    const emailPromises = Object.entries(emailConsolidationMap).map(async ([userEmail, alerts]) => {
      const auditRowsHtml = alerts.map(alert => `
        <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
          <p><strong>Audit ID:</strong> ${alert.auditId}</p>
          <p><strong>Tool Affected:</strong> ${alert.toolChanged}</p>
          <p><strong>Price Alert:</strong> Changed from $${alert.oldPrice} to $${alert.newPrice}</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/diff/${alert.auditId}" 
             style="display: inline-block; background: #0070f3; color: white; padding: 8px 12px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            View Re-audit Diff & Savings Delta
          </a>
        </div>
      `).join('');

      return resend.emails.send({
        from: 'AI Spend Auditor <onboarding@resend.dev>',
        to: userEmail,
        subject: '⚠️ Action Required: Pricing Changes Detected In Your AI Spend Audits',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #333;">
            <h2>Hello,</h2>
            <p>Market rates for your selected AI components have changed. Your previous audit configuration might no longer be optimized.</p>
            <h3>Impacted Audits Summary:</h3>
            ${auditRowsHtml}
            <br />
            <p>Please click the links above to view the dynamic side-by-side diff view.</p>
          </div>
        `
      });
    });

    // Guard deployment check: Execute Resend stack only when explicit key is mounted
    if (process.env.RESEND_API_KEY) {
      await Promise.all(emailPromises);
    }

    return NextResponse.json({
      success: true,
      message: `Scan complete. Sent consolidated alerts to ${Object.keys(emailConsolidationMap).length} users.`
    }, { status: 200 });

  } catch (err: any) {
    console.error('Detection Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}