// src/lib/audit-engine.ts

export interface AuditInput {
  toolName: string;
  plan: string;
  seats: number;
  monthlySpend: number;
}

export const runAudit = (input: AuditInput) => {
  const { toolName, plan, seats, monthlySpend } = input;
  let recommendedPlan = plan;
  let savings = 0;
  let reason = "Your current plan is already cost-effective.";

  // Cursor Audit Logic
  if (toolName.toLowerCase() === "cursor") {
    if (plan === "Business" && seats < 3) {
      recommendedPlan = "Pro";
      savings = monthlySpend - (20 * seats);
      reason = "The Pro plan is sufficient for teams under 3 users, saving on unnecessary administrative overhead.";
    }
  }

  // OpenAI/ChatGPT Audit Logic
  if (toolName.toLowerCase() === "chatgpt" || toolName.toLowerCase() === "openai") {
    if (plan === "Enterprise" && seats < 20) {
      recommendedPlan = "Team";
      savings = monthlySpend - (25 * seats);
      reason = "Switching to the Team plan provides collaborative features without the high cost of Enterprise for small teams.";
    }
  }

  return { recommendedPlan, savings, reason };
};