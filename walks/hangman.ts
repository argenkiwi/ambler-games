import { ambler, walk } from "../ambler.ts";
import type { Utils as HangmanApplyGuessUtils } from "../nodes/hangman-apply-guess.ts";
import defer * as hangmanApplyGuessNode from "../nodes/hangman-apply-guess.ts";
import type { Utils as HangmanCheckEndUtils } from "../nodes/hangman-check-end.ts";
import defer * as hangmanCheckEndNode from "../nodes/hangman-check-end.ts";
import type { Utils as HangmanGameOverUtils } from "../nodes/hangman-game-over.ts";
import defer * as hangmanGameOverNode from "../nodes/hangman-game-over.ts";
import type { Utils as HangmanPickWordUtils } from "../nodes/hangman-pick-word.ts";
import defer * as hangmanPickWordNode from "../nodes/hangman-pick-word.ts";
import type { Utils as HangmanPlayAgainUtils } from "../nodes/hangman-play-again.ts";
import defer * as hangmanPlayAgainNode from "../nodes/hangman-play-again.ts";
import type { Utils as HangmanReadGuessUtils } from "../nodes/hangman-read-guess.ts";
import defer * as hangmanReadGuessNode from "../nodes/hangman-read-guess.ts";
import type { Utils as HangmanShowBoardUtils } from "../nodes/hangman-show-board.ts";
import defer * as hangmanShowBoardNode from "../nodes/hangman-show-board.ts";
import type { Utils as StopUtils } from "../nodes/stop.ts";
import defer * as stopNode from "../nodes/stop.ts";

export interface State {
  word: string;
  guessed: string[];
  guess: string;
  misses: number;
  maxMisses: number;
}

export type NodeId =
  | "PICK_WORD"
  | "SHOW_BOARD"
  | "READ_GUESS"
  | "APPLY_GUESS"
  | "CHECK_END"
  | "GAME_OVER"
  | "PLAY_AGAIN"
  | "GOODBYE";

export type WalkUtils = {
  hangmanPickWord?: HangmanPickWordUtils;
  hangmanShowBoard?: HangmanShowBoardUtils;
  hangmanReadGuess?: HangmanReadGuessUtils;
  hangmanApplyGuess?: HangmanApplyGuessUtils;
  hangmanCheckEnd?: HangmanCheckEndUtils;
  hangmanGameOver?: HangmanGameOverUtils;
  hangmanPlayAgain?: HangmanPlayAgainUtils;
  stop?: StopUtils;
};

export function createWalk(utils: WalkUtils = {}) {
  return ambler<State, NodeId>({
    PICK_WORD: () =>
      hangmanPickWordNode.factory(
        { onReady: "SHOW_BOARD" },
        utils.hangmanPickWord,
      ),
    SHOW_BOARD: () =>
      hangmanShowBoardNode.factory(
        { onReady: "READ_GUESS" },
        utils.hangmanShowBoard,
      ),
    READ_GUESS: () =>
      hangmanReadGuessNode.factory(
        {
          onValid: "APPLY_GUESS",
          onInvalid: "READ_GUESS",
          onRepeated: "READ_GUESS",
        },
        utils.hangmanReadGuess,
      ),
    APPLY_GUESS: () =>
      hangmanApplyGuessNode.factory(
        { onHit: "CHECK_END", onMiss: "CHECK_END" },
        utils.hangmanApplyGuess,
      ),
    CHECK_END: () =>
      hangmanCheckEndNode.factory(
        { onWon: "GAME_OVER", onLost: "GAME_OVER", onContinue: "SHOW_BOARD" },
        utils.hangmanCheckEnd,
      ),
    GAME_OVER: () =>
      hangmanGameOverNode.factory(
        { onReady: "PLAY_AGAIN" },
        utils.hangmanGameOver,
      ),
    PLAY_AGAIN: () =>
      hangmanPlayAgainNode.factory(
        { onYes: "PICK_WORD", onNo: "GOODBYE", onUnclear: "PLAY_AGAIN" },
        utils.hangmanPlayAgain,
      ),
    GOODBYE: () => stopNode.factory({ onDone: null }, utils.stop),
  });
}

if (import.meta.main) {
  await walk(createWalk(), "PICK_WORD", {
    word: "",
    guessed: [],
    guess: "",
    misses: 0,
    maxMisses: 6,
  });
}
