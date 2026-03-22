import express from 'express'
import cors from 'cors'
import { prisma } from './db.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// --- Categories ---
app.get('/api/categories', async (_req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
  })
  res.json(categories)
})

app.post('/api/categories', async (req, res) => {
  const category = await prisma.category.create({ data: req.body })
  res.status(201).json(category)
})

app.put('/api/categories/:id', async (req, res) => {
  const category = await prisma.category.update({
    where: { id: req.params.id },
    data: req.body,
  })
  res.json(category)
})

app.delete('/api/categories/:id', async (req, res) => {
  await prisma.category.delete({ where: { id: req.params.id } })
  res.status(204).end()
})

// --- Expenses ---
app.get('/api/expenses', async (req, res) => {
  const { categoryId, startDate, endDate } = req.query
  const where: Record<string, unknown> = {}

  if (categoryId) where.categoryId = categoryId
  if (startDate || endDate) {
    where.date = {}
    if (startDate) (where.date as Record<string, unknown>).gte = new Date(startDate as string)
    if (endDate) (where.date as Record<string, unknown>).lte = new Date(endDate as string)
  }

  const expenses = await prisma.expense.findMany({
    where,
    include: { category: true },
    orderBy: { date: 'desc' },
  })
  res.json(expenses)
})

app.post('/api/expenses', async (req, res) => {
  const expense = await prisma.expense.create({
    data: {
      ...req.body,
      date: new Date(req.body.date),
    },
    include: { category: true },
  })
  res.status(201).json(expense)
})

app.put('/api/expenses/:id', async (req, res) => {
  const expense = await prisma.expense.update({
    where: { id: req.params.id },
    data: {
      ...req.body,
      date: req.body.date ? new Date(req.body.date) : undefined,
    },
    include: { category: true },
  })
  res.json(expense)
})

app.delete('/api/expenses/:id', async (req, res) => {
  await prisma.expense.delete({ where: { id: req.params.id } })
  res.status(204).end()
})

// --- Dashboard Stats ---
app.get('/api/stats', async (req, res) => {
  const { month, year } = req.query
  const m = parseInt(month as string) || new Date().getMonth() + 1
  const y = parseInt(year as string) || new Date().getFullYear()

  const startDate = new Date(y, m - 1, 1)
  const endDate = new Date(y, m, 0, 23, 59, 59)

  const expenses = await prisma.expense.findMany({
    where: { date: { gte: startDate, lte: endDate } },
    include: { category: true },
  })

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  const transactionCount = expenses.length

  const byCategory = expenses.reduce(
    (acc, e) => {
      const key = e.category.name
      if (!acc[key]) acc[key] = { name: key, color: e.category.color, total: 0 }
      acc[key].total += e.amount
      return acc
    },
    {} as Record<string, { name: string; color: string; total: number }>,
  )

  // Monthly trend (last 6 months)
  const trend = []
  for (let i = 5; i >= 0; i--) {
    const tMonth = new Date(y, m - 1 - i, 1)
    const tEnd = new Date(tMonth.getFullYear(), tMonth.getMonth() + 1, 0, 23, 59, 59)
    const monthExpenses = await prisma.expense.aggregate({
      where: { date: { gte: tMonth, lte: tEnd } },
      _sum: { amount: true },
    })
    trend.push({
      month: tMonth.toLocaleString('default', { month: 'short', year: 'numeric' }),
      total: monthExpenses._sum.amount || 0,
    })
  }

  res.json({
    totalSpent,
    transactionCount,
    byCategory: Object.values(byCategory),
    trend,
  })
})

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
