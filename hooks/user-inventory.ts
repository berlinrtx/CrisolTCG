import { useState, useEffect } from "react"

export type InventoryCard = {
  id: string
  card_name: string
  card_set: string | null
  condition: string | null
  quantity: number
  for_sale: boolean
  price: number | null
  image_url: string | null
  created_at: string
}

export function useInventory() {
  const [cards, setCards] = useState<InventoryCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar inventario
  useEffect(() => {
    fetchCards()
  }, [])

  async function fetchCards() {
    setLoading(true)
    const res = await fetch("/api/inventory")
    const data = await res.json()
    if (res.ok) setCards(data)
    else setError(data.error)
    setLoading(false)
  }

  // Agregar carta
  async function addCard(card: Omit<InventoryCard, "id" | "created_at">) {
    const res = await fetch("/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    })
    const data = await res.json()
    if (res.ok) setCards((prev) => [data, ...prev])
    else setError(data.error)
  }

  // Eliminar carta
  async function deleteCard(id: string) {
    const res = await fetch(`/api/inventory/${id}`, { method: "DELETE" })
    if (res.ok) setCards((prev) => prev.filter((c) => c.id !== id))
    else {
      const data = await res.json()
      setError(data.error)
    }
  }

  // Marcar en venta / quitar de venta
  async function toggleForSale(id: string, for_sale: boolean, price?: number) {
    const res = await fetch(`/api/inventory/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ for_sale, price }),
    })
    const data = await res.json()
    if (res.ok) setCards((prev) => prev.map((c) => (c.id === id ? data : c)))
    else setError(data.error)
  }

  return { cards, loading, error, addCard, deleteCard, toggleForSale, refetch: fetchCards }
}