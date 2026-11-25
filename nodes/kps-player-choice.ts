import type { NodeFactory } from "../ambler.ts";

import type { Move } from "../utils/kps.ts";

export interface State {
  playerHealth: number;
  cpuHealth: number;
  playerMove?: Move;
}

export type Edge = "onSuccess" | "onError" | "onEndOfInput";

export type Utils = {
  print: (msg: string) => void;
  readLine: (prompt: string) => string | null;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  readLine: (msg) => prompt(msg),
};

/** Shows the health of both fighters and reads the player's move. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    utils.print(`\nPlayer: ${state.playerHealth} | CPU: ${state.cpuHealth}`);
    const input = utils.readLine("Enter move [k, p, s, c, b, j]:");
    if (input === null) return [edges.onEndOfInput, state];

    const playerMove = MOVE_KEYS[input.trim().toLowerCase()];
    if (!playerMove) {
      utils.print("Invalid move. Please choose k, p, s, c, b, or j.");
      return [edges.onError, state];
    }
    return [edges.onSuccess, { ...state, playerMove }];
  };

const MOVE_KEYS: Record<string, Move> = {
  k: "kick",
  p: "punch",
  s: "sweep",
  c: "crouch",
  b: "block",
  j: "jump",
};
