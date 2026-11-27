import type { NodeFactory } from "../ambler.ts";

import { gallows, isSolved } from "../utils/hangman.ts";

export interface State {
  word: string;
  guessed: string[];
  misses: number;
}

export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

/** Prints the final gallows and the word, and says whether the player won. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    utils.print(gallows(state.misses));
    utils.print(`The word was ${state.word.toUpperCase()}.`);
    utils.print(isSolved(state.word, state.guessed) ? "You win!" : "You lose!");
    return [edges.onReady, state];
  };
