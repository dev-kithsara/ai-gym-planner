import { defineConfig } from 'prisma/config';
import dotenv from 'dotenv';

// මේ පේළියෙන් තමයි .env ෆයිල් එකේ තියෙන දත්ත බලෙන් අපේ කෝඩ් එකට load කරන්නේ
dotenv.config();

export default defineConfig({
  datasource: {
    // දැන් Prisma ට process.env හරහා කෙලින්ම අර URL එක හොයාගන්න පුළුවන්
    url: process.env.DATABASE_URL as string,
  },
});