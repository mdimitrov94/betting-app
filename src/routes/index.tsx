import { createFileRoute } from "@tanstack/react-router";
import downMobile from "public/down-mobile.png";
import down from "public/down2.png";
import { useState } from "react";
import { SiteDownToggle } from "@/components/SiteDownToggle";
import { WinnerDisplay } from "@/components/WinnerDisplay";
import { ArrivalTime } from "../components/ArrivalTime";
import { BetsList } from "../components/BetsList";
import { DepartureTimeModal } from "../components/DepartureTimeModal";
import { EditArrivalTimeModal } from "../components/EditArrivalTimeModal";
import { Loader } from "../components/Loader";
import { Modal } from "../components/Modal";
import { ResultsDisplay } from "../components/ResultsDisplay";
import { UserInputs } from "../components/UserInputs";
import { WinnerHistoryModal } from "../components/WinnerHistoryModal";
import {
	useBets,
	useDepartureTime,
	useResult,
	useSaveDepartureTime,
	useSaveResult,
	useSiteSettings,
	useSubmitBet,
	useWinnerHistory,
} from "../hooks/useBettingQueries";
import type { Bet } from "../types/betting";
import { canEditBets, getUserId } from "../utils/betting";
export const Route = createFileRoute("/")({ component: App });

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDepartureModalOpen, setIsDepartureModalOpen] = useState(false);
	const [isEditArrivalModalOpen, setIsEditArrivalModalOpen] = useState(false);
	const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
	const [userId] = useState(getUserId());
	const [isAdmin] = useState(localStorage.getItem("admin"));
	const [editingBetId, setEditingBetId] = useState<string | null>(null);

	// Use custom hooks for data fetching
	const { data: bets = [] as Bet[], isLoading: isBetsLoading } = useBets();
	const { data: result = null, isLoading: isResultLoading } = useResult();
	const { data: departureTime = null, isLoading: isDepartureTimeLoading } =
		useDepartureTime();
	const { data: winnerHistory = [], isLoading: isWinnerHistoryLoading } =
		useWinnerHistory();
	const { data: siteSettings } = useSiteSettings();
	// Extract siteDown value
	const siteRunning = siteSettings?.siteDown ?? false;
	// Mutations
	const submitBetMutation = useSubmitBet(userId, () => {
		setIsModalOpen(false);
		setEditingBetId(null);
	});

	const saveResultMutation = useSaveResult();

	const saveDepartureTimeMutation = useSaveDepartureTime(() => {
		setIsDepartureModalOpen(false);
	});

	// Check if any mutation is in progress
	const isMutating =
		submitBetMutation.isPending ||
		saveResultMutation.isPending ||
		saveDepartureTimeMutation.isPending;
	// Check if any data is loading
	const isDataLoading =
		isBetsLoading ||
		isResultLoading ||
		isWinnerHistoryLoading ||
		isDepartureTimeLoading;

	const handleSubmitBet = async (name: string, time: string) => {
		await submitBetMutation.mutateAsync({ name, time });
	};

	const handleEditBet = (betId: string) => {
		if (canEditBets()) {
			setEditingBetId(betId);
			setIsModalOpen(true);
		}
	};

	if (!siteRunning) {
		return (
			<>
				<div
					className="fixed inset-0 w-full h-full bg-contain bg-center bg-no-repeat sm:hidden"
					style={{ backgroundImage: `url(${downMobile})` }}
				/>
				<div
					className="hidden sm:block fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
					style={{ backgroundImage: `url(${down})` }}
				/>
				{isAdmin && <SiteDownToggle />}
			</>
		);
	}
	return (
		<div className="bg-gray-800 min-h-screen pb-8">
			<button
				type="button"
				onClick={() => localStorage.setItem("admin", "true")}
			>
				click
			</button>
			{(isMutating || isDataLoading) && <Loader />}
			{isAdmin && <SiteDownToggle />}
			<div className="flex justify-center text-white p-8 text-5xl font-bold">
				<span className="mr-3">🎰</span>
				<span>Betting Departure</span>
				<span className="ml-3">🎰</span>
			</div>

			{!result ? (
				<div className="flex flex-col items-center">
					<ArrivalTime
						onSubmit={async (time) => {
							await saveResultMutation.mutateAsync(time);
						}}
						departureTime={departureTime}
					/>
				</div>
			) : (
				<div className="max-w-4xl mx-auto px-4">
					{/* Buttons Row */}
					<div className="bg-gray-700 border border-gray-600 rounded-lg p-3 mb-6">
						<div className="flex gap-3 justify-end">
							<button
								type="button"
								onClick={() => setIsHistoryModalOpen(true)}
								className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
							>
								📜 Winner History
							</button>
							<button
								type="button"
								onClick={() => setIsDepartureModalOpen(true)}
								className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
							>
								{departureTime ? "Change" : "Set"} Departure Time
							</button>
						</div>
					</div>

					{/* Info message */}

					{departureTime ? (
						<WinnerDisplay
							result={result}
							bets={bets}
							departureTime={departureTime}
						/>
					) : (
						<>
							<div className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-4 mb-6">
								<p className="text-sm">
									📌 You can place or edit your bet until{" "}
									<strong>12:00 PM</strong>. After that, all bets are locked.
								</p>
							</div>
							<ResultsDisplay
								result={result}
								bets={bets}
								departureTime={departureTime}
								onEditArrival={() => setIsEditArrivalModalOpen(true)}
							/>
						</>
					)}

					{!departureTime &&
						!bets.some((bet) => bet.userId === userId) &&
						(canEditBets() ? (
							<button
								type="button"
								onClick={() => setIsModalOpen(true)}
								className="w-full max-w-md mx-auto block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 mt-6"
							>
								Add Your Bet
							</button>
						) : (
							<div className="w-full max-w-md mx-auto block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg text-center mt-6">
								🔒 Bets are closed
							</div>
						))}
					<BetsList
						bets={bets}
						userId={userId}
						onEdit={handleEditBet}
						canEdit={canEditBets()}
						result={result}
						departureTime={departureTime}
					/>
				</div>
			)}

			{isModalOpen && (
				<Modal onClose={() => setIsModalOpen(false)}>
					<UserInputs
						onSubmit={handleSubmitBet}
						onCancel={() => setIsModalOpen(false)}
						existingBet={
							editingBetId
								? bets.find((bet) => bet.id === editingBetId)
								: bets.find((bet) => bet.userId === userId)
						}
					/>
				</Modal>
			)}

			{isDepartureModalOpen && (
				<Modal onClose={() => setIsDepartureModalOpen(false)}>
					<DepartureTimeModal
						onSubmit={async (time) => {
							await saveDepartureTimeMutation.mutateAsync({
								departureTime: time,
								actualTime: result?.actualTime || "",
								bets,
							});
						}}
						onCancel={() => setIsDepartureModalOpen(false)}
						currentDepartureTime={departureTime}
					/>
				</Modal>
			)}

			{isEditArrivalModalOpen && result && (
				<Modal onClose={() => setIsEditArrivalModalOpen(false)}>
					<EditArrivalTimeModal
						onSubmit={async (time) => {
							await saveResultMutation.mutateAsync(time);
							setIsEditArrivalModalOpen(false);
						}}
						onCancel={() => setIsEditArrivalModalOpen(false)}
						currentArrivalTime={result.actualTime}
					/>
				</Modal>
			)}

			{isHistoryModalOpen && (
				<Modal onClose={() => setIsHistoryModalOpen(false)}>
					<WinnerHistoryModal
						history={winnerHistory}
						onClose={() => setIsHistoryModalOpen(false)}
					/>
				</Modal>
			)}
		</div>
	);
}
