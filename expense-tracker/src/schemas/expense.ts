import { z } from 'zod/v4'

export const expenseSchema = z.object({
  amount: z
    .number()
    .positive('Amount must be positive')
    .max(9999999.99, 'Amount too large')
    .transform((v) => Math.round(v * 100) / 100),
  description: z
    .string()
    .max(255, 'Description must be 255 characters or less')
    .optional()
    .default(''),
  date: z.string().nonempty('Date is required'),
  categoryId: z.string().nonempty('Category is required'),
})

export type ExpenseFormData = z.infer<typeof expenseSchema>
