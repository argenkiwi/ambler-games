import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../kps-start.ts";

test("kpsStart prints the rules, restores full health and takes onReady", async () => {
  const printed: string[] = [];
  const utils: Utils = { print: (msg) => printed.push(msg) };
  const state: State = { playerHealth: 0, cpuHealth: 3 };

  const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

  expect(next).toBe("NEXT");
  expect(newState).toEqual({ playerHealth: 10, cpuHealth: 10 });
  expect(printed).toEqual([
    "Welcome to Knight-Paper-Scissors!",
    "Health: 10 each. First to 0 loses.",
    "Moves: [k]ick, [p]unch, [s]weep, [c]rouch, [b]lock, [j]ump",
    "",
  ]);
  expect(state).toEqual({ playerHealth: 0, cpuHealth: 3 });
});
