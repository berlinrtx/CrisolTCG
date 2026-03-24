import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FeaturedProduct {
  id: string
  name: string
  category: string
  type: "sealed" | "accessory"
  image_url: string
  price: number
  stock: number
}

const mockProducts: FeaturedProduct[] = [
  {
    id: "1",
    name: "Pokémon Scarlet & Violet Booster Box",
    category: "Pokémon",
    type: "sealed",
    image_url: "/pokemon-booster-box.jpg",
    price: 950,
    stock: 15,
  },
  {
    id: "2",
    name: "Ultra Pro Deck Box",
    category: "Accesorios",
    type: "accessory",
    image_url: "/deck-box.jpg",
    price: 85,
    stock: 42,
  },
  {
    id: "3",
    name: "Yu-Gi-Oh! Structure Deck",
    category: "Yu-Gi-Oh!",
    type: "sealed",
    image_url: "/yugioh-structure-deck.jpg",
    price: 380,
    stock: 28,
  },
  {
    id: "4",
    name: "Dragon Shield Sleeves 100ct",
    category: "Accesorios",
    type: "accessory",
    image_url: "/card-sleeves.jpg",
    price: 65,
    stock: 89,
  },
  {
    id: "5",
    name: "Magic: The Gathering Bundle",
    category: "Magic",
    type: "sealed",
    image_url: "/magic-the-gathering-bundle-box.jpg",
    price: 420,
    stock: 22,
  },
  {
    id: "6",
    name: "Premium Playmat",
    category: "Accesorios",
    type: "accessory",
    image_url: "/tcg-card-game-playmat.jpg",
    price: 145,
    stock: 35,
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-balance bg-gradient-to-r from-[#181435] to-[#6B46C1] bg-clip-text text-transparent">
            Productos Destacados
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
          {mockProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className="hover:shadow-custom-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer rounded-2xl overflow-hidden group">
                <CardContent className="p-3">
                  <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold text-sm mb-1 text-balance line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {product.type === "sealed" ? "Producto Sellado" : "Accesorio"}
                  </p>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex flex-col gap-1">
                  <div className="w-full">
                    <p className="text-xs text-muted-foreground">Precio</p>
                    <p className="text-lg font-bold text-primary">Q{product.price}</p>
                  </div>
                  <p className="text-xs text-muted-foreground w-full">{product.stock} en stock</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
