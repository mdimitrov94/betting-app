import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { prisma } from "../db";

export const Route = createFileRoute("/api/bets")({
	server: {
		handlers: {
			GET: async () => {
				try {
					const today = new Date().toISOString().split("T")[0];
					const bets = await prisma.bet.findMany({
						where: {
							date: {
								equals: new Date(today),
							},
						},
						orderBy: {
							createdAt: "asc",
						},
					});

					return json(bets);
				} catch (error) {
					console.error("Error fetching bets:", error);
					return json({ error: "Failed to fetch bets" }, { status: 500 });
				}
			},
			POST: async ({ request }) => {
				try {
					const body = await request.json();
					const { userId, name, time } = body;

					const today = new Date().toISOString().split("T")[0];

					const bet = await prisma.bet.upsert({
						where: {
							userId_date: {
								userId,
								date: new Date(today),
							},
						},
						update: {
							name,
							time,
						},
						create: {
							userId,
							name,
							time,
							date: new Date(today),
						},
					});

					return json(bet);
				} catch (error) {
					console.error("Error creating/updating bet:", error);
					return json({ error: "Failed to save bet" }, { status: 500 });
				}
			},
		},
	},
});
