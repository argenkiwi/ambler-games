/** The built-in secret words, all lower case letters. */
export const WORDS = [
  "ambler",
  "anchor",
  "bridge",
  "canyon",
  "compass",
  "glacier",
  "harbour",
  "journey",
  "lantern",
  "meadow",
  "outpost",
  "paddock",
  "rucksack",
  "summit",
  "tussock",
  "village",
  "weather",
  "whistle",
] as const;

/** The gallows, from no misses to the full figure (head, body, two arms, two legs). */
const STAGES = [
  [
    "  +---+",
    "  |   |",
    "      |",
    "      |",
    "      |",
    "      |",
    "=========",
  ],
  [
    "  +---+",
    "  |   |",
    "  O   |",
    "      |",
    "      |",
    "      |",
    "=========",
  ],
  [
    "  +---+",
    "  |   |",
    "  O   |",
    "  |   |",
    "      |",
    "      |",
    "=========",
  ],
  [
    "  +---+",
    "  |   |",
    "  O   |",
    " /|   |",
    "      |",
    "      |",
    "=========",
  ],
  [
    "  +---+",
    "  |   |",
    "  O   |",
    " /|\\  |",
    "      |",
    "      |",
    "=========",
  ],
  [
    "  +---+",
    "  |   |",
    "  O   |",
    " /|\\  |",
    " /    |",
    "      |",
    "=========",
  ],
  [
    "  +---+",
    "  |   |",
    "  O   |",
    " /|\\  |",
    " / \\  |",
    "      |",
    "=========",
  ],
].map((lines) => lines.join("\n"));

/**
 * Draws the gallows for a number of misses.
 *
 * @param misses The wrong guesses so far; anything past six shows the full figure.
 * @returns The gallows as several lines of text.
 */
export function gallows(misses: number): string {
  return STAGES[Math.max(0, Math.min(misses, STAGES.length - 1))] as string;
}

/**
 * Shows a word with the letters not yet guessed as underscores.
 *
 * @param word The secret word, in lower case.
 * @param guessed The letters guessed so far, in lower case.
 * @returns The letters spaced out in upper case, such as `A _ _ L _ R`.
 */
export function maskWord(word: string, guessed: readonly string[]): string {
  return [...word]
    .map((letter) => (guessed.includes(letter) ? letter.toUpperCase() : "_"))
    .join(" ");
}

/**
 * Tells whether every letter of a word has been guessed.
 *
 * @param word The secret word, in lower case.
 * @param guessed The letters guessed so far, in lower case.
 * @returns `true` when no letter of the word is left to guess.
 */
export function isSolved(word: string, guessed: readonly string[]): boolean {
  return [...word].every((letter) => guessed.includes(letter));
}
