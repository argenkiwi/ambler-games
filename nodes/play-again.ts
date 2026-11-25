import type { NodeFactory } from "../ambler.ts";

export type State = object;

export type Edge = "onYes" | "onNo";

export type Utils = {
  readLine: (prompt: string) => string | null;
};

const defaultUtils: Utils = {
  readLine: (msg) => prompt(msg),
};

/** Asks whether to play another game. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const raw = utils.readLine("Play again? (Y/N): ");
    return [
      raw?.trim().toLowerCase() === "y" ? edges.onYes : edges.onNo,
      state,
    ];
  };
