import { create } from 'zustand'
import { api } from '../lib/api'
import type { CategoryFormData } from '../schemas/category'

export interface Category {
  id: string
  name: string
  color: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

interface CategoryState {
  categories: Category[]
  loading: boolean
  error: string | null
  fetchCategories: () => Promise<void>
  addCategory: (data: CategoryFormData) => Promise<Category>
  updateCategory: (id: string, data: CategoryFormData) => Promise<Category>
  deleteCategory: (id: string) => Promise<void>
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null })
    try {
      const categories = await api.get<Category[]>('/categories')
      set({ categories, loading: false })
    } catch (e) {
      set({ error: (e as Error).message, loading: false })
    }
  },

  addCategory: async (data) => {
    const category = await api.post<Category>('/categories', data)
    set({ categories: [...get().categories, category] })
    return category
  },

  updateCategory: async (id, data) => {
    const category = await api.put<Category>(`/categories/${id}`, data)
    set({
      categories: get().categories.map((c) => (c.id === id ? category : c)),
    })
    return category
  },

  deleteCategory: async (id) => {
    await api.delete(`/categories/${id}`)
    set({ categories: get().categories.filter((c) => c.id !== id) })
  },
}))
