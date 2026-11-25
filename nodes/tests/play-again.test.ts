import { expect, test } from "bun:test";
import { factory, type Utils } from "../play-again.ts";

const edges = { onYes: "YES", onNo: "NO" };

for (const [input, expected] of [
  ["Y", "YES"],
  ["y", "YES"],
  ["N", "NO"],
  ["maybe", "NO"],
  [null, "NO"],
] as const) {
  test(`playAgain takes ${expected === "YES" ? "onYes" : "onNo"} when the player enters ${JSON.stringify(input)}`, async () => {
    const prompts: string[] = [];
    const utils: Utils = {
      readLine: (prompt) => {
        prompts.push(prompt);
        return input;
      },
    };
    const state = {};

    const [next, newState] = await factory(edges, utils)(state);

    expect(next).toBe(expected);
    expect(newState).toEqual({});
    expect(prompts).toEqual(["Play again? (Y/N): "]);
  });
}
