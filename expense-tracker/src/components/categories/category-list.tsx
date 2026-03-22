import { useState } from 'react'
import type { Category } from '@/stores/category-store'
import { useCategoryStore } from '@/stores/category-store'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface CategoryListProps {
  categories: Category[]
  onEdit: (category: Category) => void
}

export function CategoryList({ categories, onEdit }: CategoryListProps) {
  const { deleteCategory } = useCategoryStore()
  const [deleting, setDeleting] = useState<Category | null>(null)

  const handleDelete = async () => {
    if (!deleting) return
    try {
      await deleteCategory(deleting.id)
      toast.success('Category deleted')
    } catch {
      toast.error('Cannot delete this category. It has associated expenses.')
    }
    setDeleting(null)
  }

  return (
    <>
      <div className="grid gap-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="h-5 w-5 shrink-0 rounded-full border"
                style={{ backgroundColor: category.color }}
              />
              <span className="font-medium truncate">{category.name}</span>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => onEdit(category)}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setDeleting(category)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &ldquo;{deleting?.name}&rdquo;. Categories with
              expenses cannot be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
