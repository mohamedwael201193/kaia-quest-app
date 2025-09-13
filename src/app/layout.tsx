import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/lib/wallet";
import { Header } from "@/components/Header";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({ 
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Kaia Quest - Epic Web3 Adventures",
  description: "Embark on epic adventures, build guilds, and earn rewards in the ultimate Web3 treasure hunt on Kaia blockchain.",
  keywords: ["Web3", "Kaia", "Quest", "Guild", "SBT", "DeFi", "Adventure", "Blockchain"],
  authors: [{ name: "Kaia Quest Team" }],
  openGraph: {
    title: "Kaia Quest - Epic Web3 Adventures",
    description: "Embark on epic adventures, build guilds, and earn rewards in the ultimate Web3 treasure hunt on Kaia blockchain.",
    type: "website",
    images: ["/hero-fallback.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaia Quest - Epic Web3 Adventures",
    description: "Embark on epic adventures, build guilds, and earn rewards in the ultimate Web3 treasure hunt on Kaia blockchain.",
    images: ["/hero-fallback.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className={`${inter.className} antialiased bg-ink text-white`}>
        <WalletProvider>
          <Header />
          <main>{children}</main>
        </WalletProvider>
      </body>
    </html>
  );
}
