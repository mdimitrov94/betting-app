import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { prisma } from "../db";

export const Route = createFileRoute("/api/result")({
	server: {
		handlers: {
			GET: async () => {
				try {
					const today = new Date().toISOString().split("T")[0];
					const result = await prisma.dailyResult.findUnique({
						where: {
							date: new Date(today),
						},
					});

					return json(result);
				} catch (error) {
					console.error("Error fetching result:", error);
					return json({ error: "Failed to fetch result" }, { status: 500 });
				}
			},
			POST: async ({ request }) => {
				try {
					const body = await request.json();
					console.log(body);
					const { actualTime } = body;

					const today = new Date().toISOString().split("T")[0];
					const result = await prisma.dailyResult.upsert({
						where: {
							date: new Date(today),
						},
						update: {
							actualTime,
						},
						create: {
							date: new Date(today),
							actualTime,
						},
					});

					return json(result);
				} catch (error) {
					console.error("Error saving result:", error);
					return json({ error: "Failed to save result" }, { status: 500 });
				}
			},
		},
	},
});
