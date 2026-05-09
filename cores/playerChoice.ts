export type Edge = "onValid" | "onInvalid";

export type Utils = {
  print: (msg: string) => void;
  readLine: (prompt: string) => string | null;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  readLine: (msg: string) => prompt(msg),
};

const CHOICE_NAMES = ["", "Rock", "Paper", "Scissor"];

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(): [N, { choice: number; choiceName: string }] => {
  while (true) {
    const raw = utils.readLine(
      "Enter your choice (1=Rock, 2=Paper, 3=Scissor): ",
    );

    if (raw === null) {
      utils.print("Invalid input. Please try again.");
      continue;
    }

    const num = parseInt(raw, 10);
    if (isNaN(num) || num < 1 || num > 3) {
      utils.print("Invalid input (must be 1, 2, or 3). Please try again.");
      continue;
    }

    const choiceName = CHOICE_NAMES[num];
    utils.print(`You chose: ${choiceName}`);

    return [edges.onValid, { choice: num, choiceName }];
  }
};
