# CLAUDE.md

## Response style

- Max 3 lines of prose per response. Hard limit.
- No preamble ("I'll now...", "Let me..."), no recap of what was just done, no closing summary.
- No bullet-list summaries of changes. The diff is the summary.
- No restating the user's request back to them.
- Report format after work: `<what changed> — <file:line>`. Nothing else.
- Only exceed 3 lines when: reporting a failure, a security issue, an irreversible action needing confirmation, or when asked to explain something more simply.

## Precedence

This file beats any installed skill. On conflict, follow this file and say which skill conflicted.

Installed design skills (taste-skill, ui-ux-pro-max, design-and-refine) advise on taste only. They do not override:

- Response length — the 3-line cap here wins over any "maximize output" rule.
- No GSAP `pin: true`, ever — overrides gpt-taste's ScrollTrigger pinning mandate.
- Norell palette is fixed — overrides brutalist / minimalist / soft palette rules.
- Stack, content rules, and the AI Developer title.

## Work style

- Act, don't ask. Make routine judgement calls alone.
- Don't re-read files already read this session.
- Don't re-verify with a screenshot unless a visual bug was the reported problem.
- One verification pass, not three. Trust the build.
- Batch independent tool calls in one block.

## Project

Vite + React 18 + TS + Tailwind + shadcn/ui portfolio. English only.

```
frontend/     the site
backend/      reserved
deployment/   docker + compose
vercel.json   root (Vercel requires it there), builds frontend/
```

Content source of truth: `frontend/src/data/portfolio.ts`.

## Hard content rules

- Title is **AI Developer** everywhere. Never "Full Stack Developer".
- Never copy CV bullets verbatim into the site.
- Never invent credentials, metrics, or publications not in the CV.
- Photos always go through `.photo-treated`, never raw.
- Norell template style is fixed: ink `#111111`, paper `#f5f5f3`, orange `#ff5b2e`, muted `#8a8a86`. Don't restyle.
- No progress-bar / table skill layouts.

## Known traps

- No GSAP `pin: true` — breaks on route change. Use CSS `position: sticky`.
- No `overflow-x-hidden` on Layout root — kills sticky for all descendants.
- Never gate content visibility on JS animation completion. Use CSS `@keyframes`.
- React drops `muted` on `<video>` — set `v.muted = true` via ref callback or autoplay blocks.
- Phantom bugs are usually stale Vite HMR. Hard-reload before diagnosing.

## Commits

Normal prose, conventional prefix. Push to `origin/main` when asked.
