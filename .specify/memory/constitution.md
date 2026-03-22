<!--
  Sync Impact Report
  ===========================================================
  Version change: 0.0.0 → 1.0.0 (MAJOR: initial ratification)

  Added principles:
    I.   Simplicity First
    II.  Type Safety
    III. Mobile-Responsive Design
    IV.  Accessibility
    V.   Clean Separation
    VI.  Data Integrity
    VII. Consistent Patterns
    VIII. Progressive Enhancement

  Added sections:
    - Constraints (Section 2)
    - Tech Stack (Section 3)

  Templates requiring updates:
    - .specify/templates/plan-template.md      ✅ compatible
    - .specify/templates/spec-template.md      ✅ compatible
    - .specify/templates/tasks-template.md     ✅ compatible

  Follow-up TODOs: none
  ===========================================================
-->

# Expense Tracker Constitution

## Core Principles

### I. Simplicity First

MVP-focused development. Every feature MUST justify its inclusion against
the core value proposition: tracking expenses by category with visual
dashboards.

- No scope creep: features not in the approved spec are rejected
- YAGNI enforced: do not build for hypothetical future requirements
- When two approaches exist, choose the simpler one unless measurable
  evidence justifies complexity
- Maximum 4 screens for MVP: Dashboard, Expenses List, Add/Edit Expense,
  Categories

### II. Type Safety

TypeScript strict mode is non-negotiable across frontend and backend.

- `strict: true` in all tsconfig files, no `any` escape hatches without
  explicit justification in code comments
- Zod schemas MUST validate all data at API boundaries (request bodies,
  query params)
- Prisma-generated types are the canonical source for entity shapes;
  do not duplicate or shadow them with manual interfaces
- React components MUST have typed props; no implicit `any` from missing
  type annotations

### III. Mobile-Responsive Design

The app MUST work on screens from 375px (mobile) to 1440px (desktop).

- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) consistently
- Touch targets MUST be at least 44x44px on mobile
- Tables MUST degrade gracefully on small screens (card layout or
  horizontal scroll)
- Charts MUST resize and remain readable at mobile widths

### IV. Accessibility

WCAG 2.1 AA compliance is required for all UI components.

- Color contrast ratio MUST meet 4.5:1 for normal text, 3:1 for large
  text
- All interactive elements MUST be keyboard navigable
- Form inputs MUST have associated labels
- Status changes (toasts, alerts) MUST use ARIA live regions
- shadcn/ui components provide built-in a11y; do not override or remove
  their ARIA attributes

### V. Clean Separation

React frontend and Express API are separate concerns connected via
HTTP.

- Frontend communicates with backend exclusively through `/api/*`
  endpoints proxied by Vite in development
- No direct database access from frontend code
- Business logic lives in the Express API; React handles presentation
  and client state only
- Zustand stores manage UI state (selected filters, current month);
  server data is fetched via API calls
- API responses MUST be JSON; no HTML rendering on the server

### VI. Data Integrity

PostgreSQL via Prisma is the single source of truth for all
application data.

- Prisma schema defines all entities, relations, and indexes
- Migrations MUST be used for all schema changes (`prisma migrate dev`)
- Foreign key constraints MUST be enforced (no orphaned expenses)
- Amounts MUST be stored as `Float` with two-decimal precision enforced
  at the API validation layer
- Seed data provides default categories; the seed script MUST be
  idempotent

### VII. Consistent Patterns

Follow established library conventions to reduce cognitive load.

- UI components: shadcn/ui patterns (composition via `cn()`, Slot-based
  polymorphism, Radix primitives)
- State: Zustand stores with typed selectors; one store per domain
  (expenses, categories, UI preferences)
- Forms: React Hook Form + Zod resolver; validation schemas colocated
  with form components
- Routing: React Router v7 with lazy-loaded route components
- API: Express routes grouped by resource (`/api/categories`,
  `/api/expenses`, `/api/stats`)

### VIII. Progressive Enhancement

The application SHOULD degrade gracefully when JavaScript-dependent
features fail.

- Loading states MUST be shown while data is fetching
- Error boundaries MUST catch and display render failures
- Empty states MUST guide the user (e.g., "No expenses yet. Add your
  first one.")
- localStorage is used ONLY for UI preferences (theme, sidebar state);
  all persistent data lives in PostgreSQL

## Constraints

- **Single user**: No authentication or authorization for MVP
- **Database**: PostgreSQL via Docker at `localhost:5433`, database
  `expensesTracker`
- **No external APIs**: All data is local; no third-party service
  dependencies
- **Bundle size**: Frontend bundle MUST remain under 500KB gzipped
- **No SSR**: Vite serves a client-side SPA; server-side rendering
  is out of scope

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend framework | React | 18+ |
| Build tool | Vite | 8.x |
| Language | TypeScript | 5.9+ |
| Styling | Tailwind CSS | 4.x |
| Component library | shadcn/ui | latest |
| Charts | Recharts | 3.x |
| Client state | Zustand | 5.x |
| Forms | React Hook Form + Zod | latest |
| Routing | React Router | 7.x |
| API framework | Express | 5.x |
| ORM | Prisma | 7.x |
| Database | PostgreSQL | Docker |

Adding new dependencies MUST be justified against the Simplicity First
principle. Prefer built-in browser APIs and existing dependencies over
new packages.

## Governance

This constitution is the highest-authority document for development
decisions in this project.

- All implementation work MUST pass a Constitution Check before
  proceeding (see plan template)
- Amendments require: (1) documented rationale, (2) version bump per
  semver rules, (3) sync impact report
- Version policy: MAJOR for principle removals/redefinitions, MINOR for
  new principles or expanded guidance, PATCH for clarifications
- Compliance is verified during code review via `/bmad-code-review`

**Version**: 1.0.0 | **Ratified**: 2026-03-22 | **Last Amended**: 2026-03-22
