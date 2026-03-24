"use client"

import { useState } from "react"
import { CreditCard, Plus, Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const paymentMethods = [
  {
    id: 1,
    type: "visa",
    last4: "4242",
    expiryMonth: "12",
    expiryYear: "2027",
    holderName: "Juan Pérez",
    isDefault: true,
  },
  {
    id: 2,
    type: "mastercard",
    last4: "5555",
    expiryMonth: "08",
    expiryYear: "2026",
    holderName: "Juan Pérez",
    isDefault: false,
  },
]

const cardBrands = {
  visa: { name: "Visa", color: "bg-blue-600" },
  mastercard: { name: "Mastercard", color: "bg-red-600" },
  amex: { name: "American Express", color: "bg-blue-500" },
}

export function PaymentMethodsList() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Tarjeta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Nueva Tarjeta</DialogTitle>
              <DialogDescription>Agrega un nuevo método de pago</DialogDescription>
            </DialogHeader>
            <PaymentMethodForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {paymentMethods.map((method) => {
          const brand = cardBrands[method.type as keyof typeof cardBrands]

          return (
            <Card key={method.id} className="relative overflow-hidden">
              {method.isDefault && (
                <Badge className="absolute top-4 right-4 bg-primary">
                  <Check className="mr-1 h-3 w-3" />
                  Predeterminada
                </Badge>
              )}

              <div className={`h-2 ${brand.color}`} />

              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle>{brand.name}</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-0.5">
                        {[1, 2, 3, 4].map((j) => (
                          <div key={j} className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                        ))}
                      </div>
                    ))}
                  </div>
                  <span className="text-lg font-mono font-semibold">{method.last4}</span>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Titular</p>
                  <p className="font-medium">{method.holderName}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Vencimiento</p>
                  <p className="font-medium">
                    {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  {!method.isDefault && (
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Hacer Predeterminada
                    </Button>
                  )}

                  <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {paymentMethods.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-1">No hay métodos de pago</p>
            <p className="text-sm text-muted-foreground mb-4">Agrega tu primera tarjeta de crédito o débito</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Tarjeta
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function PaymentMethodForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
        <Input id="cardNumber" placeholder="1234 5678 9012 3456" maxLength={19} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="holderName">Nombre del Titular</Label>
        <Input id="holderName" placeholder="Como aparece en la tarjeta" />
      </div>

      <div className="grid gap-4 grid-cols-3">
        <div className="space-y-2 col-span-2">
          <Label htmlFor="expiry">Vencimiento</Label>
          <div className="grid grid-cols-2 gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Mes" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                    {month.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" placeholder="123" maxLength={4} />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Guardar Tarjeta</Button>
      </DialogFooter>
    </form>
  )
}
