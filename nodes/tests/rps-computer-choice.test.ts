import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../rps-computer-choice.ts";

for (const [random, compChoice, compChoiceName] of [
  [0, 1, "Rock"],
  [0.5, 2, "Paper"],
  [0.99, 3, "Scissor"],
] as const) {
  test(`rpsComputerChoice takes onReady with ${compChoiceName} when random is ${random}`, async () => {
    const printed: string[] = [];
    const utils: Utils = {
      print: (msg) => printed.push(msg),
      random: () => random,
    };
    const state: State = { compChoice: 0, compChoiceName: "" };

    const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

    expect(next).toBe("NEXT");
    expect(newState).toEqual({ compChoice, compChoiceName });
    expect(printed).toEqual([`Computer chose: ${compChoiceName}`]);
    expect(state).toEqual({ compChoice: 0, compChoiceName: "" });
  });
}
