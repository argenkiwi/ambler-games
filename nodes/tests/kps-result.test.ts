import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../kps-result.ts";

const edges = { onContinue: "CONTINUE", onGameOver: "OVER" };

function run(playerHealth: number, cpuHealth: number) {
  const printed: string[] = [];
  const utils: Utils = { print: (msg) => printed.push(msg) };
  const state: State = { playerHealth, cpuHealth };
  return { state, printed, result: factory(edges, utils)(state) };
}

test("kpsResult takes onContinue while both fighters have health", async () => {
  const { state, printed, result } = run(1, 5);
  const [next, newState] = await result;

  expect(next).toBe("CONTINUE");
  expect(newState).toEqual(state);
  expect(printed).toEqual([]);
});

for (const [playerHealth, cpuHealth, verdict] of [
  [5, 0, "You are VICTORIOUS!"],
  [0, 3, "You were DEFEATED!"],
  [-1, 0, "It's a DOUBLE KO! It's a DRAW!"],
] as const) {
  test(`kpsResult takes onGameOver at ${playerHealth}-${cpuHealth}: ${verdict}`, async () => {
    const { state, printed, result } = run(playerHealth, cpuHealth);
    const [next, newState] = await result;

    expect(next).toBe("OVER");
    expect(newState).toEqual(state);
    expect(printed).toEqual([
      "\n--- GAME OVER ---",
      `Final Score - Player: ${playerHealth} | CPU: ${cpuHealth}`,
      verdict,
    ]);
  });
}
