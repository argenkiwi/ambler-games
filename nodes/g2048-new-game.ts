import type { NodeFactory } from "../ambler.ts";
import { addTile, type Board, emptyBoard } from "../utils/game2048.ts";

export interface State {
  board: Board;
  score: number;
  won: boolean;
}

export type Edge = "onReady";

export type Utils = {
  random: () => number;
};

const defaultUtils: Utils = {
  random: Math.random,
};

/** Starts a game: clears the board, the score and the win flag, then places two tiles. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const board = addTile(addTile(emptyBoard(), utils.random), utils.random);
    return [edges.onReady, { ...state, board, score: 0, won: false }];
  };
