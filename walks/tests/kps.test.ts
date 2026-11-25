import { expect, test } from "bun:test";
import { walk } from "../../ambler.ts";
import { createWalk, type State, type WalkUtils } from "../kps.ts";

const initial: State = { playerHealth: 0, cpuHealth: 0 };

/** Plays back `inputs` (typed lines, `null` for end of input) and `randoms`, recording what is printed. */
function script(inputs: (string | null)[], randoms: number[]) {
  const printed: string[] = [];
  const print = (msg: string) => printed.push(msg);
  const readLine = () => {
    if (inputs.length === 0) throw new Error("script ran out of input");
    return inputs.shift() ?? null;
  };
  const utils: WalkUtils = {
    kpsStart: { print },
    kpsPlayerChoice: { print, readLine },
    kpsComputerChoice: { random: () => randoms.shift() ?? 0 },
    kpsCompare: { print },
    kpsResult: { print },
    playAgain: { readLine },
    stop: { print },
  };
  return { utils, printed };
}

// random 0.2 picks "punch"; kick beats punch for 2 damage, so five kicks win.
const PUNCH = 0.2;

test("kps retries a bad move, wins by KO, replays and stops when input ends", async () => {
  const kicks = ["k", "k", "k", "k", "k"];
  const { utils, printed } = script(
    ["x", ...kicks, "y", null],
    Array(5).fill(PUNCH),
  );

  const final = await walk(createWalk(utils), "KPS_START", initial);

  expect(final).toEqual({
    playerHealth: 10,
    cpuHealth: 10,
    playerMove: "kick",
    cpuMove: "punch",
    outcome: "Win",
  });
  expect(printed).toContain("Invalid move. Please choose k, p, s, c, b, or j.");
  expect(printed.filter((line) => line === "Outcome: Win!")).toHaveLength(5);
  expect(printed).toContain("You are VICTORIOUS!");
  expect(
    printed.filter((line) => line === "Welcome to Knight-Paper-Scissors!"),
  ).toHaveLength(2);
  expect(printed.at(-1)).toBe("Thanks for playing!");
});

test("kps stops when the player declines another game", async () => {
  const { utils, printed } = script(
    ["k", "k", "k", "k", "k", "n"],
    Array(5).fill(PUNCH),
  );

  const final = await walk(createWalk(utils), "KPS_START", initial);

  expect(final.cpuHealth).toBe(0);
  expect(printed.at(-1)).toBe("Thanks for playing!");
});
