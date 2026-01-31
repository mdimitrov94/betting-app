import { useId, useState } from "react";
import { timeRegex } from "../utils/betting";

export const EditArrivalTimeModal = ({
	onSubmit,
	onCancel,
	currentArrivalTime,
}: {
	onSubmit: (time: string) => void | Promise<void>;
	onCancel: () => void;
	currentArrivalTime: string;
}) => {
	const [time, setTime] = useState(currentArrivalTime);
	const [error, setError] = useState(false);
	const id = useId();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!timeRegex.test(time)) {
			setError(true);
			return;
		}
		void onSubmit(time);
	};

	return (
		<div className="flex justify-center p-6">
			<form onSubmit={handleSubmit} className="w-full max-w-md">
				<div className="space-y-4">
					<h2 className="text-white text-2xl font-semibold">
						Edit Arrival Time
					</h2>

					<div>
						<label
							htmlFor={id}
							className="block text-white text-sm font-medium mb-2"
						>
							Actual Arrival Time
						</label>
						<input
							id={id}
							type="text"
							placeholder="HH:MM (e.g., 14:28)"
							value={time}
							onChange={(e) => {
								const newValue = e.target.value;
								if (/^[0-9:]*$/.test(newValue)) {
									setTime(newValue);
									setError(false);
								}
							}}
							className={`w-full px-4 py-2 bg-gray-600 text-white rounded-md border ${
								error
									? "border-red-500 focus:ring-red-500"
									: "border-gray-500 focus:ring-yellow-500"
							} focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400`}
						/>
						{error && (
							<p className="text-red-400 text-sm mt-1">
								Invalid time format. Use HH:MM (e.g., 14:28)
							</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-md transition-colors duration-200"
					>
						Update Arrival Time
					</button>
					<button
						type="button"
						onClick={onCancel}
						className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-md transition-colors duration-200"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};
