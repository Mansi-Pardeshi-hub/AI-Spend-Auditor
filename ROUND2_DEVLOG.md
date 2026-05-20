# Round 2 Technical Reflection

### 1. Architectural Trade-offs
For the change detection mechanism, I implemented a manual `/api/detect-changes` endpoint instead of configuring an automated Vercel Cron Job or a GitHub Action workflow. 
- **Pros:** It avoids setting up complex infrastructure or managing third-party authentication tokens under tight 36-hour constraints. It can be triggered cleanly on-demand via an API tester or manual webhook.
- **Cons:** It requires external stimulation (an explicit admin hit) to scan for changes rather than checking automatically at midnight.

### 2. Scalability Bottlenecks
If the user base grows to 50,000+ concurrently saved audits:
- **Database Strain:** Querying `SELECT *` from the `audits` table will cause significant memory crashes. We would need to implement cursor-based pagination and create database indexes on `user_email` and `created_at`.
- **API Timeout:** A single loop processing 50k entries would hit the 10-second Vercel serverless function timeout. We would need to move this process to an edge worker or a background queue processing model.

### 3. Edge Cases Addressed
- **Anti-Spam Multi-Audit Consolidation:** Built an email consolidation mapping array logic so if a single user owns 10 separate configurations that change, they receive 1 single itemized breakdown alert instead of 10 separate spam emails.
- **Vercel Cache Isolation:** Documented explicit instruction checklist guidelines to prevent deployment caches from locking out newly declared Environment Variables.