import { useExpenseStore } from '@/stores/expense-store'
import { useCategoryStore } from '@/stores/category-store'
import { useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { X } from 'lucide-react'

export function ExpenseFilters() {
  const { filters, setFilter, clearFilters, fetchExpenses } = useExpenseStore()
  const { categories, loading: catLoading, error: catError, fetchCategories } = useCategoryStore()
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (categories.length === 0 && !catLoading && !catError) fetchCategories()
  }, [categories.length, catLoading, catError, fetchCategories])

  // Category changes are instant; date changes are debounced
  useEffect(() => {
    fetchExpenses()
  }, [filters.categoryId, fetchExpenses])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchExpenses()
    }, 400)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [filters.startDate, filters.endDate, fetchExpenses])

  const hasFilters = filters.categoryId || filters.startDate || filters.endDate

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="w-48">
        <label htmlFor="filter-category" className="text-sm font-medium mb-1 block">Category</label>
        <Select
          value={filters.categoryId || 'all'}
          onValueChange={(v) => setFilter('categoryId', v === 'all' ? '' : v)}
        >
          <SelectTrigger id="filter-category">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  {c.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="filter-start-date" className="text-sm font-medium mb-1 block">From</label>
        <Input
          id="filter-start-date"
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilter('startDate', e.target.value)}
          className="w-40"
        />
      </div>

      <div>
        <label htmlFor="filter-end-date" className="text-sm font-medium mb-1 block">To</label>
        <Input
          id="filter-end-date"
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilter('endDate', e.target.value)}
          className="w-40"
        />
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="mr-1 h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  )
}
