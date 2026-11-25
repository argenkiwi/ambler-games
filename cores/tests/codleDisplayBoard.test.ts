import { assertEquals } from "@std/assert";
import { factory, Utils } from "../codleDisplayBoard.ts";

Deno.test("codleDisplayBoard should render board with single guess", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

  const result = factory({ onReady: "getGuess" }, utils)(
    ["1234"],
    [["green", "yellow", "white", "white"]],
  );

  assertEquals(result[0], "getGuess");
  assertEquals(printed.length, 3); // header + 1 guess + footer
  assertEquals(printed[0].startsWith("+"), true);
  assertEquals(printed[printed.length - 1].startsWith("+"), true);
});

Deno.test("codleDisplayBoard should render board with multiple guesses", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
  };

  const result = factory({ onReady: "getGuess" }, utils)(
    ["1234", "5678"],
    [
      ["green", "yellow", "white", "white"],
      ["yellow", "white", "green", "yellow"],
    ],
  );

  assertEquals(result[0], "getGuess");
  assertEquals(printed.length, 4); // header + 2 guesses + footer
  assertEquals(printed[0].startsWith("+"), true);
  assertEquals(printed[printed.length - 1].startsWith("+"), true);
  // Each guess line should have pipe characters
  assertEquals(printed[1].startsWith("|"), true);
  assertEquals(printed[2].startsWith("|"), true);
});
