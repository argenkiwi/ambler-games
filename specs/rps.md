# Program Specifications

This program is a Rock Paper Scissors game where the user plays against the computer. The program displays the winning rules, accepts user input, compares it to a random computer choice, announces the result, and optionally repeats.

## Shared State

The shared state tracks the game data:

- `choice: number` — The user's numeric choice (1 = Rock, 2 = Paper, 3 = Scissor).
- `choiceName: string` — The human-readable name of the user's choice (`"Rock"`, `"Paper"`, or `"Scissor"`).
- `compChoice: number` — The computer's random numeric choice (1, 2, or 3).
- `compChoiceName: string` — The human-readable name of the computer's choice.
- `result: string` — The outcome winner name (`"Rock"`, `"Paper"`, `"Scissor"`, or `"Draw"` when both pick the same).

## Steps

### Start
- This is the initial step of the application.
- Displays the winning rules of the Rock Paper Scissors game (Rock vs Paper, Rock vs Scissor, Paper vs Scissor, and draw conditions).
- Transitions to `Player Choice`.

### Player Choice
- Prompts the user to enter a number (1 for Rock, 2 for Paper, 3 for Scissor).
- Validates that the input is between 1 and 3. If invalid, prompts again by transitioning back to `Player Choice`.
- Maps the number to its corresponding choice name (`choiceName`).
- Prints the user's selection.
- If valid, transitions to `Computer Choice`.

### Computer Choice
- Generates a random number (1, 2, or 3) for the computer's selection.
- Maps the number to its corresponding choice name (`compChoiceName`).
- Prints the computer's selection.
- Transitions to `Compare`.

### Compare
- Compares `choice` and `compChoice` to determine the result.
- If both choices are equal, sets `result` to `"Draw"`.
- Otherwise applies the winning rules: Paper beats Rock, Rock beats Scissor, Scissor beats Paper.
- If draw, transitions to `Result`.
- If not draw, transitions to `Result`.

### Result
- If the result is a draw, announces the draw.
- Otherwise, compares `result` with `choiceName` to determine if the user or computer won.
- Announces the winner (user or computer).
- Transitions to `Play Again`.

### Play Again
- Asks the user if they want to play again (Y/N).
- If the user enters `Y` or `y`, transitions to `Player Choice` to start a new round.
- If the user enters `N` or `n`, transitions to `Stop`.

### Stop
- Displays a "Thanks for playing" message.
- Terminates the program (transitions to `null`).
