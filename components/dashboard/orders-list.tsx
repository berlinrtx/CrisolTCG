"use client"

import type React from "react"

import { useState } from "react"
import { Package, Truck, CheckCircle, Star, Eye, Search, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

const orders = [
  {
    id: "ORD-001",
    date: "2025-01-08",
    status: "Enviada",
    total: 125.5,
    items: 3,
    tracking: "GT123456789",
    image: "/blue-eyes-white-dragon-yugioh-card.jpg", // Representative image
    products: [
      { name: "Blue-Eyes White Dragon", quantity: 1, price: 45.0 },
      { name: "Dark Magician", quantity: 1, price: 38.5 },
      { name: "Exodia the Forbidden One", quantity: 1, price: 42.0 },
    ],
  },
  {
    id: "ORD-002",
    date: "2025-01-05",
    status: "Orden Recibida",
    total: 78.0,
    items: 2,
    tracking: null,
    image: "/charizard-pokemon-card.png",
    products: [
      { name: "Pikachu VMAX", quantity: 1, price: 42.0 },
      { name: "Charizard GX", quantity: 1, price: 36.0 },
    ],
  },
  {
    id: "ORD-003",
    date: "2024-12-28",
    status: "Recibida",
    total: 156.0,
    items: 4,
    tracking: "GT987654321",
    image: "/black-lotus-magic-card.jpg",
    products: [
      { name: "Black Lotus", quantity: 1, price: 85.0 },
      { name: "Mox Sapphire", quantity: 1, price: 71.0 },
    ],
  },
  {
    id: "ORD-004",
    date: "2024-12-20",
    status: "Calificada",
    total: 45.0,
    items: 1,
    tracking: null,
    image: "/placeholder.svg",
    products: [{ name: "Sol Ring", quantity: 1, price: 45.0 }],
  },
]

const statusConfig = {
  "Orden Recibida": { label: "Orden Recibida", color: "bg-yellow-500", icon: Clock },
  Enviada: { label: "Enviada", color: "bg-blue-500", icon: Truck },
  Recibida: { label: "Recibida", color: "bg-green-500", icon: CheckCircle },
  Calificada: { label: "Calificada", color: "bg-purple-500", icon: Star },
}

export function OrdersList({ filter }: { filter?: "active" | "completed" }) {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false)
  const [selectedOrderForRating, setSelectedOrderForRating] = useState<string | null>(null)
  const { toast } = useToast()

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      filter === "active"
        ? ["Orden Recibida", "Enviada"].includes(order.status)
        : filter === "completed"
          ? ["Recibida", "Calificada"].includes(order.status)
          : true

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.tracking?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesStatus && matchesSearch
  })

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Calificación enviada",
      description: "Gracias por calificar al vendedor.",
    })
    setRatingDialogOpen(false)
    setSelectedOrderForRating(null)
  }

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/30 p-4 rounded-lg border">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por ID de orden..."
            className="w-full pl-9 pr-4 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#f79b27] focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            className="w-full sm:w-[180px] p-2 rounded-md border bg-background text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value="Orden Recibida">Orden Recibida</option>
            <option value="Enviada">Enviada</option>
            <option value="Recibida">Recibida</option>
            <option value="Calificada">Calificada</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium">
              <tr>
                <th className="px-4 py-3">Orden</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Artículos</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Rastreo</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig]
                const StatusIcon = status.icon

                return (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden border flex-shrink-0 bg-muted">
                          <Image src={order.image || "/placeholder.svg"} alt={order.id} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-foreground">{order.id}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(order.date).toLocaleDateString("es-GT", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`${status.color} text-white hover:${status.color}`}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {status.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{order.items} items</span>
                        <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                          {order.products[0].name}
                          {order.items > 1 && ` +${order.items - 1} más`}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold">Q{order.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      {order.tracking ? (
                        <code className="text-xs bg-muted px-2 py-1 rounded border">{order.tracking}</code>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {order.status === "Recibida" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs bg-transparent"
                            onClick={() => {
                              setSelectedOrderForRating(order.id)
                              setRatingDialogOpen(true)
                            }}
                          >
                            <Star className="h-3 w-3 mr-1" />
                            Calificar
                          </Button>
                        )}

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Detalles de Orden {order.id}</DialogTitle>
                              <DialogDescription>Información completa de tu orden</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">Productos</h4>
                                <div className="space-y-2">
                                  {order.products.map((product, index) => (
                                    <div key={index} className="flex justify-between items-center py-2 border-b">
                                      <div>
                                        <p className="font-medium">{product.name}</p>
                                        <p className="text-sm text-muted-foreground">Cantidad: {product.quantity}</p>
                                      </div>
                                      <span className="font-semibold">Q{product.price.toFixed(2)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex justify-between items-center pt-4 border-t">
                                <span className="font-semibold">Total</span>
                                <span className="text-xl font-bold">Q{order.total.toFixed(2)}</span>
                              </div>

                              {order.tracking && (
                                <div className="p-4 bg-muted rounded-lg">
                                  <p className="text-sm font-medium mb-1">Número de Rastreo</p>
                                  <code className="text-lg">{order.tracking}</code>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Package className="h-12 w-12 mb-4 opacity-20" />
            <p>No se encontraron órdenes</p>
          </div>
        )}
      </div>

      <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Calificar Vendedor</DialogTitle>
            <DialogDescription>
              Comparte tu experiencia con esta compra (Orden {selectedOrderForRating})
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRatingSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Calificación</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una calificación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Estrellas - Excelente</SelectItem>
                  <SelectItem value="4">4 Estrellas - Muy Bueno</SelectItem>
                  <SelectItem value="3">3 Estrellas - Bueno</SelectItem>
                  <SelectItem value="2">2 Estrellas - Regular</SelectItem>
                  <SelectItem value="1">1 Estrella - Malo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Comentario</Label>
              <Textarea placeholder="Escribe tu reseña aquí..." required />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setRatingDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Enviar Calificación</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
