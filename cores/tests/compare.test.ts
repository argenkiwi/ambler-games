import { assertEquals } from "@std/assert";
import { factory } from "../compare.ts";

Deno.test("compare should detect draw when both choose Rock", () => {
  const out = factory({ onReady: "next" })(1, 1);

  assertEquals(out[0], "next");
  assertEquals((out[1]).result, "Draw");
});

Deno.test("compare should detect draw when both choose Paper", () => {
  const out = factory({ onReady: "next" })(2, 2);

  assertEquals((out[1]).result, "Draw");
});

Deno.test("compare should detect draw when both choose Scissor", () => {
  const out = factory({ onReady: "next" })(3, 3);

  assertEquals((out[1]).result, "Draw");
});

Deno.test("compare should have user win: Rock beats Scissor", () => {
  const out = factory({ onReady: "next" })(1, 3);

  assertEquals((out[1]).result, "Rock");
});

Deno.test("compare should have user win: Paper beats Rock", () => {
  const out = factory({ onReady: "next" })(2, 1);

  assertEquals((out[1]).result, "Paper");
});

Deno.test("compare should have user win: Scissor beats Paper", () => {
  const out = factory({ onReady: "next" })(3, 2);

  assertEquals((out[1]).result, "Scissor");
});

Deno.test("compare should have computer win: Scissor loses to Rock", () => {
  const out = factory({ onReady: "next" })(3, 1);

  assertEquals((out[1]).result, "Rock");
});

Deno.test("compare should have computer win: Rock loses to Paper", () => {
  const out = factory({ onReady: "next" })(1, 2);

  assertEquals((out[1]).result, "Paper");
});

Deno.test("compare should have computer win: Paper loses to Scissor", () => {
  const out = factory({ onReady: "next" })(2, 3);

  assertEquals((out[1]).result, "Scissor");
});
