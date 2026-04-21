"use client"

import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, loading, total, removeFromCart, clearCart } = useCart()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">

        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <ShoppingCart className="h-7 w-7" />
          Mi carrito
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6">Busca cartas y agrégalas a tu carrito</p>
            <Button onClick={() => router.push("/")}>Ver cartas</Button>
          </div>
        ) : (
          <>
            {/* Lista de items */}
            <div className="space-y-3 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-2xl p-4 flex items-center justify-between gap-4 bg-secondary/20"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{item.inventory?.card_name}</p>
                    {item.inventory?.card_set && (
                      <p className="text-sm text-muted-foreground">{item.inventory.card_set}</p>
                    )}
                  </div>
                  <p className="font-medium">Q{item.inventory?.price}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Total y acciones */}
            <div className="border rounded-2xl p-6 bg-secondary/20">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold">Q{total.toFixed(2)}</span>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </Button>
                <Button
                  className="flex-1 gap-2"
                  onClick={() => router.push("/checkout")}
                >
                  Proceder al pago
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}