import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { factory } from "../kpsComputerChoice.ts";

Deno.test("kpsComputerChoice core selects move based on random value", () => {
  const utils = {
    random: () => 0.1, // Should select "kick" (index 0)
  };
  const core = factory({ onSuccess: "compare" }, utils);
  const [edge, output] = core();

  assertEquals(edge, "compare");
  assertEquals(output, "kick");
});

Deno.test("kpsComputerChoice core selects another move based on random value", () => {
  const utils = {
    random: () => 0.99, // Should select "jump" (index 5)
  };
  const core = factory({ onSuccess: "compare" }, utils);
  const [edge, output] = core();

  assertEquals(edge, "compare");
  assertEquals(output, "jump");
});
