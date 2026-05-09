export type Edge = "onSuccess";

export type Move = "kick" | "punch" | "sweep" | "crouch" | "block" | "jump";

export type Utils = {
  random: () => number;
};

const defaultUtils: Utils = {
  random: () => Math.random(),
};

const MOVES: Move[] = ["kick", "punch", "sweep", "crouch", "block", "jump"];

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(): [N, Move] => {
  const index = Math.floor(utils.random() * MOVES.length);
  return [edges.onSuccess, MOVES[index]];
};
