import { ambler } from "../ambler.ts";
import { factory as slotsStartFactory } from "../cores/slotsStart.ts";
import { factory as slotsGetBetFactory } from "../cores/slotsGetBet.ts";
import { factory as slotsSpinFactory } from "../cores/slotsSpin.ts";
import { factory as slotsCalculateFactory } from "../cores/slotsCalculate.ts";
import { factory as slotsCheckBalanceFactory } from "../cores/slotsCheckBalance.ts";
import { factory as slotsEndFactory } from "../cores/slotsEnd.ts";

export interface State {
  balance: number;
  bet: number;
  reels: string[];
  payout: number;
}

type NodeId =
  | "start"
  | "getBet"
  | "spin"
  | "calculate"
  | "checkBalance"
  | "end";

const amble = ambler<State, NodeId>({
  start: () => {
    const core = slotsStartFactory({ onSuccess: "getBet" });
    return (state) => {
      const [edge, balance] = core();
      return [edge, { ...state, balance }];
    };
  },

  getBet: () => {
    const core = slotsGetBetFactory({ onBet: "spin", onQuit: "end" });
    return (state) => {
      const [edge, bet] = core(state.balance);
      return [edge, { ...state, bet }];
    };
  },

  spin: () => {
    const core = slotsSpinFactory({ onSuccess: "calculate" });
    return async (state) => {
      const [edge, reels] = await core();
      return [edge, { ...state, reels, balance: state.balance - state.bet }];
    };
  },

  calculate: () => {
    const core = slotsCalculateFactory({ onSuccess: "checkBalance" });
    return (state) => {
      const [edge, payout] = core({ reels: state.reels, bet: state.bet });
      return [edge, { ...state, payout, balance: state.balance + payout }];
    };
  },

  checkBalance: () => {
    const core = slotsCheckBalanceFactory({
      onContinue: "getBet",
      onGameOver: "end",
    });
    return (state) => {
      const [edge] = core(state.balance);
      return [edge, state];
    };
  },

  end: () => {
    const core = slotsEndFactory({ onEnd: null });
    return (state) => {
      const [edge] = core(state.balance);
      return [edge, state];
    };
  },
});

if (import.meta.main) {
  let nodeId: NodeId | null = "start";
  let state: State = {
    balance: 0,
    bet: 0,
    reels: [],
    payout: 0,
  };

  while (nodeId) {
    const next = amble(nodeId, state);
    [nodeId, state] = next instanceof Promise ? await next : next;
  }
}
