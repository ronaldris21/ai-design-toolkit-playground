import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface UiState {
  theme: Theme
  selectedMonth: number
  selectedYear: number
  sidebarOpen: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setMonth: (month: number, year: number) => void
  setSidebarOpen: (open: boolean) => void
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  localStorage.setItem('theme', theme)
}

const now = new Date()
const initialTheme = getInitialTheme()
applyTheme(initialTheme)

export const useUiStore = create<UiState>((set) => ({
  theme: initialTheme,
  selectedMonth: now.getMonth() + 1,
  selectedYear: now.getFullYear(),
  sidebarOpen: true,

  setTheme: (theme) => {
    applyTheme(theme)
    set({ theme })
  },

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'light' ? 'dark' : 'light'
      applyTheme(next)
      return { theme: next }
    }),

  setMonth: (month, year) => set({ selectedMonth: month, selectedYear: year }),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}))
