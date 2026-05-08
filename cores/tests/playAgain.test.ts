import { assertEquals } from "@std/assert";
import { factory, Utils } from "../playAgain.ts";

Deno.test("playAgain should transition onYes when user enters Y",  () => {
  const utils: Utils = {
    print: () => {},
    readLine: () => "Y",
  };

  const result =  factory({ onYes: "playerChoice", onNo: "stop" }, utils)();

  assertEquals(result[0], "playerChoice");
});

Deno.test("playAgain should transition onYes when user enters y (lowercase)",  () => {
  const utils: Utils = {
    print: () => {},
    readLine: () => "y",
  };

  const result = factory({ onYes: "playerChoice", onNo: "stop" }, utils)();

  assertEquals(result[0], "playerChoice");
});

Deno.test("playAgain should transition onNo when user enters N",  () => {
  const utils: Utils = {
    print: () => {},
    readLine: () => "N",
  };

  const result = factory({ onYes: "playerChoice", onNo: "stop" }, utils)();

  assertEquals(result[0], "stop");
});

Deno.test("playAgain should transition onNo when user enters anything else",  () => {
  const utils: Utils = {
    print: () => {},
    readLine: () => "maybe",
  };

  const result = factory({ onYes: "playerChoice", onNo: "stop" }, utils)();

  assertEquals(result[0], "stop");
});
