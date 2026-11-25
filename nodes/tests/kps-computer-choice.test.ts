import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../kps-computer-choice.ts";

for (const [random, cpuMove] of [
  [0, "kick"],
  [0.2, "punch"],
  [0.5, "crouch"],
  [0.99, "jump"],
] as const) {
  test(`kpsComputerChoice takes onSuccess with ${cpuMove} when random is ${random}`, async () => {
    const utils: Utils = { random: () => random };
    const state: State = {};

    const [next, newState] = await factory({ onSuccess: "NEXT" }, utils)(state);

    expect(next).toBe("NEXT");
    expect(newState).toEqual({ cpuMove });
    expect(state.cpuMove).toBeUndefined();
  });
}
