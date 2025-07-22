import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { QueryProvider } from "@/components/query-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GWENTcards",
  description: "Keep track of which cards you've collected for the Witcher 3 GWENT minigame.",
  keywords: "GWENT, cards, minigame, witcher, the witcher 3, game, card, collect, filter",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GWENTcards",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "GWENTcards",
    title: "GWENTcards - Witcher 3 GWENT Card Tracker",
    description: "Keep track of which cards you've collected for the Witcher 3 GWENT minigame.",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "GWENTcards Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "GWENTcards - Witcher 3 GWENT Card Tracker",
    description: "Keep track of which cards you've collected for the Witcher 3 GWENT minigame.",
    images: ["/icon-512x512.png"],
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GWENTcards" />
        <meta name="application-name" content="GWENTcards" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="gwentcards-theme"
        >
          <QueryProvider>
            {children}
            <PWAInstallPrompt />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
