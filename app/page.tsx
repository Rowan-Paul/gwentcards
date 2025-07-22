"use client"

import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Search, MapPin, Heart, Sword, Shield, Zap } from "lucide-react"
import Image from "next/image"
import type { ICard, ILocation } from "@/types/card"
import { fetchCards } from "@/lib/fetch-cards"
import { CollectButton } from "@/components/collect-button"
import { Pagination } from "@/components/pagination"
import { CardFilters } from "@/components/card-filters"
import { OfflineIndicator } from "@/components/offline-indicator"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMediaQuery } from "@/hooks/use-media-query"

const CARDS_PER_PAGE = 21

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useMediaQuery("(max-width: 768px)")

  const [selectedImage, setSelectedImage] = useState<string>("")
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<ILocation[]>([])
  const [showLocationsModal, setShowLocationsModal] = useState(false)

  const page = Number.parseInt(searchParams.get("page") || "1")
  const searchQuery = searchParams.get("search") || ""
  const deckFilter = searchParams.get("deck")?.split(",").filter(Boolean) || []
  const expansionFilter = searchParams.get("expansion")?.split(",").filter(Boolean) || []
  const rowFilter = searchParams.get("row")?.split(",").filter(Boolean) || []
  const effectFilter = searchParams.get("effect")?.split(",").filter(Boolean) || []
  const strengthFilter = searchParams.get("strength")?.split(",").map(Number).filter(Boolean) || []
  const abilitiesFilter = searchParams.get("abilities")?.split(",").filter(Boolean) || []
  const hideDLC = searchParams.get("hideDLC") === "true"
  const showCollected = searchParams.get("showCollected") === "true"

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    }
  }, [])

  const updateURL = (updates: Record<string, string | string[] | boolean | number>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === false || value === 0 || (Array.isArray(value) && value.length === 0)) {
        params.delete(key)
      } else if (Array.isArray(value)) {
        params.set(key, value.join(","))
      } else {
        params.set(key, value.toString())
      }
    })

    router.push(`?${params.toString()}`, { scroll: false })
  }

  const getCollectedData = () => {
    try {
      return JSON.parse(localStorage.getItem("collected") || '{"collected":[]}')
    } catch {
      return { collected: [] }
    }
  }

  const collectedQuery = useQuery({
    queryKey: ["collected"],
    queryFn: getCollectedData,
    refetchOnWindowFocus: false,
  })

  const getFilteredCards = async () => {
    const data = await fetchCards()
    let filteredCards = data.cards

    if (searchQuery) {
      filteredCards = filteredCards.filter((card) => card.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (
      deckFilter.length > 0 ||
      expansionFilter.length > 0 ||
      rowFilter.length > 0 ||
      effectFilter.length > 0 ||
      strengthFilter.length > 0 ||
      abilitiesFilter.length > 0 ||
      hideDLC ||
      showCollected
    ) {
      filteredCards = filteredCards.filter((card: ICard) => {
        const locations = card.locations.map((l, i) => card.id + i)

        if (deckFilter.length > 0 && !deckFilter.includes(card.deck)) return false

        if (expansionFilter.length > 0 && (!card.expansion || !expansionFilter.includes(card.expansion))) return false

        if (rowFilter.length > 0 && (!card.row || !rowFilter.includes(card.row))) return false

        if (effectFilter.length > 0 && (!card.effect || !effectFilter.includes(card.effect))) return false

        if (strengthFilter.length > 0 && (!card.strength || !strengthFilter.includes(card.strength))) return false

        if (
          abilitiesFilter.length > 0 &&
          (!card.abilities || !card.abilities.some((ability) => abilitiesFilter.includes(ability)))
        )
          return false

        if (hideDLC && card.isDLC) return false

        if (showCollected && !collectedQuery.data?.collected.some((id: string) => locations.includes(id))) return false

        return true
      })
    }

    return { cards: filteredCards }
  }

  const cardsQuery = useQuery({
    queryKey: [
      "cards",
      searchQuery,
      deckFilter,
      expansionFilter,
      rowFilter,
      effectFilter,
      strengthFilter,
      abilitiesFilter,
      hideDLC,
      showCollected,
    ],
    queryFn: getFilteredCards,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  })

  const totalPages = Math.ceil((cardsQuery.data?.cards.length || 0) / CARDS_PER_PAGE)
  const startIndex = (page - 1) * CARDS_PER_PAGE
  const endIndex = startIndex + CARDS_PER_PAGE
  const paginatedCards = cardsQuery.data?.cards.slice(startIndex, endIndex) || []

  const getDeckIcon = (deck: string) => {
    switch (deck) {
      case "Monsters":
        return "👹"
      case "Nilfgaard":
        return "🦅"
      case "Northern Realms":
        return "👑"
      case "Scoia'tael":
        return "🏹"
      case "Skellige":
        return "⚔️"
      case "Neutral":
        return "⚖️"
      default:
        return "🃏"
    }
  }

  const getRowIcon = (row: string) => {
    switch (row) {
      case "close":
        return <Sword className="w-4 h-4" />
      case "ranged":
        return <Shield className="w-4 h-4" />
      case "siege":
        return <Zap className="w-4 h-4" />
      case "agile":
        return <Heart className="w-4 h-4" />
      case "leader":
        return "👑"
      default:
        return null
    }
  }

  const LocationsContent = () => (
    <div className="space-y-4">
      {selectedLocations.map((location, i) => (
        <Card key={i} className="card-enhanced">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Location {i + 1}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
              <span className="text-sm font-medium">Type:</span>
              <span className="text-sm capitalize">{location.type}</span>
            </div>
            {location.territory && (
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <span className="text-sm font-medium">Territory:</span>
                <span className="text-sm text-right">{location.territory}</span>
              </div>
            )}
            {location.location && (
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <span className="text-sm font-medium">Location:</span>
                <span className="text-sm text-right">{location.location}</span>
              </div>
            )}
            {location.character && (
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <span className="text-sm font-medium">Character:</span>
                <span className="text-sm text-right">{location.character}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  if (collectedQuery.isError || cardsQuery.isError) {
    return (
      <div className="container p-4 mx-auto sm:p-6">
        <Card className="card-enhanced">
          <CardContent className="p-6">
            <h1 className="mb-4 text-2xl font-bold text-center">GWENTcards</h1>
            <p className="text-center text-muted-foreground">Something went wrong...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      <OfflineIndicator />

      <div className="fixed z-40 top-4 left-4">
        <ThemeToggle />
      </div>

      {isMobile ? (
        <Drawer open={showImageModal} onOpenChange={setShowImageModal}>
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader className="pb-4">
              <DrawerTitle>Card Image</DrawerTitle>
            </DrawerHeader>
            <div className="flex justify-center px-4 pb-6">
              <Image
                src={selectedImage || "/favicon.ico"}
                alt="Card"
                width={200}
                height={380}
                className="h-auto max-w-full rounded-lg shadow-lg"
              />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
          <DialogContent className="max-w-md">
            <div className="flex justify-center">
              <Image
                src={selectedImage || "/favicon.ico"}
                alt="Card"
                width={250}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {isMobile ? (
        <Drawer open={showLocationsModal} onOpenChange={setShowLocationsModal}>
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader className="pb-4">
              <DrawerTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Card Locations
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-6 overflow-y-auto">
              <LocationsContent />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={showLocationsModal} onOpenChange={setShowLocationsModal}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Card Locations
              </DialogTitle>
            </DialogHeader>
            <LocationsContent />
          </DialogContent>
        </Dialog>
      )}

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 dark:bg-pattern-dark light:bg-pattern-light">
        <div className="container p-4 pt-16 mx-auto sm:p-6 sm:pt-6">
          <div className="mb-6 text-center sm:mb-8">
            <h1 className="mb-2 text-3xl font-bold text-transparent sm:text-4xl bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text">
              GWENTcards
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">Track your Witcher 3 GWENT card collection</p>
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => updateURL({ search: e.target.value, page: 1 })}
                className="pl-10 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
          </div>

          <CardFilters
            searchQuery={searchQuery}
            deckFilter={deckFilter}
            expansionFilter={expansionFilter}
            rowFilter={rowFilter}
            effectFilter={effectFilter}
            strengthFilter={strengthFilter}
            abilitiesFilter={abilitiesFilter}
            hideDLC={hideDLC}
            showCollected={showCollected}
            onUpdateFilters={updateURL}
          />

          {(collectedQuery.isLoading || cardsQuery.isPending || cardsQuery.isFetching) && (
            <div className="py-8 text-center">
              <div className="w-8 h-8 mx-auto border-b-2 rounded-full animate-spin border-primary"></div>
              <p className="mt-2 text-muted-foreground">Loading cards...</p>
            </div>
          )}

          {!cardsQuery.isPending && !cardsQuery.isFetching && (
            <>
              <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between sm:items-center">
                <div className="text-sm text-center text-muted-foreground sm:text-left">
                  Showing {paginatedCards.length} of {cardsQuery.data?.cards.length || 0} cards
                </div>
                <div className="flex justify-center sm:justify-end">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => updateURL({ page: newPage })}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedCards.map((card: ICard) => (
                  <Card key={card.id} className="overflow-hidden card-enhanced">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex gap-3 sm:gap-4">
                        {/* Card Image */}
                        <div
                          className="flex-shrink-0 transition-transform duration-200 cursor-pointer hover:scale-105"
                          onClick={() => {
                            setSelectedImage(card.image)
                            setShowImageModal(true)
                          }}
                        >
                          <Image
                            src={card.image || "/placeholder.svg"}
                            alt={`${card.name} card`}
                            width={60}
                            height={114}
                            className="sm:w-[75px] sm:h-[142px] rounded-md shadow-md border border-border/20"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-base font-bold leading-tight break-words sm:text-lg">{card.name}</h3>
                            {card.isDLC && (
                              <div className="flex-shrink-0">
                                <Image
                                  src={
                                    card.expansion === "blood and wine" ? "/blood-and-wine.png" : "/hearts-of-stone.png"
                                  }
                                  alt={`${card.expansion} DLC`}
                                  width={24}
                                  height={24}
                                  className="rounded-sm sm:w-8 sm:h-8"
                                  title={
                                    card.expansion === "blood and wine" ? "Blood and Wine DLC" : "Hearts of Stone DLC"
                                  }
                                />
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg">{getDeckIcon(card.deck)}</span>
                            <Badge variant="secondary" className="text-xs bg-secondary/80">
                              {card.deck}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 gap-1 text-xs sm:grid-cols-2 sm:gap-2 sm:text-sm">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Strength:</span>
                              <span className="text-muted-foreground">{card.strength || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Row:</span>
                              <div className="flex items-center gap-1">
                                {card.row && getRowIcon(card.row)}
                                <span className="capitalize text-muted-foreground">{card.row || "N/A"}</span>
                              </div>
                            </div>
                          </div>

                          {card.effect && (
                            <div className="flex items-center gap-1 text-xs sm:text-sm">
                              <span className="font-medium">Effect:</span>
                              <Badge variant="outline" className="text-xs capitalize bg-background/50">
                                {card.effect}
                              </Badge>
                            </div>
                          )}

                          {card.abilities && card.abilities.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {card.abilities.map((ability, i) => (
                                <Badge key={i} variant="default" className="text-xs bg-primary/90 hover:bg-primary">
                                  {ability}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 space-y-2 sm:mt-4">
                        {card.locations.map((location, i) => (
                          <CollectButton
                            key={`${card.id}-${i}`}
                            id={card.id + i}
                            location={
                              card.locations.length > 1
                                ? `#${i + 1} ${location.type.charAt(0).toUpperCase() + location.type.slice(1)}`
                                : "Collect card"
                            }
                            onShowLocations={() => {
                              setSelectedLocations(card.locations)
                              setShowLocationsModal(true)
                            }}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-6 sm:mt-8">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => updateURL({ page: newPage })}
                  />
                </div>
              )}
            </>
          )}

          <footer className="mt-8 text-xs text-center sm:mt-12 sm:text-sm text-muted-foreground">
            Made with ❤️ by{" "}
            <a
              href="https://rowanpaulflynn.com/"
              target="_blank"
              rel="noreferrer"
              className="underline transition-colors duration-200 hover:text-foreground"
            >
              Rowan Paul Flynn
            </a>
          </footer>
        </div>
      </div>
    </>
  )
}
