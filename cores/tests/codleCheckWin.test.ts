import { assertEquals } from "@std/assert";
import { factory, Utils } from "../codleCheckWin.ts";

Deno.test("codleCheckWin should return onWin when guess matches code", () => {
  const utils: Utils = {};
  const result = factory({ onWin: "endWin", onLose: "endLose", onContinue: "displayBoard" }, utils)(
    "1234",
    "1234",
    2,
  );

  assertEquals(result[0], "endWin");
});

Deno.test("codleCheckWin should return onLose when attempts run out", () => {
  const utils: Utils = {};
  const result = factory({ onWin: "endWin", onLose: "endLose", onContinue: "displayBoard" }, utils)(
    "5678",
    "1234",
    1,
  );

  assertEquals(result[0], "endLose");
});

Deno.test("codleCheckWin should return onContinue when game can continue", () => {
  const utils: Utils = {};
  const result = factory({ onWin: "endWin", onLose: "endLose", onContinue: "displayBoard" }, utils)(
    "5678",
    "1234",
    3,
  );

  assertEquals(result[0], "displayBoard");
});

Deno.test("codleCheckWin should return onLose even when guess is wrong and attempts is 0", () => {
  const utils: Utils = {};
  const result = factory({ onWin: "endWin", onLose: "endLose", onContinue: "displayBoard" }, utils)(
    "5678",
    "1234",
    0,
  );

  assertEquals(result[0], "endLose");
});

Deno.test("codleCheckWin should return onWin even when attempts is 1", () => {
  const utils: Utils = {};
  const result = factory({ onWin: "endWin", onLose: "endLose", onContinue: "displayBoard" }, utils)(
    "1234",
    "1234",
    1,
  );

  assertEquals(result[0], "endWin");
});
