/** A 3x3 Tic-Tac-Toe board, row by row: each cell is a player's mark or `null` when empty. */
export type Board = (string | null)[];

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
 * Creates an empty board.
 *
 * @returns A board of nine `null` cells.
 */
export function emptyBoard(): Board {
  return Array<string | null>(9).fill(null);
}

/**
 * Check if a player has won on the board.
 *
 * @param board - 9-element array where each cell is `"X"`, `"O"`, or `null` (empty)
 * @param player - The character to check for (`"X"` or `"O"`)
 * @returns `true` if the player has 3 consecutive marks on any winning line
 */
export function hasWon(board: Board, player: string): boolean {
  return WIN_LINES.some((line) => line.every((idx) => board[idx] === player));
}

/**
 * Check if there are still empty cells on the board.
 *
 * @param board - 9-element board array
 * @returns `true` if at least one cell is `null`
 */
export function spaceExists(board: Board): boolean {
  return board.includes(null);
}

/**
 * Check if a 1-indexed move is valid (in range and cell is empty).
 *
 * @param board - 9-element board array
 * @param move - 1-indexed move number (1-9)
 * @returns `true` if the cell at `move - 1` is empty
 */
export function canPlace(board: Board, move: number): boolean {
  return move >= 1 && move <= 9 && board[move - 1] === null;
}

/**
 * Returns a copy of the board with a mark placed.
 *
 * @param board - 9-element board array
 * @param move - 1-indexed move number (1-9)
 * @param player - The mark to place
 * @returns A new board; the input is not changed
 */
export function place(board: Board, move: number, player: string): Board {
  const next = [...board];
  next[move - 1] = player;
  return next;
}

/**
 * Renders the board as text, rows separated by a rule.
 *
 * @param board - 9-element board array
 * @returns The board as it is printed to the player
 */
export function formatBoard(board: Board): string {
  const lines: string[] = [];
  for (let i = 0; i < 9; i++) {
    const char = board[i] ?? " ";
    if (i % 3 === 2) {
      lines.push(i < 8 ? `${char} \n-------\n` : `${char} \n`);
    } else {
      lines.push(`${char} | `);
    }
  }
  return lines.join("");
}
