import { expect, test } from "bun:test";
import { WalkError, walk } from "../../ambler.ts";
import { emptyBoard } from "../../utils/game2048.ts";
import { createWalk, type State, type WalkUtils } from "../2048.ts";

const initial = (): State => ({
  board: emptyBoard(),
  score: 0,
  won: false,
  direction: "left",
  ending: "quit",
});

/** Plays back `inputs` (`null` for end of input); `random` feeds both tile placement and spawning. */
function script(inputs: (string | null)[], random: () => number = () => 0) {
  const printed: string[] = [];
  const print = (msg: string) => printed.push(msg);
  const readLine = () => {
    if (inputs.length === 0) throw new Error("script ran out of input");
    return inputs.shift() ?? null;
  };
  const utils: WalkUtils = {
    g2048NewGame: { random },
    g2048ShowBoard: { print },
    g2048ReadMove: { print, readLine },
    g2048ApplyMove: { print },
    g2048SpawnTile: { random },
    g2048Win: { print, readLine },
    g2048GameOver: { print },
    hangmanPlayAgain: { print, readLine },
    stop: { print },
  };
  return { utils, printed };
}

// With random() = 0 the starting tiles land in the first two cells of the top row: [2, 2, 0, 0].

test("2048 retries bad moves, merges, spawns, ignores a no-op, quits and says goodbye", async () => {
  const { utils, printed } = script(["z", "l", "l", "x", "no"]);

  const final = await walk(createWalk(utils), "NEW_GAME", initial());

  expect(printed).toContain("Please enter L, R, T, B or X.");
  expect(printed).toContain("That move has no effect.");
  expect(final.score).toBe(4);
  expect(final.ending).toBe("quit");
  expect(printed).toContain("Score: 4");
  expect(printed).toContain("You quit the game.");
  expect(printed.at(-1)).toBe("Thanks for playing!");
});

test("2048 ends in a loss when the board locks, then plays another game", async () => {
  const { utils, printed } = script(["l", "yes", "x", "no"]);
  // Sliding left leaves one gap; the spawned 2 (random 0.5) locks the board.
  const state: State = {
    ...initial(),
    board: [
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [0, 4, 2, 4],
    ],
  };
  const walkUtils: WalkUtils = {
    ...utils,
    g2048SpawnTile: { random: () => 0.5 },
  };

  const final = await walk(createWalk(walkUtils), "SHOW_BOARD", state);

  expect(printed).toContain("Game over: no moves remain. You lose!");
  expect(printed.filter((line) => line === "You quit the game.")).toHaveLength(
    1,
  );
  expect(final.score).toBe(0);
  expect(printed.at(-1)).toBe("Thanks for playing!");
});

test("2048 asks again on an unclear answer, keeps playing after 2048, and counts a later quit as a win", async () => {
  const { utils, printed } = script(["l", "maybe", "yes", "x", "n"]);
  const state: State = {
    ...initial(),
    board: [
      [1024, 1024, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  };

  const final = await walk(createWalk(utils), "SHOW_BOARD", state);

  expect(printed.filter((line) => line === "You reached 2048!")).toHaveLength(
    2,
  );
  expect(printed).toContain("Please answer yes or no.");
  expect(final.won).toBe(true);
  expect(final.score).toBe(2048);
  expect(printed).toContain("You win! You stopped at 2048.");
});

test("2048 ends as a win when the player stops at 2048", async () => {
  const { utils, printed } = script(["l", "no", "n"]);
  const state: State = {
    ...initial(),
    board: [
      [1024, 1024, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  };

  const final = await walk(createWalk(utils), "SHOW_BOARD", state);

  expect(final.ending).toBe("win");
  expect(printed).toContain("You win! You stopped at 2048.");
  expect(printed.at(-1)).toBe("Thanks for playing!");
});

test("2048 stops with an error when input ends while reading a move", async () => {
  const { utils } = script([null]);

  expect(
    async () => await walk(createWalk(utils), "NEW_GAME", initial()),
  ).toThrow(WalkError);
});

test("2048 stops with an error when input ends at play again", async () => {
  const { utils } = script(["x", null]);

  expect(
    async () => await walk(createWalk(utils), "NEW_GAME", initial()),
  ).toThrow(WalkError);
});
