import type { NodeFactory } from "../ambler.ts";
import { type Board, canMove, type Ending, hasWon } from "../utils/game2048.ts";

export interface State {
  board: Board;
  won: boolean;
  ending: Ending;
}

export type Edge = "onWon" | "onLost" | "onContinue";

export type Utils = Record<string, never>;

/** Decides whether the player has just reached 2048, has run out of moves, or plays on. */
export const factory: NodeFactory<State, Edge, Utils> = (edges) => (state) => {
  if (hasWon(state.board) && !state.won) {
    return [edges.onWon, { ...state, won: true }];
  }
  if (!canMove(state.board)) {
    return [edges.onLost, { ...state, ending: "loss" }];
  }
  return [edges.onContinue, state];
};
