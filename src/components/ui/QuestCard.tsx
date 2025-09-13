'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Button } from './button'
import { Progress } from './progress'
import { Coins, Target, Users } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

interface QuestCardProps {
  title: string
  description: string
  progress: number
  goal: string
  reward: string
  type: 'personal' | 'guild'
  onAction: () => void
  actionLabel: string
}

export function QuestCard({
  title,
  description,
  progress,
  goal,
  reward,
  type,
  onAction,
  actionLabel,
}: QuestCardProps) {
  const isDemoMode = useAppStore((state) => state.isDemoMode)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-parchment border-gold/20 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {type === 'guild' ? (
                <Users className="h-5 w-5 text-iris" />
              ) : (
                <Target className="h-5 w-5 text-jade" />
              )}
              <CardTitle className="text-ink font-sora">{title}</CardTitle>
            </div>
            <div className="flex items-center gap-1 text-gold">
              <Coins className="h-4 w-4" />
              <span className="text-sm font-semibold">{reward}</span>
            </div>
          </div>
          <CardDescription className="text-ink/70">{description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-ink/70">Progress</span>
              <span className="font-semibold text-ink">{Math.round(progress * 100)}%</span>
            </div>
            <Progress value={progress * 100} className="h-2" />
            <div className="text-xs text-ink/60">Goal: {goal}</div>
          </div>
          
          <Button 
            onClick={onAction}
            variant={type === 'guild' ? 'default' : 'jade'}
            className="w-full font-semibold"
          >
            {actionLabel}
            {isDemoMode && <span className="ml-2 text-xs opacity-75">(Demo)</span>}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

