import { expect, test } from "bun:test";
import { WORDS } from "../../utils/hangman.ts";
import { factory, type State, type Utils } from "../hangman-pick-word.ts";

for (const [random, index] of [
  [0, 0],
  [0.5, Math.floor(0.5 * WORDS.length)],
  [0.999, WORDS.length - 1],
] as const) {
  test(`hangmanPickWord takes onReady with word ${index} when random is ${random}`, async () => {
    const utils: Utils = { random: () => random };
    const state: State = { word: "old", guessed: ["a", "b"], misses: 3 };

    const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

    expect(next).toBe("NEXT");
    expect(newState).toEqual({ word: WORDS[index], guessed: [], misses: 0 });
    expect(state).toEqual({ word: "old", guessed: ["a", "b"], misses: 3 });
  });
}

test("hangmanPickWord only offers lower case words", () => {
  for (const word of WORDS) expect(word).toMatch(/^[a-z]+$/);
});
