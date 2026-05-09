export type Edge = "onEnd";

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
  utils.print(`Final balance: ${balance}`);
  utils.print("Thanks for playing!");

  return [edges.onEnd, undefined];
};
