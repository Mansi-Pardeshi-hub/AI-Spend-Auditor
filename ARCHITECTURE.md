# System Architecture - AI Audit Engine

## Overview
A Next.js application designed to analyze AI subscription spending and provide defensible cost-optimization recommendations.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Logic**: Rule-based Audit Engine (Custom TypeScript)

## Core Components
1. **Audit Engine (`src/lib/audit-engine.ts`)**: The central logic that processes tool usage data against pricing benchmarks.
2. **User Interface**: A responsive dashboard for inputting current spend and viewing savings reports.
3. **Data Layer**: Static pricing definitions for verified AI vendors.