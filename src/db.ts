import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "./generated/prisma/client.js";

// Create a single connection pool per function instance
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
	max: 1,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 10000,
	allowExitOnIdle: true,
});

pool.on("error", (err) => {
	console.error("Unexpected PG pool error:", err);
});

const adapter = new PrismaPg(pool);

// Use a global variable to cache Prisma during local dev
let prisma;
if (process.env.NODE_ENV !== "production") {
	globalThis.__prisma ??= new PrismaClient({ adapter });
	prisma = globalThis.__prisma;
} else {
	prisma = new PrismaClient({ adapter });
}

export { prisma };
