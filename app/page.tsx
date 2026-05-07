"use client";

import { useState } from "react";
import { runAudit, AuditInput } from "../src/lib/audit-engine";
import { supabase } from "../src/lib/supabase"; // Supabase client import kiya

export default function AuditPage() {
  const [formData, setFormData] = useState<AuditInput>({
    toolName: "Cursor",
    plan: "Business",
    seats: 1,
    monthlySpend: 40,
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  // Lead Capture States
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleAudit = () => {
    setLoading(true);
    setTimeout(() => {
      const auditResult = runAudit(formData);
      setResult(auditResult);
      setLoading(false);
    }, 600);
  };

  const handleLeadCapture = async () => {
    if (!email || !email.includes("@")) {
      return alert("Please enter a valid work email");
    }
    
    setIsSaving(true);
    try {
      const { error } = await supabase.from("leads").insert([
        { 
          email: email, 
          tool_name: formData.toolName, 
          savings: result.savings 
        }
      ]);

      if (!error) {
        alert("Success! Your audit report has been saved.");
        setEmail("");
      } else {
        throw error;
      }
    } catch (err) {
      console.error("Error saving lead:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] py-16 px-4 font-sans text-slate-900">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            AI <span className="text-blue-600">Spend</span> Auditor
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Optimize your SaaS overhead with automated financial auditing.
          </p>
        </div>

        {/* Audit Form Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">AI Tool Provider</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  onChange={(e) => setFormData({...formData, toolName: e.target.value})}
                >
                  <option value="Cursor">Cursor AI</option>
                  <option value="ChatGPT">OpenAI (ChatGPT)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Active Seats</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  value={formData.seats}
                  onChange={(e) => setFormData({...formData, seats: parseInt(e.target.value) || 0})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Spend ($)</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  value={formData.monthlySpend}
                  onChange={(e) => setFormData({...formData, monthlySpend: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <button 
              onClick={handleAudit}
              disabled={loading}
              className="mt-8 w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-lg hover:bg-slate-800 transform active:scale-[0.98] transition-all shadow-lg flex items-center justify-center"
            >
              {loading ? "Analyzing..." : "Generate Optimization Report"}
            </button>
          </div>

          {/* Professional Result Section */}
          {result && !loading && (
            <div className="border-t border-slate-100 bg-slate-50 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800">Audit Summary</h2>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Verified</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Recommended Plan</p>
                  <p className="text-xl font-bold text-blue-600">{result.recommendedPlan}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Estimated Savings</p>
                  <p className="text-xl font-bold text-green-600">${result.savings}/month</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200">
                <p className="text-sm font-medium text-slate-700 leading-relaxed italic">
                  &quot;{result.reason}&quot;
                </p>
              </div>

              {/* Lead Capture Form Section [cite: 39, 83] */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-tight">Save this optimization report</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your work email"
                    className="flex-1 bg-white border border-slate-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button 
                    onClick={handleLeadCapture}
                    disabled={isSaving}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md whitespace-nowrap disabled:bg-blue-400"
                  >
                    {isSaving ? "Saving..." : "Email Report"}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-3 text-center italic">
                  Credex uses this email to notify you when new optimizations apply to your stack. [cite: 72]
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-slate-500 text-sm italic">
          Calculated based on real-time market pricing data (May 2026). [cite: 65, 157]
        </p>
      </div>
    </main>
  );
}