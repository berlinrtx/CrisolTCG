"use client"

import { OrdersList } from "@/components/dashboard/orders-list"
import { OrdersStats } from "@/components/dashboard/orders-stats"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mis Órdenes</h2>
        <p className="text-muted-foreground">Revisa el estado de tus órdenes actuales</p>
      </div>

      <OrdersStats />
      <OrdersList filter="active" />
    </div>
  )
}
