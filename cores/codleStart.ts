export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

const RULES = `
================ Codle Rules =================

What is CODLE?

- Codle is a 4-digit code guessing game.
- Each digit ranges from 0-9 and can repeat.

How to Play:

1. You have 4 attempts to guess the correct code.
2. After each guess, you'll receive feedback:
  - Green:  Correct digit in the correct position.
  - Yellow: Correct digit in the wrong position.
  - White:  Incorrect digit.
3. Use the feedback to refine your next guess.

==============================================
`;

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(): [N, void] => {
  utils.print(RULES);
  return [edges.onReady, undefined];
};
