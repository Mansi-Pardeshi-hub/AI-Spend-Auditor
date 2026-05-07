# Project DevLog - AI Spend Auditor

## Day 1: 2026-05-06
**Hours worked:** 2

**What I did:**
- Initialized the Next.js project with TypeScript and Tailwind CSS.
- Created all mandatory project documentation files (GTM, Economics, etc.).
- Conducted market research on current AI tool pricing for Cursor, ChatGPT, and Claude.
- Set up the GitHub repository and established the initial project structure.

**What I learned:**
- Small startups often overpay for "Business" tiers when "Pro" or "Team" tiers would suffice for their team size.

**Plan for tomorrow:**
- Design and implement the core `AuditEngine` logic to calculate savings.
- Write unit tests for the audit math.

---

## Day 2: 2026-05-07
**Hours worked:** 3.5

**What I did:**
- Developed the core TypeScript logic for the Audit Engine (`src/lib/audit-engine.ts`).
- Implemented optimization rules for Cursor and ChatGPT plans.
- **Supabase Integration:** Set up a real Postgres database and created the `leads` table via SQL Editor.
- **Lead Capture Feature:** Built a conversion-focused UI that saves user emails and audit results directly to Supabase.
- **Pricing Verification:** Updated `PRICING_DATA.md` with official URLs and verification timestamps for data integrity.
- **Environment Management:** Secured all API keys and Project URLs using `.env.local`.

**What I learned:**
- Learned how to structure a rule-based engine in TypeScript for financial auditing.
- Gained experience in connecting a Next.js frontend to a live database and managing database schemas.
- Understood the "Value-First" principle: showing users their savings before asking for an email significantly improves conversion rates.

**Plan for tomorrow:**
- Conduct 3 user interviews to gather feedback on the Audit UI and results.
- Research and begin integration for Feature #4: AI-generated personalized audit summaries.