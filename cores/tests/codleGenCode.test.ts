import { assertEquals } from "@std/assert";
import { factory, Utils } from "../codleGenCode.ts";

Deno.test("codleGenCode should generate a valid 4-digit code", () => {
  const utils: Utils = {};

  const result = factory({ onReady: "getGuess" }, utils)();

  assertEquals(result[0], "getGuess");
  assertEquals(result[1].code.length, 4);
  assertEquals(result[1].code.split("").every((c) => "0123456789".includes(c)), true);
});
