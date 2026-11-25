import { ambler, walk } from "../ambler.ts";
import type { Utils as T3CheckGameUtils } from "../nodes/t3-check-game.ts";
import defer * as t3CheckGameNode from "../nodes/t3-check-game.ts";
import type { Utils as T3ComputerMoveUtils } from "../nodes/t3-computer-move.ts";
import defer * as t3ComputerMoveNode from "../nodes/t3-computer-move.ts";
import type { Utils as T3EndUtils } from "../nodes/t3-end.ts";
import defer * as t3EndNode from "../nodes/t3-end.ts";
import type { Utils as T3PlayerMoveUtils } from "../nodes/t3-player-move.ts";
import defer * as t3PlayerMoveNode from "../nodes/t3-player-move.ts";
import type { Utils as T3PlayerPlaceUtils } from "../nodes/t3-player-place.ts";
import defer * as t3PlayerPlaceNode from "../nodes/t3-player-place.ts";
import type { Utils as T3PrintBoardUtils } from "../nodes/t3-print-board.ts";
import defer * as t3PrintBoardNode from "../nodes/t3-print-board.ts";
import type { Utils as T3StartUtils } from "../nodes/t3-start.ts";
import defer * as t3StartNode from "../nodes/t3-start.ts";
import { type Board, emptyBoard } from "../utils/t3-board.ts";

export interface State {
  board: Board;
  playerChar: string;
  computerChar: string;
  move: number;
  result: string;
}

export type NodeId =
  | "T3_START"
  | "T3_PRINT_BOARD"
  | "T3_PLAYER_MOVE"
  | "T3_PLAYER_PLACE"
  | "T3_COMPUTER_MOVE"
  | "T3_CHECK_GAME"
  | "T3_END";

export type WalkUtils = {
  t3Start?: T3StartUtils;
  t3PrintBoard?: T3PrintBoardUtils;
  t3PlayerMove?: T3PlayerMoveUtils;
  t3PlayerPlace?: T3PlayerPlaceUtils;
  t3ComputerMove?: T3ComputerMoveUtils;
  t3CheckGame?: T3CheckGameUtils;
  t3End?: T3EndUtils;
};

export function createWalk(utils: WalkUtils = {}) {
  return ambler<State, NodeId>({
    T3_START: () =>
      t3StartNode.factory({ onReady: "T3_PRINT_BOARD" }, utils.t3Start),
    T3_PRINT_BOARD: () =>
      t3PrintBoardNode.factory(
        { onReady: "T3_PLAYER_MOVE" },
        utils.t3PrintBoard,
      ),
    T3_PLAYER_MOVE: () =>
      t3PlayerMoveNode.factory(
        {
          onValid: "T3_PLAYER_PLACE",
          onInvalid: "T3_PLAYER_MOVE",
          onEndOfInput: null,
        },
        utils.t3PlayerMove,
      ),
    T3_PLAYER_PLACE: () =>
      t3PlayerPlaceNode.factory(
        { onWin: "T3_END", onNoWin: "T3_CHECK_GAME" },
        utils.t3PlayerPlace,
      ),
    T3_COMPUTER_MOVE: () =>
      t3ComputerMoveNode.factory(
        { onWin: "T3_END", onNoWin: "T3_PRINT_BOARD" },
        utils.t3ComputerMove,
      ),
    // The player moves first, so only the player's move can fill the board.
    T3_CHECK_GAME: () =>
      t3CheckGameNode.factory(
        { onDraw: "T3_END", onContinue: "T3_COMPUTER_MOVE" },
        utils.t3CheckGame,
      ),
    T3_END: () => t3EndNode.factory({ onDone: null }, utils.t3End),
  });
}

if (import.meta.main) {
  await walk(createWalk(), "T3_START", {
    board: emptyBoard(),
    playerChar: "",
    computerChar: "",
    move: 0,
    result: "",
  });
}
