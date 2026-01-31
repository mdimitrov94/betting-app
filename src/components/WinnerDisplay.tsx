import type { Bet, Result } from "../types/betting";

interface WinnerDisplayProps {
	result: Result;
	bets: Bet[];
	departureTime: string | null;
}

export function WinnerDisplay({
	result,
	bets,
	departureTime,
}: WinnerDisplayProps) {
	if (!departureTime) {
		return null;
	}

	const departureMinutes =
		parseInt(departureTime.split(":")[0]) * 60 +
		parseInt(departureTime.split(":")[1]);
	const actualMinutes =
		parseInt(result.actualTime.split(":")[0]) * 60 +
		parseInt(result.actualTime.split(":")[1]);

	const winner = bets.reduce((closest, bet) => {
		const betMinutes =
			parseInt(bet.time.split(":")[0]) * 60 + parseInt(bet.time.split(":")[1]);
		const closestMinutes =
			parseInt(closest.time.split(":")[0]) * 60 +
			parseInt(closest.time.split(":")[1]);

		const betDiff = Math.abs(departureMinutes - betMinutes);
		const closestDiff = Math.abs(departureMinutes - closestMinutes);

		return betDiff < closestDiff ? bet : closest;
	});

	const winnerDiff = Math.abs(
		departureMinutes -
			(parseInt(winner.time.split(":")[0]) * 60 +
				parseInt(winner.time.split(":")[1])),
	);

	return (
		<div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 rounded-lg p-8 mb-6 shadow-lg border-2 border-yellow-300">
			<div className="text-center">
				<div className="text-6xl mb-6">🎉🏆🎉</div>
				<h2 className="text-4xl font-bold text-gray-900 mb-2">
					🌟 Way to go, {winner.name}! 🌟
				</h2>
				<p className="text-xl text-gray-800 mb-6">
					You're the closest to the departure time!
				</p>

				{/* Three times on one line */}
				<div className="flex gap-4 justify-center mb-6">
					<div className="bg-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-600">
						<p className="text-gray-300 text-xs uppercase font-semibold tracking-wide">
							🛫 Scheduled Departure
						</p>
						<p className="text-3xl font-bold text-white mt-2">
							{departureTime}
						</p>
					</div>

					<div className="bg-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-600">
						<p className="text-gray-300 text-xs uppercase font-semibold tracking-wide">
							🎲 Your Bet Time
						</p>
						<p className="text-3xl font-bold text-yellow-400 mt-2">
							{winner.time}
						</p>
						<p className="text-xs text-yellow-400 font-semibold mt-2">
							{winnerDiff} min off
						</p>
					</div>
				</div>

				<div className="mt-6 text-2xl text-white">
					✨ Congratulations! You won! 🎊
				</div>
			</div>
		</div>
	);
}
