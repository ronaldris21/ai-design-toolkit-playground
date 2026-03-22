# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**ai-design-toolkit-playground** — A personal project for learning and practicing professional AI-driven development workflows. Scaffolded with Specify template (v0.3.2). No application code exists yet; the repo provides AI-driven project planning, design tooling, and development infrastructure.

## Installed Tooling

Three skill/agent frameworks are installed and available via slash commands:

- **BMad Method (v6.2.0)** — Full product lifecycle: product briefs, PRDs, UX design, architecture, epics/stories, sprint planning, QA, code review, retrospectives. Config in `_bmad/`. Use `/bmad-help` to discover available workflows.
- **SpecKit (v0.3.2)** — Spec-driven development: `/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`. Analyze with `/speckit.analyze`, generate checklists with `/speckit.checklist`.
- **UI/UX Pro Max** — Design skills for frontend work: `/frontend-design`, `/animate`, `/polish`, `/audit`, `/critique`, `/optimize`, and many more. Data files in `.claude/skills/ui-ux-pro-max/data/`.
- **Impeccable** — 21 design polish skills: `/audit`, `/polish`, `/typeset`, `/arrange`, `/critique`, `/normalize`, `/bolder`, `/quieter`, `/colorize`, `/animate`, `/delight`, `/harden`, `/optimize`, `/overdrive`, and more.
- **Agent OS** — Standards injection via `/agent-os:discover-standards`, `/agent-os:inject-standards`. Config in `agent-os/`.

## Browser-Based Design Tools (Free Tier)

- **Stitch** — Google's AI layout generator: stitch.withgoogle.com
- **Mobbin** — UI/UX research with 600K+ real app screenshots: mobbin.com
- **Pencil** — Vector design tool (VS Code extension — install manually)

## MCP Servers

- **Forge** — Terminal MCP server for persistent, parallel terminal sessions. Enables running dev servers, tests, and builds simultaneously.

## Directory Structure

- `_bmad/` — BMad Method core + BMM module configs, agents, templates, and workflows
- `.claude/commands/` — Custom slash commands (SpecKit `speckit.*` commands, Agent OS commands)
- `.claude/skills/` — All installed Claude Code skills (BMad agents, SpecKit, UI/UX Pro Max, Impeccable skills)
- `.agents/skills/` — Impeccable design skills (animate, arrange, audit, etc.)
- `.specify/` — SpecKit config, templates, and memory
- `agent-os/standards/` — Agent OS standards directory
- `docs/` — Project documentation (currently empty)
- `_bmad-output/` — Output directories for `planning-artifacts/` and `implementation-artifacts/`

## Workflow

The typical workflow for this project follows the BMad Method lifecycle:

1. **Discovery** — `/bmad-create-product-brief` or `/bmad-brainstorming`
2. **Requirements** — `/bmad-create-prd` → `/bmad-validate-prd`
3. **Design** — `/bmad-create-ux-design` → `/bmad-create-architecture`
4. **Planning** — `/bmad-create-epics-and-stories` → `/bmad-sprint-planning`
5. **Implementation** — `/bmad-dev-story` or SpecKit flow (`specify` → `plan` → `tasks` → `implement`)
6. **Review** — `/bmad-code-review`, `/bmad-review-adversarial-general`, `/bmad-review-edge-case-hunter`
7. **QA** — `/bmad-qa-generate-e2e-tests`

For small changes, use the quick flow: `/bmad-quick-spec` → `/bmad-quick-dev`

## Active Technologies
- TypeScript 5.9+ (strict mode) + React 18, Vite 8, Tailwind CSS 4, shadcn/ui, (001-expense-tracker-mvp)
- PostgreSQL via Prisma 7 (Docker, localhost:5433) (001-expense-tracker-mvp)
- TypeScript 5.9+ (strict mode) + React 18, Vite 8, Tailwind CSS 4, shadcn/ui, Zustand 5, React Hook Form + Zod (003-dashboard-add-expense)
- PostgreSQL via Prisma 7 (no schema changes needed) (003-dashboard-add-expense)
- TypeScript 5.9+ (strict mode) + React 18, React Router 7, Zustand 5 (004-dashboard-auto-refresh)
- PostgreSQL via Prisma 7 (no changes needed) (004-dashboard-auto-refresh)

## Recent Changes
- 001-expense-tracker-mvp: Added TypeScript 5.9+ (strict mode) + React 18, Vite 8, Tailwind CSS 4, shadcn/ui,
