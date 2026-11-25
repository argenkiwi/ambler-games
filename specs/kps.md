# Program Specifications

Knight-Paper-Scissors: a fighting take on Rock Paper Scissors against the computer, with six moves and health. Each exchange of moves can cost either fighter health; the first to reach zero loses.

## Nodes

### Kps Start
- Initial node of the application, and where a new game begins.
- Prints a welcome, the starting health and the six moves: kick, punch, sweep, crouch, block and jump.
- Gives both fighters 10 health.
- Transitions to `KPS_PLAYER_CHOICE`.

### Kps Player Choice
- Prints both fighters' health and asks for a move by its first letter (k, p, s, c, b or j, in either case).
- If the letter names a move, it records the move and transitions to `KPS_COMPUTER_CHOICE`.
- If it does not, it prints an error and transitions back to `KPS_PLAYER_CHOICE`.
- If input has ended, it transitions to `STOP`.

### Kps Computer Choice
- Picks one of the six moves at random for the CPU.
- Transitions to `KPS_COMPARE`.

### Kps Compare
- Looks up how the player's move fares against the CPU's: Win, Lose, Trade, Chip, Ouch, Dodge, Miss or Draw.
- Applies its health changes. A win costs the CPU 2 and a loss costs the player 2; a trade costs both 1; a chip costs the CPU 1 and an ouch the player 1; a dodge gives the player 1 and a miss gives the CPU 1; a draw changes nothing.
- Prints both moves and the outcome.
- Transitions to `KPS_RESULT`.
- It stops the program with an error if either move has not been chosen.

### Kps Result
- While both fighters have health left, it transitions to `KPS_PLAYER_CHOICE`.
- Otherwise it prints the final score and the verdict (victory, defeat, or a double KO draw), and transitions to `PLAY_AGAIN`.

### Play Again
- Asks the player whether to play again.
- If the answer is yes (`Y` or `y`), it transitions to `KPS_START`.
- On any other answer, or when input has ended, it transitions to `STOP`.

### Stop
- Thanks the player and terminates.

## Shared State

The shared state consists of:
- `playerHealth`: the player's health.
- `cpuHealth`: the CPU's health.
- `playerMove`: the player's latest move, once chosen.
- `cpuMove`: the CPU's latest move, once chosen.
- `outcome`: how the latest exchange went for the player.
