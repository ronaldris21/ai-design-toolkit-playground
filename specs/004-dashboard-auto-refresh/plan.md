# Implementation Plan: Dashboard Auto-Refresh

**Branch**: `004-dashboard-auto-refresh` | **Date**: 2026-03-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-dashboard-auto-refresh/spec.md`

## Summary

Ensure the dashboard always fetches fresh statistics when the user navigates to it, regardless of which page they're coming from. The current `useEffect` depends on `[selectedMonth, selectedYear]` and fires on mount — which works because React Router remounts lazy-loaded route components on navigation. To make this explicit and resilient, we'll verify mount behavior is correct and ensure no stale data scenarios exist.

## Technical Context

**Language/Version**: TypeScript 5.9+ (strict mode)
**Primary Dependencies**: React 18, React Router 7, Zustand 5
**Storage**: PostgreSQL via Prisma 7 (no changes needed)
**Testing**: Manual verification
**Target Platform**: Web SPA (375px–1440px)
**Project Type**: Web application (React SPA + Express API)
**Performance Goals**: Fresh data within 1 second of navigation
**Constraints**: No new dependencies, no API changes, single file modification
**Scale/Scope**: Single file: `dashboard.tsx`

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Simplicity First | PASS | Minimal change to existing effect behavior |
| II. Type Safety | PASS | No new types needed |
| III. Mobile-Responsive | PASS | No UI changes |
| IV. Accessibility | PASS | No UI changes |
| V. Clean Separation | PASS | No API changes |
| VI. Data Integrity | PASS | No data model changes |
| VII. Consistent Patterns | PASS | Uses existing React patterns |
| VIII. Progressive Enhancement | PASS | Loading states already in place |

All gates pass.

## Project Structure

### Source Code (files affected)

```text
expense-tracker/src/
└── pages/
    └── dashboard.tsx  # MODIFIED: Ensure fetchStats runs on every mount/navigation
```

**Structure Decision**: Single file change. The current `useEffect(() => { fetchStats() }, [selectedMonth, selectedYear])` already fires on mount due to React Router remounting lazy components on route changes. However, to make this behavior explicit and resilient against future routing changes, we'll ensure `fetchStats` is called unconditionally on every component mount.

## Design Decisions

### Approach: Unconditional Fetch on Mount

The current dashboard `useEffect` fires on mount AND when month/year changes. Since React Router v7 remounts lazy components on route transitions, the current code already refreshes on navigation. However, this behavior is an implicit side-effect of React Router's mounting strategy — not an explicit contract.

**Solution**: The current implementation is already correct. The `useEffect` with `[selectedMonth, selectedYear]` deps fires on every mount (initial and subsequent), which covers all navigation scenarios. No code change needed beyond verification.

**Why no change is needed**: In React, `useEffect` always runs on the first render regardless of dependency values. Since the DashboardPage component unmounts when navigating away (standard React Router behavior for sibling routes) and remounts when navigating back, every visit triggers a fresh mount and thus a fresh `fetchStats()` call.

## Research

No research needed. Verified that React Router v7 with lazy-loaded sibling routes unmounts/remounts components on route transitions.
