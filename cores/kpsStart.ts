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
(): [N, { playerHealth: number; cpuHealth: number }] => {
  utils.print("Welcome to Knight-Paper-Scissors!");
  utils.print("Health: 10 each. First to 0 loses.");
  utils.print("Moves: [k]ick, [p]unch, [s]weep, [c]rouch, [b]lock, [j]ump");
  utils.print("");

  return [edges.onReady, { playerHealth: 10, cpuHealth: 10 }];
};
