# Program Specifications

A Rock Paper Scissors game against the computer. It shows the rules, reads the player's choice, compares it with a random computer choice, announces the winner and offers another round.

## Nodes

### Rps Start
- Initial node of the application.
- Prints the rules: Paper beats Rock, Rock beats Scissor, Scissor beats Paper, and the same choice is a draw.
- Transitions to `RPS_PLAYER_CHOICE`.

### Rps Player Choice
- Asks the player for a number: 1 for Rock, 2 for Paper, 3 for Scissor.
- If the number is valid, it records the choice and its name, prints it and transitions to `RPS_COMPUTER_CHOICE`.
- If the input is anything else, it prints an error and transitions back to `RPS_PLAYER_CHOICE`.
- If input has ended, it transitions to `STOP`.

### Rps Computer Choice
- Picks Rock, Paper or Scissor at random for the computer, records it and prints it.
- Transitions to `RPS_COMPARE`.

### Rps Compare
- Records the winning choice by the rules, or a draw when both choices are the same.
- Transitions to `RPS_RESULT`.

### Rps Result
- Announces a draw, the player's win (and what their choice beat) or the computer's win.
- Transitions to `PLAY_AGAIN`.

### Play Again
- Asks the player whether to play again.
- If the answer is yes (`Y` or `y`), it transitions to `RPS_PLAYER_CHOICE`.
- On any other answer, or when input has ended, it transitions to `STOP`.

### Stop
- Thanks the player and terminates.

## Shared State

The shared state consists of:
- `choice`: the player's choice as a number, 1 to 3.
- `choiceName`: the name of the player's choice.
- `compChoice`: the computer's choice as a number, 1 to 3.
- `compChoiceName`: the name of the computer's choice.
- `result`: the name of the winning choice, or `Draw`.
