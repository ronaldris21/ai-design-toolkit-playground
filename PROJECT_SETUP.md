# Project Setup Guide

This document explains how this project was set up and how to reproduce the environment from scratch.

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| **Node.js** | v20+ | [nodejs.org](https://nodejs.org) |
| **Python** | 3.x | [python.org](https://python.org) |
| **uv** | latest | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| **Claude Code** | latest | `npm install -g @anthropic-ai/claude-code` |

## Installed Tools Overview

This project uses **7 complementary tools** organized in 3 layers:

```
LAYER 1 — Design (AI Design Toolkit)
├── Impeccable        → 21 design polish skills (free)
├── UI UX Pro Max     → Color palettes, fonts, patterns (free)
├── Stitch            → Google's AI layout generator (free, browser)
├── Mobbin            → 600K+ app screenshots for research (freemium, browser)
└── Pencil            → Vector design in VS Code (free, extension)

LAYER 2 — Spec-Driven Development
├── Spec-Kit          → Constitution → Specify → Plan → Tasks → Implement
├── BMAD Method       → 36 skills + 9 agents for full product lifecycle
└── Agent OS          → Coding standards discovery and enforcement

LAYER 3 — Infrastructure
└── Forge             → Terminal MCP server for parallel sessions
```

## Installation Steps (from scratch)

### Step 1: Install uv

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
source $HOME/.local/bin/env
```

### Step 2: Install Impeccable (21 design skills)

```bash
npx skills add pbakaus/impeccable -y
```

Installs skills like `/audit`, `/polish`, `/typeset`, `/arrange`, `/critique`, `/normalize`, `/bolder`, `/quieter`, `/colorize`, `/animate`, `/delight`, `/harden`, `/optimize`, `/overdrive`, `/clarify`, `/distill`, `/extract`, `/frontend-design`, `/adapt`, `/onboard`, `/teach-impeccable`.

### Step 3: Install UI UX Pro Max

```bash
npm install -g uipro-cli
uipro init --ai claude
```

Provides searchable database of 67 UI styles, 96 color palettes, 57 font pairings, and 25 chart types.

### Step 4: Install Forge (Terminal MCP Server)

```bash
claude mcp add forge -- npx forge-terminal-mcp --dashboard --port 3141
```

Enables Claude Code to run persistent, parallel terminal sessions (dev servers, tests, builds simultaneously).

### Step 5: Install Spec-Kit

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify init --here --ai claude --force --ai-skills
```

Installs 9 skills and 9 slash commands for spec-driven development.

### Step 6: Install BMAD Method

```bash
npx bmad-method install \
  --directory . \
  --tools claude-code \
  --communication-language Spanish \
  --yes
```

Installs 36 skills and 9 agents (Product Manager, Architect, Developer, QA, UX Designer, etc.).

> **Note:** BMAD may create a `{output_folder}/` directory instead of `_bmad-output/`. If so, rename it:
> ```bash
> mv "{output_folder}" _bmad-output
> ```

### Step 7: Install Agent OS

```bash
cd ~
git clone https://github.com/buildermethods/agent-os.git && rm -rf ~/agent-os/.git
cd /path/to/your/project
~/agent-os/scripts/project-install.sh
```

Installs 5 commands for coding standards management.

### Step 8: Browser-based tools (no install needed)

| Tool | URL | Purpose |
|---|---|---|
| **Stitch** | [stitch.withgoogle.com](https://stitch.withgoogle.com) | AI-powered screen layout generation |
| **Mobbin** | [mobbin.com](https://mobbin.com) | UI/UX research with real app screenshots |

### Step 9: Install Pencil (manual)

Open VS Code or Cursor → Extensions → Search "Pencil" → Install.

## Development Workflow

### Quick Flow (small features)

```
/bmad-quick-spec → /bmad-quick-dev
```

### Full Spec-Kit Flow

```
/speckit.constitution  → Define project principles
/speckit.specify       → Describe what to build
/speckit.plan          → Define tech stack and architecture
/speckit.tasks         → Generate actionable task breakdown
/speckit.implement     → Build it
```

Optional enhancement commands:
- `/speckit.clarify` — De-risk ambiguous areas (before plan)
- `/speckit.analyze` — Cross-artifact consistency check (after tasks)
- `/speckit.checklist` — Quality validation (after plan)

### Full BMAD Flow (enterprise-grade)

```
1. Discovery     → /bmad-create-product-brief or /bmad-brainstorming
2. Requirements  → /bmad-create-prd → /bmad-validate-prd
3. Design        → /bmad-create-ux-design → /bmad-create-architecture
4. Planning      → /bmad-create-epics-and-stories → /bmad-sprint-planning
5. Implementation → /bmad-dev-story
6. Review        → /bmad-code-review, /bmad-review-adversarial-general
7. QA            → /bmad-qa-generate-e2e-tests
```

### Design Workflow (AI Design Toolkit)

```
1. Research    (15 min) → Mobbin: find 2-3 reference apps
2. Direction    (5 min) → UI UX Pro Max: lock colors, fonts
3. Generate    (30 min) → Stitch (layouts) + /frontend-design
4. Polish      (10 min) → /audit → /typeset → /arrange → /polish
5. Review              → /critique for final feedback
```

### Standards Workflow (Agent OS)

```
/discover-standards  → Extract patterns from codebase
/inject-standards    → Apply standards to current context
```

## Directory Structure

```
.
├── .agents/skills/          # Impeccable universal skills (source)
├── .claude/
│   ├── commands/            # Slash commands (Spec-Kit, Agent OS)
│   └── skills/              # All Claude Code skills (BMAD, Spec-Kit, Impeccable, UI UX Pro Max)
├── .specify/                # Spec-Kit config, templates, scripts
├── _bmad/                   # BMAD Method core, config, modules
├── _bmad-output/            # BMAD planning & implementation artifacts
├── agent-os/                # Agent OS standards
├── docs/                    # Project documentation
├── .gitignore
├── CLAUDE.md                # Claude Code project instructions
├── PROJECT_SETUP.md         # This file
└── skills-lock.json         # Skills version lock
```

## Useful Links

- [AI Design Toolkit](https://ferodrigop.github.io/ai-design-toolkit/) — The tutorial that inspired this setup
- [Spec-Kit](https://github.com/github/spec-kit) — GitHub's spec-driven development toolkit
- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD) — Agile AI-driven development
- [Agent OS](https://github.com/buildermethods/agent-os) — Coding standards for AI development
- [Forge](https://github.com/ferodrigop/forge) — Terminal MCP server
- [Impeccable](https://impeccable.style) — Design polish skills
