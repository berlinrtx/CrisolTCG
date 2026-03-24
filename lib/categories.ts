import { Flame, Sparkles, Zap, Anchor, ShoppingBag } from "lucide-react"

export interface Category {
  id: string
  name: string
  slug: string
  icon: any
  color: string
  href: string
  subcategories?: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  slug: string
}

export interface AccessoryType {
  id: string
  name: string
  slug: string
  icon?: string
  games?: string[] // If undefined, applies to all games. If defined, only applies to specified games
}

export const accessoryTypes: AccessoryType[] = [
  { id: "sleeves", name: "Micas", slug: "micas" },
  { id: "binders", name: "Binders", slug: "binders" },
  { id: "deck-boxes", name: "Deck Boxes", slug: "deck-boxes" },
  { id: "playmats", name: "Tapetes", slug: "tapetes" },
  { id: "dice", name: "Dados", slug: "dados" },
  { id: "pins", name: "Pins", slug: "pins" },
  { id: "field-center", name: "Field Center", slug: "field-center", games: ["yugioh"] },
  { id: "others", name: "Otros", slug: "otros" },
]

export function getAccessoryTypesForGame(gameSlug: string): AccessoryType[] {
  return accessoryTypes.filter((type) => !type.games || type.games.includes(gameSlug))
}

/**
 * @deprecated Use getCategories() from lib/db/categories.ts instead
 * This file is kept for backward compatibility
 */
export const categories: Category[] = [
  {
    id: "yugioh",
    name: "Yu-Gi-Oh!",
    slug: "yugioh",
    icon: Flame,
    color: "bg-red-500",
    href: "/yugioh",
    subcategories: [
      { id: "yugioh-singles", name: "Singles", slug: "singles" },
      { id: "yugioh-sellado", name: "Sellado", slug: "sellado" },
      { id: "yugioh-accesorios", name: "Accesorios", slug: "accesorios" },
    ],
  },
  {
    id: "magic",
    name: "Magic: The Gathering",
    slug: "magic",
    icon: Sparkles,
    color: "bg-purple-500",
    href: "/magic",
    subcategories: [
      { id: "magic-singles", name: "Singles", slug: "singles" },
      { id: "magic-sellado", name: "Sellado", slug: "sellado" },
      { id: "magic-accesorios", name: "Accesorios", slug: "accesorios" },
    ],
  },
  {
    id: "pokemon",
    name: "Pokémon",
    slug: "pokemon",
    icon: Zap,
    color: "bg-yellow-500",
    href: "/pokemon",
    subcategories: [
      { id: "pokemon-singles", name: "Singles", slug: "singles" },
      { id: "pokemon-sellado", name: "Sellado", slug: "sellado" },
      { id: "pokemon-accesorios", name: "Accesorios", slug: "accesorios" },
    ],
  },
  {
    id: "onepeace",
    name: "One Peace",
    slug: "onepeace",
    icon: Anchor,
    color: "bg-blue-500",
    href: "/onepeace",
    subcategories: [
      { id: "onepeace-singles", name: "Singles", slug: "singles" },
      { id: "onepeace-sellado", name: "Sellado", slug: "sellado" },
      { id: "onepeace-accesorios", name: "Accesorios", slug: "accesorios" },
    ],
  },
  {
    id: "accesorios",
    name: "Accesorios",
    slug: "accesorios",
    icon: ShoppingBag,
    color: "bg-green-500",
    href: "/accesorios",
  },
]

export const accesoriosGames = [
  { id: "yugioh", name: "Yu-Gi-Oh!", slug: "yugioh" },
  { id: "magic", name: "Magic", slug: "magic" },
  { id: "pokemon", name: "Pokémon", slug: "pokemon" },
  { id: "onepeace", name: "One Peace", slug: "onepeace" },
]
