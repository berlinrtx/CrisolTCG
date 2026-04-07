"use client"

import { useState } from "react"
import { useInventory } from "@/hooks/user-inventory"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Tag, PackageOpen } from "lucide-react"

export default function InventoryPage() {
  const { cards, loading, error, addCard, deleteCard, toggleForSale } = useInventory()
  const [cardName, setCardName] = useState("")
  const [cardSet, setCardSet] = useState("")
  const [condition, setCondition] = useState("near_mint")
  const [quantity, setQuantity] = useState("1")
  const [price, setPrice] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  async function handleAdd() {
    if (!cardName.trim()) return
    await addCard({
      card_name: cardName,
      card_set: cardSet || null,
      condition,
      quantity: parseInt(quantity) || 1,
      for_sale: false,
      price: null,
      image_url: null,
    })
    setCardName("")
    setCardSet("")
    setCondition("near_mint")
    setQuantity("1")
    setDialogOpen(false)
  }

  const conditionLabel: Record<string, string> = {
    mint: "Mint",
    near_mint: "Near Mint",
    excellent: "Excellent",
    good: "Good",
    poor: "Poor",
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">

        {/* Título y botón agregar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Mi inventario</h1>
            <p className="text-muted-foreground mt-1">
              {cards.length} {cards.length === 1 ? "carta" : "cartas"} en tu colección
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Agregar carta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar carta al inventario</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label>Nombre de la carta</Label>
                  <Input
                    placeholder="Ej. Charizard"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Set (opcional)</Label>
                  <Input
                    placeholder="Ej. Base Set"
                    value={cardSet}
                    onChange={(e) => setCardSet(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Condición</Label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mint">Mint</SelectItem>
                      <SelectItem value="near_mint">Near Mint</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Cantidad</Label>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleAdd}>
                  Agregar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Estado de carga */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Lista vacía */}
        {!loading && cards.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <PackageOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Tu inventario está vacío</h2>
            <p className="text-muted-foreground mb-6">Agrega tus primeras cartas para comenzar</p>
            <Button onClick={() => setDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar carta
            </Button>
          </div>
        )}

        {/* Grid de cartas */}
        {!loading && cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="border rounded-2xl p-4 bg-secondary/20 hover:bg-secondary/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold truncate">{card.card_name}</h3>
                    {card.card_set && (
                      <p className="text-sm text-muted-foreground">{card.card_set}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                    onClick={() => deleteCard(card.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {card.condition && (
                    <Badge variant="secondary" className="text-xs">
                      {conditionLabel[card.condition] ?? card.condition}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    x{card.quantity}
                  </Badge>
                  {card.for_sale && (
                    <Badge className="text-xs bg-accent text-accent-foreground">
                      En venta · Q{card.price}
                    </Badge>
                  )}
                </div>

                {/* Poner en venta */}
                {!card.for_sale ? (
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Precio (Q)"
                      className="h-8 text-sm"
                      id={`price-${card.id}`}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 h-8 flex-shrink-0"
                      onClick={() => {
                        const input = document.getElementById(`price-${card.id}`) as HTMLInputElement
                        const p = parseFloat(input?.value)
                        if (p > 0) toggleForSale(card.id, true, p)
                      }}
                    >
                      <Tag className="h-3 w-3" />
                      Vender
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full h-8 text-sm"
                    onClick={() => toggleForSale(card.id, false)}
                  >
                    Quitar de venta
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}