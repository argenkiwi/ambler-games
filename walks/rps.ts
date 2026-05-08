import { ambler } from "../ambler.ts";
import { factory as startFactory } from "../cores/start.ts";
import { factory as playerChoiceFactory } from "../cores/playerChoice.ts";
import { factory as computerChoiceFactory } from "../cores/computerChoice.ts";
import { factory as compareFactory } from "../cores/compare.ts";
import { factory as resultFactory } from "../cores/result.ts";
import { factory as playAgainFactory } from "../cores/playAgain.ts";
import { factory as stopFactory } from "../cores/stop.ts";

export interface State {
  choice: number;
  choiceName: string;
  compChoice: number;
  compChoiceName: string;
  result: string;
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
    const core = startFactory({ onReady: "playerChoice" });
    return (state: State) => {
      const [nodeId, _] = core();
      return [nodeId, state];
    };
  },
  playerChoice: () => {
    const core = playerChoiceFactory({
      onValid: "computerChoice",
      onInvalid: "playerChoice",
    });

    return (state: State) => {
      const [nodeId, output] = core();
      return [nodeId, {
        ...state,
        choice: output.choice,
        choiceName: output.choiceName,
      }];
    };
  },
  computerChoice: () => {
    const core = computerChoiceFactory({ onReady: "compare" });
    return (state: State) => {
      const [nodeId, output] = core();
      return [nodeId, {
        ...state,
        compChoice: output.compChoice,
        compChoiceName: output.compChoiceName,
      }];
    };
  },
  compare: () => {
    const core = compareFactory({ onReady: "result" });
    return (state: State) => {
      const [nodeId, output] = core(state.choice, state.compChoice);
      return [nodeId, { ...state, result: output.result }];
    };
  },
  result: () => {
    const core = resultFactory({ onReady: "playAgain" });
    return (state: State) => {
      const [nodeId, _output] = core(state.choiceName, state.result);
      return [nodeId, state];
    };
  },
  playAgain: () => {
    const core = playAgainFactory({ onYes: "playerChoice", onNo: "stop" });
    return (state: State) => {
      const [nodeId, _output] = core();
      return [nodeId, state];
    };
  },
  stop: () => {
    const core = stopFactory({ onDone: null });
    return (state: State) => {
      const [nodeId, _output] = core();
      return [nodeId, state];
    };
  },
});

if (import.meta.main) {
  let nodeId: NodeId | null = "start";
  let state: State = {
    choice: 0,
    choiceName: "",
    compChoice: 0,
    compChoiceName: "",
    result: "",
  };

  while (nodeId) {
    const next = amble(nodeId, state);
    [nodeId, state] = next instanceof Promise ? await next : next;
  }
}
