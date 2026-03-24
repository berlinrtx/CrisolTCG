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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Search, Eye } from "lucide-react"

// Mock catalog data - will be replaced with Supabase data
const mockCatalog = [
  {
    id: "1",
    name: "Charizard VMAX",
    tcg: "Pokémon",
    set_name: "Darkness Ablaze",
    set_number: "020/189",
    rarity: "Secret Rare",
    image_url: "/charizard-pokemon-card.png",
    seller_count: 5,
    min_price: 450,
    status: "active",
  },
  {
    id: "2",
    name: "Blue-Eyes White Dragon",
    tcg: "Yu-Gi-Oh!",
    set_name: "Legend of Blue Eyes",
    set_number: "LOB-001",
    rarity: "Ultra Rare",
    image_url: "/blue-eyes-white-dragon-yugioh-card.jpg",
    seller_count: 8,
    min_price: 320,
    status: "active",
  },
  {
    id: "3",
    name: "Black Lotus",
    tcg: "Magic",
    set_name: "Alpha",
    set_number: "001",
    rarity: "Rare",
    image_url: "/black-lotus-magic-card.jpg",
    seller_count: 2,
    min_price: 1200,
    status: "active",
  },
  {
    id: "4",
    name: "Monkey D. Luffy",
    tcg: "One Piece",
    set_name: "Romance Dawn",
    set_number: "OP01-001",
    rarity: "Leader",
    image_url: "/luffy-one-piece-card.jpg",
    seller_count: 12,
    min_price: 180,
    status: "active",
  },
]

export function CatalogManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredCatalog = mockCatalog.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Gestión de Catálogo</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl">
                <Plus className="h-4 w-4" />
                Agregar Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Producto al Catálogo</DialogTitle>
                <DialogDescription>Agrega un nuevo producto al catálogo maestro del marketplace</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                <div className="grid gap-2">
                  <Label htmlFor="product-name">Nombre del Producto</Label>
                  <Input id="product-name" placeholder="Ej: Charizard VMAX" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tcg">Juego (TCG)</Label>
                    <Select>
                      <SelectTrigger id="tcg">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pokemon">Pokémon</SelectItem>
                        <SelectItem value="yugioh">Yu-Gi-Oh!</SelectItem>
                        <SelectItem value="magic">Magic: The Gathering</SelectItem>
                        <SelectItem value="onepiece">One Piece</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rarity">Rareza</Label>
                    <Select>
                      <SelectTrigger id="rarity">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="common">Common</SelectItem>
                        <SelectItem value="uncommon">Uncommon</SelectItem>
                        <SelectItem value="rare">Rare</SelectItem>
                        <SelectItem value="ultra-rare">Ultra Rare</SelectItem>
                        <SelectItem value="secret-rare">Secret Rare</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="set-name">Nombre del Set</Label>
                    <Input id="set-name" placeholder="Ej: Darkness Ablaze" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="set-number">Número del Set</Label>
                    <Input id="set-number" placeholder="Ej: 020/189" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea id="description" placeholder="Descripción del producto..." rows={3} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image-url">URL de Imagen</Label>
                  <Input id="image-url" placeholder="https://..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="rounded-2xl">
                  Cancelar
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)} className="rounded-2xl">
                  Agregar al Catálogo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar en el catálogo..."
            className="pl-10 rounded-2xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Catalog Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Juego</TableHead>
              <TableHead>Set</TableHead>
              <TableHead>Rareza</TableHead>
              <TableHead>Vendedores</TableHead>
              <TableHead>Precio Mín.</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCatalog.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-10 rounded overflow-hidden">
                      <Image src={item.image_url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.set_number}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.tcg}</Badge>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{item.set_name}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{item.rarity}</Badge>
                </TableCell>
                <TableCell>{item.seller_count}</TableCell>
                <TableCell>
                  <p className="font-semibold">Q{item.min_price}</p>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Activo</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon-sm">
                      <Eye className="h-4 w-4" />
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
