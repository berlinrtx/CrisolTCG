import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FeaturedCard {
  id: string
  name: string
  tcg: string
  set_name: string
  rarity: string
  image_url: string
  min_price: number
  seller_count: number
}

const mockCards: FeaturedCard[] = [
  {
    id: "1",
    name: "Charizard VMAX",
    tcg: "Pokémon",
    set_name: "Darkness Ablaze",
    rarity: "Secret Rare",
    image_url: "/charizard-pokemon-card.png",
    min_price: 450,
    seller_count: 5,
  },
  {
    id: "2",
    name: "Blue-Eyes White Dragon",
    tcg: "Yu-Gi-Oh!",
    set_name: "Legend of Blue Eyes",
    rarity: "Ultra Rare",
    image_url: "/blue-eyes-white-dragon-yugioh-card.jpg",
    min_price: 320,
    seller_count: 8,
  },
  {
    id: "3",
    name: "Black Lotus",
    tcg: "Magic",
    set_name: "Alpha",
    rarity: "Rare",
    image_url: "/black-lotus-magic-card.jpg",
    min_price: 1200,
    seller_count: 2,
  },
  {
    id: "4",
    name: "Monkey D. Luffy",
    tcg: "One Piece",
    set_name: "Romance Dawn",
    rarity: "Leader",
    image_url: "/luffy-one-piece-card.jpg",
    min_price: 180,
    seller_count: 12,
  },
  {
    id: "5",
    name: "Pikachu VMAX",
    tcg: "Pokémon",
    set_name: "Vivid Voltage",
    rarity: "Rainbow Rare",
    image_url: "/pikachu-vmax-rainbow-rare-pokemon-card.jpg",
    min_price: 280,
    seller_count: 7,
  },
  {
    id: "6",
    name: "Dark Magician",
    tcg: "Yu-Gi-Oh!",
    set_name: "Dark Magicians",
    rarity: "Ghost Rare",
    image_url: "/dark-magician-ghost-rare-yugioh-card.jpg",
    min_price: 410,
    seller_count: 4,
  },
]

export function FeaturedCards() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-balance bg-gradient-to-r from-[#181435] to-[#6B46C1] bg-clip-text text-transparent">
            Singles Destacadas
          </h2>
          <Button
            variant="outline"
            asChild
            className="rounded-2xl bg-transparent transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
          >
            <Link href="/catalog">Ver Todo</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockCards.map((card) => (
            <Link key={card.id} href={`/product/${card.id}`}>
              <Card className="hover:shadow-custom-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer rounded-2xl overflow-hidden group">
                <CardContent className="p-3">
                  <div className="relative aspect-[5/7] mb-3 overflow-hidden rounded-xl">
                    <Image
                      src={card.image_url || "/placeholder.svg"}
                      alt={card.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {card.tcg}
                  </Badge>
                  <h3 className="font-semibold text-sm mb-1 text-balance line-clamp-2">{card.name}</h3>
                  <p className="text-xs text-muted-foreground mb-1 line-clamp-1">{card.set_name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{card.rarity}</p>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex flex-col gap-1">
                  <div className="w-full">
                    <p className="text-xs text-muted-foreground">Desde</p>
                    <p className="text-lg font-bold text-primary">Q{card.min_price}</p>
                  </div>
                  <p className="text-xs text-muted-foreground w-full">{card.seller_count} vendedores</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
