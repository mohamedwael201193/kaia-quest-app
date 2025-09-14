import { create } from 'zustand';
import type { Hex } from 'viem';

// LIFF profile shape (minimal)
export type LiffProfile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
} | null;

// Dashboard / homepage stats (make keys optional; pages can fill what they need)
export type AppStats = {
  tvl?: string;              // formatted
  deposits?: number;
  contributions?: number;
  guilds?: number;
  badges?: number;
};

export type ActivityEvent = {
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
  at: number;                // Date.now()
  txHash?: Hex;
  user?: `0x${string}`;
  to?: `0x${string}`;
  guildId?: Hex;
  questId?: bigint;
  value?: string;            // formatted number string
  data?: Record<string, unknown>;
};

type AppState = {
  // LIFF state
  liffProfile: LiffProfile;
  liffReady: boolean;         // canonical flag
  isLiffReady: boolean;       // alias some components may use
  setLiffProfile: (p: LiffProfile) => void;
  setLiffReady: (ready: boolean) => void;

  // Homepage / analytics stats
  stats: AppStats;
  setStats: (partial: Partial<AppStats>) => void;

  // Activity feed
  activity: ActivityEvent[];
  addActivity: (input: ActivityEvent | string) => void;
  clearActivity: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  // LIFF
  liffProfile: null,
  liffReady: false,
  isLiffReady: false,
  setLiffProfile: (p) => set({ liffProfile: p }),
  setLiffReady: (ready) => set({ liffReady: ready, isLiffReady: ready }),

  // Stats
  stats: {},
  setStats: (partial) =>
    set((s) => ({ stats: { ...s.stats, ...partial } })),

  // Activity
  activity: [],
  addActivity: (input) =>
    set((s) => {
      const event: ActivityEvent =
        typeof input === 'string'
          ? { kind: 'info', message: input, at: Date.now() }
          : input;
      return { activity: [event, ...s.activity].slice(0, 100) };
    }),
  clearActivity: () => set({ activity: [] }),
}));
