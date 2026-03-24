"use client"

import { useState } from "react"
import { AlertCircle, Plus, Package, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const returns = [
  {
    id: "RET-001",
    orderId: "ORD-003",
    date: "2025-01-05",
    status: "processing",
    type: "return",
    reason: "Producto defectuoso",
    product: "Blue-Eyes White Dragon",
    response: null,
  },
  {
    id: "RET-002",
    orderId: "ORD-001",
    date: "2024-12-20",
    status: "approved",
    type: "complaint",
    reason: "Envío tardío",
    product: "Dark Magician",
    response: "Lamentamos el inconveniente. Se ha procesado un cupón de descuento del 20% para tu próxima compra.",
  },
]

const statusConfig = {
  pending: { label: "Pendiente", color: "bg-yellow-500", icon: Clock },
  processing: { label: "En Revisión", color: "bg-blue-500", icon: Package },
  approved: { label: "Aprobada", color: "bg-green-500", icon: CheckCircle },
  rejected: { label: "Rechazada", color: "bg-destructive", icon: XCircle },
}

export function ReturnsList() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Solicitud
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Nueva Solicitud</DialogTitle>
              <DialogDescription>Crea una solicitud de devolución o queja</DialogDescription>
            </DialogHeader>
            <ReturnForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {returns.map((returnItem) => {
          const status = statusConfig[returnItem.status as keyof typeof statusConfig]
          const StatusIcon = status.icon

          return (
            <Card key={returnItem.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      {returnItem.type === "return" ? "Devolución" : "Queja"} {returnItem.id}
                    </CardTitle>
                    <CardDescription>
                      Orden {returnItem.orderId} • {new Date(returnItem.date).toLocaleDateString("es-GT")}
                    </CardDescription>
                  </div>
                  <Badge className={`${status.color} text-white`}>
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {status.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Producto</p>
                  <p className="text-sm text-muted-foreground">{returnItem.product}</p>
                </div>

                <div>
                  <p className="text-sm font-medium">Motivo</p>
                  <p className="text-sm text-muted-foreground">{returnItem.reason}</p>
                </div>

                {returnItem.response && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Respuesta</p>
                    <p className="text-sm text-muted-foreground">{returnItem.response}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {returns.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-1">No hay solicitudes</p>
            <p className="text-sm text-muted-foreground mb-4">No has creado ninguna solicitud de devolución o queja</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Solicitud
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ReturnForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Tipo de Solicitud</Label>
        <Select required>
          <SelectTrigger id="type">
            <SelectValue placeholder="Selecciona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="return">Devolución</SelectItem>
            <SelectItem value="complaint">Queja</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="order">Número de Orden</Label>
        <Select required>
          <SelectTrigger id="order">
            <SelectValue placeholder="Selecciona una orden" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ORD-001">ORD-001</SelectItem>
            <SelectItem value="ORD-002">ORD-002</SelectItem>
            <SelectItem value="ORD-003">ORD-003</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Motivo</Label>
        <Select required>
          <SelectTrigger id="reason">
            <SelectValue placeholder="Selecciona un motivo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="defective">Producto defectuoso</SelectItem>
            <SelectItem value="wrong">Producto incorrecto</SelectItem>
            <SelectItem value="damaged">Producto dañado</SelectItem>
            <SelectItem value="late">Envío tardío</SelectItem>
            <SelectItem value="other">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" placeholder="Describe el problema en detalle..." rows={4} required />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Enviar Solicitud</Button>
      </DialogFooter>
    </form>
  )
}
