import type { WinnerHistory } from "../types/betting";

export const WinnerHistoryModal = ({
	history,
	onClose,
}: {
	history: WinnerHistory[];
	onClose: () => void;
}) => {
	return (
		<div className="flex justify-center p-6">
			<div className="w-full max-w-3xl">
				<h2 className="text-white text-2xl font-semibold mb-6">
					🏆 Winner History
				</h2>

				{history.length === 0 ? (
					<p className="text-gray-400 text-center py-8">
						No winners recorded yet.
					</p>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left text-gray-300">
							<thead className="text-xs uppercase bg-gray-700 text-gray-200 sticky top-0">
								<tr>
									<th className="px-4 py-3">Date</th>
									<th className="px-4 py-3">Departure Time</th>
									<th className="px-4 py-3">Winner Name</th>
									<th className="px-4 py-3">Winner Bet Time</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-700">
								{history.map((entry, index) => (
									<tr
										key={entry.id}
										className={`${
											index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"
										} hover:bg-gray-700 transition-colors`}
									>
										<td className="px-4 py-3">
											{new Date(entry.date).toLocaleDateString()}
										</td>
										<td className="px-4 py-3">{entry.departureTime}</td>
										<td className="px-4 py-3 font-semibold">
											{entry.winnerName}
										</td>
										<td className="px-4 py-3">
											<span className="bg-gray-600 text-white px-3 py-1 rounded">
												{entry.winnerBetTime}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				<button
					type="button"
					onClick={onClose}
					className="w-full mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
				>
					Close
				</button>
			</div>
		</div>
	);
};
