export const env = {
  LIFF_ID: process.env.NEXT_PUBLIC_LIFF_ID || '',
  CHAIN_ID: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1001'),
  USDT_ADDRESS: process.env.NEXT_PUBLIC_USDT || '',
  VAULT_ADDRESS: process.env.NEXT_PUBLIC_VAULT || '',
  QUEST_ADDRESS: process.env.NEXT_PUBLIC_QUEST || '',
  REWARDS_ADDRESS: process.env.NEXT_PUBLIC_REWARDS || '',
  DUNE_TVL: process.env.NEXT_PUBLIC_DUNE_TVL || '',
  DUNE_SBT: process.env.NEXT_PUBLIC_DUNE_SBT || '',
  DUNE_GUILDS: process.env.NEXT_PUBLIC_DUNE_GUILDS || '',
} as const

export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'

