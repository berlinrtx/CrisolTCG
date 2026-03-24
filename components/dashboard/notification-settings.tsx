"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    sellerMessages: true,
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <CardTitle>Notificaciones</CardTitle>
        </div>
        <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Actualizaciones de Órdenes</Label>
            <p className="text-sm text-muted-foreground">Recibe notificaciones sobre el estado de tus órdenes</p>
          </div>
          <Switch
            checked={notifications.orderUpdates}
            onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Promociones y Ofertas</Label>
            <p className="text-sm text-muted-foreground">Recibe información sobre descuentos y ofertas especiales</p>
          </div>
          <Switch
            checked={notifications.promotions}
            onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Newsletter</Label>
            <p className="text-sm text-muted-foreground">Recibe nuestro boletín semanal con novedades</p>
          </div>
          <Switch
            checked={notifications.newsletter}
            onCheckedChange={(checked) => setNotifications({ ...notifications, newsletter: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Mensajes de Vendedores</Label>
            <p className="text-sm text-muted-foreground">Recibe mensajes de los vendedores sobre tus compras</p>
          </div>
          <Switch
            checked={notifications.sellerMessages}
            onCheckedChange={(checked) => setNotifications({ ...notifications, sellerMessages: checked })}
          />
        </div>
      </CardContent>
    </Card>
  )
}
