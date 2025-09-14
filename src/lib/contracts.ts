import { createPublicClient, http, getContract } from 'viem'
import { kairos } from './chains'
import { erc20Abi } from '@/abis/erc20'
import { vaultAbi } from '@/abis/StablecoinVault'
import { questManagerAbi } from '@/abis/QuestManager'
import { rewardsAbi } from '@/abis/RewardsController'

// Contract addresses
export const ADDRESSES = {
  USDT: process.env.NEXT_PUBLIC_USDT as `0x${string}`,
  VAULT: process.env.NEXT_PUBLIC_VAULT as `0x${string}`,
  QUEST: process.env.NEXT_PUBLIC_QUEST as `0x${string}`,
  REWARDS: process.env.NEXT_PUBLIC_REWARDS as `0x${string}`,
}

// Public client for Kairos
export const publicClient = createPublicClient({
  chain: kairos,
  transport: http(kairos.rpcUrls.default.http[0]),
})

// Contract helpers
export function usdt() {
  return getContract({
    address: ADDRESSES.USDT,
    abi: erc20Abi,
    client: publicClient,
  })
}

export function vault() {
  return getContract({
    address: ADDRESSES.VAULT,
    abi: vaultAbi,
    client: publicClient,
  })
}

export function quest() {
  return getContract({
    address: ADDRESSES.QUEST,
    abi: questManagerAbi,
    client: publicClient,
  })
}

export function rewards() {
  return getContract({
    address: ADDRESSES.REWARDS,
    abi: rewardsAbi,
    client: publicClient,
  })
}


