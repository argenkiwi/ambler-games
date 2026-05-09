import { assertEquals } from "@std/assert";
import { factory, Utils } from "../t3PrintBoard.ts";

Deno.test("t3PrintBoard should print empty board", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

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
  const result = factory({ onReady: "playerMove" }, utils)(board);

  assertEquals(result[0], "playerMove");
  assertEquals(printed.length, 1);
  // Empty board should contain spaces
  assertEquals(printed[0].includes(" "), true);
});

Deno.test("t3PrintBoard should print board with marks", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

  const board: (string | null)[] = [
    "X",
    null,
    "O",
    null,
    "X",
    null,
    null,
    null,
    "O",
  ];
  const result = factory({ onReady: "playerMove" }, utils)(board);

  assertEquals(result[0], "playerMove");
  assertEquals(printed.length, 1);
  const output = printed[0];
  assertEquals(output.includes("X"), true);
  assertEquals(output.includes("O"), true);
});

Deno.test("t3PrintBoard full board", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

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
  const result = factory({ onReady: "playerMove" }, utils)(board);

  assertEquals(result[0], "playerMove");
  assertEquals(printed.length, 1);
  const output = printed[0];
  // Should not contain any spaces for cells (all filled)
  assertEquals(output.includes("X"), true);
});
