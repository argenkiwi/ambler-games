import type { NodeFactory } from "../ambler.ts";

import { type Board, formatBoard } from "../utils/t3-board.ts";

export interface State {
  board: Board;
  result: string;
}

export type Edge = "onDone";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

/** Prints the final board and the result. Terminal. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    utils.print(formatBoard(state.board));
    utils.print(state.result);
    return [edges.onDone, state];
  };
