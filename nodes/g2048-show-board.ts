import type { NodeFactory } from "../ambler.ts";
import { type Board, formatBoard } from "../utils/game2048.ts";

export interface State {
  board: Board;
  score: number;
}

export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

/** Prints the board as a grid, followed by the score. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    utils.print(formatBoard(state.board));
    utils.print(`Score: ${state.score}`);
    return [edges.onReady, state];
  };
