import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../g2048-new-game.ts";

function tiles(state: State) {
  return state.board.flat().filter((value) => value !== 0);
}

test("g2048NewGame takes onReady with a cleared game and two starting tiles", async () => {
  const utils: Utils = { random: () => 0 };
  const state: State = {
    board: [
      [2, 4, 8, 16],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 2048],
    ],
    score: 120,
    won: true,
  };

  const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

  expect(next).toBe("NEXT");
  expect(newState.score).toBe(0);
  expect(newState.won).toBe(false);
  expect(newState.board).toHaveLength(4);
  for (const row of newState.board) expect(row).toHaveLength(4);
  expect(tiles(newState)).toEqual([2, 2]);
  expect(state.score).toBe(120);
  expect(state.won).toBe(true);
});

test("g2048NewGame places the tiles in different cells and may start with a 4", async () => {
  const values = [0.99, 0.95, 0.99, 0.95];
  const utils: Utils = { random: () => values.shift() ?? 0 };
  const state: State = { board: [], score: 0, won: false };

  const [, newState] = await factory({ onReady: "NEXT" }, utils)(state);

  expect(tiles(newState)).toEqual([4, 4]);
});
