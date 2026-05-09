import { assertEquals } from "@std/assert";
import { factory, Utils } from "../codleGetGuess.ts";

Deno.test("codleGetGuess should accept valid 4-digit input on first try", () => {
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: () => "1234",
  };

  const result = factory({ onValid: "colorCode", onInvalid: "getGuess" }, utils)(4);

  assertEquals(result[0], "colorCode");
  assertEquals(result[1].guess, "1234");
  assertEquals(printed[0].includes("Attempts left: 4"), true);
});

Deno.test("codleGetGuess should reject too-short input and retry", () => {
  const printed: string[] = [];
  let callCount = 0;
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: () => {
      callCount++;
      return callCount === 1 ? "12" : "5678";
    },
  };

  const result = factory({ onValid: "colorCode", onInvalid: "getGuess" }, utils)(3);

  assertEquals(result[0], "colorCode");
  assertEquals(result[1].guess, "5678");
  assertEquals(printed.includes("Invalid input! Please enter a 4-digit number."), true);
});

Deno.test("codleGetGuess should reject non-digit input and retry", () => {
  const printed: string[] = [];
  let callCount = 0;
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: () => {
      callCount++;
      return callCount === 1 ? "abcd" : "9012";
    },
  };

  const result = factory({ onValid: "colorCode", onInvalid: "getGuess" }, utils)(2);

  assertEquals(result[0], "colorCode");
  assertEquals(result[1].guess, "9012");
  assertEquals(printed.includes("Invalid input! Please enter a 4-digit number."), true);
});

Deno.test("codleGetGuess should reject too-long input and retry", () => {
  const printed: string[] = [];
  let callCount = 0;
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: () => {
      callCount++;
      return callCount === 1 ? "12345" : "6789";
    },
  };

  const result = factory({ onValid: "colorCode", onInvalid: "getGuess" }, utils)(1);

  assertEquals(result[0], "colorCode");
  assertEquals(result[1].guess, "6789");
});

Deno.test("codleGetGuess should reject null input and retry", () => {
  const printed: string[] = [];
  let callCount = 0;
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: () => {
      callCount++;
      return callCount === 1 ? null : "4321";
    },
  };

  const result = factory({ onValid: "colorCode", onInvalid: "getGuess" }, utils)(4);

  assertEquals(result[0], "colorCode");
  assertEquals(result[1].guess, "4321");
  assertEquals(printed.includes("Invalid input! Please enter a 4-digit number."), true);
});
