import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductGridProps {
  game: string
  subcategory: string
  accessoryType?: string
}

// Mock data - will be replaced with Supabase data
const mockProducts = [
  {
    id: "1",
    name: "Charizard VMAX",
    set_name: "Darkness Ablaze",
    rarity: "Secret Rare",
    image_url: "/charizard-pokemon-card.png",
    min_price: 450,
    seller_count: 5,
    accessory_type: "Pokemon Card",
  },
  {
    id: "2",
    name: "Pikachu V",
    set_name: "Vivid Voltage",
    rarity: "Ultra Rare",
    image_url: "/pikachu-pokemon-card.png",
    min_price: 120,
    seller_count: 12,
    accessory_type: "Pokemon Card",
  },
  {
    id: "3",
    name: "Mewtwo GX",
    set_name: "Shining Legends",
    rarity: "GX Rare",
    image_url: "/mewtwo-gx-pokemon-card.jpg",
    min_price: 280,
    seller_count: 8,
    accessory_type: "Pokemon Card",
  },
  {
    id: "4",
    name: "Rayquaza VMAX",
    set_name: "Evolving Skies",
    rarity: "Rainbow Rare",
    image_url: "/rayquaza-vmax-pokemon-card.jpg",
    min_price: 380,
    seller_count: 6,
    accessory_type: "Pokemon Card",
  },
]

export function ProductGrid({ game, subcategory, accessoryType }: ProductGridProps) {
  const filteredProducts = accessoryType ? mockProducts.filter((p) => p.accessory_type === accessoryType) : mockProducts

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{filteredProducts.length} productos encontrados</p>
        <select className="text-sm border rounded-xl px-3 py-2">
          <option>Ordenar por: Precio (menor a mayor)</option>
          <option>Ordenar por: Precio (mayor a menor)</option>
          <option>Ordenar por: Nombre (A-Z)</option>
          <option>Ordenar por: Más vendidos</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card className="hover:shadow-xl transition-all cursor-pointer rounded-2xl overflow-hidden group">
              <CardContent className="p-4">
                <div className="relative aspect-[5/7] mb-4 overflow-hidden rounded-xl">
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <Badge variant="secondary" className="mb-2">
                  {product.set_name}
                </Badge>
                <h3 className="font-semibold text-lg mb-1 text-balance">{product.name}</h3>
                <p className="text-xs text-muted-foreground">{product.rarity}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Desde</p>
                  <p className="text-xl font-bold text-primary">Q{product.min_price}</p>
                </div>
                <p className="text-sm text-muted-foreground">{product.seller_count} vendedores</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
