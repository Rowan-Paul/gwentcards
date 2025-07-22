export interface ICard {
  id: string
  image: string
  name: string
  deck: "Scoia'tael" | "Monsters" | "Nilfgaard" | "Northern Realms" | "Neutral" | "Skellige"
  strength?: number
  row?: "close" | "agile" | "ranged" | "siege" | "leader"
  locations: ILocation[]
  notes?: any
  abilities?: ("Hero" | "Medic" | "Morale boost" | "Muster" | "Spy" | "Tight bond")[]
  isDLC?: boolean
  expansion?: "hearts of stone" | "blood and wine"
  effect?: "scorch" | "weather" | "commander's horn" | "summon avenger" | "berserker" | "mardroeme" | "decoy"
}

export interface ILocation {
  type: string
  location?: string
  territory?: string
  character?: string
}
