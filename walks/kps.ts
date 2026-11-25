import { ambler, walk } from "../ambler.ts";
import type { Utils as KpsCompareUtils } from "../nodes/kps-compare.ts";
import defer * as kpsCompareNode from "../nodes/kps-compare.ts";
import type { Utils as KpsComputerChoiceUtils } from "../nodes/kps-computer-choice.ts";
import defer * as kpsComputerChoiceNode from "../nodes/kps-computer-choice.ts";
import type { Utils as KpsPlayerChoiceUtils } from "../nodes/kps-player-choice.ts";
import defer * as kpsPlayerChoiceNode from "../nodes/kps-player-choice.ts";
import type { Utils as KpsResultUtils } from "../nodes/kps-result.ts";
import defer * as kpsResultNode from "../nodes/kps-result.ts";
import type { Utils as KpsStartUtils } from "../nodes/kps-start.ts";
import defer * as kpsStartNode from "../nodes/kps-start.ts";
import type { Utils as PlayAgainUtils } from "../nodes/play-again.ts";
import defer * as playAgainNode from "../nodes/play-again.ts";
import type { Utils as StopUtils } from "../nodes/stop.ts";
import defer * as stopNode from "../nodes/stop.ts";
import type { Move, Outcome } from "../utils/kps.ts";

export interface State {
  playerHealth: number;
  cpuHealth: number;
  playerMove?: Move;
  cpuMove?: Move;
  outcome?: Outcome;
}

export type NodeId =
  | "KPS_START"
  | "KPS_PLAYER_CHOICE"
  | "KPS_COMPUTER_CHOICE"
  | "KPS_COMPARE"
  | "KPS_RESULT"
  | "PLAY_AGAIN"
  | "STOP";

export type WalkUtils = {
  kpsStart?: KpsStartUtils;
  kpsPlayerChoice?: KpsPlayerChoiceUtils;
  kpsComputerChoice?: KpsComputerChoiceUtils;
  kpsCompare?: KpsCompareUtils;
  kpsResult?: KpsResultUtils;
  playAgain?: PlayAgainUtils;
  stop?: StopUtils;
};

export function createWalk(utils: WalkUtils = {}) {
  return ambler<State, NodeId>({
    KPS_START: () =>
      kpsStartNode.factory({ onReady: "KPS_PLAYER_CHOICE" }, utils.kpsStart),
    KPS_PLAYER_CHOICE: () =>
      kpsPlayerChoiceNode.factory(
        {
          onSuccess: "KPS_COMPUTER_CHOICE",
          onError: "KPS_PLAYER_CHOICE",
          onEndOfInput: "STOP",
        },
        utils.kpsPlayerChoice,
      ),
    KPS_COMPUTER_CHOICE: () =>
      kpsComputerChoiceNode.factory(
        { onSuccess: "KPS_COMPARE" },
        utils.kpsComputerChoice,
      ),
    KPS_COMPARE: () =>
      kpsCompareNode.factory({ onSuccess: "KPS_RESULT" }, utils.kpsCompare),
    KPS_RESULT: () =>
      kpsResultNode.factory(
        { onContinue: "KPS_PLAYER_CHOICE", onGameOver: "PLAY_AGAIN" },
        utils.kpsResult,
      ),
    PLAY_AGAIN: () =>
      playAgainNode.factory(
        { onYes: "KPS_START", onNo: "STOP" },
        utils.playAgain,
      ),
    STOP: () => stopNode.factory({ onDone: null }, utils.stop),
  });
}

if (import.meta.main) {
  await walk(createWalk(), "KPS_START", { playerHealth: 0, cpuHealth: 0 });
}
