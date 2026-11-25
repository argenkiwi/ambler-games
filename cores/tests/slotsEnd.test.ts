import { assertEquals } from "@std/assert";
import { factory } from "../slotsEnd.ts";

Deno.test("slotsEnd should print final balance and end", () => {
  const result = factory({ onEnd: null }, { print: () => {} })(100);
  assertEquals(result[0], null);
});
