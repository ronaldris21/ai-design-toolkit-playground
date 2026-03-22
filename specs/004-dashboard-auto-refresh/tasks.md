# Tasks: Dashboard Auto-Refresh After Expense Creation

**Input**: Design documents from `/specs/004-dashboard-auto-refresh/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No setup needed — project already configured.

_(No tasks — skip to Phase 3)_

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: No foundational changes needed.

_(No tasks — skip to Phase 3)_

---

## Phase 3: User Story 1 - Dashboard Reflects Expenses Added from Other Pages (Priority: P1) 🎯 MVP

**Goal**: Ensure the dashboard always shows fresh data when the user navigates to it, regardless of which page they came from.

**Independent Test**: Add an expense from the Expenses page, navigate to the Dashboard, verify totals include the new expense.

### Implementation for User Story 1

- [x] T001 [US1] Verify that DashboardPage component unmounts on route change by reviewing routing in expense-tracker/src/App.tsx
- [x] T002 [US1] Verify that useEffect in dashboard.tsx fires fetchStats() on every mount (covers navigation scenario) in expense-tracker/src/pages/dashboard.tsx
- [ ] T003 [US1] Manually test: add expense on Expenses page, navigate to Dashboard, confirm fresh stats are displayed

**Checkpoint**: Dashboard always displays fresh data after navigation from any page.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final verification.

- [ ] T004 Verify edit/delete scenarios: edit an expense, navigate to Dashboard, confirm updated totals
- [ ] T005 Verify rapid navigation between pages does not cause duplicate or stale data display

---

## Dependencies & Execution Order

### Phase Dependencies

- **User Story 1 (Phase 3)**: Can start immediately
- **Polish (Phase 4)**: Depends on Phase 3 completion

### Within User Story 1

- T001 → T002 → T003 (sequential verification)

---

## Implementation Strategy

### Analysis Result

After reviewing the code, the current implementation **already handles this correctly**:

1. `DashboardPage` is lazy-loaded and rendered as a route child — React Router unmounts it on navigation away
2. On navigation back, the component remounts fresh with `loading: true` and `stats: null`
3. `useEffect(() => { fetchStats() }, [selectedMonth, selectedYear])` fires on every mount
4. The feature 003 `handleFormOpenChange` callback handles the inline add-expense case

**If verification confirms this**: No code changes needed — mark all tasks complete.

**If verification reveals a bug**: Add a fix task to ensure explicit re-fetch on mount.

---

## Notes

- This feature may require zero code changes if verification confirms existing behavior is correct
- The plan documents that React Router's unmount/remount cycle ensures fresh data on navigation
- If a code change IS needed, the fix would be adding a separate `useEffect(() => { fetchStats() }, [])` to guarantee mount-time fetch
