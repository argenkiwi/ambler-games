import { assertEquals } from "@std/assert";
import { factory } from "../slotsGetBet.ts";

Deno.test("slotsGetBet should accept a valid bet", () => {
  const result = factory({ onBet: "spin", onQuit: "end" }, {
    print: () => {},
    readLine: () => "50",
  })(100);
  assertEquals(result[0], "spin");
  assertEquals(result[1], 50);
});

Deno.test("slotsGetBet should allow quitting with 0", () => {
  const result = factory({ onBet: "spin", onQuit: "end" }, {
    print: () => {},
    readLine: () => "0",
  })(100);
  assertEquals(result[0], "end");
  assertEquals(result[1], 0);
});

Deno.test("slotsGetBet should reject bet higher than balance and retry", () => {
  const readLines = ["150", "50"];
  let i = 0;
  const result = factory({ onBet: "spin", onQuit: "end" }, {
    print: () => {},
    readLine: () => readLines[i++],
  })(100);
  assertEquals(result[0], "spin");
  assertEquals(result[1], 50);
});
