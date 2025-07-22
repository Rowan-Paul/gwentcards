"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Download, Smartphone } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useTheme } from "next-themes"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { theme } = useTheme()

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      const isStandaloneMode = window.matchMedia("(display-mode: standalone)").matches
      const isIOSStandalone = (window.navigator as any).standalone === true
      setIsStandalone(isStandaloneMode || isIOSStandalone)
      setIsInstalled(isStandaloneMode || isIOSStandalone)
    }

    // Check if iOS
    const checkIOS = () => {
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent)
      setIsIOS(isIOSDevice)
    }

    checkInstalled()
    checkIOS()

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)

      // Show prompt after a delay if not already installed and user hasn't dismissed it recently
      const lastDismissed = localStorage.getItem("pwa-install-dismissed")
      const now = Date.now()
      const dayInMs = 24 * 60 * 60 * 1000

      if (!lastDismissed || now - Number.parseInt(lastDismissed) > dayInMs * 7) {
        setTimeout(() => {
          if (!isInstalled) {
            setShowPrompt(true)
          }
        }, 3000) // Show after 3 seconds
      }
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [isInstalled])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setIsInstalled(true)
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem("pwa-install-dismissed", Date.now().toString())
  }

  // Don't show if already installed, not mobile, or prompt not available
  if (isInstalled || !isMobile || (!deferredPrompt && !isIOS) || !showPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-2">
      <Card className="border-primary/20 bg-card/95 backdrop-blur-sm shadow-lg theme-transition">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1">Install GWENTcards</h3>
              <p className="text-xs text-muted-foreground mb-3">
                {isIOS
                  ? "Add to your home screen for quick access and offline use. Tap the share button and select 'Add to Home Screen'."
                  : "Install this app for quick access and offline use."}
              </p>
              <div className="flex gap-2">
                {!isIOS && deferredPrompt && (
                  <Button size="sm" onClick={handleInstallClick} className="h-8 text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    Install
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={handleDismiss} className="h-8 text-xs bg-transparent">
                  {isIOS ? "Got it" : "Later"}
                </Button>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleDismiss} className="flex-shrink-0 h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
