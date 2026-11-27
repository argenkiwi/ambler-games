import { expect, test } from "bun:test";
import { factory, type Utils } from "../hangman-play-again.ts";

const edges = { onYes: "YES", onNo: "NO", onUnclear: "UNCLEAR" };

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

for (const [input, expected] of [
  ["yes", "YES"],
  ["Y", "YES"],
  [" YeS ", "YES"],
  ["no", "NO"],
  ["n", "NO"],
  ["NO", "NO"],
] as const) {
  test(`hangmanPlayAgain takes on${expected === "YES" ? "Yes" : "No"} when the player enters ${JSON.stringify(input)}`, async () => {
    const { printed, prompts, utils } = script(input);
    const state = {};

    const [next, newState] = await factory(edges, utils)(state);

    expect(next).toBe(expected);
    expect(newState).toEqual({});
    expect(prompts).toEqual(["Play again? (yes/no): "]);
    expect(printed).toEqual([]);
  });
}

for (const input of ["", "maybe", "yep", "nah"]) {
  test(`hangmanPlayAgain takes onUnclear when the player enters ${JSON.stringify(input)}`, async () => {
    const { printed, utils } = script(input);

    const [next, newState] = await factory(edges, utils)({});

    expect(next).toBe("UNCLEAR");
    expect(newState).toEqual({});
    expect(printed).toEqual(["Please answer yes or no."]);
  });
}

test("hangmanPlayAgain throws when input has ended", async () => {
  const { utils } = script(null);

  expect(async () => await factory(edges, utils)({})).toThrow(
    "Could not read an answer: input has ended.",
  );
});
