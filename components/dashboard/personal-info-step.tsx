"use client"

import type React from "react"

import { useState } from "react"
import { User, MapPin, Building2, CreditCard, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface PersonalInfoStepProps {
  onComplete: (data: any) => void
  onBack: () => void
  initialData?: any
}

const guatemalaMunicipalities = [
  "Guatemala",
  "Santa Catarina Pinula",
  "San José Pinula",
  "San José del Golfo",
  "Palencia",
  "Chinautla",
  "San Pedro Ayampuc",
  "Mixco",
  "San Pedro Sacatepéquez",
  "San Juan Sacatepéquez",
  "San Raymundo",
  "Chuarrancho",
  "Fraijanes",
  "Amatitlán",
  "Villa Nueva",
  "Villa Canales",
  "San Miguel Petapa",
]

const banks = [
  "Banco Industrial",
  "Banrural",
  "Banco G&T Continental",
  "BAC",
  "Banco Promerica",
  "Banco Agromercantil",
  "Banco Inmobiliario",
  "Bantrab",
  "Vivibanco",
]

export function PersonalInfoStep({ onComplete, onBack, initialData = {} }: PersonalInfoStepProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    legalFirstName: initialData.legalFirstName || "",
    legalLastName: initialData.legalLastName || "",
    dateOfBirth: initialData.dateOfBirth || "",
    municipality: initialData.municipality || "",
    address: initialData.address || "",
    storeNamePublic: initialData.storeNamePublic || "",
    dpiNumber: initialData.dpiNumber || "",
    nitNumber: initialData.nitNumber || "",
    bankName: initialData.bankName || "",
    bankAccountType: initialData.bankAccountType || "",
    bankAccountNumber: initialData.bankAccountNumber || "",
    bankAccountHolder: initialData.bankAccountHolder || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate age (must be 18+)
    const birthDate = new Date(formData.dateOfBirth)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (age < 18 || (age === 18 && monthDiff < 0)) {
      toast({
        title: "Edad insuficiente",
        description: "Debes ser mayor de 18 años para registrarte como vendedor",
        variant: "destructive",
      })
      return
    }

    // Validate all fields
    const requiredFields = Object.entries(formData)
    const emptyFields = requiredFields.filter(([_, value]) => !value)

    if (emptyFields.length > 0) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    onComplete(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información Personal y Legal
          </CardTitle>
          <CardDescription>Completa tus datos personales, geográficos y bancarios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground">Datos Personales</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="legalFirstName">Nombre Legal *</Label>
                <Input
                  id="legalFirstName"
                  placeholder="Como aparece en tu DPI"
                  value={formData.legalFirstName}
                  onChange={(e) => setFormData({ ...formData, legalFirstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="legalLastName">Apellido Legal *</Label>
                <Input
                  id="legalLastName"
                  placeholder="Como aparece en tu DPI"
                  value={formData.legalLastName}
                  onChange={(e) => setFormData({ ...formData, legalLastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Fecha de Nacimiento *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                max={new Date().toISOString().split("T")[0]}
                required
              />
              <p className="text-xs text-muted-foreground">Debes ser mayor de 18 años</p>
            </div>
          </div>

          {/* Geographic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Ubicación Geográfica
            </h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="municipality">Municipio *</Label>
                <Select
                  value={formData.municipality}
                  onValueChange={(value) => setFormData({ ...formData, municipality: value })}
                >
                  <SelectTrigger id="municipality">
                    <SelectValue placeholder="Selecciona tu municipio" />
                  </SelectTrigger>
                  <SelectContent>
                    {guatemalaMunicipalities.map((municipality) => (
                      <SelectItem key={municipality} value={municipality}>
                        {municipality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Por ahora solo vendemos en el departamento de Guatemala</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección Completa *</Label>
                <Input
                  id="address"
                  placeholder="Calle, avenida, número, zona"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Store Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Información de Tienda
            </h3>
            <div className="space-y-2">
              <Label htmlFor="storeNamePublic">Nombre de Tu Tienda (Público) *</Label>
              <Input
                id="storeNamePublic"
                placeholder="Ej: Cartas GT, Magic Shop..."
                value={formData.storeNamePublic}
                onChange={(e) => setFormData({ ...formData, storeNamePublic: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">Este nombre será visible para los compradores</p>
            </div>
          </div>

          {/* Legal Documents */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground">Documentos Legales</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dpiNumber">Número de DPI *</Label>
                <Input
                  id="dpiNumber"
                  placeholder="1234 12345 1234"
                  value={formData.dpiNumber}
                  onChange={(e) => setFormData({ ...formData, dpiNumber: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nitNumber">Número de NIT *</Label>
                <Input
                  id="nitNumber"
                  placeholder="12345678-9"
                  value={formData.nitNumber}
                  onChange={(e) => setFormData({ ...formData, nitNumber: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Banking Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Información Bancaria
            </h3>
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Banco *</Label>
                  <Select
                    value={formData.bankName}
                    onValueChange={(value) => setFormData({ ...formData, bankName: value })}
                  >
                    <SelectTrigger id="bankName">
                      <SelectValue placeholder="Selecciona tu banco" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankAccountType">Tipo de Cuenta *</Label>
                  <Select
                    value={formData.bankAccountType}
                    onValueChange={(value) => setFormData({ ...formData, bankAccountType: value })}
                  >
                    <SelectTrigger id="bankAccountType">
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ahorros">Ahorros</SelectItem>
                      <SelectItem value="monetaria">Monetaria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAccountNumber">Número de Cuenta *</Label>
                <Input
                  id="bankAccountNumber"
                  placeholder="1234567890"
                  value={formData.bankAccountNumber}
                  onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAccountHolder">Titular de la Cuenta *</Label>
                <Input
                  id="bankAccountHolder"
                  placeholder="Nombre completo del titular"
                  value={formData.bankAccountHolder}
                  onChange={(e) => setFormData({ ...formData, bankAccountHolder: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">La cuenta debe estar a tu nombre</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Anterior
        </Button>
        <Button type="submit" size="lg">
          Continuar
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
