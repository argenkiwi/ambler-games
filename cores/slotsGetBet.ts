export type Edge = "onBet" | "onQuit";

export type Utils = {
  print: (msg: string) => void;
  readLine: (prompt: string) => string | null;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  readLine: (msg: string) => prompt(msg),
};

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(balance: number): [N, number] => {
  while (true) {
    utils.print(`Current balance: ${balance}`);
    const raw = utils.readLine("Enter your bet (0 to quit): ");

    if (raw === null) {
      utils.print("Invalid input. Please try again.");
      continue;
    }

    const bet = parseInt(raw, 10);
    if (isNaN(bet) || bet < 0) {
      utils.print("Invalid input (must be a positive integer). Please try again.");
      continue;
    }

    if (bet === 0) {
      return [edges.onQuit, 0];
    }

    if (bet > balance) {
      utils.print("You don't have enough points for that bet!");
      continue;
    }

    return [edges.onBet, bet];
  }
};
