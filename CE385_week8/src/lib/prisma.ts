// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("ไม่พบค่า DATABASE_URL - คัดลอก .env.example เป็น .env หรือยัง?");
}

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter });