
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { QuestCard } from '@/components/ui/QuestCard'
import { CoinBurst } from '@/components/ui/CoinBurst'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useAppStore } from '@/store/useAppStore'
import {
  Coins,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { useDeposit } from '@/hooks/useContractInteractions'


export default function QuestsPage() {
  const [showCoinBurst, setShowCoinBurst] = useState(false)
  const {
    isDemoMode,
    questProgress,
    incrementProgress,
    addActivity
  } = useAppStore()

  const depositAmount = '0.5' // 0.5 mUSDT
  const { deposit, isConfirming, isApproved } = useDeposit(depositAmount)


  const handleRoundUpQuest = () => {
    if (isDemoMode) {
      // Demo mode: simulate the quest
      setShowCoinBurst(true)
      incrementProgress(0.01)

      addActivity({
        id: `simulated-deposit-${Date.now()}`,
        type: 'deposit',
        amount: depositAmount,
        timestamp: Date.now(),
        user: 'Simulator',
      })
    } else {
      // Real mode: interact with smart contracts
      deposit()
    }
  }

  const personalQuests = [
    {
      title: "Round-Up Savings",
      description: "Simulate purchase: $3.50 → save $0.50",
      progress: questProgress,
      goal: "Save $10 through round-ups",
      reward: "50 KAIA",
      type: "personal" as const,
      onAction: handleRoundUpQuest,
      actionLabel: isDemoMode ? "Simulate Purchase" : (isApproved ? "Deposit 0.5 mUSDT" : "Approve USDT"),
      disabled: !isDemoMode && isConfirming
    },
    {
      title: "Daily Login Streak",
      description: "Login daily to maintain your streak",
      progress: 0.7,
      goal: "7 day streak",
      reward: "25 KAIA",
      type: "personal" as const,
      onAction: () => console.log('Daily login'),
      actionLabel: "Claim Streak"
    },
    {
      title: "First Deposit",
      description: "Make your first deposit to the vault",
      progress: questProgress > 0 ? 1 : 0,
      goal: "Deposit any amount",
      reward: "100 KAIA + SBT",
      type: "personal" as const,
      onAction: handleRoundUpQuest, // Reusing for simplicity, could be a separate deposit function
      actionLabel: isDemoMode ? (questProgress > 0 ? "Completed!" : "Make Deposit") : (isApproved ? "Make Deposit" : "Approve USDT"),
      disabled: !isDemoMode && isConfirming
    }
  ]

  const guildQuests = [
    {
      title: "Guild Formation",
      description: "Create or join a guild with friends",
      progress: 0.3,
      goal: "Form a 5-member guild",
      reward: "200 KAIA",
      type: "guild" as const,
      onAction: () => console.log('Guild formation'),
      actionLabel: "Join Guild"
    },
    {
      title: "Collective Savings",
      description: "Guild members save together towards a goal",
      progress: 0.6,
      goal: "Save $1000 as a guild",
      reward: "500 KAIA + Guild SBT",
      type: "guild" as const,
      onAction: () => console.log('Collective savings'),
      actionLabel: "Contribute"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink to-ink/90 pt-20">
      <CoinBurst
        trigger={showCoinBurst}
        onComplete={() => setShowCoinBurst(false)}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-sora text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-gold to-iris bg-clip-text text-transparent">
              Quest Hub
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Complete quests to earn rewards and advance your adventure
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-parchment/10 border-gold/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="h-5 w-5 text-jade" />
                Your Adventure Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Overall Progress</span>
                <span>{Math.round(questProgress * 100)}%</span>
              </div>
              <Progress value={questProgress * 100} className="h-3" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-jade">
                    {Math.round(questProgress * 100)}%
                  </div>
                  <div className="text-sm text-gray-300">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-iris">
                    {Math.round(questProgress * 500)} KAIA
                  </div>
                  <div className="text-sm text-gray-300">Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">
                    {questProgress > 0.5 ? 1 : 0} SBT
                  </div>
                  <div className="text-sm text-gray-300">Minted</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Personal Quests */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="h-6 w-6 text-jade" />
            <h2 className="font-sora text-2xl font-bold text-white">
              Personal Quests
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalQuests.map((quest, index) => (
              <motion.div
                key={quest.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <QuestCard {...quest} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Guild Quests */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-iris" />
            <h2 className="font-sora text-2xl font-bold text-white">
              Guild Quests
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guildQuests.map((quest, index) => (
              <motion.div
                key={quest.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <QuestCard {...quest} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-iris/20 to-gold/20 border-gold/30">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="font-sora text-xl font-bold text-white mb-2">
                    Ready for More Adventures?
                  </h3>
                  <p className="text-gray-300">
                    Explore guilds, check analytics, or customize your profile
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="gold" asChild>
                    <a href="/guilds">
                      <Users className="mr-2 h-4 w-4" />
                      Explore Guilds
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/profile">
                      <Sparkles className="mr-2 h-4 w-4" />
                      View Profile
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Demo Mode Notice */}
        {isDemoMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <Card className="bg-gold/10 border-gold/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 text-gold">
                  <Coins className="h-5 w-5" />
                  <span className="font-semibold">
                    Demo Mode Active - All transactions are simulated
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}


