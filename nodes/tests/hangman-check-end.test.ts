import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../hangman-check-end.ts";

const edges = { onWon: "WON", onLost: "LOST", onContinue: "CONTINUE" };
const utils: Utils = {};

for (const [why, state, expected] of [
  [
    "every letter is guessed",
    { word: "kiwi", guessed: ["k", "z", "i", "w"], misses: 1, maxMisses: 6 },
    "WON",
  ],
  [
    "every letter is guessed on the last life",
    { word: "kiwi", guessed: ["k", "i", "w"], misses: 5, maxMisses: 6 },
    "WON",
  ],
  [
    "the misses reach the maximum",
    { word: "kiwi", guessed: ["a", "b", "c"], misses: 3, maxMisses: 3 },
    "LOST",
  ],
  [
    "letters are left and lives remain",
    { word: "kiwi", guessed: ["k", "a"], misses: 1, maxMisses: 6 },
    "CONTINUE",
  ],
] as const satisfies readonly (readonly [string, State, string])[]) {
  test(`hangmanCheckEnd takes on${expected[0]}${expected.slice(1).toLowerCase()} when ${why}`, async () => {
    const input: State = { ...state, guessed: [...state.guessed] };

    const [next, newState] = await factory(edges, utils)(input);

    expect(next).toBe(expected);
    expect(newState).toEqual(input);
  });
}
