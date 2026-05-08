# KPS (Knight-Paper-Scissors) Walk Specification

A combat-based variation of Rock-Paper-Scissors with health and six move options.

## Shared State

```typescript
export type Move = 'kick' | 'punch' | 'sweep' | 'crouch' | 'block' | 'jump';
export type Outcome = 'Win' | 'Lose' | 'Trade' | 'Chip' | 'Ouch' | 'Dodge' | 'Miss' | 'Draw';

export interface State {
  playerHealth: number;
  cpuHealth: number;
  playerMove?: Move;
  cpuMove?: Move;
  outcome?: Outcome;
}
```

## Steps (Nodes)

### 1. start
- **Responsibility**: Initialize the game state.
- **Outcomes**:
    - `onReady` -> `playerChoice`
- **Side Effects**: Prints "Welcome to Knight-Paper-Scissors!". Sets health to 10 for both.

### 2. playerChoice
- **Responsibility**: Prompt the player for their move.
- **Outcomes**:
    - `onSuccess` -> `computerChoice`
    - `onError` -> `playerChoice` (loop on invalid input)
- **Side Effects**: Prints current health. Asks for input (k, p, s, c, b, j).

### 3. computerChoice
- **Responsibility**: Randomly select a move for the CPU.
- **Outcomes**:
    - `onSuccess` -> `compare`
- **Side Effects**: None.

### 4. compare
- **Responsibility**: Compare moves, determine outcome, and update health.
- **Outcomes**:
    - `onSuccess` -> `result`
- **Side Effects**: Prints both moves and the turn outcome.

### 5. result
- **Responsibility**: Check if the game has ended (health <= 0).
- **Outcomes**:
    - `continue` -> `playerChoice` (if both health > 0)
    - `end` -> `playAgain` (if either health <= 0)
- **Side Effects**: If ended, prints the winner or if it was a draw.

### 6. playAgain
- **Responsibility**: Ask the player if they want to play another round.
- **Outcomes**:
    - `yes` -> `start`
    - `no` -> `stop`
- **Side Effects**: Asks for (y/n) input.

### 7. stop
- **Responsibility**: Terminate the walk.
- **Outcomes**:
    - `null` (ends walk)
- **Side Effects**: Prints "Thanks for playing!".
