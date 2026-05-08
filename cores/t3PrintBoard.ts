export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(board: (string | null)[]): [N, void] => {
  const lines: string[] = [];
  for (let i = 0; i < 9; i++) {
    const cell = board[i];
    const char = cell === null ? " " : cell;
    if (i % 3 === 2) {
      if (i < 8) {
        lines.push(`${char} \n-------\n`);
      } else {
        lines.push(`${char} \n`);
      }
    } else {
      lines.push(`${char} | `);
    }
  }
  utils.print(lines.join(""));

  return [edges.onReady, undefined];
};
