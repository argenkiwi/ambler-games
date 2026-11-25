import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../rps-result.ts";

for (const [choiceName, result, message] of [
  ["Rock", "Draw", "It's a draw!"],
  ["Rock", "Rock", "You win! Rock beats Scissor"],
  ["Paper", "Paper", "You win! Paper beats Rock"],
  ["Scissor", "Scissor", "You win! Scissor beats Paper"],
  ["Rock", "Paper", "Computer wins! Paper beats Rock"],
] as const) {
  test(`rpsResult takes onReady and says "${message}"`, async () => {
    const printed: string[] = [];
    const utils: Utils = { print: (msg) => printed.push(msg) };
    const state: State = { choiceName, result };

    const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

    expect(next).toBe("NEXT");
    expect(newState).toEqual(state);
    expect(printed).toEqual([message]);
  });
}
