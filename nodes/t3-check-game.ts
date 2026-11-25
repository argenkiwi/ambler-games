import type { NodeFactory } from "../ambler.ts";

import { type Board, spaceExists } from "../utils/t3-board.ts";

export interface State {
  board: Board;
  result: string;
}

export type Edge = "onDraw" | "onContinue";

export type Utils = Record<string, never>;

const defaultUtils: Utils = {};

/** Ends in a draw when the board is full. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, _utils = defaultUtils) =>
  (state) => {
    if (spaceExists(state.board)) return [edges.onContinue, state];
    return [edges.onDraw, { ...state, result: "Deuce!" }];
  };
