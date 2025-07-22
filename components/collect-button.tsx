"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Check, MapPin } from "lucide-react"

interface CollectButtonProps {
  id: string
  location: string
  onShowLocations: () => void
}

export function CollectButton({ id, location, onShowLocations }: CollectButtonProps) {
  const queryClient = useQueryClient()

  const getData = () => {
    try {
      return JSON.parse(localStorage.getItem("collected") || '{"collected":[]}')
    } catch {
      return { collected: [] }
    }
  }

  const { data } = useQuery({
    queryKey: ["collected"],
    queryFn: getData,
    refetchOnWindowFocus: false,
  })

  const mutation = useMutation({
    mutationFn: () => {
      if (data?.collected.includes(id)) {
        const newCollected = data.collected.filter((collectedId: string) => collectedId !== id)
        localStorage.setItem("collected", JSON.stringify({ collected: newCollected }))
        return { collected: newCollected }
      } else {
        const newCollected = [...(data?.collected || []), id]
        localStorage.setItem("collected", JSON.stringify({ collected: newCollected }))
        return { collected: newCollected }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collected"] })
    },
  })

  const isCollected = data?.collected.includes(id)

  return (
    <div className="flex gap-2">
      <Button
        variant={isCollected ? "default" : "outline"}
        size="sm"
        onClick={() => mutation.mutate()}
        className="flex-1"
        disabled={mutation.isPending}
      >
        {isCollected ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Collected
          </>
        ) : (
          location
        )}
      </Button>
      <Button variant="outline" size="sm" onClick={onShowLocations}>
        <MapPin className="h-4 w-4" />
      </Button>
    </div>
  )
}
