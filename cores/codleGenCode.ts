export type Edge = "onReady";

export type Utils = Record<string, never>;

const defaultUtils: Utils = {};

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  _utils = defaultUtils,
) =>
(): [N, { code: string }] => {
  const code = Math.random().toString().slice(2, 6);
  return [edges.onReady, { code }];
};
