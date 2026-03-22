import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { expenseSchema, type ExpenseFormData } from '@/schemas/expense'
import { useCategoryStore } from '@/stores/category-store'
import { useExpenseStore, type Expense } from '@/stores/expense-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

interface ExpenseFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  expense?: Expense | null
}

export function ExpenseForm({ open, onOpenChange, expense }: ExpenseFormProps) {
  const { categories, loading: categoriesLoading, error: categoriesError, fetchCategories } = useCategoryStore()
  const { addExpense, updateExpense } = useExpenseStore()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: '' as unknown as number,
      description: '',
      date: new Date().toISOString().split('T')[0],
      categoryId: '',
    },
  })

  const categoryId = watch('categoryId')

  useEffect(() => {
    if (categories.length === 0 && !categoriesLoading && !categoriesError) fetchCategories()
  }, [categories.length, categoriesLoading, categoriesError, fetchCategories])

  useEffect(() => {
    if (expense) {
      reset({
        amount: expense.amount,
        description: expense.description,
        date: expense.date.split('T')[0],
        categoryId: expense.categoryId,
      })
    } else {
      reset({
        amount: '' as unknown as number,
        description: '',
        date: new Date().toISOString().split('T')[0],
        categoryId: '',
      })
    }
  }, [expense, reset])

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      if (expense) {
        await updateExpense(expense.id, data)
        toast.success('Expense updated')
      } else {
        await addExpense(data)
        toast.success('Expense added')
      }
      onOpenChange(false)
    } catch {
      toast.error('Failed to save expense')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{expense ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="amount" className="text-sm font-medium mb-1 block">
              Amount ($)
            </label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              {...register('amount', { valueAsNumber: true })}
            />
            {errors.amount && (
              <p className="text-sm text-destructive mt-1">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="text-sm font-medium mb-1 block">
              Category
            </label>
            <Select value={categoryId} onValueChange={(v) => setValue('categoryId', v)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-3 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      {c.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-sm text-destructive mt-1">{errors.categoryId.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium mb-1 block">
              Description
            </label>
            <Input id="description" {...register('description')} />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="date" className="text-sm font-medium mb-1 block">
              Date
            </label>
            <Input id="date" type="date" {...register('date')} />
            {errors.date && (
              <p className="text-sm text-destructive mt-1">{errors.date.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : expense ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
