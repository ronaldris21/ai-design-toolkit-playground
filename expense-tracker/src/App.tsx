import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/app-layout'
import { Toaster } from '@/components/ui/sonner'

const DashboardPage = lazy(() => import('@/pages/dashboard'))
const ExpensesPage = lazy(() => import('@/pages/expenses'))
const CategoriesPage = lazy(() => import('@/pages/categories'))

function Loading() {
  return <div className="flex items-center justify-center p-8 text-muted-foreground">Loading...</div>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <DashboardPage />
              </Suspense>
            }
          />
          <Route
            path="expenses"
            element={
              <Suspense fallback={<Loading />}>
                <ExpensesPage />
              </Suspense>
            }
          />
          <Route
            path="categories"
            element={
              <Suspense fallback={<Loading />}>
                <CategoriesPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}
