import { expect, test } from "bun:test";
import type { Ending } from "../../utils/game2048.ts";
import { factory, type State, type Utils } from "../g2048-game-over.ts";

const board = [
  [2, 4, 2, 4],
  [4, 2, 4, 2],
  [2, 4, 2, 4],
  [4, 2, 4, 128],
];
const grid = [
  "  2   4   2   4",
  "  4   2   4   2",
  "  2   4   2   4",
  "  4   2   4 128",
].join("\n");

for (const [ending, won, message] of [
  ["loss", false, "Game over: no moves remain. You lose!"],
  ["win", true, "You win! You stopped at 2048."],
  ["quit", false, "You quit the game."],
  ["quit", true, "You win! You stopped at 2048."],
] as [Ending, boolean, string][]) {
  test(`g2048GameOver takes onReady and announces "${message}" for ${ending} with won ${won}`, async () => {
    const printed: string[] = [];
    const utils: Utils = { print: (msg) => printed.push(msg) };
    const state: State = { board, score: 300, ending, won };

    const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

    expect(next).toBe("NEXT");
    expect(newState).toEqual(state);
    expect(printed).toEqual([grid, "Final score: 300", message]);
  });
}
