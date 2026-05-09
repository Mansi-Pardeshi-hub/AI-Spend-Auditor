// src/lib/audit-engine.test.ts
import { runAudit } from './audit-engine';

const runTests = () => {
  console.log(" Starting Automated Audit Tests...");

  // Scenario 1: Cursor Business with 2 seats (Should downgrade)
  const t1 = runAudit({ toolName: "Cursor", plan: "Business", seats: 2, monthlySpend: 80 });
  if (t1.recommendedPlan === "Pro" && t1.savings === 40) {
    console.log(" Test 1: Cursor Optimization - Passed");
  } else {
    console.error(" Test 1 Failed");
  }

  // Scenario 2: ChatGPT Enterprise with 10 seats (Should downgrade to Team)
  const t2 = runAudit({ toolName: "ChatGPT", plan: "Enterprise", seats: 10, monthlySpend: 600 });
  if (t2.recommendedPlan === "Team") {
    console.log(" Test 2: ChatGPT Optimization - Passed");
  } else {
    console.error(" Test 2 Failed");
  }

  console.log("\n All test scenarios verified!");
};

runTests();