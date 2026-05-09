export type Edge = "onSuccess";

export type Utils = {
  print: (msg: string) => void;
  randomChoice: (arr: string[]) => string;
  sleep: (ms: number) => Promise<void>;
};

const SYMBOLS = ["🍒", "🍋", "🔔", "⭐", "7️⃣", "💎"];

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  randomChoice: (arr) => arr[Math.floor(Math.random() * arr.length)],
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
};

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
async (): Promise<[N, string[]]> => {
  const reels = ["❔", "❔", "❔"];
  utils.print(`${reels[0]} ${reels[1]} ${reels[2]}`);

  for (let i = 0; i < 3; i++) {
    await utils.sleep(500);
    reels[i] = utils.randomChoice(SYMBOLS);
    utils.print(`${reels[0]} ${reels[1]} ${reels[2]}`);
  }

  return [edges.onSuccess, reels];
};
