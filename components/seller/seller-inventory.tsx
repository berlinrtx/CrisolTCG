"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Search,
  Upload,
  FileSpreadsheet,
  Trash2,
  PauseCircle,
  Plus,
  Package,
  DollarSign,
  TrendingUp,
  Save,
} from "lucide-react"
import Image from "next/image"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Mock data for search results
const MOCK_SEARCH_RESULTS = [
  {
    id: "lob-001",
    name: "Blue-Eyes White Dragon",
    set: "Legend of Blue Eyes White Dragon",
    code: "LOB-001",
    rarity: "Ultra Rare",
    game: "Yu-Gi-Oh!",
    image: "/blue-eyes-white-dragon-yugioh-card.jpg",
    marketPrice: 45.5,
  },
  {
    id: "sv1-006",
    name: "Charizard ex",
    set: "Scarlet & Violet",
    code: "006/198",
    rarity: "Double Rare",
    game: "Pokémon",
    image: "/charizard-pokemon-card.png",
    marketPrice: 12.5,
  },
  {
    id: "lea-232",
    name: "Black Lotus",
    set: "Limited Edition Alpha",
    code: "232",
    rarity: "Rare",
    game: "Magic: The Gathering",
    image: "/black-lotus-magic-card.jpg",
    marketPrice: 25000.0,
  },
]

// Mock data for active inventory
const INITIAL_INVENTORY = [
  {
    id: 1,
    name: "Charizard ex",
    set: "Scarlet & Violet",
    code: "006/198",
    rarity: "Double Rare",
    game: "Pokémon",
    image: "/charizard-pokemon-card.png",
    condition: "Near Mint",
    language: "Español",
    marketPrice: 12.5,
    price: 12.0,
    quantity: 4,
    status: "active",
  },
  {
    id: 2,
    name: "Blue-Eyes White Dragon",
    set: "Legend of Blue Eyes",
    code: "LOB-001",
    rarity: "Ultra Rare",
    game: "Yu-Gi-Oh!",
    image: "/blue-eyes-white-dragon-yugioh-card.jpg",
    condition: "Lightly Played",
    language: "Inglés",
    marketPrice: 45.5,
    price: 40.0,
    quantity: 1,
    status: "active",
  },
]

export function SellerInventory() {
  const [activeTab, setActiveTab] = useState<"manual" | "bulk">("manual")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof MOCK_SEARCH_RESULTS>([])
  const [selectedCard, setSelectedCard] = useState<(typeof MOCK_SEARCH_RESULTS)[0] | null>(null)
  const [inventory, setInventory] = useState(INITIAL_INVENTORY)
  const [preliminaryList, setPreliminaryList] = useState<typeof INITIAL_INVENTORY>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form states
  const [condition, setCondition] = useState("Near Mint")
  const [language, setLanguage] = useState("Español")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState(1)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      const results = MOCK_SEARCH_RESULTS.filter(
        (card) =>
          card.name.toLowerCase().includes(query.toLowerCase()) ||
          card.code.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleSelectCard = (card: (typeof MOCK_SEARCH_RESULTS)[0]) => {
    setSelectedCard(card)
    setPrice(card.marketPrice.toString())
    setSearchResults([])
    setSearchQuery("")
    setCondition("Near Mint")
    setLanguage("Español")
    setQuantity(1)
  }

  const handleAddListing = () => {
    if (!selectedCard) return

    const newListing = {
      id: Date.now(),
      name: selectedCard.name,
      set: selectedCard.set,
      code: selectedCard.code,
      rarity: selectedCard.rarity,
      game: selectedCard.game,
      image: selectedCard.image,
      condition,
      language,
      marketPrice: selectedCard.marketPrice,
      price: Number.parseFloat(price) || 0,
      quantity,
      status: "active",
    }

    setPreliminaryList([newListing, ...preliminaryList])

    // We keep the form open so they can add another variant
  }

  const handleUpdatePreliminaryItem = (id: number, field: string, value: any) => {
    setPreliminaryList(preliminaryList.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleDeletePreliminary = (id: number) => {
    setPreliminaryList(preliminaryList.filter((item) => item.id !== id))
  }

  const handleConfirmUpload = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setInventory([...preliminaryList, ...inventory])
      setPreliminaryList([])
      setSelectedCard(null)
      setPrice("")
      setQuantity(1)
      setIsSubmitting(false)
    }, 1000)
  }

  const handleDelete = (id: number) => {
    setInventory(inventory.filter((item) => item.id !== id))
  }

  const handleUpdateItem = (id: number, field: "price" | "quantity", value: number) => {
    setInventory(inventory.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total del Inventario</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,245.00</div>
            <p className="text-xs text-muted-foreground">+20.1% del mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cartas Activas</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">+12 nuevas esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas del Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$345.00</div>
            <p className="text-xs text-muted-foreground">+15% del mes pasado</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Products Section */}
      <Card className="border-none shadow-md">
        <div className="bg-muted/50 border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab("manual")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "manual"
                  ? "border-[#f79b27] text-[#f79b27] bg-background"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Carga Manual
            </button>
            <button
              onClick={() => setActiveTab("bulk")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "bulk"
                  ? "border-[#f79b27] text-[#f79b27] bg-background"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Carga Masiva
            </button>
          </div>
        </div>

        <CardContent className="p-6">
          {activeTab === "manual" ? (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar carta por nombre (Charizard) o código (LOB-001)..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[#f79b27] focus:border-transparent shadow-sm"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>

                {/* Autocomplete Results */}
                {searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-background rounded-lg border shadow-lg overflow-hidden">
                    {searchResults.map((card) => (
                      <div
                        key={card.id}
                        className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => handleSelectCard(card)}
                      >
                        <div className="relative h-12 w-9 flex-shrink-0 rounded overflow-hidden border">
                          <Image src={card.image || "/placeholder.svg"} alt={card.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{card.name}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {card.set} • {card.code}
                          </div>
                        </div>
                        <div className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap">
                          {card.rarity}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Card Draft */}
              {selectedCard && (
                <div className="border rounded-xl p-4 bg-muted/30 animate-in fade-in slide-in-from-top-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Left: Image */}
                    <div className="relative h-64 w-48 flex-shrink-0 mx-auto md:mx-0 rounded-lg overflow-hidden border shadow-sm">
                      <Image
                        src={selectedCard.image || "/placeholder.svg"}
                        alt={selectedCard.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Middle: Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold">{selectedCard.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-2 py-1 rounded-md bg-background border text-xs font-medium">
                            {selectedCard.game}
                          </span>
                          <span className="px-2 py-1 rounded-md bg-background border text-xs font-medium">
                            {selectedCard.set}
                          </span>
                          <span className="px-2 py-1 rounded-md bg-background border text-xs font-medium">
                            {selectedCard.code}
                          </span>
                          <span className="px-2 py-1 rounded-md bg-[#f79b27]/10 text-[#f79b27] border border-[#f79b27]/20 text-xs font-medium">
                            {selectedCard.rarity}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400">
                        <div className="text-sm font-medium">Precio de Referencia de Mercado</div>
                        <div className="text-2xl font-bold">${selectedCard.marketPrice.toFixed(2)}</div>
                      </div>
                    </div>

                    {/* Right: Form */}
                    <div className="w-full md:w-72 space-y-4 p-4 bg-background rounded-lg border shadow-sm">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Condición</label>
                        <select
                          className="w-full p-2 rounded-md border bg-background"
                          value={condition}
                          onChange={(e) => setCondition(e.target.value)}
                        >
                          <option>Near Mint</option>
                          <option>Lightly Played</option>
                          <option>Moderately Played</option>
                          <option>Heavy Played</option>
                          <option>Damaged</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Idioma</label>
                        <select
                          className="w-full p-2 rounded-md border bg-background"
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                        >
                          <option>Español</option>
                          <option>Inglés</option>
                          <option>Japonés</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Tu Precio</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <input
                              type="number"
                              className="w-full pl-6 p-2 rounded-md border bg-background"
                              placeholder="0.00"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Cantidad</label>
                          <input
                            type="number"
                            className="w-full p-2 rounded-md border bg-background"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                          />
                        </div>
                      </div>

                      <Button className="w-full bg-[#f79b27] hover:bg-[#e08a1e] text-white" onClick={handleAddListing}>
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar a la Lista
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {preliminaryList.length > 0 && (
                <div className="mt-8 space-y-4 border-t pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Listado Preliminar ({preliminaryList.length})</h3>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          <Save className="h-4 w-4 mr-2" />
                          Subir Cartas
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro que deseas subir las cartas seleccionadas?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Se agregarán {preliminaryList.length} cartas a tu inventario activo y estarán visibles para
                            los compradores inmediatamente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Editar listado</AlertDialogCancel>
                          <AlertDialogAction onClick={handleConfirmUpload} className="bg-green-600 hover:bg-green-700">
                            Subir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium">
                          <tr>
                            <th className="px-4 py-3">Carta</th>
                            <th className="px-4 py-3">Condición</th>
                            <th className="px-4 py-3">Idioma</th>
                            <th className="px-4 py-3">Precio</th>
                            <th className="px-4 py-3">Cantidad</th>
                            <th className="px-4 py-3 text-right">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {preliminaryList.map((item) => (
                            <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="relative h-10 w-8 rounded overflow-hidden border flex-shrink-0">
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {item.set} • {item.rarity}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <select
                                  className="w-full p-1 rounded border bg-background text-xs"
                                  value={item.condition}
                                  onChange={(e) => handleUpdatePreliminaryItem(item.id, "condition", e.target.value)}
                                >
                                  <option>Near Mint</option>
                                  <option>Lightly Played</option>
                                  <option>Moderately Played</option>
                                  <option>Heavy Played</option>
                                  <option>Damaged</option>
                                </select>
                              </td>
                              <td className="px-4 py-3">
                                <select
                                  className="w-full p-1 rounded border bg-background text-xs"
                                  value={item.language}
                                  onChange={(e) => handleUpdatePreliminaryItem(item.id, "language", e.target.value)}
                                >
                                  <option>Español</option>
                                  <option>Inglés</option>
                                  <option>Japonés</option>
                                </select>
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="number"
                                  className="w-20 p-1 rounded border bg-background text-xs"
                                  value={item.price}
                                  onChange={(e) =>
                                    handleUpdatePreliminaryItem(
                                      item.id,
                                      "price",
                                      Number.parseFloat(e.target.value) || 0,
                                    )
                                  }
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="number"
                                  className="w-16 p-1 rounded border bg-background text-xs"
                                  value={item.quantity}
                                  min="1"
                                  onChange={(e) =>
                                    handleUpdatePreliminaryItem(
                                      item.id,
                                      "quantity",
                                      Number.parseInt(e.target.value) || 1,
                                    )
                                  }
                                />
                              </td>
                              <td className="px-4 py-3 text-right">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100"
                                  onClick={() => handleDeletePreliminary(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl bg-muted/30">
              <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center shadow-sm mb-4">
                <FileSpreadsheet className="h-8 w-8 text-[#f79b27]" />
              </div>
              <h3 className="text-lg font-medium mb-2">Carga Masiva de Inventario</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Arrastra tu archivo Excel (.xlsx) aquí o haz clic para seleccionar. Asegúrate de usar la plantilla
                oficial para evitar errores.
              </p>
              <div className="flex gap-4">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Seleccionar Archivo
                </Button>
                <Button variant="ghost" className="text-[#18afeb]">
                  Descargar Plantilla Oficial
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Inventory Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Inventario Activo</h3>
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium">
                <tr>
                  <th className="px-4 py-3">Carta</th>
                  <th className="px-4 py-3">Rareza</th>
                  <th className="px-4 py-3">Detalles Venta</th>
                  <th className="px-4 py-3">Mercado (Ref)</th>
                  <th className="px-4 py-3">Tu Precio</th>
                  <th className="px-4 py-3">Cantidad</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-9 rounded overflow-hidden border flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-foreground">{item.name}</div>
                          <div className="flex items-center gap-2 text-xs mt-0.5">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                item.game === "Pokémon"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : item.game === "Yu-Gi-Oh!"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {item.game}
                            </span>
                            <span className="text-muted-foreground">
                              {item.set} • {item.code}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                        {item.rarity}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium">{item.condition}</span>
                        <span className="text-xs text-muted-foreground">{item.language}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-muted-foreground italic">${item.marketPrice.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative w-24">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                          $
                        </span>
                        <input
                          type="number"
                          className="w-full pl-5 py-1 text-sm rounded border bg-background focus:ring-1 focus:ring-[#f79b27]"
                          value={item.price}
                          onChange={(e) => handleUpdateItem(item.id, "price", Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        className="w-16 py-1 px-2 text-sm rounded border bg-background focus:ring-1 focus:ring-[#f79b27]"
                        value={item.quantity}
                        min="0"
                        onChange={(e) => handleUpdateItem(item.id, "quantity", Number.parseInt(e.target.value) || 0)}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-muted-foreground hover:text-[#f79b27] hover:bg-[#f79b27]/10 rounded-md transition-colors">
                          <PauseCircle className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {inventory.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No tienes productos listados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
