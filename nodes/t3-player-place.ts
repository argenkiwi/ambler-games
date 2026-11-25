import type { NodeFactory } from "../ambler.ts";

import { type Board, hasWon, place } from "../utils/t3-board.ts";

export interface State {
  board: Board;
  move: number;
  playerChar: string;
  result: string;
}

export type Edge = "onWin" | "onNoWin";

export type Utils = Record<string, never>;

const defaultUtils: Utils = {};

/** Marks the player's move and checks whether it wins. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, _utils = defaultUtils) =>
  (state) => {
    const board = place(state.board, state.move, state.playerChar);
    if (hasWon(board, state.playerChar)) {
      return [edges.onWin, { ...state, board, result: "You win!" }];
    }
    return [edges.onNoWin, { ...state, board }];
  };
