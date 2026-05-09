export type Edge = "onWin" | "onLose" | "onContinue";

export type Utils = Record<string, never>;

const defaultUtils: Utils = {};

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  _utils = defaultUtils,
) =>
(guess: string, code: string, attemptsLeft: number): [N, void] => {
  if (guess === code) {
    return [edges.onWin, undefined];
  }

  if (attemptsLeft <= 1) {
    return [edges.onLose, undefined];
  }

  return [edges.onContinue, undefined];
};
