"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { accessoryTypes } from "@/lib/categories"

interface CategoryFiltersProps {
  subcategoryType: string
  selectedAccessoryType?: string
}

export function CategoryFilters({ subcategoryType, selectedAccessoryType }: CategoryFiltersProps) {
  return (
    <Card className="rounded-2xl sticky top-20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Filtros</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <X className="h-4 w-4 mr-1" />
          Limpiar
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Singles Filters */}
        {subcategoryType === "singles" && (
          <>
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Set</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="set1" />
                  <label htmlFor="set1" className="text-sm cursor-pointer">
                    Darkness Ablaze
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="set2" />
                  <label htmlFor="set2" className="text-sm cursor-pointer">
                    Vivid Voltage
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="set3" />
                  <label htmlFor="set3" className="text-sm cursor-pointer">
                    Champion's Path
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold">Idioma</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="lang1" />
                  <label htmlFor="lang1" className="text-sm cursor-pointer">
                    Español
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lang2" />
                  <label htmlFor="lang2" className="text-sm cursor-pointer">
                    Inglés
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lang3" />
                  <label htmlFor="lang3" className="text-sm cursor-pointer">
                    Japonés
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold">Condición</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="cond1" />
                  <label htmlFor="cond1" className="text-sm cursor-pointer">
                    Mint
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cond2" />
                  <label htmlFor="cond2" className="text-sm cursor-pointer">
                    Near Mint
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cond3" />
                  <label htmlFor="cond3" className="text-sm cursor-pointer">
                    Lightly Played
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Sellado Filters */}
        {subcategoryType === "sellado" && (
          <>
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Set</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="set1" />
                  <label htmlFor="set1" className="text-sm cursor-pointer">
                    Darkness Ablaze
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="set2" />
                  <label htmlFor="set2" className="text-sm cursor-pointer">
                    Vivid Voltage
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold">Tipo de Producto</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="type1" />
                  <label htmlFor="type1" className="text-sm cursor-pointer">
                    Booster Pack
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="type2" />
                  <label htmlFor="type2" className="text-sm cursor-pointer">
                    Booster Box
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="type3" />
                  <label htmlFor="type3" className="text-sm cursor-pointer">
                    Elite Trainer Box
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="type4" />
                  <label htmlFor="type4" className="text-sm cursor-pointer">
                    Structure Deck
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Accesorios Filters */}
        {subcategoryType === "accesorios" && (
          <>
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Tipo de Accesorio</Label>
              <div className="space-y-2">
                {accessoryTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox id={type.id} defaultChecked={selectedAccessoryType === type.slug} />
                    <label htmlFor={type.id} className="text-sm cursor-pointer">
                      {type.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold">Marca</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="brand1" />
                  <label htmlFor="brand1" className="text-sm cursor-pointer">
                    Ultra Pro
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="brand2" />
                  <label htmlFor="brand2" className="text-sm cursor-pointer">
                    Dragon Shield
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="brand3" />
                  <label htmlFor="brand3" className="text-sm cursor-pointer">
                    KMC
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        <Button className="w-full rounded-2xl">Aplicar Filtros</Button>
      </CardContent>
    </Card>
  )
}
