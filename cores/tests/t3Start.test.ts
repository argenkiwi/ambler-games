import { assertEquals } from "@std/assert";
import { factory, Utils } from "../t3Start.ts";

Deno.test("t3Start should assign X to player and O to computer", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    randomBool: () => true,
  };

  const result = factory({ onReady: "printBoard" }, utils)();

  assertEquals(result[0], "printBoard");
  assertEquals(result[1].playerChar, "X");
  assertEquals(result[1].computerChar, "O");
  assertEquals(result[1].board.length, 9);
  assertEquals(result[1].board.every((c) => c === null), true);
  assertEquals(printed[0], "Player is [X] and computer is [O]");
});

Deno.test("t3Start should assign O to player and X to computer", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    randomBool: () => false,
  };

  const result = factory({ onReady: "printBoard" }, utils)();

  assertEquals(result[0], "printBoard");
  assertEquals(result[1].playerChar, "O");
  assertEquals(result[1].computerChar, "X");
});
