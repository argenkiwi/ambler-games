import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../g2048-spawn-tile.ts";

const full = (value: number) => Array<number>(4).fill(value);

function stateWithOneGap(): State {
  return {
    board: [full(2), full(4), [8, 0, 8, 8], full(16)],
  };
}

for (const [roll, value] of [
  [0, 2],
  [0.89, 2],
  [0.9, 4],
  [0.99, 4],
] as const) {
  test(`g2048SpawnTile takes onReady and places a ${value} when the value roll is ${roll}`, async () => {
    const rolls = [0.5, roll];
    const utils: Utils = { random: () => rolls.shift() ?? 0 };
    const state = stateWithOneGap();

    const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

    expect(next).toBe("NEXT");
    expect(newState.board[2]).toEqual([8, value, 8, 8]);
    expect(state.board[2]).toEqual([8, 0, 8, 8]);
  });
}

test("g2048SpawnTile picks among the empty cells only", async () => {
  const rolls = [0.99, 0];
  const utils: Utils = { random: () => rolls.shift() ?? 0 };
  const state: State = {
    board: [full(2), full(4), full(8), [16, 16, 0, 0]],
  };

  const [, newState] = await factory({ onReady: "NEXT" }, utils)(state);

  expect(newState.board[3]).toEqual([16, 16, 0, 2]);
});
