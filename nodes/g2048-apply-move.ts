import type { NodeFactory } from "../ambler.ts";
import { type Board, type Direction, slide } from "../utils/game2048.ts";

export interface State {
  board: Board;
  score: number;
  direction: Direction;
}

export type Edge = "onMoved" | "onNoEffect";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

/** Slides and merges the tiles in the current direction, scoring each merge. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const { board, gained, changed } = slide(state.board, state.direction);
    if (!changed) {
      utils.print("That move has no effect.");
      return [edges.onNoEffect, state];
    }
    return [edges.onMoved, { ...state, board, score: state.score + gained }];
  };
