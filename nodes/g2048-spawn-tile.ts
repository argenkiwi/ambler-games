import type { NodeFactory } from "../ambler.ts";
import { addTile, type Board } from "../utils/game2048.ts";

export interface State {
  board: Board;
}

export type Edge = "onReady";

export type Utils = {
  random: () => number;
};

const defaultUtils: Utils = {
  random: Math.random,
};

/** Places a 2 (nine times in ten) or a 4 in a random empty cell. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => [
    edges.onReady,
    { ...state, board: addTile(state.board, utils.random) },
  ];
