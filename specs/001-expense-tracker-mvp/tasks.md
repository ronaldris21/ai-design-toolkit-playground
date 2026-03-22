# Tasks: Personal Expense Tracker MVP

**Input**: Design documents from `/specs/001-expense-tracker-mvp/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api.md
**Tests**: Manual testing only (no automated tests per plan.md)

**Organization**: Tasks grouped by user story. Backend (server/, prisma/) already exists — these tasks cover frontend implementation only.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- All paths relative to `expense-tracker/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project scaffolding, dependencies, and tooling configuration

- [x] T001 Scaffold Vite + React + TypeScript project in `expense-tracker/` with `npm create vite@latest`
- [x] T002 Install all dependencies: tailwindcss@4, @tailwindcss/vite, react-router, zustand, react-hook-form, @hookform/resolvers, zod, recharts, sonner, prisma, @prisma/client, tsx, express, cors
- [x] T003 Configure Vite proxy to forward `/api` requests to `localhost:3001` in `expense-tracker/vite.config.ts`
- [x] T004 Configure Tailwind CSS 4 with dark mode class strategy in `expense-tracker/src/index.css`
- [x] T005 Initialize shadcn/ui and add required components: dialog, input, select, table, card, badge, calendar, popover, alert-dialog, dropdown-menu, sonner in `expense-tracker/src/components/ui/`
- [x] T006 [P] Copy existing Prisma schema, seed, and server files into `expense-tracker/prisma/` and `expense-tracker/server/`
- [x] T007 [P] Create `.env` file with DATABASE_URL and PORT in `expense-tracker/.env`
- [x] T008 Add npm scripts: `dev`, `dev:server`, `dev:all`, `build`, `preview` in `expense-tracker/package.json`

**Checkpoint**: Project builds, `npm run dev` serves empty app, `npm run dev:server` starts API on port 3001

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utilities, schemas, stores, and layout that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Create API client with typed fetch wrapper (GET, POST, PUT, DELETE) in `expense-tracker/src/lib/api.ts`
- [x] T010 [P] Create currency formatting utility (`formatCurrency`) in `expense-tracker/src/lib/format.ts`
- [x] T011 [P] Create Zod expense schema (amount, description, date, categoryId) in `expense-tracker/src/schemas/expense.ts`
- [x] T012 [P] Create Zod category schema (name, color) in `expense-tracker/src/schemas/category.ts`
- [x] T013 Create Zustand category store (fetchCategories, addCategory, updateCategory, deleteCategory) in `expense-tracker/src/stores/category-store.ts`
- [x] T014 Create Zustand expense store (fetchExpenses, addExpense, updateExpense, deleteExpense, filters) in `expense-tracker/src/stores/expense-store.ts`
- [x] T015 [P] Create Zustand UI store (theme, selectedMonth/Year, sidebarOpen) in `expense-tracker/src/stores/ui-store.ts`
- [x] T016 Create app layout with sidebar navigation and top bar in `expense-tracker/src/components/layout/app-layout.tsx`
- [x] T017 [P] Create sidebar component with nav links (Dashboard, Expenses, Categories) in `expense-tracker/src/components/layout/sidebar.tsx`
- [x] T018 Configure React Router with 3 routes (`/`, `/expenses`, `/categories`) and lazy loading in `expense-tracker/src/App.tsx`
- [x] T019 [P] Create empty page shells: `expense-tracker/src/pages/dashboard.tsx`, `expense-tracker/src/pages/expenses.tsx`, `expense-tracker/src/pages/categories.tsx`

**Checkpoint**: App renders layout with sidebar navigation, routes work, stores and API client are ready

---

## Phase 3: User Story 1 — Record a New Expense (Priority: P1) 🎯 MVP

**Goal**: Users can add and edit expenses via a modal form. The expense appears in a basic list immediately after submission.

**Independent Test**: Click "Add Expense", fill in amount ($25.50), select category (Food & Dining), add description ("Lunch at cafe"), submit. Verify expense appears in list with correct values. Click expense to edit, change amount, submit. Verify update reflected.

### Implementation for User Story 1

- [x] T020 [US1] Build expense form component (amount, category select, description, date picker) with RHF + Zod validation in `expense-tracker/src/components/expenses/expense-form.tsx`
- [x] T021 [US1] Build basic expense table component (date, description, category badge, amount columns) in `expense-tracker/src/components/expenses/expense-table.tsx`
- [x] T022 [US1] Wire up Expenses page: fetch expenses on mount, render table, "Add Expense" button opens form dialog, edit row opens pre-filled form in `expense-tracker/src/pages/expenses.tsx`
- [x] T023 [US1] Connect expense form submit to expense store (addExpense / updateExpense) with loading state and toast notifications in `expense-tracker/src/components/expenses/expense-form.tsx`
- [x] T024 [US1] Add submit button disabled state to prevent duplicate submissions in `expense-tracker/src/components/expenses/expense-form.tsx`

**Checkpoint**: Can add/edit expenses via modal form, expenses appear in list, validation works, no duplicate submissions

---

## Phase 4: User Story 2 — View and Filter Expenses (Priority: P2)

**Goal**: Users can view all expenses in a paginated table and filter by category or date range. Expenses can be deleted with confirmation.

**Independent Test**: Add several expenses across categories/dates. Verify list shows all with correct formatting. Filter by category — only matching shown. Filter by date range — only matching shown. Delete an expense — confirmation dialog appears, confirm removes it.

### Implementation for User Story 2

- [x] T025 [US2] Build expense filters component (category dropdown, date range pickers) in `expense-tracker/src/components/expenses/expense-filters.tsx`
- [x] T026 [US2] Add filter state (categoryId, startDate, endDate) to expense store and pass as query params to GET /api/expenses in `expense-tracker/src/stores/expense-store.ts`
- [x] T027 [US2] Integrate filters into Expenses page above the table in `expense-tracker/src/pages/expenses.tsx`
- [x] T028 [US2] Add delete button to expense table rows with AlertDialog confirmation in `expense-tracker/src/components/expenses/expense-table.tsx`
- [x] T029 [US2] Add empty state component when no expenses exist or filters return zero results in `expense-tracker/src/pages/expenses.tsx`

**Checkpoint**: Expenses list shows formatted data, category and date filters work, delete with confirmation works, empty state displays

---

## Phase 5: User Story 3 — View Spending Dashboard (Priority: P3)

**Goal**: Users see a visual overview of monthly spending: 3 stat cards, a donut chart by category, and a 6-month trend line chart with month navigation.

**Independent Test**: With expenses across multiple categories/months, navigate to Dashboard. Verify stat cards show correct total, count, and top category. Donut chart matches category totals. Line chart shows 6 months. Change month — all data updates. Empty month shows zeros and empty states.

### Implementation for User Story 3

- [x] T030 [P] [US3] Build stat cards component (total spent, transaction count, top category) in `expense-tracker/src/components/dashboard/stat-cards.tsx`
- [x] T031 [P] [US3] Build month selector component (prev/next month navigation) in `expense-tracker/src/components/dashboard/month-selector.tsx`
- [x] T032 [US3] Build donut chart component (Recharts PieChart with innerRadius, category colors) in `expense-tracker/src/components/dashboard/category-chart.tsx`
- [x] T033 [US3] Build trend line chart component (Recharts LineChart, 6-month history) in `expense-tracker/src/components/dashboard/trend-chart.tsx`
- [x] T034 [US3] Wire up Dashboard page: fetch stats from GET /api/stats with month/year params, render all dashboard components with loading and empty states in `expense-tracker/src/pages/dashboard.tsx`

**Checkpoint**: Dashboard displays accurate stats, charts render with correct data and colors, month navigation works, empty state handled

---

## Phase 6: User Story 4 — Manage Expense Categories (Priority: P4)

**Goal**: Users can create, edit, and delete custom categories with name and color. Categories with expenses cannot be deleted.

**Independent Test**: Navigate to Categories. Verify default categories shown with color swatches. Add new category with custom name/color — appears in list. Edit category name — change reflected. Delete category with no expenses — removed. Delete category with expenses — warning shown.

### Implementation for User Story 4

- [x] T035 [P] [US4] Build category list component (name, color swatch, edit/delete actions) in `expense-tracker/src/components/categories/category-list.tsx`
- [x] T036 [P] [US4] Build category form dialog (name input, color picker) with RHF + Zod validation in `expense-tracker/src/components/categories/category-form.tsx`
- [x] T037 [US4] Wire up Categories page: fetch categories on mount, render list, "Add Category" button, edit/delete actions with appropriate dialogs in `expense-tracker/src/pages/categories.tsx`
- [x] T038 [US4] Handle delete-with-expenses error: catch FK constraint error from API and show warning toast in `expense-tracker/src/stores/category-store.ts`

**Checkpoint**: Full category CRUD works, FK constraint prevents deleting categories with expenses, validation and error messages display correctly

---

## Phase 7: User Story 5 — Toggle Dark Mode (Priority: P5)

**Goal**: Users can switch between light/dark themes. Preference is persisted in localStorage and restored on next visit.

**Independent Test**: Toggle theme switch — app switches to dark mode. Refresh page — dark mode persists. Toggle back to light — preference updated. All screens render correctly in both modes.

### Implementation for User Story 5

- [x] T039 [US5] Build theme toggle component (sun/moon icon button) that reads/writes to UI store in `expense-tracker/src/components/layout/theme-toggle.tsx`
- [x] T040 [US5] Add localStorage persistence to UI store theme state and apply `.dark` class to `<html>` on init in `expense-tracker/src/stores/ui-store.ts`
- [x] T041 [US5] Integrate theme toggle into app layout top bar in `expense-tracker/src/components/layout/app-layout.tsx`

**Checkpoint**: Theme toggle works, preference persists across page reloads, all screens render correctly in both light and dark modes

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Responsive design, error handling, and final validation

- [x] T042 [P] Add responsive styles for 375px mobile breakpoint across all pages and components
- [x] T043 [P] Add API error handling with user-friendly messages and retry option across all store fetch operations
- [x] T044 Verify keyboard navigation works for all interactive elements (forms, dialogs, table actions)
- [ ] T045 Run quickstart.md validation: start Docker, run migrations/seed, launch dev servers, verify all 5 verification steps pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **User Stories (Phases 3–7)**: All depend on Phase 2 completion
  - US1 (Phase 3): No story dependencies — start first
  - US2 (Phase 4): Benefits from US1 (shares expense table) but independently testable
  - US3 (Phase 5): No story dependencies (uses separate /api/stats endpoint)
  - US4 (Phase 6): No story dependencies (standalone CRUD screen)
  - US5 (Phase 7): No story dependencies (UI-only, touches layout)
- **Polish (Phase 8)**: Depends on all user stories being complete

### Within Each User Story

- Models/schemas before stores
- Stores before components
- Components before page wiring
- Core functionality before edge cases

### Parallel Opportunities

- T006, T007 can run in parallel with T001–T005
- T010, T011, T012, T015 can run in parallel within Phase 2
- T017, T019 can run in parallel within Phase 2
- T030, T031 can run in parallel within US3
- T035, T036 can run in parallel within US4
- T042, T043 can run in parallel in Polish phase
- US3, US4, US5 can all run in parallel after US1 is complete

---

## Parallel Example: User Story 3 (Dashboard)

```bash
# Launch stat cards and month selector in parallel (different files):
Task T030: "Build stat cards component in src/components/dashboard/stat-cards.tsx"
Task T031: "Build month selector component in src/components/dashboard/month-selector.tsx"

# Then charts sequentially (may share patterns):
Task T032: "Build donut chart in src/components/dashboard/category-chart.tsx"
Task T033: "Build trend chart in src/components/dashboard/trend-chart.tsx"

# Finally wire up the page:
Task T034: "Wire up Dashboard page in src/pages/dashboard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (schemas, stores, layout, routing)
3. Complete Phase 3: User Story 1 (add/edit expenses)
4. **STOP and VALIDATE**: Manually test adding/editing expenses
5. Deploy/demo if ready — core expense tracking works

### Incremental Delivery

1. Setup + Foundational → App shell with navigation ready
2. Add US1 → Test → Demo (**MVP!** — can record expenses)
3. Add US2 → Test → Demo (can view/filter/delete expenses)
4. Add US3 → Test → Demo (dashboard insights)
5. Add US4 → Test → Demo (custom categories)
6. Add US5 → Test → Demo (dark mode polish)
7. Polish → Final validation → Ship

---

## Notes

- Backend is already built — all tasks are frontend-only
- No automated tests — manual verification per quickstart.md
- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
