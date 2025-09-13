'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAppStore } from '@/store/useAppStore'
import { 
  User, 
  Award, 
  Wallet, 
  ExternalLink,
  Settings
} from 'lucide-react'

export default function ProfilePage() {
  const { liffProfile, questProgress } = useAppStore()

  const achievements = [
    {
      title: "First Steps",
      description: "Completed your first quest",
      earned: questProgress > 0,
      rarity: "Common"
    },
    {
      title: "Treasure Hunter",
      description: "Found 10 hidden treasures",
      earned: questProgress > 0.5,
      rarity: "Rare"
    },
    {
      title: "Guild Master",
      description: "Led a successful guild quest",
      earned: false,
      rarity: "Epic"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink to-ink/90 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-sora text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-gold to-iris bg-clip-text text-transparent">
              Adventurer Profile
            </span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="bg-parchment/10 border-gold/20">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={liffProfile?.pictureUrl} />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">
                  {liffProfile?.displayName || 'Anonymous Adventurer'}
                </CardTitle>
                <p className="text-gray-400">Level {Math.floor(questProgress * 10) + 1} Explorer</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-jade">
                    {Math.round(questProgress * 100)}%
                  </div>
                  <div className="text-sm text-gray-400">Progress to Next Level</div>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet
                  </Button>
                  <Button variant="ghost" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Stats */}
            <Card className="bg-parchment/10 border-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Adventure Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-jade">
                      {Math.round(questProgress * 50)}
                    </div>
                    <div className="text-sm text-gray-400">Quests Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-iris">
                      {Math.round(questProgress * 500)}
                    </div>
                    <div className="text-sm text-gray-400">KAIA Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold">
                      {questProgress > 0.5 ? 1 : 0}
                    </div>
                    <div className="text-sm text-gray-400">SBTs Owned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-jade">
                      {Math.floor(questProgress * 10) + 1}
                    </div>
                    <div className="text-sm text-gray-400">Current Level</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-parchment/10 border-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Award className="h-5 w-5 text-gold" />
                  Achievement Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${
                        achievement.earned 
                          ? 'bg-gold/10 border-gold/30' 
                          : 'bg-gray-800/50 border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Award className={`h-8 w-8 ${
                          achievement.earned ? 'text-gold' : 'text-gray-500'
                        }`} />
                        <div className="flex-1">
                          <h3 className={`font-semibold ${
                            achievement.earned ? 'text-white' : 'text-gray-400'
                          }`}>
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {achievement.description}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded ${
                            achievement.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-300' :
                            achievement.rarity === 'Rare' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>
                            {achievement.rarity}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-parchment/10 border-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {questProgress > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-jade/10 rounded-lg">
                      <div className="w-2 h-2 bg-jade rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Completed Round-Up Quest</p>
                        <p className="text-gray-400 text-xs">Earned 50 KAIA</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 bg-iris/10 rounded-lg">
                    <div className="w-2 h-2 bg-iris rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Joined Kaia Quest</p>
                      <p className="text-gray-400 text-xs">Welcome bonus received</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

