# Program Specifications

A terminal game of hangman: the program picks a secret word and the player guesses it one letter at a time, losing a life for each wrong letter. The player wins by revealing every letter before running out of lives, and may then play another round.

## Nodes

### Pick Word
- Initial node of the application, and the start of every round.
- Picks a secret word at random from a built-in word list, clears the guessed letters and resets the misses to zero.
- It always transitions to `SHOW_BOARD`.

### Show Board
- Prints the gallows for the current number of misses, the secret word with unguessed letters shown as underscores, the letters guessed so far and the lives remaining.
- It always transitions to `READ_GUESS`.

### Read Guess
- Asks the player for a letter and reads one line of input. Upper and lower case count as the same letter.
- If the input is not a single letter from A to Z, it says so and transitions to `READ_GUESS`.
- If the letter has already been guessed, it says so and transitions to `READ_GUESS`.
- Otherwise it stores the letter as the current guess and transitions to `APPLY_GUESS`.
- If input cannot be read, or has ended, the walk stops with an error.

### Apply Guess
- Adds the current guess to the guessed letters.
- If the letter is in the secret word, it tells the player so and transitions to `CHECK_END`.
- If it is not, it adds one to the misses, tells the player so and transitions to `CHECK_END`.

### Check End
- Decides whether the round is over.
- If every letter of the secret word has been guessed, it transitions to `GAME_OVER` as a win.
- If the misses have reached the maximum allowed, it transitions to `GAME_OVER` as a loss.
- Otherwise it transitions to `SHOW_BOARD`.

### Game Over
- Prints the final gallows and the secret word in full, then announces whether the player won or lost.
- It always transitions to `PLAY_AGAIN`.

### Play Again
- Asks the player whether to play another round, accepting yes or no (or y or n, in any case).
- If the answer is yes, it transitions to `PICK_WORD`.
- If the answer is no, it transitions to `GOODBYE`.
- If the answer is neither, it asks again by transitioning to `PLAY_AGAIN`.
- If input cannot be read, or has ended, the walk stops with an error.

### Goodbye
- Thanks the player and terminates the walk.

## Shared State

The shared state consists of:
- `word`: the secret word for the current round, in lower case.
- `guessed`: the letters guessed so far in the current round.
- `guess`: the letter most recently entered by the player.
- `misses`: the number of wrong guesses in the current round.
- `max_misses`: the number of wrong guesses that ends the round in a loss, six by default (head, body, two arms, two legs).
