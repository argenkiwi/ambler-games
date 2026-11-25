import { assertEquals } from "@std/assert";
import { factory } from "../slotsCalculate.ts";

Deno.test("slotsCalculate should return 10x bet for 3 matches", () => {
  const result = factory({ onSuccess: "checkBalance" }, { print: () => {} })({
    reels: ["🍒", "🍒", "🍒"],
    bet: 10,
  });
  assertEquals(result[0], "checkBalance");
  assertEquals(result[1], 100);
});

Deno.test("slotsCalculate should return 2x bet for 2 matches", () => {
  const result = factory({ onSuccess: "checkBalance" }, { print: () => {} })({
    reels: ["🍒", "🍒", "🍋"],
    bet: 10,
  });
  assertEquals(result[0], "checkBalance");
  assertEquals(result[1], 20);
});

Deno.test("slotsCalculate should return 0 for no matches", () => {
  const result = factory({ onSuccess: "checkBalance" }, { print: () => {} })({
    reels: ["🍒", "🍋", "🔔"],
    bet: 10,
  });
  assertEquals(result[0], "checkBalance");
  assertEquals(result[1], 0);
});
