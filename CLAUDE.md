# CLAUDE.md

## Vision and Mission
Gamified PM interview prep mapped to salary tiers. 336 questions across 5 salary tiers ($130K-$350K+).

## Current Stack
- TypeScript, React, Tailwind CSS, shadcn/ui
- Supabase (PostgreSQL, Google OAuth, RLS)
- Deployed via Lovable (Vite + manual Publish required for GitHub pushes)
- Repo: harshitleads/pm-salary-quest
- Live: pmquiz.harshit.ai

## Architecture
- `src/components/CaseStudyBubble.tsx` — persistent floating popup linking to harshit.ai/work/pm-salary-ace, rendered in App.tsx on all pages

## Code Rules
- No em dashes anywhere in copy
- NEVER run git commit, git push, git reset, git checkout, or any git write commands
- NEVER delete files unless the task spec explicitly says to delete a specific named file
- NEVER touch .env, .gitignore, or any config files unless explicitly listed in task spec
- This is a Vite/React app — NO "use client" directives

## Deployment Rules
- Lovable does NOT auto-deploy from GitHub pushes
- After Cursor pushes, must manually click Publish → Update in Lovable editor
- .env must remain in the repo — Lovable's build pipeline reads env vars from .env at build time

## Completed Work
- 2026-04-10: Persistent case study bubble on all pages (App.tsx), violet theme, no dismiss
