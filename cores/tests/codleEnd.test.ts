import { assertEquals } from "@std/assert";
import { factory, Utils } from "../codleEnd.ts";

Deno.test("codleEnd should print win message when won is true", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    green: (text) => `Green(${text})`,
    red: (text) => `Red(${text})`,
  };

  const result = factory({ onDone: null }, utils)(true, "1234");

  assertEquals(result[0], null);
  assertEquals(printed.length, 1);
  assertEquals(printed[0].includes("Congratulations"), true);
});

Deno.test("codleEnd should print lose message and correct code when won is false", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    green: (text) => `Green(${text})`,
    red: (text) => `Red(${text})`,
  };

  const result = factory({ onDone: null }, utils)(false, "5678");

  assertEquals(result[0], null);
  assertEquals(printed.length, 2);
  assertEquals(printed[0].includes("You lost"), true);
  assertEquals(printed[1].includes("Correct Code: 5678"), true);
});
