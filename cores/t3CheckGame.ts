export type Edge = "onDraw" | "onContinue";

export type Utils = Record<string, never>;

const defaultUtils: Utils = {};

import { spaceExists } from "../utils/t3Board.ts";

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  _utils = defaultUtils,
) =>
(board: (string | null)[]): [N, void] => {
  if (!spaceExists(board)) {
    return [edges.onDraw, undefined];
  }

  return [edges.onContinue, undefined];
};
