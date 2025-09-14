import liff from '@line/liff'

export interface LiffProfile {
  displayName: string
  pictureUrl: string
  userId: string
}

class LiffService {
  private initialized = false
  private liffId: string | undefined

  constructor() {
    this.liffId = process.env.NEXT_PUBLIC_LIFF_ID
  }

  async init(): Promise<boolean> {
    if (this.initialized) return true
    if (!this.liffId) {
      console.warn('LIFF_ID is not set. LIFF features will be disabled.')
      return false
    }

    try {
      await liff.init({ liffId: this.liffId })
      this.initialized = true
      return true
    } catch (error) {
      console.error('LIFF initialization failed:', error)
      return false
    }
  }

  async login(): Promise<void> {
    if (!this.initialized) {
      const success = await this.init()
      if (!success) return
    }
    
    if (!liff.isLoggedIn() && !liff.isInClient()) {
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
    if (!this.initialized || !liff.isApiAvailable('shareTargetPicker')) return
    
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

  isInClient(): boolean {
    return this.initialized && liff.isInClient()
  }

  isDesktop(): boolean {
    return liff.isInClient() && liff.getOS() === 'web'
  }
}

export const liffService = new LiffService()


