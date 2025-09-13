'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coins } from 'lucide-react'

interface CoinBurstProps {
  trigger: boolean
  onComplete?: () => void
}

export function CoinBurst({ trigger, onComplete }: CoinBurstProps) {
  const [coins, setCoins] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (trigger) {
      const newCoins = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
      }))
      setCoins(newCoins)

      const timer = setTimeout(() => {
        setCoins([])
        onComplete?.()
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [trigger, onComplete])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <AnimatePresence>
        {coins.map((coin) => (
          <motion.div
            key={coin.id}
            initial={{ 
              x: 0, 
              y: 0, 
              scale: 0,
              rotate: 0,
              opacity: 1 
            }}
            animate={{ 
              x: coin.x, 
              y: coin.y, 
              scale: [0, 1.2, 0.8],
              rotate: 360,
              opacity: [1, 1, 0] 
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut",
              times: [0, 0.3, 1]
            }}
            className="absolute"
          >
            <Coins className="h-8 w-8 text-gold drop-shadow-lg" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

