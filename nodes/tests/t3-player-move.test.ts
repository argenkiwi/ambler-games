import { expect, test } from "bun:test";
import type { Board } from "../../utils/t3-board.ts";
import { factory, type State, type Utils } from "../t3-player-move.ts";

const edges = { onValid: "VALID", onInvalid: "INVALID", onEndOfInput: "EOF" };
const empty: Board = [null, null, null, null, null, null, null, null, null];

function run(input: string | null, board: Board = empty) {
  const printed: string[] = [];
  const prompts: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: (prompt) => {
      prompts.push(prompt);
      return input;
    },
  };
  const state: State = { board, move: 0 };
  return { state, printed, prompts, result: factory(edges, utils)(state) };
}

for (const move of [1, 9]) {
  test(`t3PlayerMove takes onValid for ${move} on an empty cell`, async () => {
    const { state, printed, prompts, result } = run(String(move));
    const [next, newState] = await result;

    expect(next).toBe("VALID");
    expect(newState).toEqual({ board: empty, move });
    expect(prompts).toEqual(["#Make your move ! [1-9] : "]);
    expect(printed).toEqual([]);
    expect(state.move).toBe(0);
  });
}

for (const input of ["0", "10", "abc"]) {
  test(`t3PlayerMove takes onInvalid for "${input}"`, async () => {
    const { state, printed, result } = run(input);
    const [next, newState] = await result;

    expect(next).toBe("INVALID");
    expect(newState).toEqual(state);
    expect(printed).toEqual([" Invalid number ! Try again !"]);
  });
}

test("t3PlayerMove takes onInvalid for a taken cell", async () => {
  const board: Board = ["X", null, null, null, null, null, null, null, null];
  const { state, printed, result } = run("1", board);
  const [next, newState] = await result;

  expect(next).toBe("INVALID");
  expect(newState).toEqual(state);
  expect(printed).toEqual([" Invalid number ! Try again !"]);
});

test("t3PlayerMove takes onEndOfInput when input ends", async () => {
  const { state, printed, result } = run(null);
  const [next, newState] = await result;

  expect(next).toBe("EOF");
  expect(newState).toEqual(state);
  expect(printed).toEqual([]);
});
