import { create } from 'zustand';
import type { Hex } from 'viem';

export type ActivityEvent =
  | {
      kind:
        | 'deposit'
        | 'withdraw'
        | 'guildContributed'
        | 'guildUnlocked'
        | 'badgeMinted'
        | 'guildCreated'
        | 'questCompleted'
        | 'info';
      message: string;
      at: number;              // Date.now()
      txHash?: Hex;
      user?: `0x${string}`;
      to?: `0x${string}`;
      guildId?: Hex;
      questId?: bigint;
      value?: string;          // formatted number string
      data?: Record<string, unknown>;
    };

type AppState = {
  activity: ActivityEvent[];
  addActivity: (input: ActivityEvent | string) => void;
  clearActivity: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  activity: [],
  addActivity: (input) =>
    set((s) => {
      const event: ActivityEvent =
        typeof input === 'string'
          ? { kind: 'info', message: input, at: Date.now() }
          : input;
      // keep a reasonable cap
      return { activity: [event, ...s.activity].slice(0, 100) };
    }),
  clearActivity: () => set({ activity: [] }),
}));

