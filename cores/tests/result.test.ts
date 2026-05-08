import { assertEquals } from "@std/assert";
import { factory, Utils } from "../result.ts";

Deno.test("result should announce draw when result is Draw", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

  factory({ onReady: "playAgain" }, utils)("Rock", "Draw");

  assertEquals(printed[0], "It's a draw!");
});

Deno.test("result should announce user win when result matches choiceName", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

  const result = factory({ onReady: "playAgain" }, utils)("Rock", "Rock");

  assertEquals(printed[0], "You win! Rock beats Scissor");
  assertEquals(result[0], "playAgain");
});

Deno.test("result should announce user win for Paper", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

  factory({ onReady: "playAgain" }, utils)("Paper", "Paper");

  assertEquals(printed[0], "You win! Paper beats Rock");
});

Deno.test("result should announce user win for Scissor", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

  factory({ onReady: "playAgain" }, utils)("Scissor", "Scissor");

  assertEquals(printed[0], "You win! Scissor beats Paper");
});

Deno.test("result should announce computer win when result differs from choiceName", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

  factory({ onReady: "playAgain" }, utils)("Rock", "Paper");

  assertEquals(printed[0], "Computer wins! Paper beats Rock");
});
