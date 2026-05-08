export type Edge = "continue" | "end";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(playerHealth: number, cpuHealth: number): [N, void] => {
  if (playerHealth > 0 && cpuHealth > 0) {
    return [edges.continue, undefined];
  }

  utils.print("\n--- GAME OVER ---");
  utils.print(`Final Score - Player: ${playerHealth} | CPU: ${cpuHealth}`);

  if (playerHealth <= 0 && cpuHealth <= 0) {
    utils.print("It's a DOUBLE KO! It's a DRAW!");
  } else if (playerHealth <= 0) {
    utils.print("You were DEFEATED!");
  } else {
    utils.print("You are VICTORIOUS!");
  }

  return [edges.end, undefined];
};
