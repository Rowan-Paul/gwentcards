"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { WifiOff, Wifi } from "lucide-react"

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showOffline, setShowOffline] = useState(false)

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine
      setIsOnline(online)

      if (!online) {
        setShowOffline(true)
      } else {
        // Hide offline indicator after a delay when back online
        setTimeout(() => setShowOffline(false), 2000)
      }
    }

    // Set initial status
    updateOnlineStatus()

    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [])

  if (!showOffline && isOnline) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center gap-1 px-3 py-1">
        {isOnline ? (
          <>
            <Wifi className="h-3 w-3" />
            Back online
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3" />
            Offline mode
          </>
        )}
      </Badge>
    </div>
  )
}
