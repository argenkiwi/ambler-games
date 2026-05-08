export type Edge = "onReady";

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
(choiceName: string, result: string): [N, void] => {
  if (result === "Draw") {
    utils.print("It's a draw!");
  } else if (result === choiceName) {
    utils.print(
      `You win! ${result} beats ${
        result === "Rock" ? "Scissor" : result === "Paper" ? "Rock" : "Paper"
      }`,
    );
  } else {
    utils.print(`Computer wins! ${result} beats ${choiceName}`);
  }

  return [edges.onReady, undefined];
};
