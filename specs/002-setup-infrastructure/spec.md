# Feature Specification: Phase 1 — Setup (Shared Infrastructure)

**Feature Branch**: `002-setup-infrastructure`
**Created**: 2026-03-21
**Status**: Draft
**Input**: User description: "Phase 1: Setup (Shared Infrastructure)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer Bootstraps Project (Priority: P1)

A developer clones the repository and needs to get the expense tracker application running locally with a single setup sequence. After setup, both the frontend dev server and the backend API server should start, and the app should render in the browser.

**Why this priority**: Without a working project scaffold, no feature work can begin. This is the foundational prerequisite for all user stories in the expense tracker MVP.

**Independent Test**: Run `npm install` followed by `npm run dev` in the `expense-tracker/` directory. Verify the browser opens a React app at `localhost:5173`. Run `npm run dev:server` and verify the API responds at `localhost:3001`. Confirm that frontend requests to `/api` are proxied to the backend.

**Acceptance Scenarios**:

1. **Given** a fresh clone of the repository, **When** the developer runs `npm install` in `expense-tracker/`, **Then** all dependencies install without errors
2. **Given** dependencies are installed, **When** the developer runs `npm run dev`, **Then** Vite serves the React app at `localhost:5173` with hot module replacement
3. **Given** dependencies are installed, **When** the developer runs `npm run dev:server`, **Then** Express starts on port 3001 and responds to API requests
4. **Given** both servers are running, **When** the frontend makes a request to `/api/categories`, **Then** the Vite proxy forwards it to `localhost:3001` and returns data

---

### User Story 2 - Developer Uses UI Component Library (Priority: P2)

A developer needs pre-built, accessible UI components available so that feature screens can be built consistently without writing component primitives from scratch.

**Why this priority**: UI components are needed by every user story. Having them available before feature work starts prevents duplication and ensures visual consistency.

**Independent Test**: Import any shadcn/ui component (e.g., `Button`, `Card`, `Dialog`) in a test page. Verify it renders with correct Tailwind styling in both light and dark mode contexts.

**Acceptance Scenarios**:

1. **Given** shadcn/ui is initialized, **When** a developer imports a `Button` component, **Then** it renders with the project's Tailwind theme
2. **Given** Tailwind CSS 4 is configured, **When** a class like `bg-primary` is used, **Then** the correct theme color is applied
3. **Given** dark mode class strategy is configured, **When** the `dark` class is added to `<html>`, **Then** all shadcn/ui components switch to dark mode styling

---

### User Story 3 - Developer Connects to Database (Priority: P3)

A developer needs the database schema, seed data, and server files in place so that the API can serve real data from PostgreSQL.

**Why this priority**: The backend and database are prerequisites for any data-driven feature. Without them, the frontend cannot display or persist expenses.

**Independent Test**: Start Docker with PostgreSQL, run Prisma migrations and seed, then start the API server. Verify `GET /api/categories` returns seeded categories and `GET /api/expenses` returns an empty array or seeded data.

**Acceptance Scenarios**:

1. **Given** Docker is running with PostgreSQL on port 5433, **When** database migrations are run, **Then** the database schema is created successfully
2. **Given** the schema exists, **When** the database is seeded, **Then** default categories are inserted
3. **Given** the database is seeded, **When** a request is made to the categories endpoint, **Then** it returns the seeded category list with names and colors

---

### Edge Cases

- What happens when port 5173 or 3001 is already in use? The dev server should fail with a clear error message indicating the port conflict.
- What happens when Docker/PostgreSQL is not running? The API server should fail gracefully with a database connection error, not crash silently.
- What happens when the developer's Node.js version is below 18? The project should warn about incompatible versions.
- What happens when the `.env` file is missing? The server should log an error indicating the missing DATABASE_URL variable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST scaffold a project directory with frontend and backend colocated
- **FR-002**: System MUST install all required dependencies for frontend (UI framework, styling, routing, state management, form validation, charting, notifications) and backend (server framework, ORM, CORS)
- **FR-003**: System MUST configure the frontend dev server to proxy `/api` requests to the backend server
- **FR-004**: System MUST configure the styling system with dark mode class strategy support
- **FR-005**: System MUST initialize a UI component library and install required accessible components: dialog, input, select, table, card, badge, calendar, popover, alert-dialog, dropdown-menu, toast notifications
- **FR-006**: System MUST include database schema, seed file, and API server files in the project
- **FR-007**: System MUST provide environment configuration with database connection string and server port
- **FR-008**: System MUST provide developer scripts for: frontend dev server, backend dev server, running both concurrently, production build, and preview

### Key Entities

- **Project Configuration**: Build tool config, styling config, type-checking config — controls the build pipeline and developer experience
- **Environment Variables**: Database connection and server port — connects the application to external services
- **UI Component Library**: Pre-built accessible components — shared building blocks used across all feature screens

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer can go from fresh clone to running application in under 5 minutes (excluding database setup)
- **SC-002**: The frontend dev server starts and serves a page with hot module replacement working correctly
- **SC-003**: The backend API server starts and responds to data requests within 1 second
- **SC-004**: All required UI components are available for import and render correctly with the project theme
- **SC-005**: The frontend proxy correctly forwards all API requests to the backend without cross-origin issues
- **SC-006**: Database migrations and seeding complete successfully against the database instance

## Assumptions

- Node.js 18+ and npm are installed on the developer's machine
- Docker is available for running the database
- The developer has basic familiarity with npm and terminal commands
- The existing backend design (API routes, database schema) from the expense tracker MVP planning phase is the source of truth
- No authentication or authorization is required (single-user application)
- Modern browsers only (Chrome, Firefox, Safari, Edge)
