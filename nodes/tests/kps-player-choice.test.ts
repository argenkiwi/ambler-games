import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../kps-player-choice.ts";

const edges = { onSuccess: "SUCCESS", onError: "ERROR", onEndOfInput: "EOF" };

function run(input: string | null) {
  const printed: string[] = [];
  const prompts: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: (prompt) => {
      prompts.push(prompt);
      return input;
    },
  };
  const state: State = { playerHealth: 7, cpuHealth: 4 };
  return { state, printed, prompts, result: factory(edges, utils)(state) };
}

for (const [input, playerMove] of [
  ["k", "kick"],
  ["P", "punch"],
  ["s", "sweep"],
  ["c", "crouch"],
  ["b", "block"],
  ["j", "jump"],
] as const) {
  test(`kpsPlayerChoice takes onSuccess with ${playerMove} for "${input}"`, async () => {
    const { state, printed, prompts, result } = run(input);
    const [next, newState] = await result;

    expect(next).toBe("SUCCESS");
    expect(newState).toEqual({ playerHealth: 7, cpuHealth: 4, playerMove });
    expect(printed).toEqual(["\nPlayer: 7 | CPU: 4"]);
    expect(prompts).toEqual(["Enter move [k, p, s, c, b, j]:"]);
    expect(state.playerMove).toBeUndefined();
  });
}

for (const input of ["x", "", "kick"]) {
  test(`kpsPlayerChoice takes onError for "${input}"`, async () => {
    const { state, printed, result } = run(input);
    const [next, newState] = await result;

    expect(next).toBe("ERROR");
    expect(newState).toEqual(state);
    expect(printed).toEqual([
      "\nPlayer: 7 | CPU: 4",
      "Invalid move. Please choose k, p, s, c, b, or j.",
    ]);
  });
}

test("kpsPlayerChoice takes onEndOfInput when input ends", async () => {
  const { state, result } = run(null);
  const [next, newState] = await result;

  expect(next).toBe("EOF");
  expect(newState).toEqual(state);
});
