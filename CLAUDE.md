# CLAUDE.md

## Vision and Mission
Gamified PM interview prep mapped to salary tiers. 336 questions across 5 salary tiers ($130K-$350K+).

## Current Stack
- TypeScript, React, Tailwind CSS, shadcn/ui
- Supabase (PostgreSQL, Google OAuth, RLS)
- Deployed via Lovable (Vite + manual Publish required for GitHub pushes)
- Repo: harshitleads/pm-salary-quest
- Live: pmquiz.harshit.ai

## Code Rules
- No em dashes anywhere in copy
- NEVER run git commit, git push, git reset, git checkout, or any git write commands
- NEVER delete files unless the task spec explicitly says to delete a specific named file
- NEVER touch .env, .gitignore, or any config files — only touch the files listed in the task spec
- This is a Vite/React app — NO "use client" directives

## Deployment Rules
- Lovable does NOT auto-deploy from GitHub pushes
- After Cursor pushes, must manually click Publish → Update in Lovable editor
- .env must remain in the repo for Lovable's build pipeline

---

## ACTIVE TASK: Add persistent Case Study Bubble on all pages

### Context
Add a persistent floating case study bubble (no dismiss, no timers) that shows on ALL pages, right-aligned on mobile.

### What to Do

**1. Create `src/components/CaseStudyBubble.tsx`:**

```tsx
export default function CaseStudyBubble() {
  return (
    <a
      href="https://harshit.ai/work/pm-salary-ace"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-[10px] rounded-2xl border px-4 py-3 no-underline transition-all hover:brightness-110"
      style={{
        background: "hsl(230 25% 7% / 0.95)",
        borderColor: "hsl(263 70% 50% / 0.2)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        animation: "bubbleIn 0.4s ease-out",
      }}
    >
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
        style={{ background: "hsl(263 70% 50% / 0.1)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(263 70% 60%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      </div>
      <div>
        <p className="text-[13px] font-medium" style={{ color: "hsl(213 33% 95%)", margin: 0 }}>
          See the product thinking behind this
        </p>
        <p className="text-[11px]" style={{ color: "hsl(215 20% 65%)", margin: 0 }}>
          How I built PM Salary Ace
        </p>
      </div>
    </a>
  );
}
```

**2. In `src/App.tsx`** (NOT Index.tsx):
- ADD import: `import CaseStudyBubble from "@/components/CaseStudyBubble";`
- ADD `<CaseStudyBubble />` inside the root JSX, right before the closing tag of the outermost wrapper, so it renders on all routes

**3. In `src/index.css`**, add at the very bottom (only if not already present):
```css
@keyframes bubbleIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
```

Do NOT add any mobile full-width override — bubble stays right-aligned on all screen sizes.

### DO NOT TOUCH
- .env
- .gitignore
- Any file not listed above

### Files to Touch (ONLY these)
- CREATE: `src/components/CaseStudyBubble.tsx`
- EDIT: `src/App.tsx` (add import and render)
- EDIT: `src/index.css` (add bubbleIn keyframe only if not present)
