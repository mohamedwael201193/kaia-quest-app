
'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAppStore } from '@/store/useAppStore'
import { liffService } from '@/lib/liff'
import {
  TrendingUp,
  Target,
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { MapScene } from '@/components/three/MapScene'

export default function HomePage() {
  const {
    liffProfile,
    setLiffProfile,
    setLiffReady,
    stats,
    isDemoMode
  } = useAppStore()

  useEffect(() => {
    // Initialize LIFF
    const initLiff = async () => {
      try {
        const success = await liffService.init()
        setLiffReady(success)

        if (success && liffService.isLoggedIn()) {
          const profile = await liffService.getProfile()
          setLiffProfile(profile)
        }
      } catch (error) {
        console.error('LIFF initialization failed:', error)
        setLiffReady(false)
      }
    }

    initLiff()
  }, [setLiffProfile, setLiffReady])

  const handleLogin = async () => {
    try {
      await liffService.login()
      const profile = await liffService.getProfile()
      setLiffProfile(profile)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const statsData = [
    {
      label: 'Total Value Locked',
      value: stats.tvl,
      icon: TrendingUp,
      color: 'text-jade',
    },
    {
      label: 'Quests Completed',
      value: stats.questsCompleted.toLocaleString(),
      icon: Target,
      color: 'text-iris',
    },
    {
      label: 'SBTs Minted',
      value: stats.sbtsMinted.toLocaleString(),
      icon: Award,
      color: 'text-gold',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink to-ink/90">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Scene or Fallback */}
        <MapScene className="absolute inset-0" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-sora text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-gold via-iris to-jade bg-clip-text text-transparent">
                Kaia Quest
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Embark on epic adventures, build guilds, and earn rewards in the ultimate Web3 treasure hunt
            </p>

            {!liffProfile ? (
              <Button
                onClick={handleLogin}
                size="lg"
                variant="gold"
                className="text-lg px-8 py-4 font-semibold"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Begin Your Quest
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <img
                    src={liffProfile.pictureUrl}
                    alt={liffProfile.displayName}
                    className="w-12 h-12 rounded-full border-2 border-gold"
                  />
                  <div className="text-left">
                    <p className="text-white font-semibold">Welcome back,</p>
                    <p className="text-gold">{liffProfile.displayName}</p>
                  </div>
                </div>

                <Button
                  asChild
                  size="lg"
                  variant="gold"
                  className="text-lg px-8 py-4 font-semibold"
                >
                  <a href="/quests">
                    <Target className="mr-2 h-5 w-5" />
                    Enter the Map
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            )}

            {isDemoMode && (
              <p className="text-sm text-gold/80 mt-4">
                Demo Mode Active - Experience the full adventure without blockchain transactions
              </p>
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">
              Join the Adventure
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Thousands of adventurers are already exploring, questing, and earning rewards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statsData.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-parchment/10 border-gold/20 backdrop-blur-sm hover:bg-parchment/20 transition-colors h-full">
                    <CardContent className="p-8 text-center">
                      <Icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                      <div className="text-3xl font-bold text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-gray-300">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-ink/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">
              Epic Features Await
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover what makes Kaia Quest the ultimate Web3 adventure platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Round-Up Quests",
                description: "Turn everyday purchases into epic adventures with automatic round-up savings",
                icon: "🪙"
              },
              {
                title: "Guild System",
                description: "Team up with friends to tackle challenging group quests and share rewards",
                icon: "⚔️"
              },
              {
                title: "SBT Rewards",
                description: "Earn unique Soul Bound Tokens that showcase your achievements forever",
                icon: "🏆"
              },
              {
                title: "3D Adventure Map",
                description: "Navigate through a beautiful 3D world that evolves with your progress",
                icon: "🗺️"
              },
              {
                title: "LINE Integration",
                description: "Seamlessly connect with friends and share your adventures on LINE",
                icon: "💬"
              },
              {
                title: "Demo Mode",
                description: "Experience the full adventure without any blockchain transactions",
                icon: "🎮"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-parchment/10 border-gold/20 backdrop-blur-sm hover:bg-parchment/20 transition-colors h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="font-sora text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


