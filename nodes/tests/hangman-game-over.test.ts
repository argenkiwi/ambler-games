import { expect, test } from "bun:test";
import { gallows } from "../../utils/hangman.ts";
import { factory, type State, type Utils } from "../hangman-game-over.ts";

function recorder() {
  const printed: string[] = [];
  const utils: Utils = { print: (msg) => printed.push(msg) };
  return { printed, utils };
}

test("hangmanGameOver takes onReady after announcing a win", async () => {
  const { printed, utils } = recorder();
  const state: State = {
    word: "kiwi",
    guessed: ["k", "e", "i", "w"],
    misses: 1,
  };

  const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

  expect(next).toBe("NEXT");
  expect(newState).toEqual(state);
  expect(printed).toEqual([gallows(1), "The word was KIWI.", "You win!"]);
});

test("hangmanGameOver takes onReady after announcing a loss", async () => {
  const { printed, utils } = recorder();
  const state: State = { word: "kiwi", guessed: ["k", "a", "b"], misses: 6 };

  const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

  expect(next).toBe("NEXT");
  expect(newState).toEqual(state);
  expect(printed).toEqual([gallows(6), "The word was KIWI.", "You lose!"]);
});
