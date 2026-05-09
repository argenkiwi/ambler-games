export type Edge = "onWin" | "onNoWin";

export type Utils = Record<string, never>;

const defaultUtils: Utils = {};

import { canPlace, hasWon } from "../utils/t3Board.ts";

/**
 * Computer AI using the same priority strategy as the original Python script:
 * 1. Try to win immediately.
 * 2. If can't win, block the player from winning.
 * 3. Otherwise prefer center → corners → edges.
 */
export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  _utils = defaultUtils,
) =>
(
  board: (string | null)[],
  playerChar: string,
  computerChar: string,
): [N, { move: number; board: (string | null)[] }] => {
  const PRIORITIES = [
    [1, 7, 3, 9], // corners
    [5], // center
    [2, 4, 6, 8], // edges
  ];

  let move: number | undefined;

  // 1. Try to win
  for (let i = 1; i <= 9; i++) {
    if (canPlace(board, i)) {
      board[i - 1] = computerChar;
      if (hasWon(board, computerChar)) {
        move = i;
        break;
      }
      board[i - 1] = null; // undo
    }
  }

  // 2. Block player from winning
  if (move === undefined) {
    for (let i = 1; i <= 9; i++) {
      if (canPlace(board, i)) {
        board[i - 1] = playerChar;
        if (hasWon(board, playerChar)) {
          move = i;
          board[i - 1] = null; // undo
          break;
        }
        board[i - 1] = null; // undo
      }
    }
  }

  // 3. Prefer center → corners → edges
  if (move === undefined) {
    for (const tier of PRIORITIES) {
      for (const mv of tier) {
        if (canPlace(board, mv)) {
          move = mv;
          break;
        }
      }
      if (move !== undefined) break;
    }
  }

  // 4. Fallback (should never happen if spaceExists is true)
  if (move === undefined) {
    for (let i = 1; i <= 9; i++) {
      if (canPlace(board, i)) {
        move = i;
        break;
      }
    }
  }

  board[move! - 1] = computerChar;

  if (hasWon(board, computerChar)) {
    return [edges.onWin, { move: move!, board }];
  }

  return [edges.onNoWin, { move: move!, board }];
};
