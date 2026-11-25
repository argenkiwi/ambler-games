import type { NodeFactory } from "../ambler.ts";

import type { Move, Outcome } from "../utils/kps.ts";

export interface State {
  playerMove?: Move;
  cpuMove?: Move;
  playerHealth: number;
  cpuHealth: number;
  outcome?: Outcome;
}

export type Edge = "onSuccess";

export type Utils = {
  print: (msg: string) => void;
};

const defaultUtils: Utils = {
  print: (msg) => console.log(msg),
};

/** Resolves both moves into an outcome and applies its health changes. */
export const factory: NodeFactory<State, Edge, Utils> =
  (edges, utils = defaultUtils) =>
  (state) => {
    const { playerMove, cpuMove } = state;
    if (!playerMove || !cpuMove) {
      throw new Error("Cannot compare: both moves must be chosen first");
    }

    const outcome = INTERACTIONS[playerMove][cpuMove];
    const [playerChange, cpuChange] = HEALTH_CHANGES[outcome];

    utils.print(`\nPlayer used ${playerMove.toUpperCase()}!`);
    utils.print(`CPU used ${cpuMove.toUpperCase()}!`);
    utils.print(`Outcome: ${outcome}!`);

    return [
      edges.onSuccess,
      {
        ...state,
        outcome,
        playerHealth: state.playerHealth + playerChange,
        cpuHealth: state.cpuHealth + cpuChange,
      },
    ];
  };

/** The outcome for the player, by the player's move, then the CPU's. */
const INTERACTIONS: Record<Move, Record<Move, Outcome>> = {
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

/** Health change for [player, CPU] by outcome. */
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
