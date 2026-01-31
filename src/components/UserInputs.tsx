import { useId, useState } from "react";
import type { Bet } from "../types/betting";
import { timeRegex } from "../utils/betting";

export const UserInputs = ({
	onSubmit,
	onCancel,
	existingBet,
}: {
	onSubmit: (name: string, time: string) => void;
	onCancel: () => void;
	existingBet?: Bet;
}) => {
	const [state, setState] = useState({
		name: existingBet?.name || "",
		time: existingBet?.time || "",
	});
	const [errors, setErrors] = useState({ name: false, time: false });
	const nameId = useId();
	const timeId = useId();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "time" && !/^[0-9:]*$/.test(value)) return;
		setState((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof typeof errors]) {
			setErrors((prev) => ({ ...prev, [name]: false }));
		}
	};

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();

		const newErrors = {
			name: state.name.trim().length === 0,
			time: !timeRegex.test(state.time),
		};

		setErrors(newErrors);

		if (!newErrors.name && !newErrors.time) {
			onSubmit(state.name, state.time);
		}
	};

	return (
		<div className="flex justify-center mt-8">
			<form onSubmit={submit} className="w-full max-w-md">
				<div className="bg-gray-700 rounded-lg p-6 shadow-lg space-y-4">
					<h2 className="text-white text-xl font-semibold mb-4">
						User Information
					</h2>

					<div>
						<label
							htmlFor={nameId}
							className="block text-white text-sm font-medium mb-2"
						>
							Name
						</label>
						<input
							id={nameId}
							type="text"
							value={state.name}
							placeholder="Enter your name"
							name="name"
							onChange={handleChange}
							className={`w-full px-4 py-2 bg-gray-600 text-white rounded-md border ${
								errors.name
									? "border-red-500 focus:ring-red-500"
									: "border-gray-500 focus:ring-blue-500"
							} focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400`}
						/>
						{errors.name && (
							<p className="text-red-400 text-sm mt-1">Name is required</p>
						)}
					</div>

					<div>
						<label
							htmlFor={timeId}
							className="block text-white text-sm font-medium mb-2"
						>
							Time
						</label>
						<input
							id={timeId}
							type="text"
							value={state.time}
							placeholder="HH:MM (e.g., 15:30)"
							name="time"
							onChange={handleChange}
							className={`w-full px-4 py-2 bg-gray-600 text-white rounded-md border ${
								errors.time
									? "border-red-500 focus:ring-red-500"
									: "border-gray-500 focus:ring-blue-500"
							} focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400`}
						/>
						{errors.time && (
							<p className="text-red-400 text-sm mt-1">
								Invalid time format. Use HH:MM (e.g., 15:30)
							</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
					>
						{existingBet ? "Update Bet" : "Submit Bet"}
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
