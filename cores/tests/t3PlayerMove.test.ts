import { assertEquals } from "@std/assert";
import { factory, Utils } from "../t3PlayerMove.ts";

Deno.test("t3PlayerMove should accept valid move 1", () => {
  const readLines: string[] = ["1"];
  let i = 0;
  const utils: Utils = {
    print: () => {},
    readLine: () => readLines[i++],
  };

  const board: (string | null)[] = [null, null, null, null, null, null, null, null, null];
  const result = factory({ onValid: "playerPlace", onInvalid: "playerMove" }, utils)(board);

  assertEquals(result[0], "playerPlace");
  assertEquals(result[1].move, 1);
});

Deno.test("t3PlayerMove should accept valid move 9", () => {
  const readLines: string[] = ["9"];
  let i = 0;
  const utils: Utils = {
    print: () => {},
    readLine: () => readLines[i++],
  };

  const board: (string | null)[] = [null, null, null, null, null, null, null, null, null];
  const result = factory({ onValid: "playerPlace", onInvalid: "playerMove" }, utils)(board);

  assertEquals(result[0], "playerPlace");
  assertEquals(result[1].move, 9);
});

Deno.test("t3PlayerMove should reject out-of-range input and retry", () => {
  const readLines: string[] = ["0", "10", "5"];
  let i = 0;
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: () => readLines[i++],
  };

  const board: (string | null)[] = [null, null, null, null, null, null, null, null, null];
  const result = factory({ onValid: "playerPlace", onInvalid: "playerMove" }, utils)(board);

  assertEquals(result[0], "playerPlace");
  assertEquals(result[1].move, 5);
  assertEquals(printed.length, 2);
});

Deno.test("t3PlayerMove should reject already-taken cell and retry", () => {
  const readLines: string[] = ["1", "2"];
  let i = 0;
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: () => readLines[i++],
  };

  const board: (string | null)[] = ["X", null, null, null, null, null, null, null, null];
  const result = factory({ onValid: "playerPlace", onInvalid: "playerMove" }, utils)(board);

  assertEquals(result[0], "playerPlace");
  assertEquals(result[1].move, 2);
  assertEquals(printed.length, 1); // one invalid attempt
});

Deno.test("t3PlayerMove should reject non-numeric input and retry", () => {
  const readLines: string[] = ["abc", "3"];
  let i = 0;
  const printed: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: () => readLines[i++],
  };

  const board: (string | null)[] = [null, null, null, null, null, null, null, null, null];
  const result = factory({ onValid: "playerPlace", onInvalid: "playerMove" }, utils)(board);

  assertEquals(result[0], "playerPlace");
  assertEquals(result[1].move, 3);
});
