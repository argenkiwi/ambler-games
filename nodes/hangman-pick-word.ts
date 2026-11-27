import type { NodeFactory } from "../ambler.ts";

import { WORDS } from "../utils/hangman.ts";

export interface State {
  word: string;
  guessed: string[];
  misses: number;
}

export type Edge = "onReady";

export type Utils = {
  random: () => number;
};

const defaultUtils: Utils = {
  random: Math.random,
};

/** Starts a round: picks a secret word at random and clears the guesses and misses. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const word = WORDS[Math.floor(utils.random() * WORDS.length)] as string;
    return [edges.onReady, { ...state, word, guessed: [], misses: 0 }];
  };
