import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categorySchema, type CategoryFormData } from '@/schemas/category'
import { useCategoryStore, type Category } from '@/stores/category-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

const PRESET_COLORS = [
  { hex: '#ef4444', name: 'Red' },
  { hex: '#f97316', name: 'Orange' },
  { hex: '#eab308', name: 'Yellow' },
  { hex: '#22c55e', name: 'Green' },
  { hex: '#14b8a6', name: 'Teal' },
  { hex: '#3b82f6', name: 'Blue' },
  { hex: '#6366f1', name: 'Indigo' },
  { hex: '#a855f7', name: 'Purple' },
  { hex: '#ec4899', name: 'Pink' },
  { hex: '#64748b', name: 'Slate' },
]

interface CategoryFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category | null
}

export function CategoryForm({ open, onOpenChange, category }: CategoryFormProps) {
  const { addCategory, updateCategory } = useCategoryStore()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '', color: PRESET_COLORS[6].hex },
  })

  const selectedColor = watch('color')

  useEffect(() => {
    if (category) {
      reset({ name: category.name, color: category.color })
    } else {
      reset({ name: '', color: PRESET_COLORS[6].hex })
    }
  }, [category, reset])

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (category) {
        await updateCategory(category.id, data)
        toast.success('Category updated')
      } else {
        await addCategory(data)
        toast.success('Category created')
      }
      onOpenChange(false)
    } catch {
      toast.error('Failed to save category')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Add Category'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium mb-1 block">
              Name
            </label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Color</label>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Color presets">
              {PRESET_COLORS.map(({ hex, name }) => (
                <button
                  key={hex}
                  type="button"
                  role="radio"
                  aria-checked={selectedColor === hex}
                  aria-label={`${name} (${hex})`}
                  className="h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  style={{
                    backgroundColor: hex,
                    borderColor: selectedColor === hex ? 'currentColor' : 'transparent',
                  }}
                  onClick={() => setValue('color', hex)}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Input
                type="color"
                {...register('color')}
                className="h-8 w-14 cursor-pointer p-0 border-0"
              />
              <span className="text-xs text-muted-foreground">{selectedColor}</span>
            </div>
            {errors.color && (
              <p className="text-sm text-destructive mt-1">{errors.color.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : category ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
