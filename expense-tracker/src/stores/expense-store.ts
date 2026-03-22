import { create } from 'zustand'
import { api } from '../lib/api'
import type { Category } from './category-store'
import type { ExpenseFormData } from '../schemas/expense'

export interface Expense {
  id: string
  amount: number
  description: string
  date: string
  categoryId: string
  category: Category
  createdAt: string
  updatedAt: string
}

interface Filters {
  categoryId: string
  startDate: string
  endDate: string
}

interface ExpenseState {
  expenses: Expense[]
  loading: boolean
  error: string | null
  filters: Filters
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  clearFilters: () => void
  fetchExpenses: () => Promise<void>
  addExpense: (data: ExpenseFormData) => Promise<Expense>
  updateExpense: (id: string, data: ExpenseFormData) => Promise<Expense>
  deleteExpense: (id: string) => Promise<void>
}

const emptyFilters: Filters = { categoryId: '', startDate: '', endDate: '' }

function buildQuery(filters: Filters): string {
  const params = new URLSearchParams()
  if (filters.categoryId) params.set('categoryId', filters.categoryId)
  if (filters.startDate) params.set('startDate', filters.startDate)
  if (filters.endDate) params.set('endDate', filters.endDate)
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  loading: false,
  error: null,
  filters: { ...emptyFilters },

  setFilter: (key, value) => {
    set({ filters: { ...get().filters, [key]: value } })
  },

  clearFilters: () => set({ filters: { ...emptyFilters } }),

  fetchExpenses: async () => {
    set({ loading: true, error: null })
    try {
      const query = buildQuery(get().filters)
      const expenses = await api.get<Expense[]>(`/expenses${query}`)
      set({ expenses, loading: false })
    } catch (e) {
      set({ error: (e as Error).message, loading: false })
    }
  },

  addExpense: async (data) => {
    const expense = await api.post<Expense>('/expenses', data)
    set({ expenses: [expense, ...get().expenses] })
    return expense
  },

  updateExpense: async (id, data) => {
    const expense = await api.put<Expense>(`/expenses/${id}`, data)
    set({
      expenses: get().expenses.map((e) => (e.id === id ? expense : e)),
    })
    return expense
  },

  deleteExpense: async (id) => {
    await api.delete(`/expenses/${id}`)
    set({ expenses: get().expenses.filter((e) => e.id !== id) })
  },
}))
