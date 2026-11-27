/** The four-by-four grid; `0` marks an empty cell, anything else is a tile value. */
export type Board = number[][];

/** A direction the tiles can slide in. */
export type Direction = "left" | "right" | "up" | "down";

/** How a game ended. */
export type Ending = "loss" | "win" | "quit";

/** The number of rows and columns of the board. */
export const SIZE = 4;

/** The tile value that wins the game. */
export const TARGET = 2048;

/**
 * Makes a board with no tiles.
 *
 * @returns A new board of empty cells.
 */
export function emptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array<number>(SIZE).fill(0));
}

/**
 * Slides one line towards its start, merging equal neighbours once each.
 *
 * @param line The values of a row or column, read in the direction of travel.
 * @returns The new line and the total value of the merges made.
 */
function slideLine(line: readonly number[]): {
  line: number[];
  gained: number;
} {
  const tiles = line.filter((value) => value !== 0);
  const out: number[] = [];
  let gained = 0;
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i] as number;
    if (tile === tiles[i + 1]) {
      out.push(tile * 2);
      gained += tile * 2;
      i++;
    } else {
      out.push(tile);
    }
  }
  while (out.length < SIZE) out.push(0);
  return { line: out, gained };
}

/**
 * Slides every tile as far as it will go.
 *
 * @param board The board before the move; it is not changed.
 * @param direction The direction of travel.
 * @returns The new board, the score gained and whether anything moved or merged.
 */
export function slide(
  board: Board,
  direction: Direction,
): { board: Board; gained: number; changed: boolean } {
  const result = emptyBoard();
  let gained = 0;
  for (let i = 0; i < SIZE; i++) {
    const coords = Array.from({ length: SIZE }, (_, j): [number, number] => {
      const k = direction === "left" || direction === "up" ? j : SIZE - 1 - j;
      return direction === "left" || direction === "right" ? [i, k] : [k, i];
    });
    const moved = slideLine(coords.map(([r, c]) => board[r]?.[c] as number));
    gained += moved.gained;
    coords.forEach(([r, c], j) => {
      (result[r] as number[])[c] = moved.line[j] as number;
    });
  }
  const changed = result.some((row, r) =>
    row.some((value, c) => value !== board[r]?.[c]),
  );
  return { board: result, gained, changed };
}

/**
 * Lists the empty cells.
 *
 * @param board The board to look at.
 * @returns The `[row, column]` of each empty cell, in reading order.
 */
export function emptyCells(board: Board): [number, number][] {
  const cells: [number, number][] = [];
  for (const [r, row] of board.entries()) {
    for (const [c, value] of row.entries()) {
      if (value === 0) cells.push([r, c]);
    }
  }
  return cells;
}

/**
 * Puts a tile in a random empty cell: a 2 nine times out of ten, otherwise a 4.
 *
 * @param board The board before; it is not changed.
 * @param random Gives a number in `[0, 1)`; called once for the cell and once for the value.
 * @returns A new board, or the same values when no cell is empty.
 */
export function addTile(board: Board, random: () => number): Board {
  const cells = emptyCells(board);
  const next = board.map((row) => [...row]);
  if (cells.length === 0) return next;
  const [r, c] = cells[Math.floor(random() * cells.length)] as [number, number];
  (next[r] as number[])[c] = random() < 0.9 ? 2 : 4;
  return next;
}

/**
 * Tells whether the board holds a winning tile.
 *
 * @param board The board to look at.
 * @returns `true` when a tile is 2048 or higher.
 */
export function hasWon(board: Board): boolean {
  return board.some((row) => row.some((value) => value >= TARGET));
}

/**
 * Tells whether any move could still change the board.
 *
 * @param board The board to look at.
 * @returns `true` when a cell is empty or two equal tiles sit side by side.
 */
export function canMove(board: Board): boolean {
  return board.some((row, r) =>
    row.some(
      (value, c) =>
        value === 0 || value === row[c + 1] || value === board[r + 1]?.[c],
    ),
  );
}

/**
 * Draws the board with dots for empty cells and right-aligned values.
 *
 * @param board The board to draw.
 * @returns One line per row.
 */
export function formatBoard(board: Board): string {
  const width = Math.max(
    1,
    ...board.flatMap((row) => row.map((value) => String(value).length)),
  );
  return board
    .map((row) =>
      row
        .map((value) => (value === 0 ? "." : String(value)).padStart(width))
        .join(" "),
    )
    .join("\n");
}
