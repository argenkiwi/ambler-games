export type Edge = "onWin" | "onNoWin";

export type Utils = Record<string, never>;

const defaultUtils: Utils = {};

import { hasWon } from "../utils/t3Board.ts";

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  _utils = defaultUtils,
) =>
(
  board: (string | null)[],
  move: number,
  playerChar: string,
): [N, (string | null)[]] => {
  board[move - 1] = playerChar;

  if (hasWon(board, playerChar)) {
    return [edges.onWin, board];
  }

  return [edges.onNoWin, board];
};
