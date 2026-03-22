import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client.js'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const defaultCategories = [
  { name: 'Food & Dining', color: '#ef4444', sortOrder: 0 },
  { name: 'Transportation', color: '#3b82f6', sortOrder: 1 },
  { name: 'Entertainment', color: '#8b5cf6', sortOrder: 2 },
  { name: 'Shopping', color: '#f59e0b', sortOrder: 3 },
  { name: 'Bills & Utilities', color: '#10b981', sortOrder: 4 },
  { name: 'Health', color: '#ec4899', sortOrder: 5 },
  { name: 'Other', color: '#6b7280', sortOrder: 6 },
]

async function main() {
  console.log('Seeding database...')

  for (const cat of defaultCategories) {
    await prisma.category.upsert({
      where: { id: cat.name.toLowerCase().replace(/\s+&?\s*/g, '-') },
      update: {},
      create: {
        id: cat.name.toLowerCase().replace(/\s+&?\s*/g, '-'),
        ...cat,
      },
    })
  }

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
