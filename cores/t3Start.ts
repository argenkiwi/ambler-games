export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
  randomBool: () => boolean;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  randomBool: () => Math.random() < 0.5,
};

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(): [
  N,
  { playerChar: string; computerChar: string; board: (string | null)[] },
] => {
  const playerChar = utils.randomBool() ? "X" : "O";
  const computerChar = playerChar === "X" ? "O" : "X";
  const board: (string | null)[] = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  utils.print(`Player is [${playerChar}] and computer is [${computerChar}]`);

  return [edges.onReady, { playerChar, computerChar, board }];
};
