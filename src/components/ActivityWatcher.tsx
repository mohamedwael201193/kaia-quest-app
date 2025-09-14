
'use client'

import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useAccount } from 'wagmi'
import { usePublicClient } from 'wagmi'

import { vault, quest, rewards } from '@/lib/contracts'
import { useAppStore } from '@/store/useAppStore'

export function ActivityWatcher() {
  const { address } = useAccount()
  const addActivity = useAppStore((state) => state.addActivity)
  const client = usePublicClient()

  useEffect(() => {
    if (!client || !address) return

    // Watch Vault events
    const unwatchVaultDeposit = client.watchContractEvent({
      address: vault().address,
      abi: vault().abi,
      eventName: 'Deposit',
      onLogs: (logs) => {
        logs.forEach((log) => {
          if (log.args.user === address) {
            addActivity({
              id: `deposit-${log.transactionHash}-${log.logIndex}`,
              type: 'deposit',
              amount: log.args.amount?.toString(),
              txHash: log.transactionHash,
              timestamp: Date.now(),
              user: log.args.user,
            })
            toast.success(`Deposit successful: ${log.args.amount}`)
          }
        })
      },
    })

    const unwatchVaultWithdraw = client.watchContractEvent({
      address: vault().address,
      abi: vault().abi,
      eventName: 'Withdraw',
      onLogs: (logs) => {
        logs.forEach((log) => {
          if (log.args.user === address) {
            addActivity({
              id: `withdraw-${log.transactionHash}-${log.logIndex}`,
              type: 'withdraw',
              amount: log.args.amount?.toString(),
              txHash: log.transactionHash,
              timestamp: Date.now(),
              user: log.args.user,
            })
            toast.success(`Withdraw successful: ${log.args.amount}`)
          }
        })
      },
    })

    const unwatchGuildContributed = client.watchContractEvent({
      address: vault().address,
      abi: vault().abi,
      eventName: 'GuildContributed',
      onLogs: (logs) => {
        logs.forEach((log) => {
          if (log.args.from === address) {
            addActivity({
              id: `contribute-${log.transactionHash}-${log.logIndex}`,
              type: 'contribute',
              amount: log.args.amount?.toString(),
              txHash: log.transactionHash,
              timestamp: Date.now(),
              user: log.args.from,
            })
            toast.success(`Contributed to guild: ${log.args.amount}`)
          }
        })
      },
    })

    const unwatchGuildFundsUnlocked = client.watchContractEvent({
      address: vault().address,
      abi: vault().abi,
      eventName: 'GuildFundsUnlocked',
      onLogs: (logs) => {
        logs.forEach((log) => {
          if (log.args.members?.includes(address)) {
            addActivity({
              id: `unlocked-${log.transactionHash}-${log.logIndex}`,
              type: 'complete',
              amount: log.args.amountPerMember?.toString(),
              txHash: log.transactionHash,
              timestamp: Date.now(),
              user: address,
            })
            toast.success(`Guild funds unlocked! You received ${log.args.amountPerMember}`)
          }
        })
      },
    })

    // Watch Quest events
    const unwatchGuildCreated = client.watchContractEvent({
      address: quest().address,
      abi: quest().abi,
      eventName: 'GuildCreated',
      onLogs: (logs) => {
        logs.forEach((log) => {
          if (log.args.members?.includes(address)) {
            addActivity({
              id: `guild-created-${log.transactionHash}-${log.logIndex}`,
              type: 'complete',
              txHash: log.transactionHash,
              timestamp: Date.now(),
              user: address,
            })
            toast.success(`Guild created: ${log.args.guildId}`)
          }
        })
      },
    })

    const unwatchQuestCompleted = client.watchContractEvent({
      address: quest().address,
      abi: quest().abi,
      eventName: 'QuestCompleted',
      onLogs: (logs) => {
        logs.forEach((log) => {
          if (log.args.user === address) {
            addActivity({
              id: `quest-completed-${log.transactionHash}-${log.logIndex}`,
              type: 'complete',
              txHash: log.transactionHash,
              timestamp: Date.now(),
              user: log.args.user,
            })
            toast.success(`Quest completed: ${log.args.questId}`)
          }
        })
      },
    })

    // Watch Rewards events
    const unwatchBadgeMinted = client.watchContractEvent({
      address: rewards().address,
      abi: rewards().abi,
      eventName: 'BadgeMinted',
      onLogs: (logs) => {
        logs.forEach((log) => {
          if (log.args.to === address) {
            addActivity({
              id: `badge-minted-${log.transactionHash}-${log.logIndex}`,
              type: 'complete',
              txHash: log.transactionHash,
              timestamp: Date.now(),
              user: log.args.to,
            })
            toast.success(`New badge minted: Token ID ${log.args.tokenId}`)
          }
        })
      },
    })

    return () => {
      unwatchVaultDeposit?.()
      unwatchVaultWithdraw?.()
      unwatchGuildContributed?.()
      unwatchGuildFundsUnlocked?.()
      unwatchGuildCreated?.()
      unwatchQuestCompleted?.()
      unwatchBadgeMinted?.()
    }
  }, [address, addActivity, client])

  return null
}


