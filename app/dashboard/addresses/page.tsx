"use client"

import { AddressesList } from "@/components/dashboard/addresses-list"

export default function AddressesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mis Direcciones</h2>
        <p className="text-muted-foreground">Administra tus direcciones de envío</p>
      </div>

      <AddressesList />
    </div>
  )
}
