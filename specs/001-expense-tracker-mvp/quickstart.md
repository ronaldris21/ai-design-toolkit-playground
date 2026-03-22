# Quickstart: Expense Tracker MVP

## Prerequisites

- Node.js 20+
- Docker (for PostgreSQL)
- PostgreSQL container running on port 5433

## Setup

```bash
cd expense-tracker
npm install
npx prisma generate
npx prisma migrate dev
npx tsx prisma/seed.ts
```

## Run Development

```bash
# Terminal 1: Frontend (Vite)
npm run dev
# → http://localhost:5173

# Terminal 2: API server
npm run dev:server
# → http://localhost:3001

# Or both at once:
npm run dev:all
```

## Verify

1. Open http://localhost:5173 — should see the app
2. `curl http://localhost:3001/api/categories` — should return 7 categories
3. Navigate between Dashboard, Expenses, Categories screens
4. Add an expense and verify it appears in the list
5. Check dashboard updates with the new expense

## Environment Variables

Create `expense-tracker/.env`:
```
DATABASE_URL="postgresql://postgres:12345@localhost:5433/expensesTracker?schema=public"
PORT=3001
```
