# REFLECTION.md

## 1. The Hardest Bug
The most challenging issue was handling the folder restructuring from `/src` to the root directory mid-development. Next.js App Router is sensitive to import paths. I encountered a "Module Not Found" error that broke the entire UI. I debugged it by analyzing the Webpack build logs, verifying the `tsconfig.json` path aliases, and eventually standardizing the imports to relative paths (`../lib/`). This taught me the importance of clear project architecture from Day 1.

## 2. A Decision I Reversed
Initially, I planned to use a pure AI-based approach for the audit calculations. [cite_start]However, after reading the Credex requirements, I realized that "logic must be defensible" and a finance person must agree with it[cite: 63, 78]. I reversed my decision and moved to a hardcoded rule-based engine for the math, using the LLM only for qualitative summaries. This ensures 100% accuracy in financial reporting while keeping the "AI feel."

## 3. Week 2 Roadmap
If I had another week, I would implement:
- [cite_start]**PDF Export:** Allow users to download a professional PDF of the audit[cite: 95].
- **Multi-Tool Composition:** Let users audit their entire "stack" at once rather than one tool at a time.
- [cite_start]**Live Benchmarking:** Use the stored Supabase data to show "Your spend vs. Industry average"[cite: 97].

## 4. AI Usage Disclosure
I used **Claude 3.5 Sonnet** and **Gemini** for:
- Writing complex Tailwind configurations and UI components.
- Drafting the GTM and Economics math based on my rough inputs.
- I didn't trust the AI with the exact pricing numbers; [cite_start]I manually verified every dollar amount against official vendor pages to ensure 100% accuracy as per the rubric[cite: 65, 157].

## 5. Self-Rating (1-10)
- [cite_start]**Discipline (9):** Consistent commits over 5+ days despite schedule challenges[cite: 216].
- **Code Quality (8):** Clean, typed, and modular structure.
- [cite_start]**Design Sense (9):** Focused on a professional "SaaS Product" look rather than a basic form[cite: 73].
- **Problem Solving (8):** Effectively balanced AI summaries with hardcoded financial rules.
- [cite_start]**Entrepreneurial Thinking (10):** Deep-dived into GTM strategy and unit economics beyond just coding[cite: 169].