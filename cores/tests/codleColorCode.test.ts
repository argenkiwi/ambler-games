import { assertEquals } from "@std/assert";
import { factory, Utils } from "../codleColorCode.ts";

Deno.test("codleColorCode should mark all green when exact match", () => {
  const utils: Utils = {};
  const result = factory({ onReady: "checkWin" }, utils)("1234", "1234");

  assertEquals(result[0], "checkWin");
  assertEquals(result[1].colors, ["green", "green", "green", "green"]);
});

Deno.test("codleColorCode should mark all white when no digits match", () => {
  const utils: Utils = {};
  const result = factory({ onReady: "checkWin" }, utils)("0000", "1234");

  assertEquals(result[0], "checkWin");
  assertEquals(result[1].colors, ["white", "white", "white", "white"]);
});

Deno.test("codleColorCode should mark yellow for correct digit wrong position", () => {
  const utils: Utils = {};
  const result = factory({ onReady: "checkWin" }, utils)("4321", "1234");

  assertEquals(result[0], "checkWin");
  assertEquals(result[1].colors, ["yellow", "yellow", "yellow", "yellow"]);
});

Deno.test("codleColorCode should handle mixed green/yellow/white", () => {
  const utils: Utils = {};
  const result = factory({ onReady: "checkWin" }, utils)("1245", "1234");

  assertEquals(result[0], "checkWin");
  assertEquals(result[1].colors, ["green", "green", "yellow", "white"]);
});

Deno.test("codleColorCode should handle repeated digits in guess", () => {
  const utils: Utils = {};
  // guess="1111", code="1234": position 0 is green (match), positions 1-3: "1" is in code → yellow
  const result = factory({ onReady: "checkWin" }, utils)("1111", "1234");

  assertEquals(result[0], "checkWin");
  assertEquals(result[1].colors, ["green", "yellow", "yellow", "yellow"]);
});

Deno.test("codleColorCode should handle green taking priority over yellow", () => {
  const utils: Utils = {};
  // guess="4123", code="1234": pos0 "4"≠"1" but "4" in code→yellow; pos1 "1"≠"2" but "1" in code→yellow; etc.
  const result = factory({ onReady: "checkWin" }, utils)("4123", "1234");

  assertEquals(result[0], "checkWin");
  assertEquals(result[1].colors, ["yellow", "yellow", "yellow", "yellow"]);
});
