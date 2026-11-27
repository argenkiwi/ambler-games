import type { NodeFactory } from "../ambler.ts";
import type { Direction, Ending } from "../utils/game2048.ts";

export interface State {
  direction: Direction;
  ending: Ending;
}

export type Edge = "onMove" | "onInvalid" | "onQuit";

export type Utils = {
  print: (msg: string) => void;
  readLine: (prompt: string) => string | null;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  readLine: (msg) => prompt(msg),
};

const DIRECTIONS: Record<string, Direction> = {
  l: "left",
  r: "right",
  t: "up",
  b: "down",
};

/** Reads a move (L, R, T, B) or X to quit; throws when input has ended. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const raw = utils.readLine("Move (L, R, T, B) or X to end: ");
    if (raw === null)
      throw new Error("Could not read a move: input has ended.");

    const letter = raw.trim().toLowerCase();
    if (letter === "x") return [edges.onQuit, { ...state, ending: "quit" }];
    const direction = DIRECTIONS[letter];
    if (direction === undefined) {
      utils.print("Please enter L, R, T, B or X.");
      return [edges.onInvalid, state];
    }
    return [edges.onMove, { ...state, direction }];
  };
