import { assertEquals } from "@std/assert";
import { factory, Utils } from "../t3End.ts";

Deno.test("t3End should print win message", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

  const result = factory({ onDone: null }, utils)("You win!");

  assertEquals(result[0], null);
  assertEquals(printed[0], "You win!");
});

Deno.test("t3End should print lose message", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

  const result = factory({ onDone: null }, utils)("You lose!");

  assertEquals(result[0], null);
  assertEquals(printed[0], "You lose!");
});

Deno.test("t3End should print draw message", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

  const result = factory({ onDone: null }, utils)("Deuce!");

  assertEquals(result[0], null);
  assertEquals(printed[0], "Deuce!");
});
