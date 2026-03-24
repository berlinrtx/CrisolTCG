"use client"

import { OrdersList } from "@/components/dashboard/orders-list"

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Historial de Órdenes</h2>
        <p className="text-muted-foreground">Revisa todas tus órdenes completadas y canceladas</p>
      </div>

      <OrdersList filter="completed" />
    </div>
  )
}
