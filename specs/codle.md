# Program Specifications

This program is a 4-digit code guessing game called **Codle** (CLI wordle). A secret 4-digit code (digits 0-9, repeatable) is generated, and the player has 4 attempts to guess it. After each guess, the player receives colored feedback for each digit position, and the game ends when the code is guessed or attempts run out.

## Shared State

The shared state tracks the game data:

- `code: string` — The secret 4-digit code generated at the start.
- `guesses: string[]` — Array of all previous guesses (each a 4-digit string).
- `colors: string[][]` — Array of color arrays (one per guess), where each inner array contains 4 elements of `"green"`, `"yellow"`, or `"white"`.
- `attempts: number` — Remaining number of guesses (starts at 4, decrements after each valid guess).
- `won: boolean` — Whether the player has successfully guessed the code.

## Steps

### Start (NodeId `"start"`)

- Prints the game's rules and how to play using `print`.
- Unconditionally transitions to `generateCode`.

### Generate Code (NodeId `"generateCode"`)

- Generates a random 4-digit code string (digits 0-9, with repeats allowed).
- Stores it in `code`.
- Transitions to `getGuess`.

### Get Guess (NodeId `"getGuess"`)

- Prompts the player for a 4-digit guess using standard input.
- Validates the input:
  - Must contain exactly 4 characters
  - Must consist only of digits (0-9)
  - Must not be rejected by the reader
  - Must not exceed the maximum length
- On invalid input: prints a message and repeats the prompt, transitioning back to `getGuess`.
- On valid input: stores the guess in `guesses`, decrements `attempts`, and transitions to `colorCode`.

### Color Code (NodeId `"colorCode"`)

- Compares the most recent guess against the secret code.
- For each position `i`, the color is determined by:
  - `"green"`: the digit at position `i` in the guess matches the digit at position `i` in the code.
  - `"yellow"`: the digit at position `i` in the guess exists somewhere in the code (but not at position `i`).
  - `"white"`: the digit at position `i` in the guess does not exist in the code at all.
- Stores the color array in the `colors` array.
- Transitions to `checkWin`.

### Check Win (NodeId `"checkWin"`)

- Checks if the most recent guess matches the secret code.
  - If the guess matches: the game is won. Sets `won` to `true`.
- If the guess does not match and there are remaining attempts: transitions to `displayBoard`.
- Otherwise (no more attempts): the game is lost. Sets `won` to `false`.
- Transitions to `end`.

### Display Board (NodeId `"displayBoard"`)

- Renders a text-based board showing all previous guesses with their corresponding colors.
- Each guess is displayed in a bordered format with colored digits.
- Transitions to `getGuess` for the next round.

### End (NodeId `"end"`)

- If the player won: prints a congratulatory message (colored green).
- If the player lost: prints a loss message and reveals the correct code (colored red).
- Ends the graph.

## Walk

The walk coordinates the flow, managing state transitions between steps:

1. **Start → Generate Code → Get Guess**: Initializes the game and waits for input.
2. **Get Guess → Color Code → Check Win**: Each round colors the guess and checks whether the player has won or run out of attempts.
3. **Check Win (continue) → Display Board → Get Guess**: If the game continues, shows the board and loops for the next guess.
4. **Check Win (win/lose) → End**: Terminates the game and displays the final result.
