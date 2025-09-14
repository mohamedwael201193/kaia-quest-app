
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
            addActivity(`You deposited ${log.args.amount} into the vault.`)
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
            addActivity(`You withdrew ${log.args.amount} from the vault.`)
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
            addActivity(`You contributed ${log.args.amount} to guild ${log.args.guildId}.`)
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
            addActivity(`Guild ${log.args.guildId} funds unlocked! You received ${log.args.amountPerMember}.`)
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
            addActivity(`You created or joined guild ${log.args.guildId}.`)
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
            addActivity(`You completed quest ${log.args.questId}.`)
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
            addActivity(`You minted a new badge: Token ID ${log.args.tokenId}.`)
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


