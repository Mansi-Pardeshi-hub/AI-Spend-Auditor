// src/lib/audit-engine.ts

export interface AuditInput {
  toolName: string;
  plan: string;
  seats: number;
  monthlySpend: number;
}

export interface AuditResult {
  recommendedPlan: string;
  savings: number;
  reason: string;
  aiSummary: string; // New field for AI insights
}

/**
 * Core Engine to calculate savings and provide recommendations
 */
export const runAudit = (input: AuditInput): AuditResult => {
  const { toolName, plan, seats, monthlySpend } = input;
  let recommendedPlan = plan;
  let savings = 0;
  let reason = "Your current plan is already cost-effective.";

  // 1. Cursor Audit Logic
  if (toolName.toLowerCase() === "cursor") {
    if (plan === "Business" && seats < 3) {
      recommendedPlan = "Pro";
      savings = monthlySpend - (20 * seats);
      reason = "The Pro plan is sufficient for teams under 3 users, saving on unnecessary administrative overhead.";
    }
  }

  // 2. OpenAI/ChatGPT Audit Logic
  if (toolName.toLowerCase() === "chatgpt" || toolName.toLowerCase() === "openai") {
    if (plan === "Enterprise" && seats < 20) {
      recommendedPlan = "Team";
      savings = monthlySpend - (25 * seats);
      reason = "Switching to the Team plan provides collaborative features without the high cost of Enterprise for small teams.";
    }
  }

  // 3. AI Summary Generation (Dynamic Insights)
  const aiSummary = generateAISummary(savings, toolName, recommendedPlan);

  return { recommendedPlan, savings, reason, aiSummary };
};

/**
 * AI Summary Generator - Mimics an LLM response based on audit results
 */
export const generateAISummary = (savings: number, tool: string, plan: string): string => {
  if (savings <= 0) {
    return `Great job! Your usage of ${tool} is perfectly optimized for your team size. No immediate action is required.`;
  }

  return `Our AI analysis suggests that by transitioning to the ${tool} ${plan} plan, you can unlock $${savings} in monthly savings. This change maintains your core features while eliminating 'tier-bloat'—ensuring you only pay for what your team actually uses.`;
};