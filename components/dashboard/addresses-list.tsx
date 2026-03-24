"use client"

import { useState } from "react"
import { MapPin, Plus, Edit, Trash2, Home, Building } from "lucide-react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const addresses = [
  {
    id: 1,
    name: "Casa",
    type: "home",
    recipient: "Juan Pérez",
    phone: "+502 1234-5678",
    address: "5ta Avenida 12-34 Zona 10",
    city: "Guatemala",
    department: "Guatemala",
    zipCode: "01010",
    isDefault: true,
  },
  {
    id: 2,
    name: "Oficina",
    type: "work",
    recipient: "Juan Pérez",
    phone: "+502 8765-4321",
    address: "Bulevar Los Próceres 24-69 Zona 10",
    city: "Guatemala",
    department: "Guatemala",
    zipCode: "01010",
    isDefault: false,
  },
]

const departments = [
  "Alta Verapaz",
  "Baja Verapaz",
  "Chimaltenango",
  "Chiquimula",
  "El Progreso",
  "Escuintla",
  "Guatemala",
  "Huehuetenango",
  "Izabal",
  "Jalapa",
  "Jutiapa",
  "Petén",
  "Quetzaltenango",
  "Quiché",
  "Retalhuleu",
  "Sacatepéquez",
  "San Marcos",
  "Santa Rosa",
  "Sololá",
  "Suchitepéquez",
  "Totonicapán",
  "Zacapa",
]

export function AddressesList() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<any>(null)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Dirección
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nueva Dirección</DialogTitle>
              <DialogDescription>Agrega una nueva dirección de envío</DialogDescription>
            </DialogHeader>
            <AddressForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <Card key={address.id} className="relative">
            {address.isDefault && <Badge className="absolute top-4 right-4 bg-primary">Predeterminada</Badge>}
            <CardHeader>
              <div className="flex items-center gap-2">
                {address.type === "home" ? (
                  <Home className="h-5 w-5 text-primary" />
                ) : (
                  <Building className="h-5 w-5 text-primary" />
                )}
                <CardTitle>{address.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{address.recipient}</p>
                <p className="text-sm text-muted-foreground">{address.phone}</p>
              </div>

              <div className="text-sm">
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.department}
                </p>
                <p>Código Postal: {address.zipCode}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Editar Dirección</DialogTitle>
                      <DialogDescription>Modifica los datos de tu dirección</DialogDescription>
                    </DialogHeader>
                    <AddressForm address={address} onClose={() => {}} />
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {addresses.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-1">No hay direcciones</p>
            <p className="text-sm text-muted-foreground mb-4">Agrega tu primera dirección de envío</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Dirección
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function AddressForm({ address, onClose }: { address?: any; onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre de la Dirección</Label>
        <Input id="name" placeholder="ej: Casa, Oficina, Casa de Mamá" defaultValue={address?.name} />
      </div>

      <div className="space-y-2">
        <Label>Tipo</Label>
        <RadioGroup defaultValue={address?.type || "home"}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="home" id="home" />
            <Label htmlFor="home" className="font-normal cursor-pointer">
              Casa
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="work" id="work" />
            <Label htmlFor="work" className="font-normal cursor-pointer">
              Oficina
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="recipient">Nombre del Destinatario</Label>
          <Input id="recipient" placeholder="Nombre completo" defaultValue={address?.recipient} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" type="tel" placeholder="+502 1234-5678" defaultValue={address?.phone} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <Input id="address" placeholder="Calle, avenida, número, zona" defaultValue={address?.address} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="department">Departamento</Label>
          <Select defaultValue={address?.department}>
            <SelectTrigger id="department">
              <SelectValue placeholder="Selecciona" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Ciudad/Municipio</Label>
          <Input id="city" placeholder="Guatemala" defaultValue={address?.city} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">Código Postal</Label>
          <Input id="zipCode" placeholder="01010" defaultValue={address?.zipCode} />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Guardar Dirección</Button>
      </DialogFooter>
    </form>
  )
}
