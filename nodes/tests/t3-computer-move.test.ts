import { expect, test } from "bun:test";
import type { Board } from "../../utils/t3-board.ts";
import { factory, type State } from "../t3-computer-move.ts";

const edges = { onWin: "WIN", onNoWin: "NO_WIN" };
const _ = null;

function run(board: Board) {
  const state: State = {
    board,
    playerChar: "O",
    computerChar: "X",
    result: "",
  };
  return { state, result: factory(edges, {})(state) };
}

test("t3ComputerMove takes onWin when it can complete a row", async () => {
  const { state, result } = run(["X", "X", _, "O", "O", _, _, _, _]);
  const [next, newState] = await result;

  expect(next).toBe("WIN");
  expect(newState.board).toEqual(["X", "X", "X", "O", "O", _, _, _, _]);
  expect(newState.result).toBe("You lose!");
  expect(state.board[2]).toBeNull();
});

test("t3ComputerMove takes onWin when it can complete a diagonal", async () => {
  const { result } = run(["X", _, _, _, "X", _, _, _, _]);
  const [next, newState] = await result;

  expect(next).toBe("WIN");
  expect(newState.board[8]).toBe("X");
});

test("t3ComputerMove takes onNoWin after blocking the player", async () => {
  const { state, result } = run(["O", "O", _, _, "X", _, _, _, _]);
  const [next, newState] = await result;

  expect(next).toBe("NO_WIN");
  expect(newState).toEqual({
    ...state,
    board: ["O", "O", "X", _, "X", _, _, _, _],
  });
});

test("t3ComputerMove takes onNoWin and prefers a corner on an empty board", async () => {
  const { result } = run([_, _, _, _, _, _, _, _, _]);
  const [next, newState] = await result;

  expect(next).toBe("NO_WIN");
  expect(newState.board).toEqual(["X", _, _, _, _, _, _, _, _]);
});

test("t3ComputerMove takes onNoWin and a corner when the player holds the centre", async () => {
  const { result } = run([_, _, _, _, "O", _, _, _, _]);
  const [next, newState] = await result;

  expect(next).toBe("NO_WIN");
  expect(newState.board).toEqual(["X", _, _, _, "O", _, _, _, _]);
});
