import { useId, useState } from "react";
import { timeRegex } from "../utils/betting";

export const ArrivalTime = ({
	onSubmit,
	departureTime,
}: {
	onSubmit: (time: string) => Promise<void>;
	departureTime: string | null;
}) => {
	const [value, setValue] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const id = useId();

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();

		if (!timeRegex.test(value)) {
			setError("Wrong format. Use HH:MM (e.g., 15:30)");
			return;
		}

		setError(null);
		setIsLoading(true);
		try {
			await onSubmit(value);
			setValue("");
		} catch (err) {
			console.error("Error submitting arrival time:", err);
			setError("Failed to save arrival time. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex justify-center mt-8">
			<form onSubmit={submit} className="w-full max-w-md">
				<div className="bg-gray-700 rounded-lg p-6 shadow-lg">
					<label
						htmlFor={id}
						className="block text-white text-sm font-medium mb-2"
					>
						Arrival Time ✈️
					</label>
					<input
						id={id}
						placeholder="example 15:30"
						value={value}
						onChange={(e) => {
							const newValue = e.target.value;
							if (/^[0-9:]*$/.test(newValue)) {
								setValue(newValue);
								setError(null);
							}
						}}
						className="w-full px-4 py-2 bg-gray-600 text-white rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
					/>
					{error && <p className="text-red-400 text-sm mt-2">{error}</p>}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 disabled:opacity-50"
					>
						{isLoading ? "Submitting..." : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
};
