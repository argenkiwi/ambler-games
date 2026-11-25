import type { NodeFactory } from "../ambler.ts";

import { STARTING_HEALTH } from "../utils/kps.ts";

export interface State {
  playerHealth: number;
  cpuHealth: number;
}

export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

/** Prints the rules and gives both fighters full health. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    utils.print("Welcome to Knight-Paper-Scissors!");
    utils.print(`Health: ${STARTING_HEALTH} each. First to 0 loses.`);
    utils.print("Moves: [k]ick, [p]unch, [s]weep, [c]rouch, [b]lock, [j]ump");
    utils.print("");
    return [
      edges.onReady,
      { ...state, playerHealth: STARTING_HEALTH, cpuHealth: STARTING_HEALTH },
    ];
  };
