import type { NodeFactory } from "../ambler.ts";

export interface State {
  compChoice: number;
  compChoiceName: string;
}

export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
  random: () => number;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  random: Math.random,
};

/** Picks the computer's choice at random and announces it. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const compChoice = Math.floor(utils.random() * 3) + 1;
    const compChoiceName = CHOICE_NAMES[compChoice - 1];
    utils.print(`Computer chose: ${compChoiceName}`);
    return [edges.onReady, { ...state, compChoice, compChoiceName }];
  };

const CHOICE_NAMES = ["Rock", "Paper", "Scissor"];
