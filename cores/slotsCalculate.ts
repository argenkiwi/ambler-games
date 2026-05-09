export type Edge = "onSuccess";

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
(input: { reels: string[]; bet: number }): [N, number] => {
  const { reels, bet } = input;
  let payout = 0;

  if (reels[0] === reels[1] && reels[1] === reels[2]) {
    payout = bet * 10;
    utils.print(`JACKPOT! You won ${payout} points.`);
  } else if (
    reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]
  ) {
    payout = bet * 2;
    utils.print(`You won ${payout} points.`);
  } else {
    utils.print("You lost.");
  }

  return [edges.onSuccess, payout];
};
