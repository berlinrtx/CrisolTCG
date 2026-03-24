"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Camera, Save } from "lucide-react"

// Mock user data - will be replaced with Supabase data
const mockUser = {
  name: "Carlos Méndez",
  email: "carlos@example.com",
  phone: "+502 1234-5678",
  avatar_url: "/buyer-avatar-1.jpg",
  address: {
    street: "5ta Avenida 12-34, Zona 10",
    city: "Ciudad de Guatemala",
    state: "Guatemala",
    zip: "01010",
  },
  joined_date: "2024-12-15",
}

export function BuyerProfile() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile Picture Card */}
      <Card className="rounded-2xl lg:col-span-1">
        <CardHeader>
          <CardTitle>Foto de Perfil</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative mb-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={mockUser.avatar_url || "/placeholder.svg"} alt={mockUser.name} />
              <AvatarFallback className="text-3xl">{mockUser.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <Button size="icon-sm" className="absolute bottom-0 right-0 rounded-full" variant="default">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <h3 className="font-semibold text-xl mb-1">{mockUser.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{mockUser.email}</p>
          <p className="text-xs text-muted-foreground">Miembro desde {mockUser.joined_date}</p>
        </CardContent>
      </Card>

      {/* Profile Information Card */}
      <Card className="rounded-2xl lg:col-span-2">
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" defaultValue={mockUser.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" defaultValue={mockUser.email} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" type="tel" defaultValue={mockUser.phone} />
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-4">Dirección de Envío</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Dirección</Label>
                <Input id="street" defaultValue={mockUser.address.street} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" defaultValue={mockUser.address.city} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Departamento</Label>
                  <Input id="state" defaultValue={mockUser.address.state} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Código Postal</Label>
                  <Input id="zip" defaultValue={mockUser.address.zip} />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-4">Cambiar Contraseña</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña Actual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva Contraseña</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" className="rounded-2xl bg-transparent">
              Cancelar
            </Button>
            <Button className="rounded-2xl">
              <Save className="h-4 w-4" />
              Guardar Cambios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
