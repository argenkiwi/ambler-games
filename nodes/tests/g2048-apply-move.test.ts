import { expect, test } from "bun:test";
import type { Board, Direction } from "../../utils/game2048.ts";
import { factory, type State, type Utils } from "../g2048-apply-move.ts";

const edges = { onMoved: "MOVED", onNoEffect: "NO_EFFECT" };

function run(board: Board, direction: Direction, score = 10) {
  const printed: string[] = [];
  const utils: Utils = { print: (msg) => printed.push(msg) };
  const state: State = { board, score, direction };
  return { printed, state, result: factory(edges, utils)(state) };
}

test("g2048ApplyMove slides tiles left without merging different values", async () => {
  const { result, state, printed } = run(
    [
      [0, 2, 0, 4],
      [0, 0, 0, 2],
      [2, 4, 8, 16],
      [0, 0, 0, 0],
    ],
    "left",
  );

  const [next, newState] = await result;

  expect(next).toBe("MOVED");
  expect(newState.board).toEqual([
    [2, 4, 0, 0],
    [2, 0, 0, 0],
    [2, 4, 8, 16],
    [0, 0, 0, 0],
  ]);
  expect(newState.score).toBe(10);
  expect(state.board[0]).toEqual([0, 2, 0, 4]);
  expect(printed).toEqual([]);
});

test("g2048ApplyMove merges a full line of 2s into two 4s and scores them", async () => {
  const { result } = run(
    [
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    "right",
  );

  const [next, newState] = await result;

  expect(next).toBe("MOVED");
  expect(newState.board[0]).toEqual([0, 0, 4, 4]);
  expect(newState.score).toBe(18);
});

test("g2048ApplyMove merges the pair nearest the wall first and merges a tile only once", async () => {
  const { result } = run(
    [
      [2, 2, 2, 0],
      [4, 4, 8, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    "left",
  );

  const [, newState] = await result;

  expect(newState.board[0]).toEqual([4, 2, 0, 0]);
  expect(newState.board[1]).toEqual([8, 8, 0, 0]);
  expect(newState.score).toBe(10 + 4 + 8);
});

test("g2048ApplyMove slides up and down along the columns", async () => {
  const board = [
    [2, 0, 0, 0],
    [2, 0, 0, 0],
    [0, 4, 0, 0],
    [4, 4, 0, 0],
  ];

  const [, up] = await run(board, "up").result;
  const [, down] = await run(board, "down").result;

  expect(up.board.map((row) => row.slice(0, 2))).toEqual([
    [4, 8],
    [4, 0],
    [0, 0],
    [0, 0],
  ]);
  expect(up.score).toBe(10 + 4 + 8);
  expect(down.board.map((row) => row.slice(0, 2))).toEqual([
    [0, 0],
    [0, 0],
    [4, 0],
    [4, 8],
  ]);
});

test("g2048ApplyMove takes onNoEffect and says so when nothing moves or merges", async () => {
  const board = [
    [2, 4, 0, 0],
    [8, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const { result, printed } = run(board, "left");

  const [next, newState] = await result;

  expect(next).toBe("NO_EFFECT");
  expect(newState.board).toEqual(board);
  expect(newState.score).toBe(10);
  expect(printed).toEqual(["That move has no effect."]);
});
