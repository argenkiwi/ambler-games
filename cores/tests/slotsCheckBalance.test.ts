import { assertEquals } from "@std/assert";
import { factory } from "../slotsCheckBalance.ts";

Deno.test("slotsCheckBalance should continue if balance > 0", () => {
  const result = factory({ onContinue: "getBet", onGameOver: "end" }, {
    print: () => {},
  })(10);
  assertEquals(result[0], "getBet");
});

Deno.test("slotsCheckBalance should end if balance <= 0", () => {
  const result = factory({ onContinue: "getBet", onGameOver: "end" }, {
    print: () => {},
  })(0);
  assertEquals(result[0], "end");
});
