import { useId, useState } from "react";
import { timeRegex } from "../utils/betting";

export const DepartureTimeModal = ({
	onSubmit,
	onCancel,
	currentDepartureTime,
}: {
	onSubmit: (time: string) => void | Promise<void>;
	onCancel: () => void;
	currentDepartureTime: string | null;
}) => {
	const [time, setTime] = useState(currentDepartureTime || "");
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
						Set Departure Time
					</h2>

					<div>
						<label
							htmlFor={id}
							className="block text-white text-sm font-medium mb-2"
						>
							Departure Time
						</label>
						<input
							id={id}
							type="text"
							placeholder="HH:MM (e.g., 14:00)"
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
									: "border-gray-500 focus:ring-indigo-500"
							} focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400`}
						/>
						{error && (
							<p className="text-red-400 text-sm mt-1">
								Invalid time format. Use HH:MM (e.g., 14:00)
							</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-200"
					>
						{currentDepartureTime ? "Update" : "Set"} Departure Time
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
