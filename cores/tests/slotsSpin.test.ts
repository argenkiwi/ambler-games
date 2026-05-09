import { assertEquals } from "@std/assert";
import { factory } from "../slotsSpin.ts";

Deno.test("slotsSpin should generate 3 symbols", async () => {
  const symbols = ["🍎", "🍎", "🍎"];
  const result = await factory({ onSuccess: "calculate" }, {
    print: () => {},
    randomChoice: (_arr) => symbols.shift() as string,
    sleep: () => Promise.resolve(),
  })();
  assertEquals(result[0], "calculate");
  assertEquals(result[1], ["🍎", "🍎", "🍎"]);
});
