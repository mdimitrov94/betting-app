import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { prisma } from "../db";

export const Route = createFileRoute("/api/winner-history")({
	server: {
		handlers: {
			GET: async () => {
				try {
					const history = await prisma.winnerHistory.findMany({
						orderBy: {
							date: "desc",
						},
					});

					return json(history);
				} catch (error) {
					console.error("Error fetching winner history:", error);
					return json({ error: "Failed to fetch history" }, { status: 500 });
				}
			},
			POST: async ({ request }) => {
				try {
					const body = await request.json();
					const {
						date,
						departureTime,
						winnerUserId,
						winnerName,
						winnerBetTime,
					} = body;

					const entry = await prisma.winnerHistory.upsert({
						where: {
							date: new Date(date),
						},
						update: {
							departureTime,
							winnerUserId,
							winnerName,
							winnerBetTime,
						},
						create: {
							date: new Date(date),
							departureTime,
							winnerUserId,
							winnerName,
							winnerBetTime,
						},
					});

					return json(entry);
				} catch (error) {
					console.error("Error saving winner history:", error);
					return json({ error: "Failed to save history" }, { status: 500 });
				}
			},
		},
	},
});
