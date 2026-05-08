import { assertEquals } from "@std/assert";
import { factory, Utils } from "../computerChoice.ts";

Deno.test("computerChoice should generate choice 1 (Rock)", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    randomChoice: () => 1,
  };

  const result = factory({ onReady: "compare" }, utils)();

  assertEquals(result[0], "compare");
  assertEquals(result[1].compChoice, 1);
  assertEquals(result[1].compChoiceName, "Rock");
  assertEquals(printed[0], "Computer chose: Rock");
});

Deno.test("computerChoice should generate choice 2 (Paper)", () => {
  const utils: Utils = {
    print: () => {},
    randomChoice: () => 2,
  };

  const result = factory({ onReady: "compare" }, utils)();

  assertEquals(result[0], "compare");
  assertEquals(result[1].compChoice, 2);
  assertEquals(result[1].compChoiceName, "Paper");
});

Deno.test("computerChoice should generate choice 3 (Scissor)", () => {
  const utils: Utils = {
    print: () => {},
    randomChoice: () => 3,
  };

  const result = factory({ onReady: "compare" }, utils)();

  assertEquals(result[0], "compare");
  assertEquals(result[1].compChoice, 3);
  assertEquals(result[1].compChoiceName, "Scissor");
});
