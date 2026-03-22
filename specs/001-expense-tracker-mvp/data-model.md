# Data Model: Personal Expense Tracker MVP

## Entities

### Category

| Field | Type | Constraints |
|-------|------|-------------|
| id | string (cuid) | Primary key, auto-generated |
| name | string | Required, unique |
| color | string | Required, hex color (default: #6366f1) |
| sortOrder | integer | Default: 0 |
| createdAt | datetime | Auto-set on creation |
| updatedAt | datetime | Auto-updated |

**Relationships**: Has many Expenses. Cannot be deleted if expenses
reference it (FK constraint).

### Expense

| Field | Type | Constraints |
|-------|------|-------------|
| id | string (cuid) | Primary key, auto-generated |
| amount | float | Required, positive, max 9,999,999.99 |
| description | string | Optional, max 255 chars |
| date | datetime | Required, defaults to today |
| categoryId | string | Required, FK to Category |
| createdAt | datetime | Auto-set on creation |
| updatedAt | datetime | Auto-updated |

**Relationships**: Belongs to exactly one Category.
**Indexes**: categoryId, date (for filtered queries).

## Validation Rules (Zod)

### Expense Schema

- `amount`: positive number, max 9999999.99, rounded to 2 decimals
- `description`: optional string, max 255 characters
- `date`: valid date string (ISO format)
- `categoryId`: non-empty string

### Category Schema

- `name`: non-empty string, trimmed, max 50 characters
- `color`: valid hex color string (#RRGGBB format)

## State Transitions

Categories and expenses have no formal state machine — they support
standard CRUD operations (create, read, update, delete) with the
constraint that categories with associated expenses cannot be deleted.
