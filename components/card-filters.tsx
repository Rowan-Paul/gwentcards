"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Filter, ChevronDown, X } from "lucide-react"

interface CardFiltersProps {
  searchQuery: string
  deckFilter: string[]
  expansionFilter: string[]
  rowFilter: string[]
  effectFilter: string[]
  strengthFilter: number[]
  abilitiesFilter: string[]
  hideDLC: boolean
  showCollected: boolean
  onUpdateFilters: (updates: Record<string, string | string[] | boolean | number>) => void
}

export function CardFilters({
  deckFilter,
  expansionFilter,
  rowFilter,
  effectFilter,
  strengthFilter,
  abilitiesFilter,
  hideDLC,
  showCollected,
  onUpdateFilters,
}: CardFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const decks = ["Monsters", "Neutral", "Nilfgaard", "Northern Realms", "Scoia'tael", "Skellige"]
  const abilities = ["Hero", "Medic", "Morale boost", "Muster", "Spy", "Tight bond"]
  const rows = ["close", "agile", "ranged", "siege", "leader"]
  const effects = ["scorch", "weather", "commander's horn", "summon avenger", "mardroeme", "decoy"]
  const strengths = Array.from({ length: 15 }, (_, i) => i + 1)
  const expansions = ["hearts of stone", "blood and wine"]

  const toggleFilter = (filterType: string, value: string | number) => {
    // @ts-ignore
    const currentFilter = {
      deck: deckFilter,
      expansion: expansionFilter,
      row: rowFilter,
      effect: effectFilter,
      strength: strengthFilter,
      abilities: abilitiesFilter,
    }[filterType as keyof typeof currentFilter] as (string | number)[]

    const newFilter = currentFilter.includes(value)
      ? currentFilter.filter((item) => item !== value)
      : [...currentFilter, value]

    // @ts-ignore
    onUpdateFilters({ [filterType]: newFilter, page: 1 })
  }

  const clearAllFilters = () => {
    onUpdateFilters({
      deck: [],
      expansion: [],
      row: [],
      effect: [],
      strength: [],
      abilities: [],
      hideDLC: false,
      showCollected: false,
      page: 1,
    })
  }

  const hasActiveFilters =
    deckFilter.length > 0 ||
    expansionFilter.length > 0 ||
    rowFilter.length > 0 ||
    effectFilter.length > 0 ||
    strengthFilter.length > 0 ||
    abilitiesFilter.length > 0 ||
    hideDLC ||
    showCollected

  return (
    <Card className="mb-4 sm:mb-6 card-enhanced">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="py-3 transition-colors duration-200 cursor-pointer hover:bg-muted/30 sm:py-6">
            <CardTitle className="flex items-center justify-between text-base sm:text-lg">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 sm:h-5 sm:w-5 text-primary" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2 text-xs bg-primary/10 text-primary border-primary/20">
                    Active
                  </Badge>
                )}
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4 sm:space-y-6">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="space-y-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <Label className="text-sm font-medium">Active Filters:</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="self-start transition-colors duration-200 sm:self-auto bg-background/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {deckFilter.map((deck) => (
                    <Badge
                      key={deck}
                      variant="secondary"
                      className="text-xs transition-colors duration-200 cursor-pointer bg-secondary/80 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => toggleFilter("deck", deck)}
                    >
                      {deck} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {expansionFilter.map((expansion) => (
                    <Badge
                      key={expansion}
                      variant="secondary"
                      className="text-xs transition-colors duration-200 cursor-pointer bg-secondary/80 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => toggleFilter("expansion", expansion)}
                    >
                      {expansion} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {rowFilter.map((row) => (
                    <Badge
                      key={row}
                      variant="secondary"
                      className="text-xs transition-colors duration-200 cursor-pointer bg-secondary/80 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => toggleFilter("row", row)}
                    >
                      {row} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {effectFilter.map((effect) => (
                    <Badge
                      key={effect}
                      variant="secondary"
                      className="text-xs transition-colors duration-200 cursor-pointer bg-secondary/80 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => toggleFilter("effect", effect)}
                    >
                      {effect} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {strengthFilter.map((strength) => (
                    <Badge
                      key={strength}
                      variant="secondary"
                      className="text-xs transition-colors duration-200 cursor-pointer bg-secondary/80 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => toggleFilter("strength", strength)}
                    >
                      {strength} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {abilitiesFilter.map((ability) => (
                    <Badge
                      key={ability}
                      variant="secondary"
                      className="text-xs transition-colors duration-200 cursor-pointer bg-secondary/80 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => toggleFilter("abilities", ability)}
                    >
                      {ability} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {hideDLC && (
                    <Badge
                      variant="secondary"
                      className="text-xs transition-colors duration-200 cursor-pointer bg-secondary/80 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => onUpdateFilters({ hideDLC: false, page: 1 })}
                    >
                      Hide DLC <X className="w-3 h-3 ml-1" />
                    </Badge>
                  )}
                  {showCollected && (
                    <Badge
                      variant="secondary"
                      className="text-xs transition-colors duration-200 cursor-pointer bg-secondary/80 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => onUpdateFilters({ showCollected: false, page: 1 })}
                    >
                      Show Collected <X className="w-3 h-3 ml-1" />
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Filter Controls */}
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Deck Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Deck</Label>
                <div className="flex flex-wrap gap-1">
                  {decks.map((deck) => (
                    <Button
                      key={deck}
                      variant={deckFilter.includes(deck) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter("deck", deck)}
                      className="h-8 text-xs transition-all duration-200 hover:scale-105"
                    >
                      {deck}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Abilities Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Abilities</Label>
                <div className="flex flex-wrap gap-1">
                  {abilities.map((ability) => (
                    <Button
                      key={ability}
                      variant={abilitiesFilter.includes(ability) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter("abilities", ability)}
                      className="h-8 text-xs transition-all duration-200 hover:scale-105"
                    >
                      {ability}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Row Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Row</Label>
                <div className="flex flex-wrap gap-1">
                  {rows.map((row) => (
                    <Button
                      key={row}
                      variant={rowFilter.includes(row) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter("row", row)}
                      className="h-8 text-xs capitalize transition-all duration-200 hover:scale-105"
                    >
                      {row}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Strength Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Strength</Label>
                <div className="flex flex-wrap gap-1">
                  {strengths.map((strength) => (
                    <Button
                      key={strength}
                      variant={strengthFilter.includes(strength) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter("strength", strength)}
                      className="text-xs h-8 min-w-[32px] transition-all duration-200 hover:scale-105"
                    >
                      {strength}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Effect Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Effect</Label>
                <div className="flex flex-wrap gap-1">
                  {effects.map((effect) => (
                    <Button
                      key={effect}
                      variant={effectFilter.includes(effect) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter("effect", effect)}
                      className="h-8 text-xs capitalize transition-all duration-200 hover:scale-105"
                    >
                      {effect}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Expansion Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Expansion</Label>
                <div className="flex flex-wrap gap-1">
                  {expansions.map((expansion) => (
                    <Button
                      key={expansion}
                      variant={expansionFilter.includes(expansion) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter("expansion", expansion)}
                      className="h-8 text-xs capitalize transition-all duration-200 hover:scale-105"
                      disabled={hideDLC}
                    >
                      {expansion}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Switches */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hideDLC"
                    checked={hideDLC}
                    onCheckedChange={(checked) => onUpdateFilters({ hideDLC: checked, page: 1 })}
                    disabled={expansionFilter.length > 0}
                  />
                  <Label htmlFor="hideDLC" className="text-sm">
                    Hide DLC cards
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="showCollected"
                    checked={showCollected}
                    onCheckedChange={(checked) => onUpdateFilters({ showCollected: checked, page: 1 })}
                  />
                  <Label htmlFor="showCollected" className="text-sm">
                    Show only collected
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
