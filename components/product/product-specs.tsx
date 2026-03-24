"use client"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { DollarSign, Sparkles, Package, Hash, Gamepad2, Users } from "lucide-react"

interface ProductSpecsProps {
  product: {
    name: string
    min_price: number
    max_price: number
    rarity: string
    set_name: string
    set_number: string
    tcg: string
    seller_count: number
    description?: string
  }
  currentQuantity?: number
}

export function ProductSpecs({ product, currentQuantity }: ProductSpecsProps) {
  const [view, setView] = useState<"specs" | "description">("specs")

  return (
    <div
      className="border-2 rounded-3xl bg-card shadow-custom-lg h-fit overflow-hidden"
      style={{ borderColor: "rgba(24, 20, 53, 0.2)" }}
    >
      <div className="p-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-foreground">
          {product.name}
        </h1>

        <div className="flex gap-2 mb-6">
          <Button
            variant={view === "specs" ? "default" : "outline"}
            size="lg"
            onClick={() => setView("specs")}
            className="flex-1 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Especificaciones
          </Button>
          <Button
            variant={view === "description" ? "default" : "outline"}
            size="lg"
            onClick={() => setView("description")}
            className="flex-1 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Descripción
          </Button>
        </div>

        {view === "specs" ? (
          <div className="space-y-4">
            <div className="rounded-2xl p-4 bg-card">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span>Rango de Precio</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                Q{product.min_price} - Q{product.max_price}
              </div>
            </div>

            <div className="space-y-3 bg-muted/30 rounded-2xl p-4">
              {currentQuantity !== undefined && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Package className="w-4 h-4" />
                      Cantidad Actual
                    </span>
                    <span className="text-sm font-bold bg-primary/20 text-primary px-3 py-1 rounded-full">
                      {currentQuantity}
                    </span>
                  </div>

                  <Separator />
                </>
              )}

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Sparkles className="w-4 h-4" />
                  Rareza
                </span>
                <span className="text-sm font-bold bg-accent/20 text-accent px-3 py-1 rounded-full">
                  {product.rarity}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Package className="w-4 h-4" />
                  Set
                </span>
                <span className="text-sm font-semibold">{product.set_name}</span>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Hash className="w-4 h-4" />
                  Código
                </span>
                <span className="text-sm font-mono font-semibold bg-muted px-2 py-1 rounded">{product.set_number}</span>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Gamepad2 className="w-4 h-4" />
                  Juego
                </span>
                <span className="text-sm font-semibold">{product.tcg}</span>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Users className="w-4 h-4" />
                  Vendedores
                </span>
                <span className="text-sm font-bold bg-accent/20 text-accent px-3 py-1 rounded-full">
                  {product.seller_count}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-muted/30 rounded-2xl p-5">
            <p className="leading-relaxed text-foreground text-base">
              {product.description || "Esta carta no tiene descripción disponible."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
