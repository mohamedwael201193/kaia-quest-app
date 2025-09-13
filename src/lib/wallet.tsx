'use client'

import { createConfig, http } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { kaia, kairos } from './chains'

const config = createConfig({
  chains: [kaia, kairos],
  connectors: [injected()],
  transports: {
    [kaia.id]: http(),
    [kairos.id]: http(),
  },
})

const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export { config }

