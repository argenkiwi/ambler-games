export type Edge = "onYes" | "onNo";

export type Utils = {
  print: (msg: string) => void;
  readLine: (prompt: string) => string | null;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  readLine: (msg: string) => prompt(msg),
};

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(): [N, void] => {
  const raw = utils.readLine("Play again? (Y/N): ");

  if (raw?.toLowerCase() === "y") {
    return [edges.onYes, undefined];
  }

  return [edges.onNo, undefined];
};
