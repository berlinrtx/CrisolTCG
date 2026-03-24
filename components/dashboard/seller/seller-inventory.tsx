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
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { getAccessoryTypesForGame } from "@/lib/categories"

// Mock inventory data - will be replaced with Supabase data
const mockInventory = [
  {
    id: "1",
    product_name: "Charizard VMAX",
    tcg: "Pokémon",
    set_name: "Darkness Ablaze",
    condition: "Near Mint",
    price: 450,
    quantity: 2,
    image_url: "/charizard-pokemon-card.png",
    status: "active",
    category: "singles",
  },
  {
    id: "2",
    product_name: "Blue-Eyes White Dragon",
    tcg: "Yu-Gi-Oh!",
    set_name: "Legend of Blue Eyes",
    condition: "Mint",
    price: 320,
    quantity: 1,
    image_url: "/blue-eyes-white-dragon-yugioh-card.jpg",
    status: "active",
    category: "singles",
  },
  {
    id: "3",
    product_name: "Black Lotus",
    tcg: "Magic",
    set_name: "Alpha",
    condition: "Near Mint",
    price: 1200,
    quantity: 1,
    image_url: "/black-lotus-magic-card.jpg",
    status: "sold",
    category: "singles",
  },
  {
    id: "4",
    product_name: "Monkey D. Luffy",
    tcg: "One Piece",
    set_name: "Romance Dawn",
    condition: "Mint",
    price: 180,
    quantity: 3,
    image_url: "/luffy-one-piece-card.jpg",
    status: "active",
    category: "singles",
  },
]

export function SellerInventory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedAccessoryType, setSelectedAccessoryType] = useState("")

  const filteredInventory = mockInventory.filter((item) =>
    item.product_name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const availableAccessoryTypes = selectedGame ? getAccessoryTypesForGame(selectedGame) : []

  const handleGameChange = (value: string) => {
    setSelectedGame(value)
    setSelectedCategory("")
    setSelectedAccessoryType("")
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setSelectedAccessoryType("")
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Mi Inventario</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl">
                <Plus className="h-4 w-4" />
                Agregar Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                <DialogDescription>Selecciona el juego y tipo de producto para comenzar</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="tcg">1. Selecciona el Juego</Label>
                  <Select value={selectedGame} onValueChange={handleGameChange}>
                    <SelectTrigger id="tcg">
                      <SelectValue placeholder="Seleccionar juego" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yugioh">Yu-Gi-Oh!</SelectItem>
                      <SelectItem value="magic">Magic</SelectItem>
                      <SelectItem value="pokemon">Pokémon</SelectItem>
                      <SelectItem value="onepeace">One Peace</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedGame && (
                  <div className="grid gap-2">
                    <Label htmlFor="category">2. Selecciona el Tipo de Producto</Label>
                    <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="singles">Singles</SelectItem>
                        <SelectItem value="sellado">Sellado</SelectItem>
                        <SelectItem value="accesorios">Accesorios</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedCategory === "accesorios" && (
                  <div className="grid gap-2">
                    <Label htmlFor="accessory-type">3. Selecciona el Tipo de Accesorio</Label>
                    <Select value={selectedAccessoryType} onValueChange={setSelectedAccessoryType}>
                      <SelectTrigger id="accessory-type">
                        <SelectValue placeholder="Seleccionar tipo de accesorio" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableAccessoryTypes.map((type) => (
                          <SelectItem key={type.id} value={type.slug}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedCategory && (selectedCategory !== "accesorios" || selectedAccessoryType) && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="product-name">Nombre del Producto</Label>
                      <Input id="product-name" placeholder="Ej: Charizard VMAX" />
                    </div>

                    {selectedCategory !== "accesorios" && (
                      <div className="grid gap-2">
                        <Label htmlFor="set-name">Nombre del Set</Label>
                        <Input id="set-name" placeholder="Ej: Darkness Ablaze" />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="condition">Condición</Label>
                        <Select>
                          <SelectTrigger id="condition">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gem-mint">Gem Mint</SelectItem>
                            <SelectItem value="mint">Mint</SelectItem>
                            <SelectItem value="near-mint">Near Mint</SelectItem>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="price">Precio (Q)</Label>
                        <Input id="price" type="number" placeholder="0.00" />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="quantity">Cantidad</Label>
                      <Input id="quantity" type="number" placeholder="1" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="image">Imagen del Producto</Label>
                      <Input id="image" type="file" accept="image/*" />
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="rounded-2xl">
                  Cancelar
                </Button>
                <Button
                  onClick={() => setIsAddDialogOpen(false)}
                  className="rounded-2xl"
                  disabled={!selectedCategory || (selectedCategory === "accesorios" && !selectedAccessoryType)}
                >
                  Agregar Producto
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
            placeholder="Buscar en tu inventario..."
            className="pl-10 rounded-2xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Inventory Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Juego</TableHead>
              <TableHead>Condición</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-10 rounded overflow-hidden">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-xs text-muted-foreground">{item.set_name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.tcg}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{item.condition}</Badge>
                </TableCell>
                <TableCell>
                  <p className="font-semibold">Q{item.price}</p>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  {item.status === "active" ? (
                    <Badge className="bg-green-500">Activo</Badge>
                  ) : (
                    <Badge variant="secondary">Vendido</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
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
