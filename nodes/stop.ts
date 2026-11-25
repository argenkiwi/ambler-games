import type { NodeFactory } from "../ambler.ts";

export type State = object;

export type Edge = "onDone";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

/** Says goodbye. Terminal. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    utils.print("Thanks for playing!");
    return [edges.onDone, state];
  };
