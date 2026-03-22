import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import DashboardPage from '../dashboard'

// Mock the API module
vi.mock('@/lib/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))

// Mock child components that are not under test
vi.mock('@/components/dashboard/category-chart', () => ({
  CategoryChart: () => <div data-testid="category-chart" />,
}))

vi.mock('@/components/dashboard/trend-chart', () => ({
  TrendChart: () => <div data-testid="trend-chart" />,
}))

vi.mock('@/components/expenses/expense-form', () => ({
  ExpenseForm: ({
    open,
    onOpenChange,
  }: {
    open: boolean
    onOpenChange: (open: boolean) => void
  }) =>
    open ? (
      <div data-testid="expense-form">
        <button onClick={() => onOpenChange(false)}>Close</button>
      </div>
    ) : null,
}))

import { api } from '@/lib/api'

const mockStats = {
  totalSpent: 1250.5,
  transactionCount: 15,
  byCategory: [
    { name: 'Food', color: '#ef4444', total: 500 },
    { name: 'Transport', color: '#3b82f6', total: 750.5 },
  ],
  trend: [
    { month: '2026-01', total: 400 },
    { month: '2026-02', total: 850.5 },
  ],
}

beforeEach(() => {
  vi.clearAllMocks()
  ;(api.get as Mock).mockResolvedValue(mockStats)
})

describe('DashboardPage', () => {
  it('renders the dashboard heading', async () => {
    render(<DashboardPage />)
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('shows loading state initially', () => {
    // Make the API hang to keep loading state visible
    ;(api.get as Mock).mockReturnValue(new Promise(() => {}))
    render(<DashboardPage />)
    expect(screen.getByText('Loading stats...')).toBeInTheDocument()
  })

  it('fetches and displays stats on mount', async () => {
    render(<DashboardPage />)
    await waitFor(() => {
      expect(screen.getByText('15')).toBeInTheDocument()
    })
    expect(api.get).toHaveBeenCalledWith(
      expect.stringContaining('/stats?month='),
    )
  })

  it('shows error state when API fails', async () => {
    ;(api.get as Mock).mockRejectedValue(new Error('Network error'))
    render(<DashboardPage />)
    await waitFor(() => {
      expect(
        screen.getByText('Unable to load dashboard data. Please check your connection and try again.'),
      ).toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })

  it('retries fetching stats when "Try again" is clicked', async () => {
    ;(api.get as Mock).mockRejectedValueOnce(new Error('fail'))
    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    })

    ;(api.get as Mock).mockResolvedValueOnce(mockStats)
    await userEvent.click(screen.getByRole('button', { name: /try again/i }))

    await waitFor(() => {
      expect(screen.getByText('15')).toBeInTheDocument()
    })
  })

  describe('Add Expense button', () => {
    it('renders the Add Expense button', async () => {
      render(<DashboardPage />)
      expect(screen.getByRole('button', { name: /add expense/i })).toBeInTheDocument()
    })

    it('opens the expense form when clicked', async () => {
      render(<DashboardPage />)
      expect(screen.queryByTestId('expense-form')).not.toBeInTheDocument()

      await userEvent.click(screen.getByRole('button', { name: /add expense/i }))
      expect(screen.getByTestId('expense-form')).toBeInTheDocument()
    })

    it('closes the expense form and refreshes stats', async () => {
      render(<DashboardPage />)

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText('15')).toBeInTheDocument()
      })

      const initialCallCount = (api.get as Mock).mock.calls.length

      // Open the form
      await userEvent.click(screen.getByRole('button', { name: /add expense/i }))
      expect(screen.getByTestId('expense-form')).toBeInTheDocument()

      // Close the form (simulates submission complete)
      await userEvent.click(screen.getByRole('button', { name: /close/i }))

      // Form should be closed
      expect(screen.queryByTestId('expense-form')).not.toBeInTheDocument()

      // Stats should have been re-fetched
      await waitFor(() => {
        expect((api.get as Mock).mock.calls.length).toBeGreaterThan(initialCallCount)
      })
    })
  })

  describe('stats display', () => {
    it('displays total spent', async () => {
      render(<DashboardPage />)
      await waitFor(() => {
        expect(screen.getByText('$1,250.50')).toBeInTheDocument()
      })
    })

    it('displays transaction count', async () => {
      render(<DashboardPage />)
      await waitFor(() => {
        expect(screen.getByText('15')).toBeInTheDocument()
      })
    })

    it('displays top category', async () => {
      render(<DashboardPage />)
      await waitFor(() => {
        expect(screen.getByText('Transport')).toBeInTheDocument()
      })
    })

    it('renders charts after loading', async () => {
      render(<DashboardPage />)
      await waitFor(() => {
        expect(screen.getByTestId('category-chart')).toBeInTheDocument()
        expect(screen.getByTestId('trend-chart')).toBeInTheDocument()
      })
    })
  })
})
