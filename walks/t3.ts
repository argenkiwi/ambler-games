import { ambler } from "../ambler.ts";
import { factory as startFactory } from "../cores/t3Start.ts";
import { factory as printBoardFactory } from "../cores/t3PrintBoard.ts";
import { factory as playerMoveFactory } from "../cores/t3PlayerMove.ts";
import { factory as playerPlaceFactory } from "../cores/t3PlayerPlace.ts";
import { factory as computerMoveFactory } from "../cores/t3ComputerMove.ts";
import { factory as checkGameFactory } from "../cores/t3CheckGame.ts";
import { factory as endFactory } from "../cores/t3End.ts";

export interface State {
  board: (string | null)[];
  playerChar: string;
  computerChar: string;
  move: number;
  result: string;
}

type NodeId =
  | "start"
  | "printBoard"
  | "playerMove"
  | "playerPlace"
  | "computerMove"
  | "checkGame"
  | "end";

const amble = ambler<State, NodeId>({
  start: () => {
    const core = startFactory({ onReady: "printBoard" });
    return (state: State) => {
      const [nodeId, output] = core();
      return [nodeId, {
        ...state,
        board: output.board,
        playerChar: output.playerChar,
        computerChar: output.computerChar,
      }];
    };
  },

  printBoard: () => {
    const core = printBoardFactory({ onReady: "playerMove" });
    return (state: State) => {
      const [nodeId, _output] = core(state.board);
      return [nodeId, state];
    };
  },

  playerMove: () => {
    const core = playerMoveFactory({
      onValid: "playerPlace",
      onInvalid: "playerMove",
    });
    return (state: State) => {
      const [nodeId, output] = core(state.board);
      return [nodeId, { ...state, move: output.move }];
    };
  },

  playerPlace: () => {
    const core = playerPlaceFactory({
      onWin: "end",
      onNoWin: "computerMove",
    });
    return (state: State) => {
      const [nodeId, output] = core(state.board, state.move, state.playerChar);
      if (nodeId === "end") {
        return [nodeId, { ...state, board: output, result: "You win!" }];
      }
      return [nodeId, { ...state, board: output }];
    };
  },

  computerMove: () => {
    const core = computerMoveFactory({
      onWin: "end",
      onNoWin: "checkGame",
    });
    return (state: State) => {
      const [nodeId, output] = core(
        state.board,
        state.playerChar,
        state.computerChar,
      );
      if (nodeId === "end") {
        return [nodeId, { ...state, board: output.board, result: "You lose!" }];
      }
      return [nodeId, { ...state, board: output.board }];
    };
  },

  checkGame: () => {
    const core = checkGameFactory({
      onDraw: "end",
      onContinue: "printBoard",
    });
    return (state: State) => {
      const [nodeId, _output] = core(state.board);
      if (nodeId === "end") {
        return [nodeId, { ...state, result: "Deuce!" }];
      }
      return [nodeId, state];
    };
  },

  end: () => {
    const core = endFactory({ onDone: null });
    return (state: State) => {
      // Print the final board one last time before printing result
      const printCore = printBoardFactory({ onReady: "end" });
      printCore(state.board);
      const [nodeId, _output] = core(state.result);
      return [nodeId, state];
    };
  },
});

if (import.meta.main) {
  let nodeId: NodeId | null = "start";
  let state: State = {
    board: [null, null, null, null, null, null, null, null, null],
    playerChar: "",
    computerChar: "",
    move: 0,
    result: "",
  };

  while (nodeId) {
    const next = amble(nodeId, state);
    [nodeId, state] = next instanceof Promise ? await next : next;
  }
}
