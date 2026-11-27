import { expect, test } from "bun:test";
import type { Board } from "../../utils/game2048.ts";
import { factory, type State } from "../g2048-check-end.ts";

const edges = { onWon: "WON", onLost: "LOST", onContinue: "CONTINUE" };

const stuck: Board = [
  [2, 4, 2, 4],
  [4, 2, 4, 2],
  [2, 4, 2, 4],
  [4, 2, 4, 2],
];

function state(board: Board, won = false): State {
  return { board, won, ending: "quit" };
}

test("g2048CheckEnd takes onWon and sets the win flag when 2048 appears", async () => {
  const board = stuck.map((row) => [...row]);
  board[0] = [2048, 4, 2, 4];
  const initial = state(board);

  const [next, newState] = await factory(edges, {})(initial);

  expect(next).toBe("WON");
  expect(newState.won).toBe(true);
  expect(initial.won).toBe(false);
});

test("g2048CheckEnd takes onWon for a tile higher than 2048", async () => {
  const board = stuck.map((row) => [...row]);
  board[1] = [4096, 2, 4, 2];

  const [next] = await factory(edges, {})(state(board));

  expect(next).toBe("WON");
});

test("g2048CheckEnd does not announce a win twice, even on a stuck board", async () => {
  const board = stuck.map((row) => [...row]);
  board[0] = [2048, 4, 2, 4];

  const [next, newState] = await factory(edges, {})(state(board, true));

  expect(next).toBe("LOST");
  expect(newState.ending).toBe("loss");
});

test("g2048CheckEnd takes onLost with a loss ending when the board is full and no tiles can merge", async () => {
  const [next, newState] = await factory(edges, {})(state(stuck));

  expect(next).toBe("LOST");
  expect(newState).toEqual({ board: stuck, won: false, ending: "loss" });
});

test("g2048CheckEnd takes onContinue when a cell is empty", async () => {
  const board = stuck.map((row) => [...row]);
  board[3] = [4, 2, 4, 0];
  const initial = state(board);

  const [next, newState] = await factory(edges, {})(initial);

  expect(next).toBe("CONTINUE");
  expect(newState).toEqual(initial);
});

test("g2048CheckEnd takes onContinue when the board is full but equal tiles are side by side", async () => {
  for (const board of [
    [
      [2, 2, 4, 8],
      [4, 8, 2, 4],
      [8, 2, 4, 2],
      [2, 4, 8, 4],
    ],
    [
      [2, 4, 8, 16],
      [4, 8, 16, 2],
      [8, 16, 2, 4],
      [8, 2, 4, 8],
    ],
  ]) {
    const [next] = await factory(edges, {})(state(board));
    expect(next).toBe("CONTINUE");
  }
});
