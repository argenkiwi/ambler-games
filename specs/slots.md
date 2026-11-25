# Slots Walk Specification

A simple command-line slot machine game where players bet points to win based on matching symbols.

## Shared State

```typescript
export interface State {
  balance: number;
  bet: number;
  reels: string[];
  payout: number;
}
```

## Nodes

### 1. `start`
- **Responsibility**: Initialize the game state.
- **Outcome**:
  - `success`: Sets `balance` to 200 and transitions to `getBet`.

### 2. `getBet`
- **Responsibility**: Prompt the player for a bet amount.
- **Input**: Current `balance`.
- **Outcome**:
  - `bet`: Valid bet entered. Transitions to `spin`.
  - `quit`: Player entered 0. Transitions to `end`.
  - `invalid`: Player entered an invalid amount (e.g., > balance). Repeats `getBet`.

### 3. `spin`
- **Responsibility**: Randomly select three symbols and display them with a delay.
- **Outcome**:
  - `success`: Updates `reels` and transitions to `calculate`.

### 4. `calculate`
- **Responsibility**: Determine the payout based on matching symbols.
- **Rules**:
  - 3 identical symbols: 10x Bet.
  - 2 identical symbols: 2x Bet.
  - No matches: 0x Bet.
- **Outcome**:
  - `success`: Updates `balance` (balance - bet + payout) and transitions to `checkBalance`.

### 5. `checkBalance`
- **Responsibility**: Check if the player has enough points to continue.
- **Outcome**:
  - `continue`: `balance > 0`. Transitions to `getBet`.
  - `gameOver`: `balance <= 0`. Transitions to `end`.

### 6. `end`
- **Responsibility**: Display final message and terminate.
- **Outcome**:
  - `null`: Ends the walk.

## Symbols
🍒, 🍋, 🔔, ⭐, 7️⃣, 💎
