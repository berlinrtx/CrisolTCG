"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Product {
  id: string
  name: string
  tcg: string
  set_name: string
  set_number: string
  rarity: string
  card_type: string
  description: string
  images: string[]
  min_price: number
  max_price: number
  seller_count: number
  avg_rating: number
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-6">
      {/* Header with badges and title */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{product.tcg}</Badge>
          <Badge variant="outline">{product.rarity}</Badge>
        </div>
        <h1 className="text-4xl font-bold mb-2 text-balance">{product.name}</h1>
        <p className="text-muted-foreground">
          {product.set_name} • {product.set_number}
        </p>
      </div>

      {/* Image Gallery */}
      <Card className="rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="relative aspect-[5/7] mb-4">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex gap-2 justify-center">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} vista ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="description">Descripción</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Juego:</dt>
                  <dd className="font-medium">{product.tcg}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Set:</dt>
                  <dd className="font-medium">{product.set_name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Número:</dt>
                  <dd className="font-medium">{product.set_number}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Rareza:</dt>
                  <dd className="font-medium">{product.rarity}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Tipo:</dt>
                  <dd className="font-medium">{product.card_type}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="description" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <p className="text-sm leading-relaxed">{product.description}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
