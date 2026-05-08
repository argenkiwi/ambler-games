import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { factory } from "../kpsStart.ts";

Deno.test("kpsStart core returns correct initial state and edge", () => {
  const messages: string[] = [];
  const utils = {
    print: (msg: string) => messages.push(msg),
  };
  const core = factory({ onReady: "playerChoice" }, utils);
  const [edge, output] = core();

  assertEquals(edge, "playerChoice");
  assertEquals(output, { playerHealth: 10, cpuHealth: 10 });
  assertEquals(messages.length, 4);
  assertEquals(messages[0], "Welcome to Knight-Paper-Scissors!");
});
