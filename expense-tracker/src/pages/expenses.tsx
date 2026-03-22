import { useEffect, useRef, useState } from 'react'
import { useExpenseStore, type Expense } from '@/stores/expense-store'
import { ExpenseTable } from '@/components/expenses/expense-table'
import { ExpenseForm } from '@/components/expenses/expense-form'
import { ExpenseFilters } from '@/components/expenses/expense-filters'
import { Button } from '@/components/ui/button'
import { Plus, Receipt } from 'lucide-react'

export default function ExpensesPage() {
  const { expenses, loading, error, filters, fetchExpenses } = useExpenseStore()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Expense | null>(null)

  useEffect(() => {
    fetchExpenses()
  }, [fetchExpenses])

  const handleEdit = (expense: Expense) => {
    setEditing(expense)
    setFormOpen(true)
  }

  const wasFormOpen = useRef(false)

  const handleOpenChange = (open: boolean) => {
    if (wasFormOpen.current && !open) {
      fetchExpenses()
    }
    wasFormOpen.current = open
    setFormOpen(open)
    if (!open) setEditing(null)
  }

  const hasFilters = filters.categoryId || filters.startDate || filters.endDate

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground mt-1">Manage your expenses</p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <ExpenseFilters />

      <div aria-live="polite" aria-atomic="true">
        {loading ? (
          <div className="text-muted-foreground py-8 text-center">Loading expenses...</div>
        ) : error ? (
          <div role="alert" className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-destructive">Unable to load expenses. Please try again.</p>
            <Button variant="outline" size="sm" onClick={fetchExpenses}>
              Try again
            </Button>
          </div>
        ) : expenses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Receipt className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">
              {hasFilters ? 'No matching expenses' : 'No expenses yet'}
            </h3>
            <p className="text-muted-foreground mt-1">
              {hasFilters
                ? 'Try adjusting your filters to find what you\'re looking for.'
                : 'Click "Add Expense" to record your first expense.'}
            </p>
          </div>
        ) : (
          <ExpenseTable expenses={expenses} onEdit={handleEdit} />
        )}
      </div>

      <ExpenseForm open={formOpen} onOpenChange={handleOpenChange} expense={editing} />
    </div>
  )
}
