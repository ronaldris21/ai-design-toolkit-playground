import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useUiStore } from '@/stores/ui-store'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function MonthSelector() {
  const { selectedMonth, selectedYear, setMonth } = useUiStore()

  const now = new Date()
  const isCurrentMonth = selectedMonth === now.getMonth() + 1 && selectedYear === now.getFullYear()

  const prev = () => {
    if (selectedMonth === 1) setMonth(12, selectedYear - 1)
    else setMonth(selectedMonth - 1, selectedYear)
  }

  const next = () => {
    if (selectedMonth === 12) setMonth(1, selectedYear + 1)
    else setMonth(selectedMonth + 1, selectedYear)
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={prev}>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous month</span>
      </Button>
      <span className="min-w-[160px] text-center font-medium">
        {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
      </span>
      <Button variant="outline" size="icon" onClick={next} disabled={isCurrentMonth}>
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next month</span>
      </Button>
    </div>
  )
}
