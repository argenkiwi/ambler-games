import { expect, test } from "bun:test";
import type { Board } from "../../utils/t3-board.ts";
import { factory, type State } from "../t3-player-place.ts";

const edges = { onWin: "WIN", onNoWin: "NO_WIN" };
const _ = null;

const wins: [string, Board, number, Board][] = [
  [
    "top row",
    ["X", "X", _, _, _, _, _, _, _],
    3,
    ["X", "X", "X", _, _, _, _, _, _],
  ],
  [
    "left column",
    ["X", _, _, "X", _, _, _, _, _],
    7,
    ["X", _, _, "X", _, _, "X", _, _],
  ],
  [
    "diagonal",
    ["X", _, _, _, "X", _, _, _, _],
    9,
    ["X", _, _, _, "X", _, _, _, "X"],
  ],
];

for (const [line, board, move, after] of wins) {
  test(`t3PlayerPlace takes onWin when the move completes the ${line}`, async () => {
    const state: State = { board, move, playerChar: "X", result: "" };

    const [next, newState] = await factory(edges, {})(state);

    expect(next).toBe("WIN");
    expect(newState).toEqual({
      board: after,
      move,
      playerChar: "X",
      result: "You win!",
    });
    expect(state.board[move - 1]).toBeNull();
  });
}

test("t3PlayerPlace takes onNoWin and marks the cell otherwise", async () => {
  const board: Board = ["O", _, _, _, _, _, _, _, _];
  const state: State = { board, move: 5, playerChar: "X", result: "" };

  const [next, newState] = await factory(edges, {})(state);

  expect(next).toBe("NO_WIN");
  expect(newState).toEqual({
    board: ["O", _, _, _, "X", _, _, _, _],
    move: 5,
    playerChar: "X",
    result: "",
  });
  expect(state.board[4]).toBeNull();
});
