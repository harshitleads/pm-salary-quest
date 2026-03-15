# PM Salary Ace

An AI-powered PM interview coaching tool that helps product managers build structured thinking and sharpen their product sense across salary tiers.


**Portfolio:** [pmquiz.harshit.ai/](https://pmquiz.harshit.ai/) | **Portfolio:** [harshit.ai/work/pm-salary-ace](https://harshit.ai/work/pm-salary-ace)

---

## What It Does

PM Salary Ace presents scenario-based quiz questions across 5 salary tiers ($80K–$200K+), covering skills like prioritization, metrics, product strategy, and stakeholder management. Users get real-time feedback on their answers and can track progress over time.

- 336 questions across 5 PM salary tiers
- Custom quiz builder with tier, skill, and difficulty filters
- Progress dashboard with streak tracking and skill radar chart
- Google OAuth and email/password auth with session persistence
- Answer security: public view hides correct answers server-side

## Stack

- **Frontend:** TypeScript, React, Tailwind CSS, shadcn/ui
- **Backend:** Supabase (PostgreSQL, RLS, Auth)
- **Deployment:** Lovable (Vite + auto-deploy)
- **Question generation:** Gemini API

## Traction

- 22 users in first 12 hours after launch to Berkeley MEng PM community
- 49% activation rate among target audience
- User feedback surfaced preference for open-ended formats — informing next iteration

## Key Learnings

Building this exposed concrete tradeoffs in LLM-generated content: AI-generated MCQs required human review to ensure wrong answers were non-obvious and educationally useful. That reliability gap is now a documented design constraint, not just a footnote.

---

Built by [Harshit Sharma](https://harshit.ai) — MEng IEOR @ UC Berkeley.
