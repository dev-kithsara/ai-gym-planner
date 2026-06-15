import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();

// 1. PostgreSQL Database එකට connect වෙන්න Pool එකක් හදනවා
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// 2. ඒ Pool එක පාවිච්චි කරලා Prisma Adapter එකක් හදනවා
const adapter = new PrismaPg(pool);

// 3. ඒ Adapter එක අපේ PrismaClient එකට අමුණනවා
const prisma = new PrismaClient({ adapter });

export default prisma;