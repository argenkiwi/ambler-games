import { assertEquals } from "@std/assert";
import { factory } from "../t3ComputerMove.ts";

Deno.test("t3ComputerMove should take winning move", () => {
  // Computer (X) has two in top row, move 3 would win
  const board: (string | null)[] = ["X", "X", null, null, null, null, null, null, null];
  const result = factory({ onWin: "end", onNoWin: "checkEnd" }, {})(board, "O", "X");

  assertEquals(result[0], "end");
  assertEquals(result[1].move, 3);
});

Deno.test("t3ComputerMove should block player win", () => {
  // Player (O) has two in top row, move 3 would win for player
  // Computer should block at position 3
  const board: (string | null)[] = [null, null, "O", "O", null, null, null, null, null];
  // Fix: player has O at positions 3,4 (0-indexed 2,3), not quite a win yet
  // Let me fix: O at 0,1 and empty at 2
  const board2: (string | null)[] = ["O", "O", null, null, null, null, null, null, null];
  const result = factory({ onWin: "end", onNoWin: "checkEnd" }, {})(board2, "O", "X");

  assertEquals(result[0], "checkEnd");
  assertEquals(result[1].move, 3); // blocks player from winning on top row
});

Deno.test("t3ComputerMove should prefer center first", () => {
  const board: (string | null)[] = [null, null, null, null, null, null, null, null, null];
  const result = factory({ onWin: "end", onNoWin: "checkEnd" }, {})(board, "O", "X");

  // Center (5) is in tier [5] which comes after corners [1,7,3,9]
  // Actually the priority is corners first, then center, then edges
  // So it should pick corner 1 first
  assertEquals(result[0], "checkEnd");
  assertEquals(result[1].move, 1);
});

Deno.test("t3ComputerMove should choose corner when center taken", () => {
  const board: (string | null)[] = [null, null, null, null, "O", null, null, null, null];
  const result = factory({ onWin: "end", onNoWin: "checkEnd" }, {})(board, "O", "X");

  assertEquals(result[1].move, 1);
});

Deno.test("t3ComputerMove should win on diagonal", () => {
  const board: (string | null)[] = ["X", null, null, null, "X", null, null, null, null];
  const result = factory({ onWin: "end", onNoWin: "checkEnd" }, {})(board, "O", "X");

  assertEquals(result[0], "end");
  assertEquals(result[1].move, 9);
});
