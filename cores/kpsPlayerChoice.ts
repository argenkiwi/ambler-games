export type Edge = "onSuccess" | "onError";

export type Move = "kick" | "punch" | "sweep" | "crouch" | "block" | "jump";

export type Utils = {
  print: (msg: string) => void;
  prompt: (msg: string) => string | null;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  prompt: (msg) => prompt(msg),
};

const MOVE_MAP: Record<string, Move> = {
  k: "kick",
  p: "punch",
  s: "sweep",
  c: "crouch",
  b: "block",
  j: "jump",
};

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(playerHealth: number, cpuHealth: number): [N, Move | undefined] => {
  utils.print(`\nPlayer: ${playerHealth} | CPU: ${cpuHealth}`);
  const input = utils.prompt("Enter move [k, p, s, c, b, j]:");

  if (input && MOVE_MAP[input.toLowerCase()]) {
    return [edges.onSuccess, MOVE_MAP[input.toLowerCase()]];
  }

  utils.print("Invalid move. Please choose k, p, s, c, b, or j.");
  return [edges.onError, undefined];
};
