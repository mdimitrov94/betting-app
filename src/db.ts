import { PrismaClient } from "./generated/prisma/client.js";

declare global {
	var __prisma: PrismaClient | undefined;
}

export const prisma =
	globalThis.__prisma ||
	new PrismaClient({
		datasources: {
			db: {
				url: process.env.DATABASE_URL,
			},
		},
	});

if (process.env.NODE_ENV !== "production") {
	globalThis.__prisma = prisma;
}
