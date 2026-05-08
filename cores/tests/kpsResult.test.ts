import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { factory } from "../kpsResult.ts";

Deno.test("kpsResult core: Game continues when both have health", () => {
  const messages: string[] = [];
  const utils = { print: (msg: string) => messages.push(msg) };
  const core = factory({ continue: "playerChoice", end: "playAgain" }, utils);
  const [edge, output] = core(5, 5);

  assertEquals(edge, "playerChoice");
  assertEquals(messages.length, 0);
});

Deno.test("kpsResult core: Player wins", () => {
  const messages: string[] = [];
  const utils = { print: (msg: string) => messages.push(msg) };
  const core = factory({ continue: "playerChoice", end: "playAgain" }, utils);
  const [edge, output] = core(5, 0);

  assertEquals(edge, "playAgain");
  assertEquals(messages[2], "You are VICTORIOUS!");
});

Deno.test("kpsResult core: CPU wins", () => {
  const messages: string[] = [];
  const utils = { print: (msg: string) => messages.push(msg) };
  const core = factory({ continue: "playerChoice", end: "playAgain" }, utils);
  const [edge, output] = core(0, 5);

  assertEquals(edge, "playAgain");
  assertEquals(messages[2], "You were DEFEATED!");
});

Deno.test("kpsResult core: Double KO", () => {
  const messages: string[] = [];
  const utils = { print: (msg: string) => messages.push(msg) };
  const core = factory({ continue: "playerChoice", end: "playAgain" }, utils);
  const [edge, output] = core(0, 0);

  assertEquals(edge, "playAgain");
  assertEquals(messages[2], "It's a DOUBLE KO! It's a DRAW!");
});
