import { useEffect, useRef, useState } from 'react'
import { api } from '@/lib/api'
import { useUiStore } from '@/stores/ui-store'
import { StatCards } from '@/components/dashboard/stat-cards'
import { MonthSelector } from '@/components/dashboard/month-selector'
import { CategoryChart } from '@/components/dashboard/category-chart'
import { TrendChart } from '@/components/dashboard/trend-chart'
import { ExpenseForm } from '@/components/expenses/expense-form'
import { Button } from '@/components/ui/button'
import { Plus, RefreshCw } from 'lucide-react'

interface StatsResponse {
  totalSpent: number
  transactionCount: number
  byCategory: { name: string; color: string; total: number }[]
  trend: { month: string; total: number }[]
}

export default function DashboardPage() {
  const { selectedMonth, selectedYear } = useUiStore()
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const wasFormOpen = useRef(false)

  const fetchStats = () => {
    setLoading(true)
    setError(null)
    api
      .get<StatsResponse>(`/stats?month=${selectedMonth}&year=${selectedYear}`)
      .then(setStats)
      .catch(() => setError('Unable to load dashboard data. Please check your connection and try again.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchStats()
  }, [selectedMonth, selectedYear])

  const handleFormOpenChange = (open: boolean) => {
    if (wasFormOpen.current && !open) {
      fetchStats()
    }
    wasFormOpen.current = open
    setFormOpen(open)
  }

  const topCategory =
    stats?.byCategory.length
      ? stats.byCategory.reduce((top, c) => (c.total > top.total ? c : top)).name
      : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Your spending overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => handleFormOpenChange(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
          <MonthSelector />
        </div>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {loading ? (
          <div className="text-muted-foreground py-8 text-center">Loading stats...</div>
        ) : error ? (
          <div role="alert" className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-destructive">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchStats}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
          </div>
        ) : stats ? (
          <>
            <StatCards
              totalSpent={stats.totalSpent}
              transactionCount={stats.transactionCount}
              topCategory={topCategory}
            />
            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <CategoryChart data={stats.byCategory} />
              <TrendChart data={stats.trend} />
            </div>
          </>
        ) : null}
      </div>

      <ExpenseForm open={formOpen} onOpenChange={handleFormOpenChange} />
    </div>
  )
}
