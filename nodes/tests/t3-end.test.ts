import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../t3-end.ts";

for (const result of ["You win!", "You lose!", "Deuce!"]) {
  test(`t3End prints the final board and "${result}", then takes onDone`, async () => {
    const printed: string[] = [];
    const utils: Utils = { print: (msg) => printed.push(msg) };
    const state: State = {
      board: ["X", "X", "X", "O", "O", null, null, null, null],
      result,
    };

    const [next, newState] = await factory({ onDone: null }, utils)(state);

    expect(next).toBeNull();
    expect(newState).toEqual(state);
    expect(printed).toEqual([
      "X | X | X \n-------\nO | O |   \n-------\n  |   |   \n",
      result,
    ]);
  });
}
