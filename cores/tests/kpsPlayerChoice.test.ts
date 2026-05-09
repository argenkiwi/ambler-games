import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { factory } from "../kpsPlayerChoice.ts";

Deno.test("kpsPlayerChoice core handles valid input", () => {
  const messages: string[] = [];
  const utils = {
    print: (msg: string) => messages.push(msg),
    prompt: () => "k",
  };
  const core = factory(
    { onSuccess: "computerChoice", onError: "playerChoice" },
    utils,
  );
  const [edge, output] = core(10, 10);

  assertEquals(edge, "computerChoice");
  assertEquals(output, "kick");
});

Deno.test("kpsPlayerChoice core handles invalid input", () => {
  const messages: string[] = [];
  const utils = {
    print: (msg: string) => messages.push(msg),
    prompt: () => "invalid",
  };
  const core = factory(
    { onSuccess: "computerChoice", onError: "playerChoice" },
    utils,
  );
  const [edge, output] = core(10, 10);

  assertEquals(edge, "playerChoice");
  assertEquals(output, undefined);
  assertEquals(messages[1], "Invalid move. Please choose k, p, s, c, b, or j.");
});
