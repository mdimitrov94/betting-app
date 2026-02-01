export const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

// Utility to get or create user ID
export const getUserId = (): string => {
	// Check if we're in the browser (not SSR)
	if (typeof window === "undefined") {
		return ""; // Return empty string during SSR
	}
	
	let userId = localStorage.getItem("userId");
	if (!userId) {
		userId = `user_${Math.random().toString(36).substring(2, 15)}`;
		localStorage.setItem("userId", userId);
	}
	return userId;
};

// Check if current time is before 12:00 PM
export const canEditBets = (): boolean => {
	const now = new Date();
	const currentHour = now.getHours();
	return currentHour < 16;
};

// Parse time string to minutes
export const parseTimeToMinutes = (time: string): number => {
	const [hours, minutes] = time.split(":").map(Number);
	return hours * 60 + minutes;
};
