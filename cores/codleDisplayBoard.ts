export type Edge = "onReady";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

function applyColor(text: string, color: string): string {
  const codeMap: Record<string, number> = {
    green: 92,
    yellow: 93,
    white: 97,
    red: 91,
  };

  const colorCode = codeMap[color];
  return colorCode ? `\x1b[${colorCode}m${text}\x1b[0m` : text;
}

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(guesses: string[], colors: string[][]): [N, void] => {
  utils.print("+---------+");

  for (let i = 0; i < guesses.length; i++) {
    const guess = guesses[i];
    const guessColors = colors[i];
    const coloredDigits = guess.split("").map((digit, idx) =>
      applyColor(digit, guessColors[idx])
    );
    utils.print(`| ${coloredDigits.join(" ")} |`);
  }

  utils.print("+---------+");

  return [edges.onReady, undefined];
};
