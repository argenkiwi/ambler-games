import { assertEquals } from "@std/assert";
import { factory } from "../t3CheckGame.ts";

Deno.test("t3CheckGame should return onDraw when board is full", () => {
  const board: (string | null)[] = [
    "X",
    "O",
    "X",
    "O",
    "X",
    "O",
    "X",
    "O",
    "X",
  ];
  const result = factory({ onDraw: "end", onContinue: "printBoard" }, {})(
    board,
  );

  assertEquals(result[0], "end");
});

Deno.test("t3CheckGame should return onContinue when board has space", () => {
  const board: (string | null)[] = [
    "X",
    "O",
    null,
    "O",
    null,
    null,
    null,
    null,
    null,
  ];
  const result = factory({ onDraw: "end", onContinue: "printBoard" }, {})(
    board,
  );

  assertEquals(result[0], "printBoard");
});

Deno.test("t3CheckGame should return onContinue when completely empty", () => {
  const board: (string | null)[] = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  const result = factory({ onDraw: "end", onContinue: "printBoard" }, {})(
    board,
  );

  assertEquals(result[0], "printBoard");
});
