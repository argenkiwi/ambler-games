import { expect, test } from "bun:test";
import type { Board } from "../../utils/t3-board.ts";
import { factory, type State } from "../t3-check-game.ts";

const edges = { onDraw: "DRAW", onContinue: "CONTINUE" };
const _ = null;

test("t3CheckGame takes onDraw when the board is full", async () => {
  const board: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
  const state: State = { board, result: "" };

  const [next, newState] = await factory(edges, {})(state);

  expect(next).toBe("DRAW");
  expect(newState).toEqual({ board, result: "Deuce!" });
  expect(state.result).toBe("");
});

for (const [label, board] of [
  ["one cell left", ["X", "O", "X", "X", "O", "O", "O", "X", _]],
  ["an empty board", [_, _, _, _, _, _, _, _, _]],
] as [string, Board][]) {
  test(`t3CheckGame takes onContinue with ${label}`, async () => {
    const state: State = { board, result: "" };

    const [next, newState] = await factory(edges, {})(state);

    expect(next).toBe("CONTINUE");
    expect(newState).toEqual(state);
  });
}
