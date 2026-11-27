import type { NodeFactory } from "../ambler.ts";
import { type Board, type Ending, formatBoard } from "../utils/game2048.ts";

export interface State {
  board: Board;
  score: number;
  ending: Ending;
  won: boolean;
}

export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

/** Prints the final board and score and how the game ended; quitting after 2048 counts as a win. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    utils.print(formatBoard(state.board));
    utils.print(`Final score: ${state.score}`);
    if (state.ending === "loss") {
      utils.print("Game over: no moves remain. You lose!");
    } else if (state.ending === "win" || state.won) {
      utils.print("You win! You stopped at 2048.");
    } else {
      utils.print("You quit the game.");
    }
    return [edges.onReady, state];
  };
