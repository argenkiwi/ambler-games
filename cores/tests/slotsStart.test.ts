import { assertEquals } from "@std/assert";
import { factory } from "../slotsStart.ts";

Deno.test("slotsStart should initialize balance to 200", () => {
  const result = factory({ onSuccess: "getBet" }, { print: () => {} })();
  assertEquals(result[0], "getBet");
  assertEquals(result[1], 200);
});
