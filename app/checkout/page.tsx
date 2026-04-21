"use client"

import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Building2, Truck, MapPin, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase-browser"
import { useEffect } from "react"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("transfer")
  const [deliveryMethod, setDeliveryMethod] = useState<"shipping" | "pickup">("shipping")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleOrder() {
    if (items.length === 0) return
    setLoading(true)
    setError(null)

    const supabase = getSupabaseBrowserClient()
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) {
      router.push("/login")
      return
    }

    // Agrupar items por vendedor
    const bySeller: Record<string, typeof items> = {}
    items.forEach((item) => {
      const sellerId = item.inventory?.user_id
      if (!sellerId) return
      if (!bySeller[sellerId]) bySeller[sellerId] = []
      bySeller[sellerId].push(item)
    })

    try {
      for (const [sellerId, sellerItems] of Object.entries(bySeller)) {
        const orderTotal = sellerItems.reduce(
          (sum, item) => sum + (item.inventory?.price ?? 0) * item.quantity,
          0
        )

        // Crear orden
        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert({
            buyer_id: userData.user.id,
            seller_id: sellerId,
            status: "pending",
            payment_method: paymentMethod,
            delivery_method: deliveryMethod,
            total: orderTotal,
            notes: notes || null,
          })
          .select()
          .single()

        if (orderError) throw orderError

        // Crear order items
        const orderItems = sellerItems.map((item) => ({
          order_id: order.id,
          inventory_id: item.inventory_id,
          card_name: item.inventory?.card_name ?? "",
          price: item.inventory?.price ?? 0,
          quantity: item.quantity,
        }))

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItems)

        if (itemsError) throw itemsError

        // Marcar cartas como no disponibles
        for (const item of sellerItems) {
          await supabase
            .from("inventory")
            .update({ for_sale: false })
            .eq("id", item.inventory_id)
        }
      }

      await clearCart()
      router.push("/orders/success")
    } catch (err: any) {
      setError(err.message ?? "Ocurrió un error al procesar tu orden")
    } finally {
      setLoading(false)
    }
  }

useEffect(() => {
  if (!loading && items.length === 0) {
    router.push("/cart")
  }
}, [items, loading])

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
      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <button
          onClick={() => router.push("/cart")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al carrito
        </button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="space-y-6">

          {/* Resumen */}
          <div className="border rounded-2xl p-6 bg-secondary/20">
            <h2 className="font-semibold mb-4">Resumen de tu orden</h2>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.inventory?.card_name}</span>
                  <span>Q{item.inventory?.price}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Total</span>
              <span>Q{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Método de pago */}
          <div className="border rounded-2xl p-6 bg-secondary/20">
            <h2 className="font-semibold mb-4">Método de pago</h2>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(v) => setPaymentMethod(v as "card" | "transfer")}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="transfer" id="transfer" />
                <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer">
                  <Building2 className="h-4 w-4" />
                  Transferencia bancaria
                </Label>
              </div>
              <div className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-4 w-4" />
                  Tarjeta de crédito/débito
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Método de entrega */}
          <div className="border rounded-2xl p-6 bg-secondary/20">
            <h2 className="font-semibold mb-4">Método de entrega</h2>
            <RadioGroup
              value={deliveryMethod}
              onValueChange={(v) => setDeliveryMethod(v as "shipping" | "pickup")}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="shipping" id="shipping" />
                <Label htmlFor="shipping" className="flex items-center gap-2 cursor-pointer">
                  <Truck className="h-4 w-4" />
                  Envío a domicilio
                </Label>
              </div>
              <div className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer">
                  <MapPin className="h-4 w-4" />
                  Recoger con el vendedor
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Notas */}
          <div className="border rounded-2xl p-6 bg-secondary/20">
            <h2 className="font-semibold mb-4">Notas (opcional)</h2>
            <Textarea
              placeholder="Instrucciones especiales para el vendedor..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="rounded-xl"
            />
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
              {error}
            </div>
          )}

          <Button
            className="w-full h-12 text-base gap-2"
            onClick={handleOrder}
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              `Confirmar orden · Q${total.toFixed(2)}`
            )}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}