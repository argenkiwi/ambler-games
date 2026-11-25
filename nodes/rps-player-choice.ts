import type { NodeFactory } from "../ambler.ts";

export interface State {
  choice: number;
  choiceName: string;
}

export type Edge = "onValid" | "onInvalid" | "onEndOfInput";

export type Utils = {
  print: (msg: string) => void;
  readLine: (prompt: string) => string | null;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  readLine: (msg) => prompt(msg),
};

/** Reads the player's choice: 1 Rock, 2 Paper, 3 Scissor. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const raw = utils.readLine(
      "Enter your choice (1=Rock, 2=Paper, 3=Scissor): ",
    );
    if (raw === null) return [edges.onEndOfInput, state];

    const choice = Number(raw.trim());
    const choiceName = CHOICE_NAMES[choice];
    if (!choiceName) {
      utils.print("Invalid input (must be 1, 2, or 3). Please try again.");
      return [edges.onInvalid, state];
    }

    utils.print(`You chose: ${choiceName}`);
    return [edges.onValid, { ...state, choice, choiceName }];
  };

const CHOICE_NAMES: Record<number, string> = {
  1: "Rock",
  2: "Paper",
  3: "Scissor",
};
