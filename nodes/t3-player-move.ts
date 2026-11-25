import type { NodeFactory } from "../ambler.ts";

import { type Board, canPlace } from "../utils/t3-board.ts";

export interface State {
  board: Board;
  move: number;
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

/** Reads the cell (1-9) the player wants to mark. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const raw = utils.readLine("#Make your move ! [1-9] : ");
    if (raw === null) return [edges.onEndOfInput, state];

    const move = Number(raw.trim());
    if (!Number.isInteger(move) || !canPlace(state.board, move)) {
      utils.print(" Invalid number ! Try again !");
      return [edges.onInvalid, state];
    }
    return [edges.onValid, { ...state, move }];
  };
