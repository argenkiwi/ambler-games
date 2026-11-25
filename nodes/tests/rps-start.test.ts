import { expect, test } from "bun:test";
import { factory, type Utils } from "../rps-start.ts";

test("rpsStart prints the rules and takes onReady", async () => {
  const printed: string[] = [];
  const utils: Utils = { print: (msg) => printed.push(msg) };
  const state = {};

  const [next, newState] = await factory({ onReady: "NEXT" }, utils)(state);

  expect(next).toBe("NEXT");
  expect(newState).toEqual({});
  expect(printed).toEqual([
    "Rock Paper Scissors Rules:",
    "  Rock vs Paper: Paper wins",
    "  Rock vs Scissor: Rock wins",
    "  Paper vs Scissor: Scissor wins",
    "  Same choice: Draw",
    "",
  ]);
});
