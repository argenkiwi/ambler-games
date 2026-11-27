import { ambler, walk } from "../ambler.ts";
import type { Utils as G2048ApplyMoveUtils } from "../nodes/g2048-apply-move.ts";
import defer * as g2048ApplyMoveNode from "../nodes/g2048-apply-move.ts";
import type { Utils as G2048CheckEndUtils } from "../nodes/g2048-check-end.ts";
import defer * as g2048CheckEndNode from "../nodes/g2048-check-end.ts";
import type { Utils as G2048GameOverUtils } from "../nodes/g2048-game-over.ts";
import defer * as g2048GameOverNode from "../nodes/g2048-game-over.ts";
import type { Utils as G2048NewGameUtils } from "../nodes/g2048-new-game.ts";
import defer * as g2048NewGameNode from "../nodes/g2048-new-game.ts";
import type { Utils as G2048ReadMoveUtils } from "../nodes/g2048-read-move.ts";
import defer * as g2048ReadMoveNode from "../nodes/g2048-read-move.ts";
import type { Utils as G2048ShowBoardUtils } from "../nodes/g2048-show-board.ts";
import defer * as g2048ShowBoardNode from "../nodes/g2048-show-board.ts";
import type { Utils as G2048SpawnTileUtils } from "../nodes/g2048-spawn-tile.ts";
import defer * as g2048SpawnTileNode from "../nodes/g2048-spawn-tile.ts";
import type { Utils as G2048WinUtils } from "../nodes/g2048-win.ts";
import defer * as g2048WinNode from "../nodes/g2048-win.ts";
import type { Utils as HangmanPlayAgainUtils } from "../nodes/hangman-play-again.ts";
import defer * as hangmanPlayAgainNode from "../nodes/hangman-play-again.ts";
import type { Utils as StopUtils } from "../nodes/stop.ts";
import defer * as stopNode from "../nodes/stop.ts";
import {
  type Board,
  type Direction,
  type Ending,
  emptyBoard,
} from "../utils/game2048.ts";

export interface State {
  board: Board;
  score: number;
  won: boolean;
  direction: Direction;
  ending: Ending;
}

export type NodeId =
  | "NEW_GAME"
  | "SHOW_BOARD"
  | "READ_MOVE"
  | "APPLY_MOVE"
  | "SPAWN_TILE"
  | "CHECK_END"
  | "WIN"
  | "GAME_OVER"
  | "PLAY_AGAIN"
  | "GOODBYE";

/** Per-node utils overrides; omitted nodes use their defaults. */
export type WalkUtils = {
  g2048NewGame?: G2048NewGameUtils;
  g2048ShowBoard?: G2048ShowBoardUtils;
  g2048ReadMove?: G2048ReadMoveUtils;
  g2048ApplyMove?: G2048ApplyMoveUtils;
  g2048SpawnTile?: G2048SpawnTileUtils;
  g2048CheckEnd?: G2048CheckEndUtils;
  g2048Win?: G2048WinUtils;
  g2048GameOver?: G2048GameOverUtils;
  hangmanPlayAgain?: HangmanPlayAgainUtils;
  stop?: StopUtils;
};

export function createWalk(utils: WalkUtils = {}) {
  return ambler<State, NodeId>({
    NEW_GAME: () =>
      g2048NewGameNode.factory({ onReady: "SHOW_BOARD" }, utils.g2048NewGame),
    SHOW_BOARD: () =>
      g2048ShowBoardNode.factory(
        { onReady: "READ_MOVE" },
        utils.g2048ShowBoard,
      ),
    READ_MOVE: () =>
      g2048ReadMoveNode.factory(
        { onMove: "APPLY_MOVE", onInvalid: "READ_MOVE", onQuit: "GAME_OVER" },
        utils.g2048ReadMove,
      ),
    APPLY_MOVE: () =>
      g2048ApplyMoveNode.factory(
        { onMoved: "SPAWN_TILE", onNoEffect: "SHOW_BOARD" },
        utils.g2048ApplyMove,
      ),
    SPAWN_TILE: () =>
      g2048SpawnTileNode.factory(
        { onReady: "CHECK_END" },
        utils.g2048SpawnTile,
      ),
    CHECK_END: () =>
      g2048CheckEndNode.factory(
        { onWon: "WIN", onLost: "GAME_OVER", onContinue: "SHOW_BOARD" },
        utils.g2048CheckEnd,
      ),
    WIN: () =>
      g2048WinNode.factory(
        { onContinue: "SHOW_BOARD", onStop: "GAME_OVER", onUnclear: "WIN" },
        utils.g2048Win,
      ),
    GAME_OVER: () =>
      g2048GameOverNode.factory({ onReady: "PLAY_AGAIN" }, utils.g2048GameOver),
    PLAY_AGAIN: () =>
      hangmanPlayAgainNode.factory(
        { onYes: "NEW_GAME", onNo: "GOODBYE", onUnclear: "PLAY_AGAIN" },
        utils.hangmanPlayAgain,
      ),
    GOODBYE: () => stopNode.factory({ onDone: null }, utils.stop),
  });
}

if (import.meta.main) {
  await walk(createWalk(), "NEW_GAME", {
    board: emptyBoard(),
    score: 0,
    won: false,
    direction: "left",
    ending: "quit",
  });
}
