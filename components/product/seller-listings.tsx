"use client"

import { useState } from "react"
import { SellerCard } from "./seller-card"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShieldCheck, MapPin, Clock, ShoppingCart } from "lucide-react"

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

interface SellerListingsProps {
  listings: SellerListing[]
  productName: string
}

export function SellerListings({ listings, productName }: SellerListingsProps) {
  const [sortBy, setSortBy] = useState("price-low")

  const sortedListings = [...listings].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews_count - a.reviews_count
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-balance">Vendedores Disponibles</h2>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[200px] rounded-2xl">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
            <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
            <SelectItem value="rating">Mejor Calificación</SelectItem>
            <SelectItem value="reviews">Más Reseñas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="cards">Vista de Tarjetas</TabsTrigger>
          <TabsTrigger value="table">Vista de Tabla</TabsTrigger>
        </TabsList>

        {/* Card View */}
        <TabsContent value="cards" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedListings.map((listing) => (
              <SellerCard key={listing.id} listing={listing} productName={productName} />
            ))}
          </div>
        </TabsContent>

        {/* Table View */}
        <TabsContent value="table" className="mt-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Condición</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Envío</TableHead>
                    <TableHead>Calificación</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={listing.seller_avatar_url || "/placeholder.svg"}
                              alt={listing.seller_name}
                            />
                            <AvatarFallback>{listing.seller_name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{listing.seller_name}</p>
                              {listing.is_verified && <ShieldCheck className="h-4 w-4 text-blue-500" />}
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {listing.response_time}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{listing.condition}</Badge>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-primary">Q{listing.price}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">Q{listing.shipping_cost}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{listing.rating}</span>
                          <span className="text-xs text-muted-foreground">({listing.reviews_count})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {listing.seller_location}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" className="rounded-2xl">
                          <ShoppingCart className="h-4 w-4" />
                          Agregar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
