import type { NodeFactory } from "../ambler.ts";

export interface State {
  guessed: string[];
  guess: string;
}

export type Edge = "onValid" | "onInvalid" | "onRepeated";

export type Utils = {
  print: (msg: string) => void;
  readLine: (prompt: string) => string | null;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  readLine: (msg) => prompt(msg),
};

/** Reads the player's next letter; throws when input has ended. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const raw = utils.readLine("Guess a letter: ");
    if (raw === null)
      throw new Error("Could not read a guess: input has ended.");

    const guess = raw.trim().toLowerCase();
    if (!/^[a-z]$/.test(guess)) {
      utils.print("Please enter a single letter from A to Z.");
      return [edges.onInvalid, state];
    }
    if (state.guessed.includes(guess)) {
      utils.print(`You have already guessed ${guess.toUpperCase()}.`);
      return [edges.onRepeated, state];
    }
    return [edges.onValid, { ...state, guess }];
  };
