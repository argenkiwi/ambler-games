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
(): [N, void] => {
  utils.print("Rock Paper Scissors Rules:");
  utils.print("  Rock vs Paper: Paper wins");
  utils.print("  Rock vs Scissor: Rock wins");
  utils.print("  Paper vs Scissor: Scissor wins");
  utils.print("  Same choice: Draw");
  utils.print("");

  return [edges.onReady, undefined];
};
