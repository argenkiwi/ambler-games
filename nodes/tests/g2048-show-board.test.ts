import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../g2048-show-board.ts";

test("g2048ShowBoard takes onReady after printing the grid and the score", async () => {
  const printed: string[] = [];
  const utils: Utils = { print: (msg) => printed.push(msg) };
  const state: State = {
    board: [
      [2, 0, 0, 0],
      [0, 16, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 128],
    ],
    score: 44,
  };

  const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

  expect(next).toBe("NEXT");
  expect(newState).toEqual(state);
  expect(printed).toEqual([
    [
      "  2   .   .   .",
      "  .  16   .   .",
      "  .   .   .   .",
      "  .   .   . 128",
    ].join("\n"),
    "Score: 44",
  ]);
});
