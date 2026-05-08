import { assertEquals } from "@std/assert";
import { factory, Utils } from "../stop.ts";

Deno.test("stop should print farewell message and return null", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

  const result = factory({ onDone: null }, utils)();

  assertEquals(result[0], null);
  assertEquals(printed[0], "Thanks for playing!");
});
