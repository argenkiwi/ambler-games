/// Board helpers used by player-place and computer-move.

export const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

/** Check if `player` has won on `board`. */
export function hasWon(board: (string | null)[], player: string): boolean {
  return WIN_LINES.some((line) =>
    line.every((idx) => board[idx] === player)
  );
}

/** Check if there are still empty cells on the board. */
export function spaceExists(board: (string | null)[]): boolean {
  return board.includes(null);
}

/** Try placing a mark at the given 1-indexed move. Returns true if successful. */
export function canPlace(board: (string | null)[], move: number): boolean {
  return move >= 1 && move <= 9 && board[move - 1] === null;
}
