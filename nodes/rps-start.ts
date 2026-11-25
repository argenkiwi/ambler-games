import type { NodeFactory } from "../ambler.ts";

export type State = object;

export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

/** Prints the Rock Paper Scissors rules. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    utils.print("Rock Paper Scissors Rules:");
    utils.print("  Rock vs Paper: Paper wins");
    utils.print("  Rock vs Scissor: Rock wins");
    utils.print("  Paper vs Scissor: Scissor wins");
    utils.print("  Same choice: Draw");
    utils.print("");
    return [edges.onReady, state];
  };
