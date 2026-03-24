"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShieldCheck, Star } from "lucide-react"

interface SellerListing {
  id: string
  seller_id: string
  seller_name: string
  seller_avatar_url: string
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

interface SellerListingsTableProps {
  listings: SellerListing[]
  productName: string
}

export function SellerListingsTable({ listings, productName }: SellerListingsTableProps) {
  const [sortBy, setSortBy] = useState("price-low")
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const sortedListings = [...listings].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      default:
        return 0
    }
  })

  const handleQuantityChange = (listingId: string, value: string) => {
    const qty = Number.parseInt(value) || 1
    const listing = listings.find((l) => l.id === listingId)
    const maxQty = listing?.quantity || 1
    const validQty = Math.min(Math.max(1, qty), maxQty)
    setQuantities((prev) => ({ ...prev, [listingId]: validQty }))
  }

  const getQuantity = (listingId: string) => quantities[listingId] || 1

  return (
    <div className="border rounded-2xl bg-card shadow-custom">
      <div className="p-4 md:p-6 pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Vendedores Disponibles</h2>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px] rounded-2xl">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendedor</TableHead>
              <TableHead>Localización</TableHead>
              <TableHead>Condición</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="text-center">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedListings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={listing.seller_avatar_url || "/placeholder.svg"} alt={listing.seller_name} />
                      <AvatarFallback>{listing.seller_name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{listing.seller_name}</p>
                        {listing.is_verified && <ShieldCheck className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(listing.rating) ? "text-[#f79b27] fill-[#f79b27]" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {listing.rating} ({listing.reviews_count})
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{listing.seller_location}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="rounded-2xl">
                    {listing.condition}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center border rounded-xl overflow-hidden w-fit">
                    <Select
                      value={getQuantity(listing.id).toString()}
                      onValueChange={(value) => handleQuantityChange(listing.id, value)}
                    >
                      <SelectTrigger className="border-0 rounded-none h-10 w-16 focus:ring-0 focus:ring-offset-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: listing.quantity }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="border-l h-10 flex items-center px-3 bg-muted/30 text-sm text-muted-foreground">
                      of {listing.quantity}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">Q{listing.price}</p>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    className="rounded-2xl gap-2 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                  >
                    Agregar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
