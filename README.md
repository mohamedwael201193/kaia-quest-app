# Kaia Quest - Epic Web3 Adventures

A comprehensive Web3 adventure platform built on the Kaia blockchain, featuring quest systems, guild mechanics, and Soul Bound Token (SBT) rewards.

## 🌟 Features

### Core Features
- **Round-Up Quests**: Turn everyday purchases into epic adventures with automatic round-up savings
- **Guild System**: Team up with friends to tackle challenging group quests and share rewards
- **SBT Rewards**: Earn unique Soul Bound Tokens that showcase your achievements forever
- **3D Adventure Map**: Navigate through a beautiful 3D world that evolves with your progress
- **LINE Integration**: Seamlessly connect with friends and share your adventures on LINE
- **Demo Mode**: Experience the full adventure without any blockchain transactions

### Technical Features
- **Next.js 14**: Modern React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Framer Motion**: Smooth animations and transitions
- **React Three Fiber**: 3D graphics and interactive scenes
- **Wagmi v2**: Ethereum React hooks for wallet integration
- **Zustand**: Lightweight state management
- **TypeScript**: Type-safe development

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kaia-quest-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_LIFF_ID=your_liff_id
   NEXT_PUBLIC_ENVIRONMENT=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
kaia-quest-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── quests/            # Quest system pages
│   │   ├── guilds/            # Guild system pages
│   │   ├── analytics/         # Analytics dashboard
│   │   └── profile/           # User profile
│   ├── components/            # Reusable components
│   │   ├── ui/                # UI components (shadcn/ui)
│   │   ├── three/             # 3D components
│   │   └── Header.tsx         # Navigation header
│   ├── lib/                   # Utility libraries
│   │   ├── chains.ts          # Blockchain configurations
│   │   ├── contracts.ts       # Smart contract helpers
│   │   ├── wallet.tsx         # Wallet provider setup
│   │   └── utils.ts           # General utilities
│   ├── store/                 # State management
│   │   └── useAppStore.ts     # Zustand store
│   └── abis/                  # Smart contract ABIs
├── public/                    # Static assets
│   ├── models/                # 3D models (.glb files)
│   └── images/                # Images and icons
└── docs/                      # Documentation
```

## 🎮 How to Use

### Demo Mode
The application starts in Demo Mode by default, allowing you to:
- Explore all features without blockchain transactions
- Simulate quest completions and rewards
- Test the user interface and interactions

### Real Mode (Blockchain Integration)
To use real blockchain features:
1. Connect your Kaia-compatible wallet
2. Ensure you have KAIA tokens for gas fees
3. Switch from Demo Mode in the header

### Quest System
1. **Personal Quests**: Individual challenges like round-up savings and daily logins
2. **Guild Quests**: Collaborative challenges requiring teamwork
3. **Rewards**: Earn KAIA tokens and unique SBTs for completing quests

### Guild System
1. **Join Guilds**: Browse and join existing guilds
2. **Create Guilds**: Start your own guild and invite friends
3. **Collaborative Quests**: Work together to achieve common goals

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Environment Variables
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - WalletConnect project ID
- `NEXT_PUBLIC_LIFF_ID` - LINE LIFF application ID
- `NEXT_PUBLIC_ENVIRONMENT` - Environment (development/production)

### Smart Contracts
The application integrates with several smart contracts:
- **MockUSDT**: ERC20 token for testing
- **StablecoinVault**: Handles deposits and round-up savings
- **QuestManager**: Manages quest creation and completion
- **RewardsController**: Distributes rewards and mints SBTs

## 🌐 Deployment

### Static Export
The application is configured for static export:
```bash
npm run build
```

This generates a `out/` directory with static files ready for deployment.

### Deployment Platforms
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative static hosting
- **GitHub Pages**: Free static hosting
- **IPFS**: Decentralized hosting

## 🎨 Customization

### Themes and Colors
The application uses a custom color palette defined in `tailwind.config.ts`:
- **Ink**: Dark background color
- **Parchment**: Light accent color
- **Gold**: Primary accent color
- **Jade**: Success/progress color
- **Iris**: Secondary accent color

### 3D Models
Replace the GLB files in `public/models/` with your own 3D assets:
- `low_poly_treasure_chest.glb`
- `low_poly_adventurer.glb`
- `low_poly_map.glb`
- `low_poly_stylized_map.glb`

## 🔒 Security Considerations

- All smart contract interactions are handled through established libraries (wagmi, viem)
- Private keys are never stored or transmitted
- Demo mode provides safe testing without real transactions
- Environment variables are properly configured for different environments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Kaia Blockchain** - For providing the infrastructure
- **LINE** - For LIFF integration capabilities
- **shadcn/ui** - For beautiful UI components
- **React Three Fiber** - For 3D graphics capabilities
- **Wagmi** - For Web3 React hooks

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Join our community discussions
- Check the documentation in the `docs/` folder

---

**Built with ❤️ for the Kaia ecosystem**
