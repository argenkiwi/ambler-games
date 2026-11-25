import { expect, test } from "bun:test";
import type { Move, Outcome } from "../../utils/kps.ts";
import { factory, type State, type Utils } from "../kps-compare.ts";

const cases: [Move, Move, Outcome, number, number][] = [
  ["kick", "punch", "Win", 10, 8],
  ["punch", "kick", "Lose", 8, 10],
  ["kick", "kick", "Trade", 9, 9],
  ["kick", "jump", "Chip", 10, 9],
  ["block", "sweep", "Ouch", 9, 10],
  ["crouch", "kick", "Dodge", 11, 10],
  ["kick", "crouch", "Miss", 10, 11],
  ["kick", "block", "Draw", 10, 10],
];

for (const [playerMove, cpuMove, outcome, playerHealth, cpuHealth] of cases) {
  test(`kpsCompare takes onSuccess with ${outcome} for ${playerMove} vs ${cpuMove}`, async () => {
    const printed: string[] = [];
    const utils: Utils = { print: (msg) => printed.push(msg) };
    const state: State = {
      playerMove,
      cpuMove,
      playerHealth: 10,
      cpuHealth: 10,
    };

    const [next, newState] = await factory({ onSuccess: "NEXT" }, utils)(state);

    expect(next).toBe("NEXT");
    expect(newState).toEqual({
      playerMove,
      cpuMove,
      outcome,
      playerHealth,
      cpuHealth,
    });
    expect(printed).toEqual([
      `\nPlayer used ${playerMove.toUpperCase()}!`,
      `CPU used ${cpuMove.toUpperCase()}!`,
      `Outcome: ${outcome}!`,
    ]);
    expect(state.outcome).toBeUndefined();
  });
}

test("kpsCompare throws when a move is missing", () => {
  const utils: Utils = { print: () => {} };
  const state: State = { playerMove: "kick", playerHealth: 10, cpuHealth: 10 };

  expect(() => factory({ onSuccess: "NEXT" }, utils)(state)).toThrow(
    "both moves",
  );
});
