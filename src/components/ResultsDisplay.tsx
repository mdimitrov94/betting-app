import type { Bet, Result } from "../types/betting";

export const ResultsDisplay = ({
	result,
	bets,
	departureTime,
	onEditArrival,
}: {
	result: Result;
	bets: Bet[];
	departureTime: string | null;
	onEditArrival: () => void;
}) => {
	return (
		<div className="bg-gray-700 border border-gray-600 rounded-lg p-6 mb-6">
			<div className="text-center">
				<p className="text-gray-300 mb-4">
					Actual arrival time for {new Date(result.date).toLocaleDateString()}
				</p>
				<div className="bg-gray-800 rounded-lg p-4 inline-block mb-4 border border-gray-600">
					<span className="text-white text-5xl font-bold">
						{result.actualTime}
					</span>
				</div>
				<div>
					<button
						type="button"
						onClick={onEditArrival}
						className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
					>
						Edit Arrival Time
					</button>
				</div>
				<p className="text-gray-300 mt-4 text-sm">
					{bets.length} bet{bets.length !== 1 ? "s" : ""} placed
				</p>
			</div>
		</div>
	);
};
