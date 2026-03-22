import { useEffect, useState } from 'react'
import { useCategoryStore, type Category } from '@/stores/category-store'
import { CategoryList } from '@/components/categories/category-list'
import { CategoryForm } from '@/components/categories/category-form'
import { Button } from '@/components/ui/button'
import { Plus, Tags } from 'lucide-react'

export default function CategoriesPage() {
  const { categories, loading, error, fetchCategories } = useCategoryStore()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleEdit = (category: Category) => {
    setEditing(category)
    setFormOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    setFormOpen(open)
    if (!open) setEditing(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground mt-1">Manage expense categories</p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {loading ? (
          <div className="text-muted-foreground py-8 text-center">Loading categories...</div>
        ) : error ? (
          <div role="alert" className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-destructive">Unable to load categories. Please try again.</p>
            <Button variant="outline" size="sm" onClick={fetchCategories}>
              Try again
            </Button>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Tags className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No categories yet</h3>
            <p className="text-muted-foreground mt-1">
              Click &ldquo;Add Category&rdquo; to create your first category.
            </p>
          </div>
        ) : (
          <CategoryList categories={categories} onEdit={handleEdit} />
        )}
      </div>

      <CategoryForm open={formOpen} onOpenChange={handleOpenChange} category={editing} />
    </div>
  )
}
