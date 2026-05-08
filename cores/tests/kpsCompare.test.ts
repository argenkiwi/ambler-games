import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { factory } from "../kpsCompare.ts";

Deno.test("kpsCompare core: Kick vs Punch (Win)", () => {
  const messages: string[] = [];
  const utils = { print: (msg: string) => messages.push(msg) };
  const core = factory({ onSuccess: "result" }, utils);
  const [edge, output] = core("kick", "punch", 10, 10);

  assertEquals(edge, "result");
  assertEquals(output.outcome, "Win");
  assertEquals(output.playerHealth, 10);
  assertEquals(output.cpuHealth, 8);
});

Deno.test("kpsCompare core: Punch vs Kick (Lose)", () => {
  const messages: string[] = [];
  const utils = { print: (msg: string) => messages.push(msg) };
  const core = factory({ onSuccess: "result" }, utils);
  const [edge, output] = core("punch", "kick", 10, 10);

  assertEquals(output.outcome, "Lose");
  assertEquals(output.playerHealth, 8);
  assertEquals(output.cpuHealth, 10);
});

Deno.test("kpsCompare core: Crouch vs Kick (Dodge)", () => {
  const messages: string[] = [];
  const utils = { print: (msg: string) => messages.push(msg) };
  const core = factory({ onSuccess: "result" }, utils);
  const [edge, output] = core("crouch", "kick", 10, 10);

  assertEquals(output.outcome, "Dodge");
  assertEquals(output.playerHealth, 11);
  assertEquals(output.cpuHealth, 10);
});

Deno.test("kpsCompare core: Kick vs Crouch (Miss)", () => {
  const messages: string[] = [];
  const utils = { print: (msg: string) => messages.push(msg) };
  const core = factory({ onSuccess: "result" }, utils);
  const [edge, output] = core("kick", "crouch", 10, 10);

  assertEquals(output.outcome, "Miss");
  assertEquals(output.playerHealth, 10);
  assertEquals(output.cpuHealth, 11);
});

Deno.test("kpsCompare core: Trade (Kick vs Kick)", () => {
  const messages: string[] = [];
  const utils = { print: (msg: string) => messages.push(msg) };
  const core = factory({ onSuccess: "result" }, utils);
  const [edge, output] = core("kick", "kick", 10, 10);

  assertEquals(output.outcome, "Trade");
  assertEquals(output.playerHealth, 9);
  assertEquals(output.cpuHealth, 9);
});
