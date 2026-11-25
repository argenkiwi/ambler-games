export type Edge = "onReady";

export type Utils = Record<string, never>;

const defaultUtils: Utils = {};

export type Color = "green" | "yellow" | "white";

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  _utils = defaultUtils,
) =>
(guess: string, code: string): [N, { colors: Color[] }] => {
  const colors: Color[] = [];

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === code[i]) {
      colors.push("green");
      continue;
    }

    if (code.includes(guess[i])) {
      colors.push("yellow");
      continue;
    }

    colors.push("white");
  }

  return [edges.onReady, { colors }];
};
