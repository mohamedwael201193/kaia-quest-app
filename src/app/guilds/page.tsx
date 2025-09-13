'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Shield, Crown, Plus } from 'lucide-react'

export default function GuildsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ink to-ink/90 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-sora text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-iris to-jade bg-clip-text text-transparent">
              Guild Hall
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Join forces with fellow adventurers to tackle epic guild quests
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Dragon Slayers",
              members: 12,
              level: "Elite",
              description: "Veteran guild focused on high-stakes quests",
              icon: Crown,
              color: "text-gold"
            },
            {
              name: "Treasure Hunters",
              members: 8,
              level: "Advanced",
              description: "Specialists in finding hidden rewards",
              icon: Shield,
              color: "text-iris"
            },
            {
              name: "New Adventurers",
              members: 15,
              level: "Beginner",
              description: "Welcoming guild for newcomers",
              icon: Users,
              color: "text-jade"
            }
          ].map((guild, index) => {
            const Icon = guild.icon
            return (
              <motion.div
                key={guild.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-parchment/10 border-gold/20 hover:bg-parchment/20 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${guild.color}`} />
                      <span className="text-white">{guild.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">{guild.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Members: {guild.members}</span>
                      <span className={`font-semibold ${guild.color}`}>{guild.level}</span>
                    </div>
                    <Button className="w-full" variant="outline">
                      Join Guild
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="gold" size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Create New Guild
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

