import { expect, test } from "bun:test";
import type { Direction } from "../../utils/game2048.ts";
import { factory, type State, type Utils } from "../g2048-read-move.ts";

const edges = { onMove: "MOVE", onInvalid: "INVALID", onQuit: "QUIT" };

function script(input: string | null) {
  const printed: string[] = [];
  const prompts: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: (prompt) => {
      prompts.push(prompt);
      return input;
    },
  };
  return { printed, prompts, utils };
}

const initial: State = { direction: "left", ending: "loss" };

for (const [input, direction] of [
  ["l", "left"],
  ["R", "right"],
  [" t ", "up"],
  ["B", "down"],
] as [string, Direction][]) {
  test(`g2048ReadMove takes onMove with ${direction} when the player enters ${JSON.stringify(input)}`, async () => {
    const { printed, prompts, utils } = script(input);

    const [next, newState] = await factory(edges, utils)(initial);

    expect(next).toBe("MOVE");
    expect(newState).toEqual({ direction, ending: "loss" });
    expect(initial).toEqual({ direction: "left", ending: "loss" });
    expect(prompts).toHaveLength(1);
    expect(printed).toEqual([]);
  });
}

for (const input of ["", "up", "q", "1", "l r"]) {
  test(`g2048ReadMove takes onInvalid when the player enters ${JSON.stringify(input)}`, async () => {
    const { printed, utils } = script(input);

    const [next, newState] = await factory(edges, utils)(initial);

    expect(next).toBe("INVALID");
    expect(newState).toEqual(initial);
    expect(printed).toEqual(["Please enter L, R, T, B or X."]);
  });
}

for (const input of ["x", "X", " x "]) {
  test(`g2048ReadMove takes onQuit with a quit ending when the player enters ${JSON.stringify(input)}`, async () => {
    const { printed, utils } = script(input);

    const [next, newState] = await factory(
      edges,
      utils,
    )({
      direction: "up",
      ending: "loss",
    });

    expect(next).toBe("QUIT");
    expect(newState).toEqual({ direction: "up", ending: "quit" });
    expect(printed).toEqual([]);
  });
}

test("g2048ReadMove throws when input has ended", async () => {
  const { utils } = script(null);

  expect(async () => await factory(edges, utils)(initial)).toThrow(
    "Could not read a move: input has ended.",
  );
});
