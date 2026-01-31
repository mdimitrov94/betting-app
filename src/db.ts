import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "./generated/prisma/client.js";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
	// Supabase connection pooler settings
	max: 1, // Serverless functions should use 1 connection per instance
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 10000,
	allowExitOnIdle: true, // Allow pool to close when idle
});

const adapter = new PrismaPg(pool);

declare global {
	var __prisma: PrismaClient | undefined;
}

export const prisma = globalThis.__prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
	globalThis.__prisma = prisma;
}
