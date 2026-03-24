"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Star, Shield } from "lucide-react"

interface Listing {
  id: string
  seller_id: string
  seller_name: string
  seller_avatar_url: string
  price: number
  condition: string
  quantity: number
  rating: number
  reviews_count: number
  shipping_cost: number
  is_verified: boolean
}

interface PurchaseBoxProps {
  listing: Listing
  productName: string
}

export function PurchaseBox({ listing, productName }: PurchaseBoxProps) {
  const [quantity, setQuantity] = useState(1)

  return (
    <Card className="rounded-2xl border-2">
      <CardContent className="p-6 space-y-4">
        {/* Condition Badge */}
        <div>
          <Badge variant="secondary" className="text-sm">
            {listing.condition}
          </Badge>
        </div>

        {/* Price */}
        <div>
          <div className="text-3xl font-bold">Q{listing.price.toFixed(2)}</div>
          <p className="text-sm text-muted-foreground mt-1">+ Q{listing.shipping_cost.toFixed(2)} envío</p>
          <p className="text-xs text-muted-foreground">Envío gratis en pedidos mayores a Q150</p>
        </div>

        {/* Seller Info */}
        <div className="flex items-center gap-3 py-3 border-y">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={listing.seller_avatar_url || "/placeholder.svg"}
              alt={listing.seller_name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Link href={`/seller/${listing.seller_id}`} className="font-medium hover:underline">
                {listing.seller_name}
              </Link>
              {listing.is_verified && <Shield className="h-4 w-4 text-blue-500" title="Vendedor verificado" />}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{listing.rating}</span>
              <span>({listing.reviews_count} reseñas)</span>
            </div>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Cantidad</label>
          <Select value={quantity.toString()} onValueChange={(val) => setQuantity(Number.parseInt(val))}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: Math.min(listing.quantity, 10) }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "unidad" : "unidades"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {listing.quantity} {listing.quantity === 1 ? "disponible" : "disponibles"}
          </p>
        </div>

        {/* Add to Cart Button */}
        <Button size="lg" className="w-full rounded-xl" disabled={listing.quantity === 0}>
          <ShoppingCart className="h-5 w-5 mr-2" />
          Agregar al Carrito
        </Button>

        {/* View Other Listings Link */}
        <Link href="#seller-listings" className="block text-center text-sm text-primary hover:underline font-medium">
          Ver {listing.quantity > 1 ? "Otras" : ""} Ofertas de Vendedores
        </Link>
      </CardContent>
    </Card>
  )
}
