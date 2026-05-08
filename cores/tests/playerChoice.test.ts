import { assertEquals } from "@std/assert";
import { factory, Utils } from "../playerChoice.ts";

Deno.test("playerChoice should accept valid input 1 (Rock)",  () => {
  const readLines: string[] = ["1"];
  let i = 0;
  const utils: Utils = {
    print: () => {},
    readLine: () => readLines[i++],
  };

  const result =  factory({ onValid: "computerChoice", onInvalid: "playerChoice" }, utils)();

  assertEquals(result[0], "computerChoice");
  assertEquals(result[1].choice, 1);
  assertEquals(result[1].choiceName, "Rock");
});

Deno.test("playerChoice should accept valid input 2 (Paper)",  () => {
  const readLines: string[] = ["2"];
  let i = 0;
  const utils: Utils = {
    print: () => {},
    readLine: () => readLines[i++],
  };

  const result = factory({ onValid: "computerChoice", onInvalid: "playerChoice" }, utils)();

  assertEquals(result[0], "computerChoice");
  assertEquals(result[1].choice, 2);
  assertEquals(result[1].choiceName, "Paper");
});

Deno.test("playerChoice should accept valid input 3 (Scissor)",  () => {
  const readLines: string[] = ["3"];
  let i = 0;
  const utils: Utils = {
    print: () => {},
    readLine: () => readLines[i++],
  };

  const result = factory({ onValid: "computerChoice", onInvalid: "playerChoice" }, utils)();

  assertEquals(result[0], "computerChoice");
  assertEquals(result[1].choice, 3);
  assertEquals(result[1].choiceName, "Scissor");
});

Deno.test("playerChoice should reject invalid input and retry then accept valid",  () => {
  const readLines: string[] = ["5", "abc", "0", "2"];
  let i = 0;
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: () => readLines[i++],
  };

  const result = factory({ onValid: "computerChoice", onInvalid: "playerChoice" }, utils)();
  assertEquals(result[0], "computerChoice");
  assertEquals(result[1].choice, 2);
  assertEquals(printed.length, 4); // 3 invalid attempts + 1 "You chose"
});

Deno.test("playerChoice should handle null input (EOF) and retry",  () => {
  const readLines: (string | null)[] = [null, "1"];
  let i = 0;
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: () => readLines[i++],
  };

  const result = factory({ onValid: "computerChoice", onInvalid: "playerChoice" }, utils)();

  assertEquals(result[0], "computerChoice");
  assertEquals(printed.length, 2); // 1 EOF attempt + 1 "You chose"
});
