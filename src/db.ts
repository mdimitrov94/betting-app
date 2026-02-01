import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "./generated/prisma/client.js";

// Create a single connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1, // serverless-safe
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  allowExitOnIdle: true, // ensures functions exit cleanly
});

pool.on("error", (err) => {
  console.error("Unexpected PG pool error: ", err);
});

const adapter = new PrismaPg(pool);

// Cache Prisma client in development for hot reloads
let prisma;
if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma ??= new PrismaClient({ adapter });
  prisma = globalThis.__prisma;
} else {
  prisma = new PrismaClient({ adapter });
}

export { prisma };
