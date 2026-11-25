import type { NodeFactory } from "../ambler.ts";

import { type Board, canPlace, hasWon, place } from "../utils/t3-board.ts";

export interface State {
  board: Board;
  playerChar: string;
  computerChar: string;
  result: string;
}

export type Edge = "onWin" | "onNoWin";

export type Utils = Record<string, never>;

const defaultUtils: Utils = {};

/** Marks the computer's move (win, else block, else best cell) and checks whether it wins. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, _utils = defaultUtils) =>
  (state) => {
    const { board, playerChar, computerChar } = state;
    const open = CELLS.filter((cell) => canPlace(board, cell));
    const winning = (mark: string) =>
      open.find((cell) => hasWon(place(board, cell, mark), mark));

    const move =
      winning(computerChar) ??
      winning(playerChar) ??
      PREFERENCE.find((cell) => canPlace(board, cell));
    if (move === undefined) {
      throw new Error("Cannot move: the board is full");
    }

    const next = place(board, move, computerChar);
    if (hasWon(next, computerChar)) {
      return [edges.onWin, { ...state, board: next, result: "You lose!" }];
    }
    return [edges.onNoWin, { ...state, board: next }];
  };

const CELLS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/** Corners, then the centre, then the edges. */
const PREFERENCE = [1, 7, 3, 9, 5, 2, 4, 6, 8];
