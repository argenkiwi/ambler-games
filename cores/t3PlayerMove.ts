export type Edge = "onInvalid" | "onValid";

export type Utils = {
  print: (msg: string) => void;
  readLine: (prompt: string) => string | null;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  readLine: (msg: string) => prompt(msg),
};

import { canPlace } from "./t3Helpers.ts";

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(board: (string | null)[]): [N, { move: number }] => {
  while (true) {
    const raw = utils.readLine("#Make your move ! [1-9] : ");

    if (raw === null) {
      utils.print(" Invalid number ! Try again !");
      continue;
    }

    const num = parseInt(raw, 10);
    if (isNaN(num) || num < 1 || num > 9) {
      utils.print(" Invalid number ! Try again !");
      continue;
    }

    if (!canPlace(board, num)) {
      utils.print(" Invalid number ! Try again !");
      continue;
    }

    return [edges.onValid, { move: num }];
  }
};
