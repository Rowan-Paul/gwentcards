import type { ICard } from "@/types/card"

interface ICards {
  cards: ICard[]
}

export const fetchCards = async (): Promise<ICards> => {
  const [scoiatael, monsters, neutral, nilfgaard, northernRealms, skellige] = await Promise.all([
    fetch("/scoiatael.json").then((res) => res.json()),
    fetch("/monsters.json").then((res) => res.json()),
    fetch("/neutral.json").then((res) => res.json()),
    fetch("/nilfgaard.json").then((res) => res.json()),
    fetch("/northern-realms.json").then((res) => res.json()),
    fetch("/skellige.json").then((res) => res.json()),
  ])

  if (
    !monsters?.cards?.length ||
    !neutral?.cards?.length ||
    !nilfgaard?.cards?.length ||
    !northernRealms?.cards?.length ||
    !scoiatael?.cards?.length ||
    !skellige?.cards?.length
  ) {
    throw new Error("Cards request failed or no results")
  }

  const allCards = [
    ...scoiatael.cards,
    ...monsters.cards,
    ...neutral.cards,
    ...nilfgaard.cards,
    ...northernRealms.cards,
    ...skellige.cards,
  ].sort((a, b) => a.name.localeCompare(b.name))

  return { cards: allCards }
}
