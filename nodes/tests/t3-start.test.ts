import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../t3-start.ts";

for (const [random, playerChar, computerChar] of [
  [0.2, "X", "O"],
  [0.7, "O", "X"],
] as const) {
  test(`t3Start takes onReady with the player as ${playerChar} when random is ${random}`, async () => {
    const printed: string[] = [];
    const utils: Utils = {
      print: (msg) => printed.push(msg),
      random: () => random,
    };
    const state: State = {
      board: ["X", "O", null, null, null, null, null, null, null],
      playerChar: "",
      computerChar: "",
    };

    const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

    expect(next).toBe("NEXT");
    expect(newState).toEqual({
      board: [null, null, null, null, null, null, null, null, null],
      playerChar,
      computerChar,
    });
    expect(printed).toEqual([
      `Player is [${playerChar}] and computer is [${computerChar}]`,
    ]);
    expect(state.board[0]).toBe("X");
  });
}
