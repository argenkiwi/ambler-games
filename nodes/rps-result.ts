import type { NodeFactory } from "../ambler.ts";

export interface State {
  choiceName: string;
  result: string;
}

export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

/** Tells the player who won the round. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const { choiceName, result } = state;
    if (result === "Draw") {
      utils.print("It's a draw!");
    } else if (result === choiceName) {
      utils.print(`You win! ${result} beats ${BEATS[result]}`);
    } else {
      utils.print(`Computer wins! ${result} beats ${choiceName}`);
    }
    return [edges.onReady, state];
  };

const BEATS: Record<string, string> = {
  Rock: "Scissor",
  Paper: "Rock",
  Scissor: "Paper",
};
