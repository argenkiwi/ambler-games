import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../rps-player-choice.ts";

const edges = { onValid: "VALID", onInvalid: "INVALID", onEndOfInput: "EOF" };

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
  const state: State = { choice: 0, choiceName: "" };
  return { state, printed, prompts, result: factory(edges, utils)(state) };
}

for (const [input, choice, choiceName] of [
  ["1", 1, "Rock"],
  ["2", 2, "Paper"],
  ["3", 3, "Scissor"],
] as const) {
  test(`rpsPlayerChoice takes onValid when the player enters ${input}`, async () => {
    const { state, printed, prompts, result } = run(input);
    const [next, newState] = await result;

    expect(next).toBe("VALID");
    expect(newState).toEqual({ choice, choiceName });
    expect(prompts).toEqual([
      "Enter your choice (1=Rock, 2=Paper, 3=Scissor): ",
    ]);
    expect(printed).toEqual([`You chose: ${choiceName}`]);
    expect(state).toEqual({ choice: 0, choiceName: "" });
  });
}

for (const input of ["0", "4", "abc", ""]) {
  test(`rpsPlayerChoice takes onInvalid when the player enters "${input}"`, async () => {
    const { state, printed, result } = run(input);
    const [next, newState] = await result;

    expect(next).toBe("INVALID");
    expect(newState).toEqual(state);
    expect(printed).toEqual([
      "Invalid input (must be 1, 2, or 3). Please try again.",
    ]);
  });
}

test("rpsPlayerChoice takes onEndOfInput when input ends", async () => {
  const { state, printed, result } = run(null);
  const [next, newState] = await result;

  expect(next).toBe("EOF");
  expect(newState).toEqual(state);
  expect(printed).toEqual([]);
});
