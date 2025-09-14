
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Target, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { quest, publicClient } from '@/lib/contracts'
import { useGuildContribute } from '@/hooks/useContractInteractions'
import { useAppStore } from '@/store/useAppStore'
import { toast } from 'react-hot-toast'
import { watchContractEvent } from 'wagmi/actions'

interface GuildInfo {
  id: `0x${string}`
  members: `0x${string}`[]
}

export default function GuildDetailPage({ params }: { params: { guildId: string } }) {
  const { guildId } = params
  const router = useRouter()
  const { address } = useAccount()
  const [guildInfo, setGuildInfo] = useState<GuildInfo | null>(null)
  const [contributionAmount, setContributionAmount] = useState('0.1') // Default contribution
  const addActivity = useAppStore((state) => state.addActivity)

  const { contribute, isConfirming, isApproved } = useGuildContribute(
    guildId as `0x${string}`,
    contributionAmount
  )

  useEffect(() => {
    const fetchGuildInfo = async () => {
      try {
        const data = await publicClient.readContract({
          address: quest().address,
          abi: quest().abi,
          functionName: 'guilds',
          args: [guildId as `0x${string}`],
        })
        setGuildInfo(data as GuildInfo)
      } catch (error) {
        console.error('Failed to fetch guild info:', error)
        toast.error('Failed to load guild information.')
      }
    }

    fetchGuildInfo()

    // Watch for GuildContributed events
    const unwatch = watchContractEvent(publicClient, {
      address: quest().address,
      abi: quest().abi,
      eventName: 'Contribution',
      onLogs: (logs) => {
        logs.forEach((log) => {
          if (log.args.guildId === guildId && log.args.contributor === address) {
            addActivity(`You contributed ${log.args.amount} to this guild.`)
            toast.success(`Contribution successful: ${log.args.amount}`)
            fetchGuildInfo() // Refresh guild info
          }
        })
      },
    })

    return () => unwatch()
  }, [guildId, address, addActivity])

  const handleContribute = () => {
    if (address && guildInfo) {
      contribute()
    }
  }

  if (!guildInfo) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <p className="text-white text-xl">Loading Guild Info...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink to-ink/90 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={() => router.back()} className="text-white mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guilds
          </Button>
          <h1 className="font-sora text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-iris to-jade bg-clip-text text-transparent">
              Guild: {guildId.slice(0, 6)}...
            </span>
          </h1>
          <p className="text-gray-300 text-lg">Details for your chosen guild.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-parchment/10 border-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="h-5 w-5 text-jade" /> Guild Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-300">
                  {guildInfo.members.map((member, index) => (
                    <li key={index}>{member.slice(0, 6)}...{member.slice(-4)}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-parchment/10 border-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="h-5 w-5 text-gold" /> Guild Quest Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-2">Goal: N/A</p>
                <p className="text-gray-300 mb-4">Raised: N/A</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-jade h-2.5 rounded-full"
                    style={{ width: `0%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">0% Completed</p>

                <div className="mt-6">
                  <input
                    type="number"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    className="w-full p-2 bg-ink border border-gray-600 rounded-md text-white mb-4"
                    placeholder="Amount to contribute"
                  />
                  <Button onClick={handleContribute} disabled={isConfirming || !isApproved} className="w-full">
                    {isConfirming ? 'Contributing...' : isApproved ? 'Contribute to Guild' : 'Approve USDT'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


