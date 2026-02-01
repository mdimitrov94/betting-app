import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Bet, Result } from "../types/betting";

export function useBets() {
	return useQuery({
		queryKey: ["bets"],
		queryFn: async (): Promise<Bet[]> => {
			const res = await fetch("/api/bets");
			return res.json();
		},
	});
}

export function useResult() {
	return useQuery({
		queryKey: ["result"],
		queryFn: async () => {
			const res = await fetch("/api/result");
			const data = await res.json();
			if (data && !("error" in data)) {
				return {
					actualTime: data.actualTime,
					date: data.date,
				} as Result;
			}
			return null;
		},
	});
}

export function useDepartureTime() {
	return useQuery({
		queryKey: ["departureTime"],
		queryFn: async () => {
			const res = await fetch("/api/departure-time");
			const data = await res.json();
			if (data && !("error" in data)) {
				return data.departureTime ?? null;
			}
			return null;
		},
	});
}

export function useWinnerHistory() {
	return useQuery({
		queryKey: ["winnerHistory"],
		queryFn: async () => {
			const res = await fetch("/api/winner-history");
			const data = await res.json();
			return Array.isArray(data) ? data : [];
		},
	});
}

export function useSiteSettings() {
	return useQuery({
		queryKey: ["site-settings"],
		queryFn: async () => {
			const response = await fetch("/api/site-settings");
			if (!response.ok) throw new Error("Failed to fetch site settings");
			return response.json();
		},
	});
}

export function useSubmitBet(userId: string, onSuccess?: () => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ name, time }: { name: string; time: string }) => {
			const response = await fetch("/api/bets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId,
					name,
					time,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to submit bet");
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["bets"] });
			onSuccess?.();
		},
	});
}

export function useSaveResult(onSuccess?: () => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (actualTime: string) => {
			const response = await fetch("/api/result", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					actualTime,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save arrival time");
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["result"] });
			onSuccess?.();
		},
	});
}

export function useSaveWinnerHistory(onSuccess?: () => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			date,
			departureTime,
			winnerUserId,
			winnerName,
			winnerBetTime,
		}: {
			date: string;
			departureTime: string;
			winnerUserId: string;
			winnerName: string;
			winnerBetTime: string;
		}) => {
			const response = await fetch("/api/winner-history", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					date,
					departureTime,
					winnerUserId,
					winnerName,
					winnerBetTime,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save winner history");
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["winnerHistory"] });
			onSuccess?.();
		},
	});
}

export function useSaveDepartureTime(onSuccess?: () => void) {
	const queryClient = useQueryClient();
	const saveWinnerMutation = useSaveWinnerHistory();

	return useMutation({
		mutationFn: async ({
			departureTime,
			bets,
		}: {
			departureTime: string;
			bets: Bet[];
		}) => {
			const response = await fetch("/api/departure-time", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					departureTime,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save departure time");
			}

			// Calculate winner and save to history
			if (bets && bets.length > 0) {
				const departureMinutes =
					parseInt(departureTime.split(":")[0]) * 60 +
					parseInt(departureTime.split(":")[1]);

				const winner = bets.reduce((closest, bet) => {
					const betMinutes =
						parseInt(bet.time.split(":")[0]) * 60 +
						parseInt(bet.time.split(":")[1]);
					const closestMinutes =
						parseInt(closest.time.split(":")[0]) * 60 +
						parseInt(closest.time.split(":")[1]);

					const betDiff = Math.abs(departureMinutes - betMinutes);
					const closestDiff = Math.abs(departureMinutes - closestMinutes);

					return betDiff < closestDiff ? bet : closest;
				}, bets[0] || {});

				// Save winner to history
				const today = new Date().toISOString().split("T")[0];
				await saveWinnerMutation.mutateAsync({
					date: today,
					departureTime,
					winnerUserId: winner.userId,
					winnerName: winner.name,
					winnerBetTime: winner.time,
				});
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["departureTime"] });
			onSuccess?.();
		},
	});
}
