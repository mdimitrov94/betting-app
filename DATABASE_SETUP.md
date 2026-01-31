# Database Setup Summary

## Prisma Schema Models Created

### 1. **Bet Model**

- Stores daily bets for each user
- Fields:
  - `id`: Unique identifier (CUID)
  - `userId`: User identifier
  - `name`: User's name
  - `time`: Bet time (HH:MM format)
  - `date`: Date of the bet
  - `createdAt`: Timestamp of creation
- Unique constraint: `userId` + `date` (one bet per user per day)
- Indexed on `date` for fast queries

### 2. **DailyResult Model**

- Stores the actual arrival time for each day
- Fields:
  - `id`: Unique identifier (CUID)
  - `date`: Date (unique)
  - `actualTime`: Actual arrival time (HH:MM format)
  - `updatedAt`: Last update timestamp
- One result per day

### 3. **WinnerHistory Model**

- Stores historical winners
- Fields:
  - `id`: Unique identifier (CUID)
  - `date`: Date of the bet (unique)
  - `departureTime`: Scheduled departure time
  - `winnerUserId`: ID of the winning user
  - `winnerName`: Name of the winner
  - `winnerBetTime`: The winning bet time
  - `createdAt`: Timestamp of creation

## API Routes Created

### 1. `/api/bets` (GET/POST)

- **GET**: Fetches all bets for today
- **POST**: Creates or updates a bet for the user
- Data persists across page refreshes

### 2. `/api/result` (GET/POST)

- **GET**: Fetches today's result (actual arrival time)
- **POST**: Updates today's actual arrival time
- Data persists across page refreshes

### 3. `/api/winner-history` (GET/POST)

- **GET**: Fetches all historical winners sorted by date (newest first)
- **POST**: Saves a new winner to history
- Data persists across page refreshes

## Frontend Integration

Updated the React component to:

1. Fetch initial data from APIs on component mount
2. Call `/api/bets` when submitting a new bet
3. Call `/api/result` when updating arrival time
4. Display fetched winner history instead of mock data
5. All data persists on page refresh

## Next Steps

To use this setup:

1. Run `npm run db:push` or `npx prisma db push` to sync schema to database
2. Make sure `DATABASE_URL` environment variable is set in `.env`
3. The app will automatically persist all data to PostgreSQL
