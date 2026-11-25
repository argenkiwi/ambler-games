import { expect, test } from "bun:test";
import { walk } from "../../ambler.ts";
import { emptyBoard } from "../../utils/t3-board.ts";
import { createWalk, type State, type WalkUtils } from "../t3.ts";

const initial: State = {
  board: emptyBoard(),
  playerChar: "",
  computerChar: "",
  move: 0,
  result: "",
};

/** Plays back `inputs` (typed cells, `null` for end of input); the player is X when `playerIsX`. */
function script(inputs: (string | null)[], playerIsX = true) {
  const printed: string[] = [];
  const print = (msg: string) => printed.push(msg);
  const readLine = () => {
    if (inputs.length === 0) throw new Error("script ran out of input");
    return inputs.shift() ?? null;
  };
  const utils: WalkUtils = {
    t3Start: { print, random: () => (playerIsX ? 0 : 1) },
    t3PrintBoard: { print },
    t3PlayerMove: { print, readLine },
    t3End: { print },
  };
  return { utils, printed };
}

// Sequences found by searching the computer's deterministic replies.

test("t3 ends with the computer's win after it completes a line", async () => {
  const { utils, printed } = script(["1", "2", "4"]);

  const final = await walk(createWalk(utils), "T3_START", initial);

  expect(final.result).toBe("You lose!");
  expect(printed.at(-1)).toBe("You lose!");
});

test("t3 retries invalid and taken cells, and ends in the player's win", async () => {
  const { utils, printed } = script(["0", "1", "1", "2", "5", "9"]);

  const final = await walk(createWalk(utils), "T3_START", initial);

  expect(final.result).toBe("You win!");
  expect(
    printed.filter((line) => line === " Invalid number ! Try again !"),
  ).toHaveLength(2);
  expect(printed.at(-1)).toBe("You win!");
});

test("t3 ends in a draw when the board fills", async () => {
  const { utils, printed } = script(["1", "3", "4", "8", "6"]);

  const final = await walk(createWalk(utils), "T3_START", initial);

  expect(final.result).toBe("Deuce!");
  expect(final.board.includes(null)).toBe(false);
  expect(printed.at(-1)).toBe("Deuce!");
});

test("t3 halts when input ends", async () => {
  const { utils } = script([null]);

  const final = await walk(createWalk(utils), "T3_START", initial);

  expect(final.result).toBe("");
});
