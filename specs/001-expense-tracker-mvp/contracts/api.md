# API Contracts: Expense Tracker

Base URL: `/api` (proxied by Vite to `localhost:3001`)

## Categories

### GET /api/categories

Returns all categories ordered by sortOrder.

**Response** `200 OK`:
```json
[
  {
    "id": "food-dining",
    "name": "Food & Dining",
    "color": "#ef4444",
    "sortOrder": 0,
    "createdAt": "2026-03-22T03:18:55.665Z",
    "updatedAt": "2026-03-22T03:18:55.665Z"
  }
]
```

### POST /api/categories

Create a new category.

**Request**:
```json
{ "name": "Groceries", "color": "#22c55e" }
```

**Response** `201 Created`: Category object

### PUT /api/categories/:id

Update a category.

**Request**:
```json
{ "name": "Updated Name", "color": "#3b82f6" }
```

**Response** `200 OK`: Updated category object

### DELETE /api/categories/:id

Delete a category (fails if expenses exist).

**Response** `204 No Content`
**Error** `500` if category has expenses (FK constraint)

## Expenses

### GET /api/expenses

List expenses with optional filters.

**Query params**:
- `categoryId` (string, optional)
- `startDate` (ISO date string, optional)
- `endDate` (ISO date string, optional)

**Response** `200 OK`:
```json
[
  {
    "id": "cmn16zrti...",
    "amount": 25.5,
    "description": "Lunch at cafe",
    "date": "2026-03-22T00:00:00.000Z",
    "categoryId": "food-dining",
    "createdAt": "2026-03-22T03:23:36.724Z",
    "updatedAt": "2026-03-22T03:23:36.724Z",
    "category": {
      "id": "food-dining",
      "name": "Food & Dining",
      "color": "#ef4444",
      "sortOrder": 0,
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
]
```

### POST /api/expenses

Create a new expense.

**Request**:
```json
{
  "amount": 25.50,
  "description": "Lunch at cafe",
  "date": "2026-03-22",
  "categoryId": "food-dining"
}
```

**Response** `201 Created`: Expense object with included category

### PUT /api/expenses/:id

Update an expense.

**Request**: Partial expense fields (any of amount, description, date,
categoryId)

**Response** `200 OK`: Updated expense with included category

### DELETE /api/expenses/:id

**Response** `204 No Content`

## Dashboard Stats

### GET /api/stats

**Query params**:
- `month` (number 1-12, defaults to current month)
- `year` (number, defaults to current year)

**Response** `200 OK`:
```json
{
  "totalSpent": 1250.75,
  "transactionCount": 42,
  "byCategory": [
    { "name": "Food & Dining", "color": "#ef4444", "total": 450.25 },
    { "name": "Transportation", "color": "#3b82f6", "total": 200.00 }
  ],
  "trend": [
    { "month": "Oct 2025", "total": 980.50 },
    { "month": "Nov 2025", "total": 1100.00 },
    { "month": "Dec 2025", "total": 1350.25 },
    { "month": "Jan 2026", "total": 1200.00 },
    { "month": "Feb 2026", "total": 1050.75 },
    { "month": "Mar 2026", "total": 1250.75 }
  ]
}
```
