import type { NodeFactory } from "../ambler.ts";

export interface State {
  playerHealth: number;
  cpuHealth: number;
}

export type Edge = "onContinue" | "onGameOver";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

/** Ends the game when a fighter is out of health, announcing the winner. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const { playerHealth, cpuHealth } = state;
    if (playerHealth > 0 && cpuHealth > 0) return [edges.onContinue, state];

    utils.print("\n--- GAME OVER ---");
    utils.print(`Final Score - Player: ${playerHealth} | CPU: ${cpuHealth}`);
    if (playerHealth <= 0 && cpuHealth <= 0) {
      utils.print("It's a DOUBLE KO! It's a DRAW!");
    } else if (playerHealth <= 0) {
      utils.print("You were DEFEATED!");
    } else {
      utils.print("You are VICTORIOUS!");
    }
    return [edges.onGameOver, state];
  };
