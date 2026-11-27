import type { NodeFactory } from "../ambler.ts";

import { isSolved } from "../utils/hangman.ts";

export interface State {
  word: string;
  guessed: string[];
  misses: number;
  maxMisses: number;
}

export type Edge = "onWon" | "onLost" | "onContinue";

export type Utils = Record<string, never>;

const defaultUtils: Utils = {};

/** Decides whether the round is won, lost or still going. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, _utils = defaultUtils) =>
  (state) => {
    if (isSolved(state.word, state.guessed)) return [edges.onWon, state];
    if (state.misses >= state.maxMisses) return [edges.onLost, state];
    return [edges.onContinue, state];
  };
