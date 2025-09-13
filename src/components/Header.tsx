'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { useAppStore } from '@/store/useAppStore'
import { liffService } from '@/lib/liff'
import { 
  Home, 
  Target, 
  Users, 
  BarChart3, 
  User,
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Quests', href: '/quests', icon: Target },
  { name: 'Guilds', href: '/guilds', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Profile', href: '/profile', icon: User },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { 
    isDemoMode, 
    setDemoMode, 
    liffProfile, 
    setLiffProfile,
    isLiffReady 
  } = useAppStore()

  const handleLogin = async () => {
    try {
      await liffService.login()
      const profile = await liffService.getProfile()
      setLiffProfile(profile)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await liffService.logout()
      setLiffProfile(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-iris to-gold flex items-center justify-center">
              <span className="text-white font-bold text-sm">KQ</span>
            </div>
            <span className="font-sora font-bold text-xl text-white">
              Kaia Quest
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-iris text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Demo Mode Toggle */}
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-sm text-gray-300">Demo</span>
            <Switch
              checked={isDemoMode}
              onCheckedChange={setDemoMode}
            />
          </div>

          {/* Profile */}
          {liffProfile ? (
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={liffProfile.pictureUrl} />
                <AvatarFallback>
                  {liffProfile.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-sm text-white">
                {liffProfile.displayName}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleLogin}
              variant="gold"
              size="sm"
              disabled={!isLiffReady}
            >
              Login with LINE
            </Button>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-ink">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium",
                    isActive
                      ? "bg-iris text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            
            {/* Demo Mode Toggle for Mobile */}
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-gray-300">Demo Mode</span>
              <Switch
                checked={isDemoMode}
                onCheckedChange={setDemoMode}
              />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

