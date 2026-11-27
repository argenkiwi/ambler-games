import { expect, test } from "bun:test";
import { gallows } from "../../utils/hangman.ts";
import { factory, type State, type Utils } from "../hangman-show-board.ts";

function recorder() {
  const printed: string[] = [];
  const utils: Utils = { print: (msg) => printed.push(msg) };
  return { printed, utils };
}

test("hangmanShowBoard takes onReady after printing a fresh board", async () => {
  const { printed, utils } = recorder();
  const state: State = { word: "tui", guessed: [], misses: 0, maxMisses: 6 };

  const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

  expect(next).toBe("NEXT");
  expect(newState).toEqual(state);
  expect(printed).toEqual([
    gallows(0),
    "Word: _ _ _",
    "Guessed: (none)",
    "Lives: 6",
  ]);
});

test("hangmanShowBoard takes onReady after printing a board part way through", async () => {
  const { printed, utils } = recorder();
  const state: State = {
    word: "kiwi",
    guessed: ["i", "z", "e"],
    misses: 2,
    maxMisses: 6,
  };

  const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

  expect(next).toBe("NEXT");
  expect(newState).toEqual(state);
  expect(printed).toEqual([
    gallows(2),
    "Word: _ I _ I",
    "Guessed: I, Z, E",
    "Lives: 4",
  ]);
});
