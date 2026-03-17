import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const connectionString = process.env.DATABASE_URL!

// Use adapter for both development and production
const pool = new Pool({ connectionString })
// PrismaPg expects a Pool type from its bundled pg types; cast avoids duplicate @types/pg conflicts.
const adapter = new PrismaPg(pool as unknown as any)

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { prisma }
