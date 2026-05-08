export type Edge = "onSuccess";

export type Move = 'kick' | 'punch' | 'sweep' | 'crouch' | 'block' | 'jump';
export type Outcome = 'Win' | 'Lose' | 'Trade' | 'Chip' | 'Ouch' | 'Dodge' | 'Miss' | 'Draw';

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

const INTERACTION_MATRIX: Record<Move, Record<Move, Outcome>> = {
  kick: {
    kick: "Trade",
    punch: "Win",
    sweep: "Lose",
    crouch: "Miss",
    block: "Draw",
    jump: "Chip",
  },
  punch: {
    kick: "Lose",
    punch: "Trade",
    sweep: "Win",
    crouch: "Chip",
    block: "Miss",
    jump: "Draw",
  },
  sweep: {
    kick: "Win",
    punch: "Lose",
    sweep: "Trade",
    crouch: "Draw",
    block: "Chip",
    jump: "Miss",
  },
  crouch: {
    kick: "Dodge",
    punch: "Ouch",
    sweep: "Draw",
    crouch: "Draw",
    block: "Draw",
    jump: "Draw",
  },
  block: {
    kick: "Draw",
    punch: "Dodge",
    sweep: "Ouch",
    crouch: "Draw",
    block: "Draw",
    jump: "Draw",
  },
  jump: {
    kick: "Ouch",
    punch: "Draw",
    sweep: "Dodge",
    crouch: "Draw",
    block: "Draw",
    jump: "Draw",
  },
};

const HEALTH_CHANGES: Record<Outcome, [number, number]> = {
  Win: [0, -2],
  Lose: [-2, 0],
  Trade: [-1, -1],
  Chip: [0, -1],
  Ouch: [-1, 0],
  Dodge: [1, 0],
  Miss: [0, 1],
  Draw: [0, 0],
};

export const factory = <N extends string | null>(
  edges: Record<Edge, N>,
  utils = defaultUtils,
) =>
(
  playerMove: Move,
  cpuMove: Move,
  playerHealth: number,
  cpuHealth: number,
): [N, { outcome: Outcome; playerHealth: number; cpuHealth: number }] => {
  const outcome = INTERACTION_MATRIX[playerMove][cpuMove];
  const [pChange, cChange] = HEALTH_CHANGES[outcome];

  const newPlayerHealth = playerHealth + pChange;
  const newCpuHealth = cpuHealth + cChange;

  utils.print(`\nPlayer used ${playerMove.toUpperCase()}!`);
  utils.print(`CPU used ${cpuMove.toUpperCase()}!`);
  utils.print(`Outcome: ${outcome}!`);

  return [
    edges.onSuccess,
    { outcome, playerHealth: newPlayerHealth, cpuHealth: newCpuHealth },
  ];
};
