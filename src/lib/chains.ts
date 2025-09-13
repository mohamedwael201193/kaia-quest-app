import { defineChain } from 'viem'

export const kaia = defineChain({
  id: 8217,
  name: 'Kaia',
  nativeCurrency: {
    decimals: 18,
    name: 'KAIA',
    symbol: 'KAIA',
  },
  rpcUrls: {
    default: {
      http: ['https://public-en.node.kaia.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Kaiascan',
      url: 'https://kaiascan.io',
    },
  },
})

export const kairos = defineChain({
  id: 1001,
  name: 'Kairos',
  nativeCurrency: {
    decimals: 18,
    name: 'KAIA',
    symbol: 'KAIA',
  },
  rpcUrls: {
    default: {
      http: ['https://public-en-kairos.node.kaia.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Kairos Kaiascan',
      url: 'https://kairos.kaiascan.io',
    },
  },
  testnet: true,
})

export const supportedChains = [kaia, kairos] as const

