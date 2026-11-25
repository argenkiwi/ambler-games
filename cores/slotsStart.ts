export type Edge = "onSuccess";

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
(): [N, number] => {
  utils.print("Welcome to the Slot Machine!");
  utils.print("You start with 200 points.");
  utils.print("Rules:");
  utils.print("  3 identical symbols: 10x Bet");
  utils.print("  2 identical symbols: 2x Bet");
  utils.print("  Enter 0 to quit.");
  utils.print("");

  return [edges.onSuccess, 200];
};
