import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShieldCheck, MapPin, Clock, ShoppingCart, Package } from "lucide-react"

interface SellerListing {
  id: string
  seller_id: string
  seller_name: string
  seller_avatar_url: string
  product_id: string
  price: number
  condition: string
  quantity: number
  rating: number
  reviews_count: number
  response_time: string
  shipping_cost: number
  seller_location: string
  is_verified: boolean
}

interface SellerCardProps {
  listing: SellerListing
  productName: string
}

export function SellerCard({ listing, productName }: SellerCardProps) {
  return (
    <Card className="rounded-2xl hover:shadow-custom-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      <CardContent className="p-6">
        {/* Seller Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={listing.seller_avatar_url || "/placeholder.svg"} alt={listing.seller_name} />
              <AvatarFallback>{listing.seller_name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/seller/${listing.seller_id}`}
                  className="font-semibold hover:text-primary transition-colors"
                >
                  {listing.seller_name}
                </Link>
                {listing.is_verified && <ShieldCheck className="h-4 w-4 text-blue-500" title="Vendedor Verificado" />}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{listing.rating}</span>
                <span className="text-muted-foreground">({listing.reviews_count} reseñas)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Condición:</span>
            <Badge variant="outline">{listing.condition}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Disponibles:</span>
            <span className="text-sm font-medium flex items-center gap-1">
              <Package className="h-4 w-4" />
              {listing.quantity} unidades
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Ubicación:</span>
            <span className="text-sm font-medium flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {listing.seller_location}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tiempo de respuesta:</span>
            <span className="text-sm font-medium flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {listing.response_time}
            </span>
          </div>
        </div>

        {/* Price Section */}
        <div className="border-t pt-4">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <p className="text-sm text-muted-foreground">Precio de la carta</p>
              <p className="text-3xl font-bold text-primary">Q{listing.price}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Envío</p>
              <p className="text-lg font-semibold">Q{listing.shipping_cost}</p>
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-2 border-t">
            <p className="text-sm font-medium">Total:</p>
            <p className="text-2xl font-bold">Q{listing.price + listing.shipping_cost}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button
          variant="outline"
          className="flex-1 rounded-2xl bg-transparent transition-all duration-300 hover:scale-105 active:scale-95"
          asChild
        >
          <Link href={`/seller/${listing.seller_id}`}>Ver Perfil</Link>
        </Button>
        <Button className="flex-1 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95">
          <ShoppingCart className="h-4 w-4" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
