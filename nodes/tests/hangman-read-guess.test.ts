import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../hangman-read-guess.ts";

const edges = {
  onValid: "VALID",
  onInvalid: "INVALID",
  onRepeated: "REPEATED",
};

function script(input: string | null) {
  const printed: string[] = [];
  const prompts: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: (prompt) => {
      prompts.push(prompt);
      return input;
    },
  };
  return { printed, prompts, utils };
}

for (const [input, guess] of [
  ["e", "e"],
  ["Q", "q"],
  ["  k ", "k"],
] as const) {
  test(`hangmanReadGuess takes onValid when the player enters ${JSON.stringify(input)}`, async () => {
    const { printed, prompts, utils } = script(input);
    const state: State = { guessed: ["a"], guess: "a" };

    const [next, newState] = await factory(edges, utils)(state);

    expect(next).toBe("VALID");
    expect(newState).toEqual({ guessed: ["a"], guess });
    expect(state).toEqual({ guessed: ["a"], guess: "a" });
    expect(prompts).toEqual(["Guess a letter: "]);
    expect(printed).toEqual([]);
  });
}

for (const input of ["", "ab", "7", "é", "-"]) {
  test(`hangmanReadGuess takes onInvalid when the player enters ${JSON.stringify(input)}`, async () => {
    const { printed, utils } = script(input);
    const state: State = { guessed: [], guess: "" };

    const [next, newState] = await factory(edges, utils)(state);

    expect(next).toBe("INVALID");
    expect(newState).toEqual(state);
    expect(printed).toEqual(["Please enter a single letter from A to Z."]);
  });
}

for (const input of ["r", "R"]) {
  test(`hangmanReadGuess takes onRepeated when ${JSON.stringify(input)} was already guessed`, async () => {
    const { printed, utils } = script(input);
    const state: State = { guessed: ["r"], guess: "r" };

    const [next, newState] = await factory(edges, utils)(state);

    expect(next).toBe("REPEATED");
    expect(newState).toEqual(state);
    expect(printed).toEqual(["You have already guessed R."]);
  });
}

test("hangmanReadGuess throws when input has ended", async () => {
  const { utils } = script(null);
  const state: State = { guessed: [], guess: "" };

  expect(async () => await factory(edges, utils)(state)).toThrow(
    "Could not read a guess: input has ended.",
  );
});
