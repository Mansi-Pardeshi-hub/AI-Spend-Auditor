import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";

// Mocking current live market pricing infrastructure for comparison calculations
const CURRENT_LIVE_PRICING = {
  openai: { gpt4: 15, gpt35: 0.50 }, 
  anthropic: { claude3: 20 },
  supabase: { pro: 25 } // Updated price threshold to evaluate budget delta
};

/**
 * Round 2 - Dynamic Re-Audit & Pricing Divergence Diff Page
 * Server Component that securely processes historical data vs current live pricing snapshots.
 */
export default async function SharedAuditPage({ params }: { params: { id: string } }) {
  
  // 1. Fetch the exact saved session record from the 'audits' table using URL parameter
  const { data: audit, error } = await supabase
    .from("audits")
    .select("*")
    .eq("audit_id", params.id)
    .single();

  // 2. Fallback validation trigger to present 404 layout if mismatch detected
  if (error || !audit) {
    return notFound();
  }

  // Safe parsing extraction rules to prevent generic type/string runtime schema failures inside Vercel
  const snapshot = typeof audit.pricing_snapshot_used === 'string'
    ? JSON.parse(audit.pricing_snapshot_used)
    : audit.pricing_snapshot_used;

  const originalOutput = typeof audit.output_result === 'string'
    ? JSON.parse(audit.output_result)
    : audit.output_result;

  // Extraction of target testing thresholds
  const oldPrice = snapshot?.supabase?.pro || 20;
  const newPrice = CURRENT_LIVE_PRICING.supabase.pro;
  
  // Savings delta mapping rule logic (Negative numbers signify a rate increase)
  const savingsDelta = oldPrice - newPrice;

  return (
    <main className="min-h-screen bg-[#f8fafc] py-16 px-4 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Block presenting trace validation */}
        <div className="text-center mb-10">
          <div className="inline-block bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-amber-100 uppercase tracking-widest">
            🔄 Live Pricing Divergence Analysis
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Audit Delta for <span className="text-blue-600">{audit.user_email}</span>
          </h1>
          <p className="mt-2 text-slate-600 italic">
            Comparing historical snapshot metrics with current real-time market rates.
          </p>
        </div>

        {/* Financial Delta Dashboard Summary Segment */}
        <div className={`mb-8 p-6 rounded-2xl border transition-all shadow-md ${
          savingsDelta < 0 
            ? "bg-red-50 border-red-200 text-red-900" 
            : "bg-emerald-50 border-emerald-200 text-emerald-900"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider opacity-75">Total Operational Budget Delta</p>
              <p className="text-2xl font-black mt-1">
                {savingsDelta < 0 
                  ? `+$${Math.abs(savingsDelta)} Monthly Variance (Cost Surge detected)` 
                  : `-$${savingsDelta} Monthly Optimisation Achieved`}
              </p>
            </div>
            <span className="text-3xl">{savingsDelta < 0 ? "⚠️" : "🚀"}</span>
          </div>
        </div>

        {/* Side-by-Side Architectural Diff Comparison Grid Component */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Panel: Captured Historic Configuration */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-6 relative">
            <div className="absolute top-0 right-0 bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
              Historical Snapshot
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
              📉 Baseline Architecture
            </h2>
            
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Component Profile Tracked</p>
                <p className="text-base font-semibold text-slate-700">Supabase Cloud Stack</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Plan Rate Threshold</p>
                <p className="text-xl font-bold text-slate-900">${oldPrice} / mo</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Original Projected Strategy</p>
                <p className="text-sm text-slate-600 italic">
                  "{originalOutput?.recommendation || 'Premium infrastructure distribution optimized for operational safety.'}"
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: Recalculated Live Recommendation Model */}
          <div className="bg-white border border-emerald-200 rounded-2xl shadow-xl overflow-hidden p-6 relative bg-gradient-to-b from-white to-emerald-50/20">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
              Live Recalculation
            </div>
            <h2 className="text-lg font-bold text-emerald-800 mb-4 border-b border-emerald-100 pb-2 flex items-center gap-2">
              🚀 Dynamic Optimization
            </h2>

            <div className="space-y-4">
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">System Component Status</p>
                <p className="text-base font-semibold text-emerald-900">Supabase Live Pricing Shift</p>
              </div>
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Current Active Market Cost</p>
                <p className="text-xl font-bold text-red-600">${newPrice} / mo</p>
              </div>
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Mitigation Architecture Advice</p>
                <p className="text-sm text-emerald-800 font-medium">
                  Due to current $5 rate fluctuations, shifting heavy database procedures to decentralized self-hosted instances yields maximal risk hedge thresholds.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Core Return Navigation Loop */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600 mb-4 font-medium">
            Need to dynamically evaluate another tech infrastructure layout?
          </p>
          <a 
            href="/" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transform active:scale-95 transition-all shadow-md"
          >
            Go Back To Auditor Workspace
          </a>
        </div>

        {/* Footer Isolation Standard metadata */}
        <p className="mt-12 text-center text-slate-400 text-[10px] uppercase tracking-widest font-semibold">
          AI Spend Auditor • Automated Diff System Configuration Active
        </p>
      </div>
    </main>
  );
}