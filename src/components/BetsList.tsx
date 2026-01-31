import type { Bet, Result } from "../types/betting";
import { parseTimeToMinutes } from "../utils/betting";

export const BetsList = ({
	bets,
	userId,
	onEdit,
	canEdit,
	result,
	departureTime,
}: {
	bets: Bet[];
	userId: string;
	onEdit: (betId: string) => void;
	canEdit: boolean;
	result: Result | null;
	departureTime: string | null;
}) => {
	const getBetsWithDifference = (): (Bet & { difference: number })[] => {
		if (!departureTime) {
			return bets.map((bet) => ({ ...bet, difference: 0 }));
		}

		return bets
			.map((bet) => {
				const betMinutes = parseTimeToMinutes(bet.time);
				const departureMinutes = parseTimeToMinutes(departureTime);
				const difference = Math.abs(betMinutes - departureMinutes);
				return { ...bet, difference };
			})
			.sort((a, b) => a.difference - b.difference);
	};

	const sortedBets = getBetsWithDifference();
	const shouldShowWinner = Boolean(result && departureTime);
	const shouldShowDifference = Boolean(departureTime);

	return (
		<div className="mt-8">
			<h2 className="text-white text-2xl font-semibold mb-4">All Bets</h2>
			<div className="space-y-3">
				{bets.length === 0 ? (
					<p className="text-gray-400 text-center py-8">
						No bets placed yet. Be the first!
					</p>
				) : (
					sortedBets.map((bet, index) => {
						const isOwnBet = bet.userId === userId;
						const isWinner = shouldShowWinner && index === 0;
						return (
							<div
								key={bet.id}
								className={`bg-gray-700 rounded-lg p-4 border ${
									isOwnBet ? "border-blue-500" : "border-gray-600"
								} ${isWinner ? "ring-2 ring-yellow-500 ring-inset" : ""}`}
							>
								<div className="flex justify-between items-center">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-1">
											{isWinner && <span className="text-2xl">🏆</span>}
											<span className="text-white font-semibold">
												{bet.name}
											</span>
											{isOwnBet && (
												<span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
													You
												</span>
											)}
											{isWinner && (
												<span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded font-bold">
													WINNER
												</span>
											)}
										</div>
										<div className="flex items-center gap-3">
											<span className="text-gray-300 text-lg">{bet.time}</span>
											{shouldShowDifference && (
												<span className="text-sm text-gray-400">
													({bet.difference} min off)
												</span>
											)}
										</div>
									</div>
									{isOwnBet && canEdit && (
										<button
											type="button"
											onClick={() => onEdit(bet.id)}
											className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors duration-200"
										>
											Edit
										</button>
									)}
									{isOwnBet && !canEdit && (
										<span className="text-sm text-gray-400">🔒 Locked</span>
									)}
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};
