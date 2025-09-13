import { createPublicClient, http, getContract } from 'viem'
import { kaia, kairos } from './chains'
import { env } from './env'
import { erc20Abi } from '@/abis/erc20'
import { stablecoinVaultAbi } from '@/abis/StablecoinVault'
import { questManagerAbi } from '@/abis/QuestManager'
import { rewardsControllerAbi } from '@/abis/RewardsController'

// Contract addresses
export const ADDRESSES = {
  USDT: env.USDT_ADDRESS as `0x${string}`,
  VAULT: env.VAULT_ADDRESS as `0x${string}`,
  QUEST: env.QUEST_ADDRESS as `0x${string}`,
  REWARDS: env.REWARDS_ADDRESS as `0x${string}`,
}

// Public clients
export const publicClients = {
  [kaia.id]: createPublicClient({
    chain: kaia,
    transport: http(),
  }),
  [kairos.id]: createPublicClient({
    chain: kairos,
    transport: http(),
  }),
}

export function getPublicClient(chainId: number) {
  return publicClients[chainId as keyof typeof publicClients]
}

// Contract helpers
export function getUsdtContract(chainId: number) {
  const client = getPublicClient(chainId)
  return getContract({
    address: ADDRESSES.USDT,
    abi: erc20Abi,
    client,
  })
}

export function getVaultContract(chainId: number) {
  const client = getPublicClient(chainId)
  return getContract({
    address: ADDRESSES.VAULT,
    abi: stablecoinVaultAbi,
    client,
  })
}

export function getQuestContract(chainId: number) {
  const client = getPublicClient(chainId)
  return getContract({
    address: ADDRESSES.QUEST,
    abi: questManagerAbi,
    client,
  })
}

export function getRewardsContract(chainId: number) {
  const client = getPublicClient(chainId)
  return getContract({
    address: ADDRESSES.REWARDS,
    abi: rewardsControllerAbi,
    client,
  })
}

