export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
  randomChoice: () => number;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  randomChoice: () => Math.floor(Math.random() * 3) + 1,
};

const CHOICE_NAMES = ["", "Rock", "Paper", "Scissor"];

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(): [N, { compChoice: number; compChoiceName: string }] => {
  const compChoice = utils.randomChoice();
  const compChoiceName = CHOICE_NAMES[compChoice];
  utils.print(`Computer chose: ${compChoiceName}`);

  return [edges.onReady, { compChoice, compChoiceName }];
};
