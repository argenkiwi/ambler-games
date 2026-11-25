import type { NodeFactory } from "../ambler.ts";

export interface State {
  choice: number;
  compChoice: number;
  result: string;
}

export type Edge = "onReady";

export type Utils = Record<string, never>;

const defaultUtils: Utils = {};

/** Works out the winning choice, or `Draw`. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, _utils = defaultUtils) =>
  (state) => {
    const { choice, compChoice } = state;
    // 1 Rock, 2 Paper, 3 Scissor: each beats the one before it, wrapping round.
    const winner =
      choice === compChoice
        ? 0
        : (choice - compChoice + 3) % 3 === 1
          ? choice
          : compChoice;
    return [edges.onReady, { ...state, result: NAMES[winner] }];
  };

const NAMES = ["Draw", "Rock", "Paper", "Scissor"];
