import { ambler } from "../ambler.ts";
import { factory as checkWinFactory } from "../cores/codleCheckWin.ts";
import { factory as colorCodeFactory } from "../cores/codleColorCode.ts";
import { factory as displayBoardFactory } from "../cores/codleDisplayBoard.ts";
import { factory as endFactory } from "../cores/codleEnd.ts";
import { factory as genCodeFactory } from "../cores/codleGenCode.ts";
import { factory as getGuessFactory } from "../cores/codleGetGuess.ts";
import { factory as startFactory } from "../cores/codleStart.ts";

export interface State {
  code: string;
  guesses: string[];
  colors: string[][];
  attempts: number;
  won: boolean;
}

type NodeId =
  | "start"
  | "generateCode"
  | "getGuess"
  | "colorCode"
  | "checkWin"
  | "displayBoard"
  | "end";

const INITIAL_ATTEMPTS = 4;

const amble = ambler<State, NodeId>({
  start: () => {
    const core = startFactory({ onReady: "generateCode" });
    return (state: State) => {
      const [nodeId] = core();
      return [nodeId, state];
    };
  },

  generateCode: () => {
    const core = genCodeFactory({ onReady: "getGuess" });
    return (state: State) => {
      const [nodeId, output] = core();
      return [nodeId, { ...state, code: output.code }];
    };
  },

  getGuess: () => {
    const core = getGuessFactory({
      onValid: "colorCode",
      onInvalid: "getGuess",
    });
    return (state: State) => {
      const [nodeId, output] = core(state.attempts);
      if (nodeId === "colorCode") {
        state.guesses = [...state.guesses, output.guess];
        state.attempts = state.attempts - 1;
      }
      return [nodeId, state];
    };
  },

  colorCode: () => {
    const core = colorCodeFactory({ onReady: "checkWin" });
    return (state: State) => {
      const latestGuess = state.guesses[state.guesses.length - 1]!;
      const [nodeId, output] = core(latestGuess, state.code);
      return [
        nodeId,
        {
          ...state,
          colors: [...state.colors, output.colors],
        },
      ];
    };
  },

  checkWin: () => {
    const core = checkWinFactory({
      onWin: "end",
      onLose: "end",
      onContinue: "displayBoard",
    });
    return (state: State) => {
      const latestGuess = state.guesses[state.guesses.length - 1]!;
      const [nodeId] = core(latestGuess, state.code, state.attempts);
      const newState: State =
        nodeId === "end"
          ? { ...state, won: latestGuess === state.code }
          : state;
      return [nodeId, newState];
    };
  },

  displayBoard: () => {
    const core = displayBoardFactory({ onReady: "getGuess" });
    return (state: State) => {
      const [nodeId] = core(state.guesses, state.colors);
      return [nodeId, state];
    };
  },

  end: () => {
    const core = endFactory({ onDone: null });
    return (state: State) => {
      const [nodeId] = core(state.won, state.code);
      return [nodeId, state];
    };
  },
});

if (import.meta.main) {
  let nodeId: NodeId | null = "start";
  let state: State = {
    code: "",
    guesses: [],
    colors: [],
    attempts: INITIAL_ATTEMPTS,
    won: false,
  };

  while (nodeId) {
    const next = amble(nodeId, state);
    [nodeId, state] = next instanceof Promise ? await next : next;
  }
}
