import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "./generated/prisma/client.js";

const pool = new Pool({
	connectionString:
		process.env.DATABASE_URL + "?pgbouncer=true&connection_limit=1",
	ssl: { rejectUnauthorized: false },
	max: 1,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 10000,
	allowExitOnIdle: true,
});

pool.on("error", (err) => {
	console.error("Unexpected PG pool error", err);
});

const adapter = new PrismaPg(pool);

declare global {
	var __prisma: PrismaClient | undefined;
}

export const prisma = globalThis.__prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
	globalThis.__prisma = prisma;
}
