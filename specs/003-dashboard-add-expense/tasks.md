# Tasks: Dashboard Add Expense Button

**Input**: Design documents from `/specs/003-dashboard-add-expense/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No setup needed — project structure and all dependencies already exist.

_(No tasks — skip to Phase 2)_

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: No foundational changes needed — the `ExpenseForm` component and Zustand stores are already in place.

_(No tasks — skip to Phase 3)_

---

## Phase 3: User Story 1 - Quick Expense Entry from Dashboard (Priority: P1) 🎯 MVP

**Goal**: Add an "Add Expense" button to the dashboard page header that opens the existing expense form dialog. After submission, dashboard stats refresh automatically.

**Independent Test**: Open the dashboard, click "Add Expense", submit a valid expense, verify the expense is saved and dashboard statistics update.

### Implementation for User Story 1

- [x] T001 [US1] Import ExpenseForm component and Plus icon in expense-tracker/src/pages/dashboard.tsx
- [x] T002 [US1] Add formOpen state and open/close handler in expense-tracker/src/pages/dashboard.tsx
- [x] T003 [US1] Add "Add Expense" button to dashboard header row (between title and MonthSelector) in expense-tracker/src/pages/dashboard.tsx
- [x] T004 [US1] Render ExpenseForm dialog with formOpen state in expense-tracker/src/pages/dashboard.tsx
- [x] T005 [US1] Add stats refresh callback — call fetchStats() when form closes after submission in expense-tracker/src/pages/dashboard.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional — user can add expense from dashboard and see updated stats.

---

## Phase 4: User Story 2 - Consistent Experience Across Pages (Priority: P2)

**Goal**: Ensure the expense form opened from the dashboard behaves identically to the one on the Expenses page (same fields, validation, feedback).

**Independent Test**: Add an expense from the dashboard and from the Expenses page — compare form fields, validation errors, and resulting data.

### Implementation for User Story 2

- [x] T006 [US2] Verify form reuses exact same ExpenseForm component (no props divergence) in expense-tracker/src/pages/dashboard.tsx
- [ ] T007 [US2] Manually test: submit expense from dashboard, verify it appears in Expenses page list

**Checkpoint**: Both user stories complete — form behaves identically on both pages.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and edge case handling.

- [x] T008 Verify mobile responsiveness of "Add Expense" button at 375px width in expense-tracker/src/pages/dashboard.tsx
- [x] T009 Verify keyboard accessibility — button is focusable and activatable via keyboard

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Skipped — no setup needed
- **Foundational (Phase 2)**: Skipped — no foundational changes
- **User Story 1 (Phase 3)**: Can start immediately
- **User Story 2 (Phase 4)**: Depends on Phase 3 completion (verification only)
- **Polish (Phase 5)**: Depends on Phase 3 completion

### Within User Story 1

- T001 → T002 → T003 → T004 → T005 (sequential — all modify same file)
- In practice, T001–T005 are a single logical edit to `dashboard.tsx`

### Parallel Opportunities

- T008 and T009 (Polish) can run in parallel after Phase 3

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Execute T001–T005 as a single edit to `dashboard.tsx`
2. **STOP and VALIDATE**: Test adding expense from dashboard
3. Verify stats refresh

### Incremental Delivery

1. Complete User Story 1 (T001–T005) → Test → MVP done
2. Complete User Story 2 (T006–T007) → Verification pass
3. Complete Polish (T008–T009) → Final quality check

---

## Notes

- All implementation tasks (T001–T005) modify the same file and should be done as a single cohesive edit
- No new files, components, or dependencies are created
- The `ExpenseForm` component is fully self-contained — no modifications needed
- Stats refresh is achieved by calling the existing `fetchStats()` function when the form dialog closes
