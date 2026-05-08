export type Edge = "onReady";

export type Utils = Record<string, never>;

const defaultUtils: Utils = {};

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  _utils = defaultUtils,
) =>
(choice: number, compChoice: number): [N, { result: string }] => {
  let result: string;

  if (choice === compChoice) {
    result = "Draw";
  } else if (
    (choice === 1 && compChoice === 3) || // Rock beats Scissor
    (choice === 2 && compChoice === 1) || // Paper beats Rock
    (choice === 3 && compChoice === 2)    // Scissor beats Paper
  ) {
    result = choice === 1 ? "Rock" : choice === 2 ? "Paper" : "Scissor";
  } else {
    result = compChoice === 1 ? "Rock" : compChoice === 2 ? "Paper" : "Scissor";
  }

  return [edges.onReady, { result }];
};
