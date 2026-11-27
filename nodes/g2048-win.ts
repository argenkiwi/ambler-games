import type { NodeFactory } from "../ambler.ts";
import type { Ending } from "../utils/game2048.ts";

export interface State {
  ending: Ending;
}

export type Edge = "onContinue" | "onStop" | "onUnclear";

export type Utils = {
  print: (msg: string) => void;
  readLine: (prompt: string) => string | null;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  readLine: (msg) => prompt(msg),
};

/** Announces 2048 and asks whether to keep playing; throws when input has ended. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    utils.print("You reached 2048!");
    const raw = utils.readLine("Keep playing for a higher score? (yes/no): ");
    if (raw === null) {
      throw new Error("Could not read an answer: input has ended.");
    }

    const answer = raw.trim().toLowerCase();
    if (answer === "yes" || answer === "y") return [edges.onContinue, state];
    if (answer === "no" || answer === "n") {
      return [edges.onStop, { ...state, ending: "win" }];
    }
    utils.print("Please answer yes or no.");
    return [edges.onUnclear, state];
  };
