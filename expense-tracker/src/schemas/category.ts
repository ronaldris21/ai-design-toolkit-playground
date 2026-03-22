import { z } from 'zod/v4'

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty('Name is required')
    .max(50, 'Name must be 50 characters or less'),
  color: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, 'Must be a valid hex color (#RRGGBB)'),
})

export type CategoryFormData = z.infer<typeof categorySchema>
