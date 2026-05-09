/**
 * Winning line indices for a 3x3 Tic-Tac-Toe board.
 * Covers rows, columns, and diagonals.
 */
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

/**
 * Check if a player has won on the board.
 *
 * @param board - 9-element array where each cell is `"X"`, `"O"`, or `null` (empty)
 * @param player - The character to check for (`"X"` or `"O"`)
 * @returns `true` if the player has 3 consecutive marks on any winning line
 */
export function hasWon(board: (string | null)[], player: string): boolean {
  return WIN_LINES.some((line) => line.every((idx) => board[idx] === player));
}

/**
 * Check if there are still empty cells on the board.
 *
 * @param board - 9-element board array
 * @returns `true` if at least one cell is `null`
 */
export function spaceExists(board: (string | null)[]): boolean {
  return board.includes(null);
}

/**
 * Check if a 1-indexed move is valid (in range and cell is empty).
 *
 * @param board - 9-element board array
 * @param move - 1-indexed move number (1-9)
 * @returns `true` if the cell at `move - 1` is empty
 */
export function canPlace(board: (string | null)[], move: number): boolean {
  return move >= 1 && move <= 9 && board[move - 1] === null;
}
