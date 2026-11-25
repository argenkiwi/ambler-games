import { ambler, walk } from "../ambler.ts";
import type { Utils as PlayAgainUtils } from "../nodes/play-again.ts";
import defer * as playAgainNode from "../nodes/play-again.ts";
import type { Utils as RpsCompareUtils } from "../nodes/rps-compare.ts";
import defer * as rpsCompareNode from "../nodes/rps-compare.ts";
import type { Utils as RpsComputerChoiceUtils } from "../nodes/rps-computer-choice.ts";
import defer * as rpsComputerChoiceNode from "../nodes/rps-computer-choice.ts";
import type { Utils as RpsPlayerChoiceUtils } from "../nodes/rps-player-choice.ts";
import defer * as rpsPlayerChoiceNode from "../nodes/rps-player-choice.ts";
import type { Utils as RpsResultUtils } from "../nodes/rps-result.ts";
import defer * as rpsResultNode from "../nodes/rps-result.ts";
import type { Utils as RpsStartUtils } from "../nodes/rps-start.ts";
import defer * as rpsStartNode from "../nodes/rps-start.ts";
import type { Utils as StopUtils } from "../nodes/stop.ts";
import defer * as stopNode from "../nodes/stop.ts";

export interface State {
  choice: number;
  choiceName: string;
  compChoice: number;
  compChoiceName: string;
  result: string;
}

export type NodeId =
  | "RPS_START"
  | "RPS_PLAYER_CHOICE"
  | "RPS_COMPUTER_CHOICE"
  | "RPS_COMPARE"
  | "RPS_RESULT"
  | "PLAY_AGAIN"
  | "STOP";

export type WalkUtils = {
  rpsStart?: RpsStartUtils;
  rpsPlayerChoice?: RpsPlayerChoiceUtils;
  rpsComputerChoice?: RpsComputerChoiceUtils;
  rpsCompare?: RpsCompareUtils;
  rpsResult?: RpsResultUtils;
  playAgain?: PlayAgainUtils;
  stop?: StopUtils;
};

export function createWalk(utils: WalkUtils = {}) {
  return ambler<State, NodeId>({
    RPS_START: () =>
      rpsStartNode.factory({ onReady: "RPS_PLAYER_CHOICE" }, utils.rpsStart),
    RPS_PLAYER_CHOICE: () =>
      rpsPlayerChoiceNode.factory(
        {
          onValid: "RPS_COMPUTER_CHOICE",
          onInvalid: "RPS_PLAYER_CHOICE",
          onEndOfInput: "STOP",
        },
        utils.rpsPlayerChoice,
      ),
    RPS_COMPUTER_CHOICE: () =>
      rpsComputerChoiceNode.factory(
        { onReady: "RPS_COMPARE" },
        utils.rpsComputerChoice,
      ),
    RPS_COMPARE: () =>
      rpsCompareNode.factory({ onReady: "RPS_RESULT" }, utils.rpsCompare),
    RPS_RESULT: () =>
      rpsResultNode.factory({ onReady: "PLAY_AGAIN" }, utils.rpsResult),
    PLAY_AGAIN: () =>
      playAgainNode.factory(
        { onYes: "RPS_PLAYER_CHOICE", onNo: "STOP" },
        utils.playAgain,
      ),
    STOP: () => stopNode.factory({ onDone: null }, utils.stop),
  });
}

if (import.meta.main) {
  await walk(createWalk(), "RPS_START", {
    choice: 0,
    choiceName: "",
    compChoice: 0,
    compChoiceName: "",
    result: "",
  });
}
