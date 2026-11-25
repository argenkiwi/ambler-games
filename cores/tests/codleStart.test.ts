import { assertEquals } from "@std/assert";
import { factory, Utils } from "../codleStart.ts";

Deno.test("codleStart should print rules and transition to next node", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

  const result = factory({ onReady: "generateCode" }, utils)();

  assertEquals(result[0], "generateCode");
  assertEquals(printed.length, 1);
  assertEquals(printed[0].includes("Codle"), true);
  assertEquals(printed[0].includes("4-digit"), true);
});
