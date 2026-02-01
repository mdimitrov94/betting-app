import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { prisma } from "../db";

export const Route = createFileRoute("/api/site-settings")({
	server: {
		handlers: {
			GET: async () => {
				try {
					// Get or create settings
					let settings = await prisma.siteSettings.findUnique({
						where: { id: 1 },
					});

					if (!settings) {
						settings = await prisma.siteSettings.create({
							data: { id: 1, siteDown: false },
						});
					}

					return json(settings);
				} catch (error) {
					console.error("Error fetching site settings:", error);
					return json(
						{ error: "Failed to fetch site settings" },
						{ status: 500 },
					);
				}
			},
			POST: async ({ request }) => {
				try {
					// Toggle siteDown value
					const current = await prisma.siteSettings.findUnique({
						where: { id: 1 },
					});

					const newValue = !(current?.siteDown ?? false);

					const settings = await prisma.siteSettings.upsert({
						where: { id: 1 },
						update: { siteDown: newValue },
						create: { id: 1, siteDown: newValue },
					});

					return json(settings);
				} catch (error) {
					console.error("Error toggling site settings:", error);
					return json(
						{ error: "Failed to toggle site settings" },
						{ status: 500 },
					);
				}
			},
		},
	},
});
