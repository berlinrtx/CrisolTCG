"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase-browser"
import { Package, Clock, CheckCircle, Star, XCircle, AlertCircle, Trophy } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  order_date: string
  product_name: string
  product_image: string
  quantity: number
  total_amount: number
  status: "Orden Recibida" | "Enviada" | "Recibida" | "Calificada"
  buyer_rating?: number
  buyer_review?: string
}

// Helper for currency formatting
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Helper for seller tier mapping
const getSellerTierLabel = (tier: string) => {
  const tiers: Record<string, string> = {
    basic: "Básico",
    verified: "Fase 1",
    premium: "Fase 2",
    ex: "EX",
  }
  return tiers[tier] || tier || "Básico"
}

export function SellerOrdersDashboard({ profile }: { profile: any }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    try {
      const supabase = createClient()

      // TODO: Replace with actual orders query when orders table exists
      // For now, using mock data
      const mockOrders: Order[] = [
        {
          id: "ORD-001",
          order_date: new Date().toISOString(),
          product_name: "Charizard VMAX - Darkness Ablaze",
          product_image: "/charizard-pokemon-card.png",
          quantity: 1,
          total_amount: 1250.0,
          status: "Orden Recibida",
        },
        {
          id: "ORD-002",
          order_date: new Date(Date.now() - 86400000).toISOString(),
          product_name: "Blue-Eyes White Dragon - LOB",
          product_image: "/blue-eyes-white-dragon-yugioh-card.jpg",
          quantity: 2,
          total_amount: 890.0,
          status: "Enviada",
        },
        {
          id: "ORD-003",
          order_date: new Date(Date.now() - 172800000).toISOString(),
          product_name: "Black Lotus - Alpha",
          product_image: "/black-lotus-magic-card.jpg",
          quantity: 1,
          total_amount: 45000.0,
          status: "Calificada",
          buyer_rating: 5,
          buyer_review: "Excelente vendedor, producto en perfectas condiciones",
        },
      ]

      setOrders(mockOrders)
    } catch (error) {
      console.error("Error loading orders:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar las órdenes",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleCancelOrder() {
    if (!selectedOrder) return

    try {
      // TODO: Implement actual cancel order and refund logic
      toast({
        title: "Orden Cancelada",
        description: `La orden ${selectedOrder.id} ha sido cancelada y el dinero será devuelto automáticamente.`,
      })

      // Remove order from list
      setOrders(orders.filter((o) => o.id !== selectedOrder.id))
      setCancelDialogOpen(false)
      setSelectedOrder(null)
    } catch (error) {
      console.error("Error canceling order:", error)
      toast({
        title: "Error",
        description: "No se pudo cancelar la orden",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "Orden Recibida":
        return <Clock className="h-4 w-4" />
      case "Enviada":
        return <Package className="h-4 w-4" />
      case "Recibida":
        return <CheckCircle className="h-4 w-4" />
      case "Calificada":
        return <Star className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Orden Recibida":
        return "bg-yellow-500"
      case "Enviada":
        return "bg-blue-500"
      case "Recibida":
        return "bg-green-500"
      case "Calificada":
        return "bg-purple-500"
    }
  }

  const stats = {
    nuevas: orders.filter((o) => o.status === "Orden Recibida").length,
    enviadas: orders.filter((o) => o.status === "Enviada").length,
    completadas: orders.filter((o) => o.status === "Calificada").length,
    totalVentas: orders.reduce((sum, o) => sum + o.total_amount, 0),
  }

  if (loading) {
    return <div>Cargando órdenes...</div>
  }

  return (
    <div className="space-y-6">
      {/* Seller Level Badge */}
      <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg border">
        <Trophy className="h-5 w-5 text-[#f79b27]" />
        <span className="font-medium">Nivel de Vendedor:</span>
        <Badge variant="secondary" className="bg-[#33065a] text-white hover:bg-[#33065a]/90">
          {getSellerTierLabel(profile?.seller_tier)}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes Nuevas</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.nuevas}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Tránsito</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.enviadas}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completadas}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Q{formatCurrency(stats.totalVentas)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Órdenes Recientes</CardTitle>
          <CardDescription>
            Administra tus órdenes activas. El comprador permanece anónimo para proteger la integridad de la plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Calificación</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{new Date(order.order_date).toLocaleDateString("es-GT")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        src={order.product_image || "/placeholder.svg"}
                        alt={order.product_name}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <span className="max-w-[200px] truncate">{order.product_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>Q{formatCurrency(order.total_amount)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.buyer_rating ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{order.buyer_rating}/5</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {order.status !== "Calificada" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order)
                          setCancelDialogOpen(true)
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Cancelar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cancel Order Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Orden</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas cancelar esta orden? El dinero será devuelto automáticamente al comprador.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="py-4">
              <p>
                <strong>ID:</strong> {selectedOrder.id}
              </p>
              <p>
                <strong>Producto:</strong> {selectedOrder.product_name}
              </p>
              <p>
                <strong>Total:</strong> Q{formatCurrency(selectedOrder.total_amount)}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              No, mantener orden
            </Button>
            <Button variant="destructive" onClick={handleCancelOrder}>
              Sí, cancelar y reembolsar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
