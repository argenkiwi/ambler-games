import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../t3-print-board.ts";

test("t3PrintBoard prints the board and takes onReady", async () => {
  const printed: string[] = [];
  const utils: Utils = { print: (msg) => printed.push(msg) };
  const state: State = {
    board: ["X", null, "O", null, "X", null, "O", null, null],
  };

  const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

  expect(next).toBe("NEXT");
  expect(newState).toEqual(state);
  expect(printed).toEqual([
    "X |   | O \n-------\n  | X |   \n-------\nO |   |   \n",
  ]);
});
