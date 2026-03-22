# Implementation Plan: Personal Expense Tracker MVP

**Branch**: `001-expense-tracker-mvp` | **Date**: 2026-03-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-expense-tracker-mvp/spec.md`

## Summary

Build a 4-screen personal expense tracker (Dashboard, Expenses List,
Add/Edit Expense, Categories) as a React SPA backed by an Express API
with PostgreSQL. The API layer and database schema already exist. This
plan covers the frontend implementation: routing, components, state
management, form validation, and chart visualization.

## Technical Context

**Language/Version**: TypeScript 5.9+ (strict mode)
**Primary Dependencies**: React 18, Vite 8, Tailwind CSS 4, shadcn/ui,
Recharts 3, Zustand 5, React Hook Form + Zod, React Router 7
**Storage**: PostgreSQL via Prisma 7 (Docker, localhost:5433)
**Testing**: Manual testing via preview server (no automated tests for MVP)
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge),
responsive 375px–1440px
**Project Type**: Web application (SPA + REST API)
**Performance Goals**: Dashboard loads in <2s for 1,000 expenses
**Constraints**: <500KB gzipped bundle, single user, no auth, no SSR
**Scale/Scope**: 1 user, 4 screens, ~20 components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Simplicity First | ✅ PASS | 4 screens, no extras, YAGNI enforced |
| II. Type Safety | ✅ PASS | strict:true, Zod at API boundaries, Prisma types |
| III. Mobile-Responsive | ✅ PASS | Tailwind responsive, 375px target in SC-004 |
| IV. Accessibility | ✅ PASS | shadcn/ui built-in a11y, keyboard nav in SC-005 |
| V. Clean Separation | ✅ PASS | React ↔ Express via /api/*, Zustand for UI state |
| VI. Data Integrity | ✅ PASS | Prisma schema, FK constraints, idempotent seed |
| VII. Consistent Patterns | ✅ PASS | shadcn/ui, Zustand per domain, RHF+Zod |
| VIII. Progressive Enhancement | ✅ PASS | Loading/error/empty states required |

All gates pass. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/001-expense-tracker-mvp/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # API contract definitions
│   └── api.md
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code

```text
expense-tracker/
├── server/                    # Express API (ALREADY BUILT)
│   ├── db.ts                  # Prisma client
│   └── index.ts               # All routes
├── prisma/                    # Database (ALREADY BUILT)
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── src/
│   ├── main.tsx               # Entry point (exists)
│   ├── App.tsx                # Router setup (needs update)
│   ├── index.css              # Tailwind + shadcn theme (exists)
│   ├── lib/
│   │   ├── utils.ts           # cn() utility (exists)
│   │   ├── api.ts             # API client (fetch wrapper)
│   │   └── format.ts          # Currency formatting
│   ├── stores/
│   │   ├── expense-store.ts   # Zustand: expenses CRUD + filters
│   │   ├── category-store.ts  # Zustand: categories CRUD
│   │   └── ui-store.ts        # Zustand: theme, sidebar, month
│   ├── schemas/
│   │   ├── expense.ts         # Zod: expense validation
│   │   └── category.ts        # Zod: category validation
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── button.tsx     # (exists)
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── sonner.tsx     # Toast notifications
│   │   │   └── dropdown-menu.tsx
│   │   ├── layout/
│   │   │   ├── app-layout.tsx # Sidebar + top bar + content area
│   │   │   ├── sidebar.tsx    # Nav links
│   │   │   └── theme-toggle.tsx
│   │   ├── expenses/
│   │   │   ├── expense-form.tsx    # Add/Edit modal
│   │   │   ├── expense-table.tsx   # Table with filters
│   │   │   └── expense-filters.tsx # Category + date range
│   │   ├── categories/
│   │   │   ├── category-list.tsx   # List with color swatches
│   │   │   └── category-form.tsx   # Add/Edit dialog
│   │   └── dashboard/
│   │       ├── stat-cards.tsx      # 3 summary cards
│   │       ├── category-chart.tsx  # Donut chart
│   │       ├── trend-chart.tsx     # Line chart
│   │       └── month-selector.tsx  # Month navigation
│   └── pages/
│       ├── dashboard.tsx
│       ├── expenses.tsx
│       └── categories.tsx
└── package.json
```

**Structure Decision**: Web application structure with frontend (`src/`)
and backend (`server/`) colocated in `expense-tracker/`. The backend is
already complete; this plan covers only frontend implementation.

## Complexity Tracking

No constitution violations. No complexity justification needed.
