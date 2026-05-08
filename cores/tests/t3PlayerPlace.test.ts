import { assertEquals } from "@std/assert";
import { factory } from "../t3PlayerPlace.ts";

Deno.test("t3PlayerPlace should detect win - horizontal top row", () => {
  const board: (string | null)[] = ["X", "X", null, null, null, null, null, null, null];
  const result = factory({ onWin: "end", onNoWin: "computerMove" }, {})(board, 3, "X");

  assertEquals(result[0], "end");
  assertEquals(result[1][2], "X");
});

Deno.test("t3PlayerPlace should detect win - vertical column", () => {
  const board: (string | null)[] = ["X", null, null, "X", null, null, null, null, null];
  const result = factory({ onWin: "end", onNoWin: "computerMove" }, {})(board, 7, "X");

  assertEquals(result[0], "end");
});

Deno.test("t3PlayerPlace should detect win - diagonal", () => {
  const board: (string | null)[] = ["X", null, null, null, "X", null, null, null, null];
  const result = factory({ onWin: "end", onNoWin: "computerMove" }, {})(board, 9, "X");

  assertEquals(result[0], "end");
});

Deno.test("t3PlayerPlace should return onNoWin when no win", () => {
  const board: (string | null)[] = [null, null, null, null, null, null, null, null, null];
  const result = factory({ onWin: "end", onNoWin: "computerMove" }, {})(board, 1, "X");

  assertEquals(result[0], "computerMove");
  assertEquals(result[1][0], "X");
});

Deno.test("t3PlayerPlace should place player mark on board", () => {
  const board: (string | null)[] = [null, null, null, null, null, null, null, null, null];
  const result = factory({ onWin: "end", onNoWin: "computerMove" }, {})(board, 5, "O");

  assertEquals(result[1][4], "O");
});
