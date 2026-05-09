// lib/audit-engine.ts

export interface AuditInput {
  toolName: string;
  plan: string;
  seats: number;
  monthlySpend: number;
  useCase?: string; // PDF Requirement: Primary use case [cite: 37, 54]
}

export interface AuditResult {
  recommendedPlan: string;
  savings: number;
  annualSavings: number; // PDF Requirement: Big and clear [cite: 38, 69]
  reason: string;
  aiSummary: string;
}

/**
 * Core Engine: Validates usage-fit reasoning with real numbers [cite: 56, 63, 64]
 */
export const runAudit = (input: AuditInput): AuditResult => {
  const { toolName, plan, seats, monthlySpend } = input;
  let recommendedPlan = plan;
  let savings = 0;
  let reason = "You're spending well. Your current setup is already optimal.";

  const tool = toolName.toLowerCase();

  // 1. Cursor Logic [cite: 45]
  if (tool === "cursor") {
    if (plan === "Business" && seats < 3) {
      recommendedPlan = "Pro";
      savings = monthlySpend - (20 * seats);
      reason = "The Pro plan is sufficient for teams under 3 users, eliminating unnecessary admin overhead.";
    }
  } 
  // 2. GitHub Copilot Logic [cite: 46]
  else if (tool.includes("copilot")) {
    if (plan === "Enterprise" && seats < 10) {
      recommendedPlan = "Business";
      savings = monthlySpend - (19 * seats);
      reason = "Business tier provides all necessary collaborative features for smaller teams at half the price.";
    }
  }
  // 3. OpenAI / ChatGPT Logic [cite: 48]
  else if (tool.includes("chatgpt") || tool.includes("openai")) {
    if (plan === "Enterprise" && seats < 20) {
      recommendedPlan = "Team";
      savings = monthlySpend - (25 * seats);
      reason = "Switching to the Team plan provides full collaborative features without the high cost of Enterprise.";
    }
  }
  // 4. Claude / Anthropic Logic [cite: 47]
  else if (tool.includes("claude") || tool.includes("anthropic")) {
    if (plan === "Enterprise" && seats < 5) {
      recommendedPlan = "Team";
      savings = monthlySpend - (25 * seats);
      reason = "Team plan is designed for smaller groups while maintaining shared context and security.";
    }
  }
  // 5. Gemini Logic [cite: 51]
  else if (tool.includes("gemini")) {
    if (plan === "Ultra" && seats < 5) {
      recommendedPlan = "Pro";
      savings = monthlySpend - (20 * seats);
      reason = "Gemini Pro offers high performance for most business use cases without the Ultra premium.";
    }
  }

  // Ensure we don't show negative savings if user is already on a cheaper plan
  if (savings < 0) savings = 0;

  const annualSavings = savings * 12; // Annual calculation [cite: 38]
  const aiSummary = generateAISummary(savings, toolName, recommendedPlan);

  return { recommendedPlan, savings, annualSavings, reason, aiSummary };
};

/**
 * AI Summary Generator - Mimics an LLM response [cite: 74, 75]
 * Note: Actual implementation should call Anthropic API as per PDF [cite: 75]
 */
export const generateAISummary = (savings: number, tool: string, plan: string): string => {
  if (savings <= 0) {
    return `Great job! Your usage of ${tool} is perfectly optimized for your team size. No immediate action is required.`;
  }

  return `Our AI analysis suggests that by transitioning to the ${tool} ${plan} plan, you can unlock monthly savings while eliminating 'tier-bloat'. This optimization ensures you maintain full capability while only paying for the scale you actually need.`;
};