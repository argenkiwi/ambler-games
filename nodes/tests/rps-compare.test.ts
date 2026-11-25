import { expect, test } from "bun:test";
import { factory, type State } from "../rps-compare.ts";

for (const [choice, compChoice, result] of [
  [1, 1, "Draw"],
  [2, 2, "Draw"],
  [3, 3, "Draw"],
  [1, 3, "Rock"],
  [2, 1, "Paper"],
  [3, 2, "Scissor"],
  [3, 1, "Rock"],
  [1, 2, "Paper"],
  [2, 3, "Scissor"],
] as const) {
  test(`rpsCompare takes onReady with ${result} for ${choice} vs ${compChoice}`, async () => {
    const state: State = { choice, compChoice, result: "" };

    const [next, newState] = await factory({ onReady: "NEXT" }, {})(state);

    expect(next).toBe("NEXT");
    expect(newState).toEqual({ choice, compChoice, result });
    expect(state.result).toBe("");
  });
}
