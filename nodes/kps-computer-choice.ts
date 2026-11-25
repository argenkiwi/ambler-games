import type { NodeFactory } from "../ambler.ts";

import { MOVES, type Move } from "../utils/kps.ts";

export interface State {
  cpuMove?: Move;
}

export type Edge = "onSuccess";

export type Utils = {
  random: () => number;
};

const defaultUtils: Utils = {
  random: Math.random,
};

/** Picks the CPU's move at random. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const cpuMove = MOVES[Math.floor(utils.random() * MOVES.length)];
    return [edges.onSuccess, { ...state, cpuMove }];
  };
