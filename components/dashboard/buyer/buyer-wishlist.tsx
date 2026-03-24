import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, ShoppingCart } from "lucide-react"

// Mock wishlist data - will be replaced with Supabase data
const mockWishlist = [
  {
    id: "1",
    product_id: "1",
    product_name: "Charizard VMAX",
    tcg: "Pokémon",
    set_name: "Darkness Ablaze",
    rarity: "Secret Rare",
    image_url: "/charizard-pokemon-card.png",
    min_price: 450,
    seller_count: 5,
    added_date: "2025-01-10",
  },
  {
    id: "2",
    product_id: "3",
    product_name: "Black Lotus",
    tcg: "Magic",
    set_name: "Alpha",
    rarity: "Rare",
    image_url: "/black-lotus-magic-card.jpg",
    min_price: 1200,
    seller_count: 2,
    added_date: "2025-01-08",
  },
  {
    id: "3",
    product_id: "4",
    product_name: "Monkey D. Luffy",
    tcg: "One Piece",
    set_name: "Romance Dawn",
    rarity: "Leader",
    image_url: "/luffy-one-piece-card.jpg",
    min_price: 180,
    seller_count: 12,
    added_date: "2025-01-12",
  },
  {
    id: "4",
    product_id: "2",
    product_name: "Blue-Eyes White Dragon",
    tcg: "Yu-Gi-Oh!",
    set_name: "Legend of Blue Eyes",
    rarity: "Ultra Rare",
    image_url: "/blue-eyes-white-dragon-yugioh-card.jpg",
    min_price: 320,
    seller_count: 8,
    added_date: "2025-01-05",
  },
]

export function BuyerWishlist() {
  return (
    <div>
      <Card className="rounded-2xl mb-6">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Tienes <span className="font-semibold text-foreground">{mockWishlist.length} cartas</span> en tu lista de
            deseos
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockWishlist.map((item) => (
          <Card key={item.id} className="rounded-2xl hover:shadow-lg transition-shadow group relative">
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
            >
              <X className="h-4 w-4" />
            </Button>
            <CardContent className="p-4">
              <Link href={`/product/${item.product_id}`}>
                <div className="relative aspect-[5/7] mb-4 overflow-hidden rounded-xl">
                  <Image
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.product_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>
              <Badge variant="secondary" className="mb-2">
                {item.tcg}
              </Badge>
              <h3 className="font-semibold text-lg mb-1 text-balance">{item.product_name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{item.set_name}</p>
              <p className="text-xs text-muted-foreground mb-3">{item.rarity}</p>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Desde</p>
                  <p className="text-xl font-bold text-primary">Q{item.min_price}</p>
                </div>
                <p className="text-xs text-muted-foreground">{item.seller_count} vendedores</p>
              </div>

              <Button className="w-full rounded-2xl" size="sm" asChild>
                <Link href={`/product/${item.product_id}`}>
                  <ShoppingCart className="h-4 w-4" />
                  Ver Ofertas
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
