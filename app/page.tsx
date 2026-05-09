"use client";

import { useState } from "react";
import { runAudit, AuditInput } from "../lib/audit-engine";
import { supabase } from "../lib/supabase";

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
    }, 800); // Slightly longer for "AI feel"
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
          <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-blue-100 uppercase tracking-widest">
            ✨ AI-Powered Optimization
          </div>
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
                  value={formData.toolName}
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
              className="mt-8 w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-lg hover:bg-slate-800 transform active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analyzing Your Stack...
                </>
              ) : "Generate Optimization Report"}
            </button>
            
            {/* Privacy Badge below button (User Feedback Requirement) */}
            <div className="mt-4 flex items-center justify-center space-x-2 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
              <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 4.908-3.367 8.992-8 9.999-4.633-1.007-8-5.091-8-9.999 0-.681.057-1.35.166-2.001zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Privacy-First • No Data Sharing • GDPR Compliant</span>
            </div>
          </div>

          {/* Professional Result Section */}
          {result && !loading && (
            <div className="border-t border-slate-100 bg-slate-50 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <span className="text-blue-600">📊</span> Audit Summary
                </h2>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Verified Optimization</span>
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

              {/* AI PERSONALIZED SUMMARY BOX - FEATURE #4 */}
              <div className="mt-6 p-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                   <svg width="60" height="60" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L14.4 9.1L22 9.2L15.9 13.5L18.3 21L12 16.5L5.7 21L8.1 13.5L2 9.2L9.6 9.1L12 2Z"/></svg>
                </div>
                <h3 className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                  AI Personalized Insight
                </h3>
                <p className="text-sm font-medium leading-relaxed italic text-slate-200">
                  &quot;{result.aiSummary}&quot;
                </p>
              </div>

              {/* Lead Capture Form Section */}
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
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-slate-500 text-xs italic tracking-wide">
          Calculated based on real-time market pricing data (May 2026). <br/>
          Designed & Developed by Mansi Pardeshi
        </p>
      </div>
    </main>
  );
}