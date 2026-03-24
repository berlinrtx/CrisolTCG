"use client"

import { ReturnsList } from "@/components/dashboard/returns-list"

export default function ReturnsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Quejas y Devoluciones</h2>
        <p className="text-muted-foreground">Gestiona tus solicitudes de devolución y quejas</p>
      </div>

      <ReturnsList />
    </div>
  )
}
