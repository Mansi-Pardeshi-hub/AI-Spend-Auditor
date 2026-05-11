import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";

/**
 * Shared Audit Page
 * This is a Server Component that fetches data based on the dynamic ID from the URL.
 * It fulfills the "Unique Public URL" and "Privacy" requirements.
 */
export default async function SharedAuditPage({ params }: { params: { id: string } }) {
  // 1. Fetch the specific audit record from Supabase leads table
  const { data: audit, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", params.id)
    .single();

  // 2. If record doesn't exist or there's an error, show 404
  if (error || !audit) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] py-16 px-4 font-sans text-slate-900">
      <div className="max-w-2xl mx-auto">
        {/* Header - No personal info shown for privacy */}
        <div className="text-center mb-10">
          <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-green-100 uppercase tracking-widest">
            ✅ Verified Audit Report
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Audit for <span className="text-blue-600">{audit.tool_name}</span>
          </h1>
          <p className="mt-2 text-slate-600 italic">
            This report was generated using the AI Spend Auditor.
          </p>
        </div>

        {/* Audit Results Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Recommended Plan</p>
                <p className="text-xl font-bold text-blue-600">{audit.recommended_plan}</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Potential Monthly Savings</p>
                <p className="text-xl font-bold text-green-600">${audit.savings}/mo</p>
              </div>
            </div>

            {/* Annual Impact Badge */}
            <div className="mt-6 bg-slate-900 text-white p-5 rounded-xl flex items-center justify-between shadow-lg">
              <div>
                <p className="text-[10px] font-bold uppercase opacity-60 tracking-widest">Projected Annual Savings</p>
                <p className="text-3xl font-black text-blue-400">${audit.annual_savings}/year</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>

            {/* Analysis Reasoning */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-tight">Financial Analysis Reasoning</h3>
              <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl text-slate-700 leading-relaxed italic">
                &quot;{audit.reason}&quot;
              </div>
            </div>

            {/* Viral Loop / CTA */}
            <div className="mt-10 pt-8 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-600 mb-6 font-medium">
                Want to see if your team is overspending on AI?
              </p>
              <a 
                href="/" 
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transform active:scale-95 transition-all shadow-md"
              >
                Run Your Own Free Audit
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-slate-400 text-[10px] uppercase tracking-widest font-semibold">
          AI Spend Auditor • Built with Privacy in Mind
        </p>
      </div>
    </main>
  );
}