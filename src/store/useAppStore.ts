import { create } from 'zustand'

interface LiffProfile {
  displayName: string
  pictureUrl: string
  userId: string
}

interface ActivityEvent {
  id: string
  type: 'deposit' | 'withdraw' | 'contribute' | 'complete'
  amount?: string
  txHash?: string
  timestamp: number
  user?: string
}

interface AppState {
  // Demo mode
  isDemoMode: boolean
  setDemoMode: (enabled: boolean) => void

  // LIFF
  liffProfile: LiffProfile | null
  setLiffProfile: (profile: LiffProfile | null) => void
  isLiffReady: boolean
  setLiffReady: (ready: boolean) => void

  // Quest progress
  questProgress: number
  setQuestProgress: (progress: number) => void
  incrementProgress: (amount: number) => void

  // Stats
  stats: {
    tvl: string
    questsCompleted: number
    sbtsMinted: number
  }
  setStats: (stats: Partial<AppState['stats']>) => void

  // Activity feed
  activities: ActivityEvent[]
  addActivity: (activity: ActivityEvent) => void

  // UI state
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // Demo mode
  isDemoMode: true,
  setDemoMode: (enabled) => set({ isDemoMode: enabled }),

  // LIFF
  liffProfile: null,
  setLiffProfile: (profile) => set({ liffProfile: profile }),
  isLiffReady: false,
  setLiffReady: (ready) => set({ isLiffReady: ready }),

  // Quest progress
  questProgress: 0,
  setQuestProgress: (progress) => set({ questProgress: Math.min(1, Math.max(0, progress)) }),
  incrementProgress: (amount) => {
    const current = get().questProgress
    set({ questProgress: Math.min(1, current + amount) })
  },

  // Stats
  stats: {
    tvl: '$1,234,567',
    questsCompleted: 1337,
    sbtsMinted: 892,
  },
  setStats: (newStats) => set((state) => ({ 
    stats: { ...state.stats, ...newStats } 
  })),

  // Activity feed
  activities: [],
  addActivity: (activity) => set((state) => ({
    activities: [activity, ...state.activities].slice(0, 50) // Keep last 50
  })),

  // UI state
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}))

