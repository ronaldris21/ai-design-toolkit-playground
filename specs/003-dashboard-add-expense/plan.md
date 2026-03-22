# Implementation Plan: Dashboard Add Expense Button

**Branch**: `003-dashboard-add-expense` | **Date**: 2026-03-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-dashboard-add-expense/spec.md`

## Summary

Add an "Add Expense" button to the dashboard page header that opens the existing `ExpenseForm` dialog. After submission, dashboard stats refresh automatically. No new components, dependencies, or API changes required — this reuses the existing expense form infrastructure.

## Technical Context

**Language/Version**: TypeScript 5.9+ (strict mode)
**Primary Dependencies**: React 18, Vite 8, Tailwind CSS 4, shadcn/ui, Zustand 5, React Hook Form + Zod
**Storage**: PostgreSQL via Prisma 7 (no schema changes needed)
**Testing**: Manual verification (no test framework configured yet)
**Target Platform**: Web SPA (375px–1440px)
**Project Type**: Web application (React SPA + Express API)
**Performance Goals**: Dashboard stats update within 1 second of adding expense
**Constraints**: No new dependencies, no API changes
**Scale/Scope**: Single file modification (`dashboard.tsx`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Simplicity First | PASS | Reuses existing `ExpenseForm` component; no new abstractions |
| II. Type Safety | PASS | `ExpenseForm` props are already typed; no new types needed |
| III. Mobile-Responsive | PASS | Button uses existing responsive layout pattern from Expenses page |
| IV. Accessibility | PASS | Reuses accessible dialog component; button follows existing patterns |
| V. Clean Separation | PASS | No API changes; form already handles API calls internally |
| VI. Data Integrity | PASS | No data model changes; form uses existing Zod validation |
| VII. Consistent Patterns | PASS | Same button + dialog pattern used on Expenses page |
| VIII. Progressive Enhancement | PASS | Form inherits existing loading/error states |

All gates pass. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/003-dashboard-add-expense/
├── plan.md              # This file
├── spec.md              # Feature specification
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Task breakdown (created by /speckit.tasks)
```

### Source Code (files affected)

```text
expense-tracker/src/
├── pages/
│   └── dashboard.tsx     # MODIFIED: Add button + ExpenseForm + state + stats refresh callback
└── components/
    └── expenses/
        └── expense-form.tsx  # UNCHANGED: Already reusable
```

**Structure Decision**: Single file modification. The `ExpenseForm` component is already designed for reuse — it accepts `open`/`onOpenChange` props and manages its own form state, category loading, and API calls internally. The dashboard page just needs to: (1) add `formOpen` state, (2) render the button, (3) render `ExpenseForm`, and (4) add an `onSuccess` callback to refresh stats.

## Design Decisions

### Stats Refresh After Adding Expense

The `ExpenseForm` component calls `addExpense()` from the expense store and then calls `onOpenChange(false)`. To refresh dashboard stats, the dashboard will re-call `fetchStats()` when the form closes after a successful submission.

**Approach**: Track form open state. When `formOpen` transitions from `true` to `false`, call `fetchStats()` to refresh dashboard data. This is simple and avoids modifying the `ExpenseForm` component.

**Alternative considered**: Adding an `onSuccess` callback prop to `ExpenseForm`. Rejected because it would modify a shared component for a single consumer's needs, violating Simplicity First.

### Button Placement

Place the "Add Expense" button in the dashboard header row, between the title and the `MonthSelector`. This matches the Expenses page layout pattern (title left, action right) while keeping the month selector accessible.

**Layout**: `<title> ... <Add Expense button> <MonthSelector>`

## Research

No research needed. All technologies and patterns are already established in the codebase.
