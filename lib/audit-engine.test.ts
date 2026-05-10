/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from '@jest/globals'; // Ye line definition provide karegi
import { runAudit } from './audit-engine';

// Baaki saara code niche waisa hi rehne dein...import { runAudit } from './audit-engine';

describe('Audit Engine Core Logic', () => {
  // Test 1: Cursor Optimization
  it('should recommend Pro plan for small Cursor teams', () => {
    const result = runAudit({ toolName: 'Cursor', plan: 'Business', seats: 2, monthlySpend: 80 });
    expect(result.recommendedPlan).toBe('Pro');
    expect(result.savings).toBe(40);
  });

  // Test 2: ChatGPT Enterprise Downgrade
  it('should suggest Team plan for small ChatGPT Enterprise teams', () => {
    const result = runAudit({ toolName: 'ChatGPT', plan: 'Enterprise', seats: 10, monthlySpend: 600 });
    expect(result.recommendedPlan).toBe('Team');
    expect(result.savings).toBeGreaterThan(0);
  });

  // Test 3: Annual Math
  it('should correctly calculate annual savings', () => {
    const result = runAudit({ toolName: 'Claude', plan: 'Enterprise', seats: 4, monthlySpend: 200 });
    expect(result.annualSavings).toBe(result.savings * 12);
  });

  // Test 4: Honesty Check
  it('should show zero savings for already optimal plans', () => {
    const result = runAudit({ toolName: 'Gemini', plan: 'Pro', seats: 1, monthlySpend: 20 });
    expect(result.savings).toBe(0);
  });

  // Test 5: Edge Case
  it('should handle zero seats gracefully', () => {
    const result = runAudit({ toolName: 'Cursor', plan: 'Business', seats: 0, monthlySpend: 0 });
    expect(result.savings).toBe(0);
  });
});