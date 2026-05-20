'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function DiffViewPage() {
  const { id } = useParams();
  const [auditData, setAuditData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mocking updated dynamic calculation for UI representation
  const UPDATED_LIVE_PRICING = { supabase: { pro: 25 } };

  useEffect(() => {
    async function fetchAudit() {
      if (!id) return;
      const { data, error } = await supabase
        .from('audits')
        .select('*')
        .eq('audit_id', id)
        .single();

      if (!error && data) {
        setAuditData(data);
      }
      setLoading(false);
    }
    fetchAudit();
  }, [id]);

  if (loading) return <div style={{ padding: '40px', color: '#666' }}>Loading comparison metric charts...</div>;
  if (!auditData) return <div style={{ padding: '40px', color: 'red' }}>Audit log record not found.</div>;

  // Simple delta tracking calculations
  const oldPrice = auditData.pricing_snapshot_used?.supabase?.pro || 20;
  const newPrice = UPDATED_LIVE_PRICING.supabase.pro;
  const savingsDelta = oldPrice - newPrice; // Negative indicator tracks price surge

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #eaeaea', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', color: '#111' }}>🔄 Audit Pricing Divergence Diff View</h1>
        <p style={{ color: '#666' }}>Comparing historical snapshot with live current market pricing architectures.</p>
        
        <div style={{ marginTop: '20px', background: savingsDelta < 0 ? '#fff5f5' : '#f0fdf4', padding: '15px', borderRadius: '6px', border: `1px solid ${savingsDelta < 0 ? '#feb2b2' : '#bbf7d0'}` }}>
          <h3 style={{ margin: 0, color: savingsDelta < 0 ? '#c53030' : '#15803d' }}>
            💰 Total Budget Savings Delta: {savingsDelta < 0 ? `+$${Math.abs(savingsDelta)} Monthly Variance (Cost Increase)` : `-$${savingsDelta} Monthly Reduction`}
          </h3>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Left Side: Original State */}
        <div style={{ border: '1px solid #e1e4e8', borderRadius: '8px', padding: '20px', background: '#f6f8fa' }}>
          <h2 style={{ fontSize: '18px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>📉 Original Audit Configuration</h2>
          <p><strong>User Email:</strong> {auditData.user_email}</p>
          <p><strong>Supabase Pro Plan Cost:</strong> ${oldPrice}/mo</p>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>Captured on creation timestamp.</div>
        </div>

        {/* Right Side: Updated State */}
        <div style={{ border: '1px solid #bbf7d0', borderRadius: '8px', padding: '20px', background: '#f0fdf4' }}>
          <h2 style={{ fontSize: '18px', borderBottom: '1px solid #bbf7d0', paddingBottom: '10px', color: '#15803d' }}>🚀 Live Dynamic Recommendation</h2>
          <p><strong>User Email:</strong> {auditData.user_email}</p>
          <p style={{ color: '#c53030', fontWeight: 'bold' }}><strong>Supabase Pro Plan Cost:</strong> ${newPrice}/mo (Rate Changed)</p>
          <div style={{ fontSize: '12px', color: '#15803d', marginTop: '10px' }}>Recalculated with live system configs.</div>
        </div>
      </div>
    </div>
  );
}