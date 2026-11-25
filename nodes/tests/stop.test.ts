import { expect, test } from "bun:test";
import { factory, type Utils } from "../stop.ts";

test("stop says goodbye and takes onDone", async () => {
  const printed: string[] = [];
  const utils: Utils = { print: (msg) => printed.push(msg) };
  const state = {};

  const [next, newState] = await factory({ onDone: null }, utils)(state);

  expect(next).toBeNull();
  expect(newState).toEqual({});
  expect(printed).toEqual(["Thanks for playing!"]);
});
