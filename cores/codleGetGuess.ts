export type Edge = "onValid" | "onInvalid";

export type Utils = {
  print: (msg: string) => void;
  readLine: (prompt: string) => string | null;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
  readLine: (msg: string) => prompt(msg),
};

function isValidGuess(guess: string): boolean {
  return guess.length === 4 && guess.split("").every((char) =>
    "0123456789".includes(char)
  );
}

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(attempts: number): [N, { guess: string }] => {
  utils.print(`\nAttempts left: ${attempts}`);

  while (true) {
    const raw = utils.readLine("Enter your guess: ");

    if (raw === null) {
      utils.print("Invalid input! Please enter a 4-digit number.");
      continue;
    }

    if (!isValidGuess(raw)) {
      utils.print("Invalid input! Please enter a 4-digit number.");
      continue;
    }

    return [edges.onValid, { guess: raw }];
  }
};
