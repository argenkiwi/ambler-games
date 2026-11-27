import type { NodeFactory } from "../ambler.ts";

export type State = object;

export type Edge = "onYes" | "onNo" | "onUnclear";

export type Utils = {
  print: (msg: string) => void;
  readLine: (prompt: string) => string | null;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  readLine: (msg) => prompt(msg),
};

/** Asks whether to play another round; throws when input has ended. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const raw = utils.readLine("Play again? (yes/no): ");
    if (raw === null) {
      throw new Error("Could not read an answer: input has ended.");
    }

    const answer = raw.trim().toLowerCase();
    if (answer === "yes" || answer === "y") return [edges.onYes, state];
    if (answer === "no" || answer === "n") return [edges.onNo, state];
    utils.print("Please answer yes or no.");
    return [edges.onUnclear, state];
  };
