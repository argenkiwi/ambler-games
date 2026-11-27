import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../hangman-apply-guess.ts";

const edges = { onHit: "HIT", onMiss: "MISS" };

function recorder() {
  const printed: string[] = [];
  const utils: Utils = { print: (msg) => printed.push(msg) };
  return { printed, utils };
}

test("hangmanApplyGuess takes onHit when the letter is in the word", async () => {
  const { printed, utils } = recorder();
  const state: State = { word: "kiwi", guessed: ["z"], guess: "i", misses: 1 };

  const [next, newState] = await factory(edges, utils)(state);

  expect(next).toBe("HIT");
  expect(newState).toEqual({
    word: "kiwi",
    guessed: ["z", "i"],
    guess: "i",
    misses: 1,
  });
  expect(state.guessed).toEqual(["z"]);
  expect(printed).toEqual(["Yes, I is in the word."]);
});

test("hangmanApplyGuess takes onMiss when the letter is not in the word", async () => {
  const { printed, utils } = recorder();
  const state: State = { word: "kiwi", guessed: ["i"], guess: "e", misses: 2 };

  const [next, newState] = await factory(edges, utils)(state);

  expect(next).toBe("MISS");
  expect(newState).toEqual({
    word: "kiwi",
    guessed: ["i", "e"],
    guess: "e",
    misses: 3,
  });
  expect(state).toEqual({
    word: "kiwi",
    guessed: ["i"],
    guess: "e",
    misses: 2,
  });
  expect(printed).toEqual(["No, E is not in the word."]);
});
