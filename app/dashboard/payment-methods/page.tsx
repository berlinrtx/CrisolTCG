"use client"

import { PaymentMethodsList } from "@/components/dashboard/payment-methods-list"

export default function PaymentMethodsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Métodos de Pago</h2>
        <p className="text-muted-foreground">Administra tus tarjetas y métodos de pago</p>
      </div>

      <PaymentMethodsList />
    </div>
  )
}
