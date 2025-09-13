import liff from '@line/liff'
import { env } from './env'

export interface LiffProfile {
  displayName: string
  pictureUrl: string
  userId: string
}

class LiffService {
  private initialized = false

  async init(): Promise<boolean> {
    if (this.initialized) return true
    
    try {
      await liff.init({ liffId: env.LIFF_ID })
      this.initialized = true
      return true
    } catch (error) {
      console.error('LIFF initialization failed:', error)
      return false
    }
  }

  async login(): Promise<void> {
    if (!this.initialized) {
      await this.init()
    }
    
    if (!liff.isLoggedIn()) {
      liff.login()
    }
  }

  async logout(): Promise<void> {
    if (liff.isLoggedIn()) {
      liff.logout()
    }
  }

  isLoggedIn(): boolean {
    return this.initialized && liff.isLoggedIn()
  }

  async getProfile(): Promise<LiffProfile | null> {
    if (!this.isLoggedIn()) return null
    
    try {
      const profile = await liff.getProfile()
      return {
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl || '',
        userId: profile.userId,
      }
    } catch (error) {
      console.error('Failed to get profile:', error)
      return null
    }
  }

  async shareTargetPicker(message: string, url?: string): Promise<void> {
    if (!this.initialized) return
    
    if (liff.isApiAvailable('shareTargetPicker')) {
      try {
        await liff.shareTargetPicker([
          {
            type: 'text',
            text: message + (url ? `\n${url}` : ''),
          },
        ])
      } catch (error) {
        console.error('Share failed:', error)
      }
    }
  }

  isInClient(): boolean {
    return this.initialized && liff.isInClient()
  }
}

export const liffService = new LiffService()

