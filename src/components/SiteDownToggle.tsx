import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function SiteDownToggle() {
	const queryClient = useQueryClient();

	const { data: settings } = useQuery({
		queryKey: ["site-settings"],
		queryFn: async () => {
			const response = await fetch("/api/site-settings");
			if (!response.ok) throw new Error("Failed to fetch site settings");
			return response.json();
		},
	});

	const toggleMutation = useMutation({
		mutationFn: async () => {
			const response = await fetch("/api/site-settings", {
				method: "POST",
			});
			if (!response.ok) throw new Error("Failed to toggle site settings");
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["site-settings"] });
		},
	});

	const isDown = settings?.siteDown ?? false;

	return (
		<button
			type="button"
			onClick={() => toggleMutation.mutate()}
			disabled={toggleMutation.isPending}
			className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center font-bold text-white ${
				isDown ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
			} ${toggleMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
			title={
				isDown
					? "Site is DOWN - Click to turn ON"
					: "Site is UP - Click to turn DOWN"
			}
		>
			{isDown ? "OFF" : "ON"}
		</button>
	);
}
