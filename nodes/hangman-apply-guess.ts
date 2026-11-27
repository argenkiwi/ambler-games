import type { NodeFactory } from "../ambler.ts";

export interface State {
  word: string;
  guessed: string[];
  guess: string;
  misses: number;
}

export type Edge = "onHit" | "onMiss";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

/** Records the guess and counts a miss when the letter is not in the word. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const guessed = [...state.guessed, state.guess];
    const letter = state.guess.toUpperCase();
    if (state.word.includes(state.guess)) {
      utils.print(`Yes, ${letter} is in the word.`);
      return [edges.onHit, { ...state, guessed }];
    }
    utils.print(`No, ${letter} is not in the word.`);
    return [edges.onMiss, { ...state, guessed, misses: state.misses + 1 }];
  };
