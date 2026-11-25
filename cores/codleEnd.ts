export type Edge = "onDone";

export type Utils = {
  print: (msg: string) => void;
  green: (text: string) => string;
  red: (text: string) => string;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  green: (text) => `\x1b[92m${text}\x1b[0m`,
  red: (text) => `\x1b[91m${text}\x1b[0m`,
};

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(won: boolean, code: string): [N, void] => {
  if (won) {
    utils.print(utils.green("Congratulations! You've guessed the code!"));
  } else {
    utils.print(utils.red("You lost!"));
    utils.print(utils.red(`Correct Code: ${code}`));
  }

  return [edges.onDone, undefined];
};
