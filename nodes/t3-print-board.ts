import type { NodeFactory } from "../ambler.ts";

import { type Board, formatBoard } from "../utils/t3-board.ts";

export interface State {
  board: Board;
}

export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

/** Prints the board. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    utils.print(formatBoard(state.board));
    return [edges.onReady, state];
  };
