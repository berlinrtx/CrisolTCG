"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"

export function AddToCartButton({ inventoryId }: { inventoryId: string }) {
  const [added, setAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleAdd() {
    setLoading(true)
    const supabase = getSupabaseBrowserClient()
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) {
      router.push("/login")
      return
    }

    const { error } = await supabase
      .from("cart_items")
      .upsert(
        { user_id: userData.user.id, inventory_id: inventoryId, quantity: 1 },
        { onConflict: "user_id,inventory_id" }
      )

    if (!error) {
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }

    setLoading(false)
  }

  return (
    <Button
      size="sm"
      className="gap-1 w-full mt-3"
      onClick={handleAdd}
      disabled={loading || added}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          Agregado
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          Agregar al carrito
        </>
      )}
    </Button>
  )
}