"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, XCircle, Eye, MessageSquare } from "lucide-react"

// Mock orders data - will be replaced with Supabase data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2025-01-15",
    status: "shipped",
    total: 475,
    items: [
      {
        product_name: "Charizard VMAX",
        product_image: "/charizard-pokemon-card.png",
        quantity: 1,
        price: 450,
        seller_name: "CardMaster GT",
        seller_avatar: "/seller-avatar.png",
      },
    ],
    tracking_number: "GT-2025-001234",
    estimated_delivery: "2025-01-20",
  },
  {
    id: "ORD-002",
    date: "2025-01-14",
    status: "delivered",
    total: 350,
    items: [
      {
        product_name: "Blue-Eyes White Dragon",
        product_image: "/blue-eyes-white-dragon-yugioh-card.jpg",
        quantity: 1,
        price: 320,
        seller_name: "TCG Collectors",
        seller_avatar: "/seller-avatar-2.jpg",
      },
    ],
    tracking_number: "GT-2025-001233",
    estimated_delivery: "2025-01-18",
  },
  {
    id: "ORD-003",
    date: "2025-01-12",
    status: "pending",
    total: 385,
    items: [
      {
        product_name: "Monkey D. Luffy",
        product_image: "/luffy-one-piece-card.jpg",
        quantity: 2,
        price: 180,
        seller_name: "Pokémon Paradise",
        seller_avatar: "/seller-avatar-3.jpg",
      },
    ],
    tracking_number: null,
    estimated_delivery: "2025-01-22",
  },
]

const statusConfig = {
  pending: {
    label: "Pendiente",
    color: "bg-yellow-500",
    icon: Package,
    description: "El vendedor está preparando tu pedido",
  },
  shipped: {
    label: "Enviado",
    color: "bg-blue-500",
    icon: Truck,
    description: "Tu pedido está en camino",
  },
  delivered: {
    label: "Entregado",
    color: "bg-green-500",
    icon: CheckCircle,
    description: "Tu pedido ha sido entregado",
  },
  cancelled: {
    label: "Cancelado",
    color: "bg-red-500",
    icon: XCircle,
    description: "Este pedido fue cancelado",
  },
}

export function BuyerOrders() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredOrders =
    selectedStatus === "all" ? mockOrders : mockOrders.filter((order) => order.status === selectedStatus)

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedStatus === "all" ? "default" : "outline"}
          onClick={() => setSelectedStatus("all")}
          className="rounded-2xl"
        >
          Todos
        </Button>
        <Button
          variant={selectedStatus === "pending" ? "default" : "outline"}
          onClick={() => setSelectedStatus("pending")}
          className="rounded-2xl"
        >
          Pendientes
        </Button>
        <Button
          variant={selectedStatus === "shipped" ? "default" : "outline"}
          onClick={() => setSelectedStatus("shipped")}
          className="rounded-2xl"
        >
          Enviados
        </Button>
        <Button
          variant={selectedStatus === "delivered" ? "default" : "outline"}
          onClick={() => setSelectedStatus("delivered")}
          className="rounded-2xl"
        >
          Entregados
        </Button>
      </div>

      {/* Orders List */}
      {filteredOrders.map((order) => {
        const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
        return (
          <Card key={order.id} className="rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Pedido {order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">Realizado el {order.date}</p>
                </div>
                <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusConfig[order.status as keyof typeof statusConfig].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              {order.items.map((item, index) => (
                <div key={index}>
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-16 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product_image || "/placeholder.svg"}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{item.product_name}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={item.seller_avatar || "/placeholder.svg"} alt={item.seller_name} />
                          <AvatarFallback>{item.seller_name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm text-muted-foreground">{item.seller_name}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Q{item.price}</p>
                    </div>
                  </div>
                  {index < order.items.length - 1 && <Separator className="my-4" />}
                </div>
              ))}

              <Separator />

              {/* Order Status Info */}
              <div className="bg-muted/50 p-4 rounded-xl">
                <p className="text-sm font-medium mb-2">
                  {statusConfig[order.status as keyof typeof statusConfig].description}
                </p>
                {order.tracking_number && (
                  <p className="text-sm text-muted-foreground mb-1">
                    Número de seguimiento: <span className="font-mono">{order.tracking_number}</span>
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Entrega estimada: <span className="font-medium">{order.estimated_delivery}</span>
                </p>
              </div>

              {/* Order Total and Actions */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Total del pedido</p>
                  <p className="text-2xl font-bold">Q{order.total}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-2xl bg-transparent" asChild>
                    <Link href={`/order/${order.id}`}>
                      <Eye className="h-4 w-4" />
                      Ver Detalles
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-2xl bg-transparent">
                    <MessageSquare className="h-4 w-4" />
                    Contactar Vendedor
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
