import { assertEquals } from "@std/assert";
import { factory, Utils } from "../start.ts";

Deno.test("start should print rules and transition onReady", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

  const result = factory({ onReady: "playerChoice" }, utils)();

  assertEquals(result[0], "playerChoice");
  assertEquals(printed.length, 6); // rules + empty line
  assertEquals(printed[0], "Rock Paper Scissors Rules:");
});
