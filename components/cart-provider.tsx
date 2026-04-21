"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase-browser"

export type CartItem = {
  id: string
  inventory_id: string
  quantity: number
  inventory: {
    card_name: string
    card_set: string | null
    price: number | null
    user_id: string
  }
}

type CartContextType = {
  items: CartItem[]
  loading: boolean
  initialized: boolean
  count: number
  total: number
  addToCart: (inventory_id: string) => Promise<{ error: string | null }>
  removeFromCart: (id: string) => Promise<void>
  clearCart: () => Promise<void>
  refetch: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    fetchCart()
  }, [])

  async function fetchCart() {
    setLoading(true)
    const supabase = getSupabaseBrowserClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      setLoading(false)
      setInitialized(true)
      return
    }

    const { data } = await supabase
      .from("cart_items")
      .select("id, inventory_id, quantity, inventory(card_name, card_set, price, user_id)")
      .eq("user_id", userData.user.id)

    const parsed = (data ?? []).map((item: any) => ({
      ...item,
      inventory: Array.isArray(item.inventory) ? item.inventory[0] : item.inventory,
    }))

    setItems(parsed)
    setLoading(false)
    setInitialized(true)
  }

  async function addToCart(inventory_id: string) {
    const supabase = getSupabaseBrowserClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return { error: "Debes iniciar sesión" }

    const { error } = await supabase
      .from("cart_items")
      .upsert(
        { user_id: userData.user.id, inventory_id, quantity: 1 },
        { onConflict: "user_id,inventory_id" }
      )

    if (!error) await fetchCart()
    return { error: error?.message ?? null }
  }

  async function removeFromCart(id: string) {
    const supabase = getSupabaseBrowserClient()
    await supabase.from("cart_items").delete().eq("id", id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  async function clearCart() {
    const supabase = getSupabaseBrowserClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return
    await supabase.from("cart_items").delete().eq("user_id", userData.user.id)
    setItems([])
  }

  const count = items.length
  const total = items.reduce(
    (sum, item) => sum + (item.inventory?.price ?? 0) * item.quantity,
    0
  )

  return (
    <CartContext.Provider value={{ items, loading, initialized, count, total, addToCart, removeFromCart, clearCart, refetch: fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider")
  return context
}