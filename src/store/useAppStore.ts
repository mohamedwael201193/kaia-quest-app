import { create } from 'zustand';
import type { Hex } from 'viem';

// LIFF profile (minimal)
export type LiffProfile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
} | null;

// Concrete stats used by the homepage
export type AppStats = {
  tvl: string;            // formatted string, e.g., "0" or "0.00"
  deposits: number;
  contributions: number;
  guilds: number;
  badges: number;
  questsCompleted: number;
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
  // App mode
  isDemoMode: boolean;
  setDemoMode: (isDemoMode: boolean) => void;

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
  // App mode
  isDemoMode: false,
  setDemoMode: (isDemoMode) => set({ isDemoMode }),

  // LIFF
  liffProfile: null,
  liffReady: false,
  isLiffReady: false,
  setLiffProfile: (p) => set({ liffProfile: p }),
  setLiffReady: (ready) => set({ liffReady: ready, isLiffReady: ready }),

  // Stats: non-undefined defaults so `.toLocaleString()` is always safe
  stats: {
    tvl: '0',
    deposits: 0,
    contributions: 0,
    guilds: 0,
    badges: 0,
    questsCompleted: 0,
  },
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
