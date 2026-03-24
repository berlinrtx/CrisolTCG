"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"

// Mock banner data - will be replaced with Supabase data
const mockBanners = [
  {
    id: "1",
    title: "Nuevos Sets de Pokémon",
    description: "Descubre las últimas cartas de Pokémon TCG",
    image_url: "/pokemon-banner.jpg",
    link_url: "/catalog?tcg=pokemon",
    order: 1,
    is_active: true,
  },
  {
    id: "2",
    title: "Yu-Gi-Oh! Ofertas Especiales",
    description: "Hasta 30% de descuento en cartas seleccionadas",
    image_url: "/yugioh-banner.jpg",
    link_url: "/catalog?tcg=yugioh",
    order: 2,
    is_active: true,
  },
  {
    id: "3",
    title: "Magic: The Gathering",
    description: "Cartas raras y coleccionables disponibles",
    image_url: "/magic-banner.jpg",
    link_url: "/catalog?tcg=magic",
    order: 3,
    is_active: false,
  },
]

export function BannerManager() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Gestión de Banners</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl">
                <Plus className="h-4 w-4" />
                Agregar Banner
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Banner</DialogTitle>
                <DialogDescription>Crea un nuevo banner promocional para la página principal</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="banner-title">Título del Banner</Label>
                  <Input id="banner-title" placeholder="Ej: Nuevos Sets de Pokémon" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="banner-description">Descripción</Label>
                  <Input id="banner-description" placeholder="Descripción breve del banner" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="banner-image">URL de Imagen</Label>
                  <Input id="banner-image" placeholder="https://..." />
                  <p className="text-xs text-muted-foreground">Tamaño recomendado: 1200x400px</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="banner-link">URL de Enlace</Label>
                  <Input id="banner-link" placeholder="/catalog?tcg=pokemon" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="banner-order">Orden de Visualización</Label>
                    <Input id="banner-order" type="number" placeholder="1" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="banner-status">Estado</Label>
                    <Select defaultValue="active">
                      <SelectTrigger id="banner-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="inactive">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="rounded-2xl">
                  Cancelar
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)} className="rounded-2xl">
                  Crear Banner
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vista Previa</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Enlace</TableHead>
              <TableHead>Orden</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBanners.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell>
                  <div className="relative h-16 w-32 rounded overflow-hidden">
                    <Image
                      src={banner.image_url || "/placeholder.svg"}
                      alt={banner.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{banner.title}</p>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground max-w-xs truncate">{banner.description}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs font-mono text-muted-foreground">{banner.link_url}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{banner.order}</Badge>
                </TableCell>
                <TableCell>
                  {banner.is_active ? (
                    <Badge className="bg-green-500">Activo</Badge>
                  ) : (
                    <Badge variant="secondary">Inactivo</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon-sm">
                      {banner.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
