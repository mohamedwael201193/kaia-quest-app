
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Users, Award, DollarSign } from 'lucide-react'

export default function AnalyticsPage() {
  const DUNE_TVL_URL = process.env.NEXT_PUBLIC_DUNE_TVL
  const DUNE_SBT_URL = process.env.NEXT_PUBLIC_DUNE_SBT
  const DUNE_GUILDS_URL = process.env.NEXT_PUBLIC_DUNE_GUILDS

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink to-ink/90 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-sora text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-jade to-iris bg-clip-text text-transparent">
              Analytics Dashboard
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Track the ecosystem&apos;s growth and performance metrics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Value Locked",
              value: "$1,234,567",
              change: "+12.5%",
              icon: DollarSign,
              color: "text-jade"
            },
            {
              title: "Active Users",
              value: "2,847",
              change: "+8.3%",
              icon: Users,
              color: "text-iris"
            },
            {
              title: "Quests Completed",
              value: "15,692",
              change: "+23.1%",
              icon: TrendingUp,
              color: "text-gold"
            },
            {
              title: "SBTs Minted",
              value: "892",
              change: "+15.7%",
              icon: Award,
              color: "text-jade"
            }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-parchment/10 border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                      </div>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-parchment/10 border-gold/20">
              <CardHeader>
                <CardTitle className="text-white">TVL Growth</CardTitle>
              </CardHeader>
              <CardContent>
                {DUNE_TVL_URL ? (
                  <iframe
                    src={DUNE_TVL_URL}
                    width="100%"
                    height="300"
                    title="TVL Growth"
                    className="border-0 rounded-lg"
                  ></iframe>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <p>Dune Analytics Dashboard for TVL would be embedded here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-parchment/10 border-gold/20">
              <CardHeader>
                <CardTitle className="text-white">SBTs Minted</CardTitle>
              </CardHeader>
              <CardContent>
                {DUNE_SBT_URL ? (
                  <iframe
                    src={DUNE_SBT_URL}
                    width="100%"
                    height="300"
                    title="SBTs Minted"
                    className="border-0 rounded-lg"
                  ></iframe>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <p>Dune Analytics Dashboard for SBTs would be embedded here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2"
          >
            <Card className="bg-parchment/10 border-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Guild Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {DUNE_GUILDS_URL ? (
                  <iframe
                    src={DUNE_GUILDS_URL}
                    width="100%"
                    height="300"
                    title="Guild Activity"
                    className="border-0 rounded-lg"
                  ></iframe>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <p>Dune Analytics Dashboard for Guilds would be embedded here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


