import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, Eye } from "lucide-react"

// Mock orders data - will be replaced with Supabase data
const mockOrders = [
  {
    id: "ORD-001",
    buyer_name: "Carlos Méndez",
    buyer_avatar: "/buyer-avatar-1.jpg",
    product_name: "Charizard VMAX",
    quantity: 1,
    total: 475,
    status: "pending",
    date: "2025-01-15",
  },
  {
    id: "ORD-002",
    buyer_name: "María García",
    buyer_avatar: "/buyer-avatar-2.jpg",
    product_name: "Blue-Eyes White Dragon",
    quantity: 1,
    total: 350,
    status: "shipped",
    date: "2025-01-14",
  },
  {
    id: "ORD-003",
    buyer_name: "José Rodríguez",
    buyer_avatar: "/buyer-avatar-3.jpg",
    product_name: "Monkey D. Luffy",
    quantity: 2,
    total: 385,
    status: "delivered",
    date: "2025-01-12",
  },
  {
    id: "ORD-004",
    buyer_name: "Ana López",
    buyer_avatar: "/buyer-avatar-4.jpg",
    product_name: "Charizard VMAX",
    quantity: 1,
    total: 475,
    status: "pending",
    date: "2025-01-15",
  },
]

const statusConfig = {
  pending: { label: "Pendiente", color: "bg-yellow-500" },
  shipped: { label: "Enviado", color: "bg-blue-500" },
  delivered: { label: "Entregado", color: "bg-green-500" },
  cancelled: { label: "Cancelado", color: "bg-red-500" },
}

export function SellerOrders() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Pedidos Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Pedido</TableHead>
              <TableHead>Comprador</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <p className="font-mono text-sm">{order.id}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={order.buyer_avatar || "/placeholder.svg"} alt={order.buyer_name} />
                      <AvatarFallback>{order.buyer_name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{order.buyer_name}</span>
                  </div>
                </TableCell>
                <TableCell>{order.product_name}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>
                  <p className="font-semibold">Q{order.total}</p>
                </TableCell>
                <TableCell>
                  <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                    {statusConfig[order.status as keyof typeof statusConfig].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon-sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {order.status === "pending" && (
                      <Button size="sm" className="rounded-2xl">
                        <Package className="h-4 w-4" />
                        Marcar Enviado
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
