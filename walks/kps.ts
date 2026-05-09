import { ambler } from "../ambler.ts";
import { factory as kpsStartFactory } from "../cores/kpsStart.ts";
import {
  factory as kpsPlayerChoiceFactory,
  type Move,
} from "../cores/kpsPlayerChoice.ts";
import { factory as kpsComputerChoiceFactory } from "../cores/kpsComputerChoice.ts";
import {
  factory as kpsCompareFactory,
  type Outcome,
} from "../cores/kpsCompare.ts";
import { factory as kpsResultFactory } from "../cores/kpsResult.ts";
import { factory as playAgainFactory } from "../cores/playAgain.ts";
import { factory as stopFactory } from "../cores/stop.ts";

export interface State {
  playerHealth: number;
  cpuHealth: number;
  playerMove?: Move;
  cpuMove?: Move;
  outcome?: Outcome;
}

type NodeId =
  | "start"
  | "playerChoice"
  | "computerChoice"
  | "compare"
  | "result"
  | "playAgain"
  | "stop";

const amble = ambler<State, NodeId>({
  start: () => {
    const core = kpsStartFactory({ onReady: "playerChoice" });
    return () => {
      const [edge, output] = core();
      return [edge, { ...output }];
    };
  },

  playerChoice: () => {
    const core = kpsPlayerChoiceFactory({
      onSuccess: "computerChoice",
      onError: "playerChoice",
    });
    return (state) => {
      const [edge, output] = core(state.playerHealth, state.cpuHealth);
      return [edge, { ...state, playerMove: output }];
    };
  },

  computerChoice: () => {
    const core = kpsComputerChoiceFactory({ onSuccess: "compare" });
    return (state) => {
      const [edge, output] = core();
      return [edge, { ...state, cpuMove: output }];
    };
  },

  compare: () => {
    const core = kpsCompareFactory({ onSuccess: "result" });
    return (state) => {
      const [edge, output] = core(
        state.playerMove!,
        state.cpuMove!,
        state.playerHealth,
        state.cpuHealth,
      );
      return [edge, { ...state, ...output }];
    };
  },

  result: () => {
    const core = kpsResultFactory({
      continue: "playerChoice",
      end: "playAgain",
    });
    return (state) => {
      const [edge] = core(state.playerHealth, state.cpuHealth);
      return [edge, state];
    };
  },

  playAgain: () => {
    const core = playAgainFactory({ onYes: "start", onNo: "stop" });
    return (state) => {
      const [edge] = core();
      return [edge, state];
    };
  },

  stop: () => {
    const core = stopFactory({ onDone: null });
    return (state) => {
      const [edge] = core();
      return [edge, state];
    };
  },
});

if (import.meta.main) {
  let nodeId: NodeId | null = "start";
  let state: State = { playerHealth: 10, cpuHealth: 10 };

  while (nodeId) {
    const next = amble(nodeId, state);
    [nodeId, state] = next instanceof Promise ? await next : next;
  }
}
