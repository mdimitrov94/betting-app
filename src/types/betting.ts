export type Bet = {
	id: string;
	userId: string;
	name: string;
	time: string;
	createdAt: string;
};

export type Result = {
	actualTime: string;
	date: string;
};

export type WinnerHistory = {
	id: string;
	date: string;
	departureTime: string;
	actualTime: string;
	winnerName: string;
	winnerBetTime: string;
};
