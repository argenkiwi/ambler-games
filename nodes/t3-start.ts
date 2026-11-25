import type { NodeFactory } from "../ambler.ts";

import { type Board, emptyBoard } from "../utils/t3-board.ts";

export interface State {
  board: Board;
  playerChar: string;
  computerChar: string;
}

export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
  random: () => number;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  random: Math.random,
};

/** Clears the board and gives the player X or O at random. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const playerChar = utils.random() < 0.5 ? "X" : "O";
    const computerChar = playerChar === "X" ? "O" : "X";
    utils.print(`Player is [${playerChar}] and computer is [${computerChar}]`);
    return [
      edges.onReady,
      { ...state, board: emptyBoard(), playerChar, computerChar },
    ];
  };
