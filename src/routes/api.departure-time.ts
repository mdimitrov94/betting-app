import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { prisma } from "../db";

export const Route = createFileRoute("/api/departure-time")({
	server: {
		handlers: {
			GET: async () => {
				try {
					const today = new Date().toISOString().split("T")[0];
					const departure = await prisma.departureTime.findUnique({
						where: {
							date: new Date(today),
						},
					})

					return json(departure);
				} catch (error) {
					console.error("Error fetching departure time:", error);
					return json(
						{ error: "Failed to fetch departure time" },
						{ status: 500 },
					)
				}
			},
			POST: async ({ request }) => {
				try {
					const body = await request.json();
					const { departureTime } = body;

					const today = new Date().toISOString().split("T")[0];
					const result = await prisma.departureTime.upsert({
						where: {
							date: new Date(today),
						},
						update: {
							departureTime,
						},
						create: {
							date: new Date(today),
							departureTime,
						},
					})

					return json(result);
				} catch (error) {
					console.error("Error saving departure time:", error);
					return json(
						{ error: "Failed to save departure time" },
						{ status: 500 },
					)
				}
			},
		},
	},
});
