# Research: Personal Expense Tracker MVP

## R1: shadcn/ui Component Selection

**Decision**: Use shadcn/ui for all UI primitives (Dialog, Table, Input,
Select, Card, Badge, Calendar, Popover, AlertDialog, Sonner, DropdownMenu).

**Rationale**: Constitution Principle VII mandates shadcn/ui patterns.
Components are composable, accessible by default (Radix primitives),
and styled via Tailwind. Adding components via `npx shadcn@latest add`
keeps bundle size controlled (tree-shakeable).

**Alternatives considered**: Headless UI (less ecosystem), custom
components (more work, less a11y guarantees).

## R2: State Management Pattern

**Decision**: Three Zustand stores — `expense-store`, `category-store`,
`ui-store`. Each store fetches from API and caches in memory.

**Rationale**: Constitution Principle V (Clean Separation) requires
UI state in Zustand, server data fetched via API. Three stores follow
Principle VII (one store per domain). No need for React Query or SWR
since the app is single-user with simple data patterns.

**Alternatives considered**: React Query (overkill for single-user),
React Context (less ergonomic for async), Redux (too much boilerplate).

## R3: Routing Strategy

**Decision**: React Router v7 with 3 routes: `/` (dashboard),
`/expenses` (list), `/categories` (management). Add/Edit expense
is a dialog overlay, not a separate route.

**Rationale**: Constitution Principle I (Simplicity) — 3 routes for
4 screens (the expense form is a modal). Lazy loading via
`React.lazy()` for code splitting.

**Alternatives considered**: File-based routing (unnecessary complexity),
TanStack Router (learning curve, no benefit for 3 routes).

## R4: Form Validation Strategy

**Decision**: Zod schemas colocated with form components. React Hook
Form with `@hookform/resolvers/zod`. Validation on submit and on blur
for immediate feedback.

**Rationale**: Constitution Principle II (Type Safety) and VII
(Consistent Patterns) require Zod at API boundaries and RHF+Zod for
forms. Colocating schemas with forms keeps related code together.

**Alternatives considered**: Yup (less TypeScript-native), manual
validation (error-prone).

## R5: Chart Implementation

**Decision**: Recharts PieChart (donut variant) for category breakdown,
LineChart for monthly trend. ResponsiveContainer for mobile support.

**Rationale**: Constitution Tech Stack mandates Recharts. PieChart
with `innerRadius` creates the donut effect. ResponsiveContainer
handles Principle III (Mobile-Responsive).

**Alternatives considered**: Chart.js (not in tech stack), D3 (too
low-level for this scope).

## R6: API Client Pattern

**Decision**: Thin `fetch` wrapper in `src/lib/api.ts` with typed
response handling. No external HTTP library.

**Rationale**: Constitution Principle I (Simplicity) — fetch is
built-in, the API is local, no auth headers needed. A thin wrapper
adds error handling and JSON parsing consistently.

**Alternatives considered**: Axios (unnecessary dependency), ky
(unnecessary dependency).

## R7: Theme Toggle Implementation

**Decision**: Toggle `.dark` class on `<html>` element. Persist
preference to `localStorage`. Default to system preference via
`prefers-color-scheme` media query.

**Rationale**: shadcn/ui uses `.dark` class variant (already configured
in `index.css`). Constitution Principle VIII allows localStorage for
UI preferences only.

**Alternatives considered**: CSS custom properties only (doesn't work
with shadcn/ui's Tailwind dark variant).
