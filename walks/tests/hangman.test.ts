import { expect, test } from "bun:test";
import { WalkError, walk } from "../../ambler.ts";
import { WORDS } from "../../utils/hangman.ts";
import { createWalk, type State, type WalkUtils } from "../hangman.ts";

const initial: State = {
  word: "",
  guessed: [],
  guess: "",
  misses: 0,
  maxMisses: 6,
};

/** Plays back `inputs` (`null` for end of input); every round picks `WORDS[index]`. */
function script(inputs: (string | null)[], index = 0) {
  const printed: string[] = [];
  const print = (msg: string) => printed.push(msg);
  const readLine = () => {
    if (inputs.length === 0) throw new Error("script ran out of input");
    return inputs.shift() ?? null;
  };
  const utils: WalkUtils = {
    hangmanPickWord: { random: () => index / WORDS.length },
    hangmanShowBoard: { print },
    hangmanReadGuess: { print, readLine },
    hangmanApplyGuess: { print },
    hangmanGameOver: { print },
    hangmanPlayAgain: { print, readLine },
    stop: { print },
  };
  return { utils, printed };
}

const word = WORDS[0];
const letters = [...new Set(word)];
const wrong = [..."qxzjvy"].filter((letter) => !word.includes(letter));

test("hangman wins a round after retrying bad and repeated guesses, then says goodbye", async () => {
  const first = letters[0] as string;
  const { utils, printed } = script([
    "12",
    first,
    first.toUpperCase(),
    ...letters.slice(1),
    "no",
  ]);

  const final = await walk(createWalk(utils), "PICK_WORD", initial);

  expect(final.word).toBe(word);
  expect(final.misses).toBe(0);
  expect(printed).toContain("Please enter a single letter from A to Z.");
  expect(printed).toContain(`You have already guessed ${first.toUpperCase()}.`);
  expect(printed.slice(-3)).toEqual([
    `The word was ${word.toUpperCase()}.`,
    "You win!",
    "Thanks for playing!",
  ]);
});

test("hangman loses a round on the sixth miss, asks again on an unclear answer, and plays another", async () => {
  expect(wrong.length).toBeGreaterThanOrEqual(6);
  const { utils, printed } = script([
    ...wrong.slice(0, 6),
    "maybe",
    "y",
    ...letters,
    "n",
  ]);

  const final = await walk(createWalk(utils), "PICK_WORD", initial);

  expect(printed.filter((line) => line === "You lose!")).toHaveLength(1);
  expect(printed).toContain("Please answer yes or no.");
  expect(printed.filter((line) => line === "You win!")).toHaveLength(1);
  expect(printed.indexOf("You lose!")).toBeLessThan(
    printed.indexOf("You win!"),
  );
  expect(final.misses).toBe(0);
  expect(printed.at(-1)).toBe("Thanks for playing!");
});

test("hangman stops with an error when input ends during a guess", async () => {
  const { utils } = script([null]);

  expect(
    async () => await walk(createWalk(utils), "PICK_WORD", initial),
  ).toThrow(WalkError);
});

test("hangman stops with an error when input ends at play again", async () => {
  const { utils } = script([...letters, null]);

  expect(
    async () => await walk(createWalk(utils), "PICK_WORD", initial),
  ).toThrow(WalkError);
});
