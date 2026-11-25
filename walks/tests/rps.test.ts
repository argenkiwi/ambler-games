import { expect, test } from "bun:test";
import { walk } from "../../ambler.ts";
import { createWalk, type State, type WalkUtils } from "../rps.ts";

const initial: State = {
  choice: 0,
  choiceName: "",
  compChoice: 0,
  compChoiceName: "",
  result: "",
};

/** Plays back `inputs` (typed lines, `null` for end of input) and `randoms`, recording what is printed. */
function script(inputs: (string | null)[], randoms: number[]) {
  const printed: string[] = [];
  const print = (msg: string) => printed.push(msg);
  const readLine = () => {
    if (inputs.length === 0) throw new Error("script ran out of input");
    return inputs.shift() ?? null;
  };
  const utils: WalkUtils = {
    rpsStart: { print },
    rpsPlayerChoice: { print, readLine },
    rpsComputerChoice: { print, random: () => randoms.shift() ?? 0 },
    rpsResult: { print },
    playAgain: { readLine },
    stop: { print },
  };
  return { utils, printed };
}

test("rps retries invalid input, plays two rounds and stops when declined", async () => {
  const { utils, printed } = script(["9", "2", "y", "1", "n"], [0, 0.5]);

  const final = await walk(createWalk(utils), "RPS_START", initial);

  expect(final).toEqual({
    choice: 1,
    choiceName: "Rock",
    compChoice: 2,
    compChoiceName: "Paper",
    result: "Paper",
  });
  expect(printed.slice(6)).toEqual([
    "Invalid input (must be 1, 2, or 3). Please try again.",
    "You chose: Paper",
    "Computer chose: Rock",
    "You win! Paper beats Rock",
    "You chose: Rock",
    "Computer chose: Paper",
    "Computer wins! Paper beats Rock",
    "Thanks for playing!",
  ]);
});

test("rps stops when input ends at the choice", async () => {
  const { utils, printed } = script([null], []);

  const final = await walk(createWalk(utils), "RPS_START", initial);

  expect(final).toEqual(initial);
  expect(printed.at(-1)).toBe("Thanks for playing!");
});
