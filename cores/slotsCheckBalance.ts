export type Edge = "onContinue" | "onGameOver";

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
(balance: number): [N, void] => {
  if (balance <= 0) {
    utils.print("You've run out of points!");
    return [edges.onGameOver, undefined];
  }

  return [edges.onContinue, undefined];
};
