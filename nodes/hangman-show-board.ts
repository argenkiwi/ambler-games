import type { NodeFactory } from "../ambler.ts";

import { gallows, maskWord } from "../utils/hangman.ts";

export interface State {
  word: string;
  guessed: string[];
  misses: number;
  maxMisses: number;
}

export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

/** Prints the gallows, the masked word, the letters guessed and the lives left. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const guessed = state.guessed.map((letter) => letter.toUpperCase());
    utils.print(gallows(state.misses));
    utils.print(`Word: ${maskWord(state.word, state.guessed)}`);
    utils.print(`Guessed: ${guessed.length ? guessed.join(", ") : "(none)"}`);
    utils.print(`Lives: ${state.maxMisses - state.misses}`);
    return [edges.onReady, state];
  };
