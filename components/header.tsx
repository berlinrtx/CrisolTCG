"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, User, ShoppingCart, Menu, ChevronDown, Flame, Sparkles, Zap, Anchor, ShoppingBag } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase-browser"
import type { Database } from "@/types/database.types"
import { useCart } from "@/components/cart-provider"

type Category = Database["public"]["Tables"]["categories"]["Row"] & {
  subcategories?: Database["public"]["Tables"]["subcategories"]["Row"][]
}

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

const iconMap: Record<string, any> = {
  Flame,
  Sparkles,
  Zap,
  Anchor,
  ShoppingBag,
}

export function Header() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<{ cards: any[], sellers: any[] }>({ cards: [], sellers: [] })
  const [searchOpen, setSearchOpen] = useState(false)
  const searchTimeout = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const { count } = useCart()

  useEffect(() => {
    async function loadCategories() {
      try {
        const supabase = getSupabaseBrowserClient()
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("categories")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true })

        if (categoriesError) {
          console.error("Error fetching categories:", categoriesError)
          throw categoriesError
        }

        const { data: subcategoriesData, error: subcategoriesError } = await supabase
          .from("subcategories")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true })

        if (subcategoriesError) {
          console.error("Error fetching subcategories:", subcategoriesError)
          throw subcategoriesError
        }

        const categoriesWithSubs = (categoriesData || []).map((category) => ({
          ...category,
          subcategories: (subcategoriesData || []).filter((sub) => sub.category_id === category.id),
        }))

        setCategories(categoriesWithSubs)
      } catch (error) {
        console.error("Error loading categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])

  useEffect(() => {
    async function checkUser() {
      const supabase = getSupabaseBrowserClient()
      const { data: userData } = await supabase.auth.getUser()
      setUser(userData.user)

      if (userData.user) {
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", userData.user.id).single()
        setProfile(profileData)
      }
    }

    checkUser()

    const supabase = getSupabaseBrowserClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => setProfile(data))
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleSearch(value: string) {
    setSearchQuery(value)
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    if (value.length < 2) {
      setSearchResults({ cards: [], sellers: [] })
      setSearchOpen(false)
      return
    }
    searchTimeout.current = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`)
      const data = await res.json()
      setSearchResults(data)
      setSearchOpen(true)
    }, 300)
  }

  function handleSearchSubmit() {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
    }
  }

  const isSeller = profile?.is_seller_verified === true

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image src="/crisol-logo-nb.svg" alt="Crisol TCG" width={120} height={40} className="h-10 w-auto" />
        </Link>

        {/* Barra de búsqueda desktop */}
        <div className="hidden md:flex flex-1 max-w-2xl relative">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Buscar cartas, sets, o vendedores..."
              className="pl-4 pr-12 rounded-2xl h-11"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchSubmit()
              }}
              onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
              onFocus={() => searchQuery.length >= 2 && setSearchOpen(true)}
            />
            <Button
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
              onClick={handleSearchSubmit}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Dropdown de resultados */}
          {searchOpen && (searchResults.cards.length > 0 || searchResults.sellers.length > 0) && (
            <div className="absolute top-full mt-2 w-full bg-background/95 backdrop-blur-md border rounded-2xl shadow-lg z-50 overflow-hidden">
              {searchResults.cards.length > 0 && (
                <div className="p-2">
                  <p className="text-xs text-muted-foreground px-2 py-1 font-medium">Cartas en venta</p>
                  {searchResults.cards.map((card) => (
                    <button
                      key={card.id}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-muted transition-colors text-sm flex items-center justify-between"
                      onClick={() => {
                        setSearchOpen(false)
                        router.push(`/product/${card.id}`)
                      }}
                    >
                      <span className="font-medium">{card.card_name}</span>
                      <span className="text-muted-foreground text-xs">{card.card_set} · Q{card.price}</span>
                    </button>
                  ))}
                </div>
              )}
              {searchResults.sellers.length > 0 && (
                <div className="p-2 border-t">
                  <p className="text-xs text-muted-foreground px-2 py-1 font-medium">Vendedores</p>
                  {searchResults.sellers.map((seller) => (
                    <button
                      key={seller.id}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-muted transition-colors text-sm"
                      onClick={() => {
                        setSearchOpen(false)
                        router.push(`/seller/${seller.username}`)
                      }}
                    >
                      <span className="font-medium">@{seller.username}</span>
                      {seller.display_name && (
                        <span className="text-muted-foreground ml-2">{seller.display_name}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <DropdownMenu open={userDropdownOpen} onOpenChange={setUserDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <div onMouseEnter={() => setUserDropdownOpen(true)} onMouseLeave={() => setUserDropdownOpen(false)}>
                <Button variant="ghost" size="icon" className="transition-all duration-300 hover:scale-110 active:scale-95">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56"
              onMouseEnter={() => setUserDropdownOpen(true)}
              onMouseLeave={() => setUserDropdownOpen(false)}
            >
              {!user ? (
                <DropdownMenuItem asChild>
                  <Link href="/login" className="cursor-pointer">Iniciar Sesión</Link>
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/account" className="cursor-pointer">Mi Cuenta</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/orders" className="cursor-pointer">Mis Órdenes</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/addresses" className="cursor-pointer">Mis Direcciones</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/payment-methods" className="cursor-pointer">Métodos de Pago</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {isSeller ? (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/seller" className="cursor-pointer font-medium text-accent">Panel de Vendedor</Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/seller" className="cursor-pointer">Vende en Crisol</Link>
                    </DropdownMenuItem>
                  )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Botón carrito con contador */}
          <Button
            variant="ghost"
            size="icon"
            className="relative transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                {count}
              </span>
            )}
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                {count}
              </span>
            )}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="transition-all duration-300 hover:scale-110 active:scale-95">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <div className="relative w-full mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar..."
                    className="pl-10 rounded-2xl"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const val = (e.target as HTMLInputElement).value
                        if (val.trim()) router.push(`/search?q=${encodeURIComponent(val)}`)
                      }
                    }}
                  />
                </div>
                {isLoading ? (
                  <div className="text-sm text-muted-foreground">Cargando menú...</div>
                ) : (
                  categories.map((category) => (
                    <div key={category.id}>
                      <Link
                        href={category.coming_soon ? "#" : category.subcategories && category.subcategories.length > 0 ? `/${category.slug}` : `/accesorios`}
                        className={`text-sm font-medium transition-colors py-2 block ${category.coming_soon ? "text-muted-foreground cursor-default" : "hover:text-primary"}`}
                        onClick={(e) => category.coming_soon && e.preventDefault()}
                      >
                        {category.name}
                        {category.coming_soon && <span className="ml-2 text-xs font-semibold text-accent">¡Pronto ™!</span>}
                      </Link>
                      {!category.coming_soon && category.subcategories && category.subcategories.length > 0 && (
                        <div className="ml-4 mt-2 space-y-2">
                          {category.subcategories.map((sub) => (
                            <Link key={sub.id} href={`/${category.slug}/${sub.slug}`} className="text-xs text-muted-foreground hover:text-primary transition-colors block">
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
                {!user ? (
                  <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors py-2">Iniciar Sesión</Link>
                ) : (
                  <>
                    <Link href="/dashboard/account" className="text-sm font-medium hover:text-primary transition-colors py-2">Mi Cuenta</Link>
                    {isSeller ? (
                      <Link href="/dashboard/seller" className="text-sm font-medium hover:text-primary transition-colors py-2">Panel de Vendedor</Link>
                    ) : (
                      <Link href="/dashboard/seller" className="text-sm font-medium hover:text-primary transition-colors py-2">Vende en Crisol</Link>
                    )}
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="border-t hidden md:block">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center gap-8 h-12">
            {isLoading ? (
              <div className="text-sm text-muted-foreground">Cargando menú...</div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => !category.coming_soon && setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Link
                    href={category.coming_soon ? "#" : category.subcategories && category.subcategories.length > 0 ? `/${category.slug}` : `/accesorios`}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 h-12 ${category.coming_soon ? "text-muted-foreground cursor-default" : "hover:text-accent"}`}
                    onClick={(e) => category.coming_soon && e.preventDefault()}
                  >
                    {category.name}
                    {category.coming_soon && <span className="ml-2 text-xs font-semibold text-accent">¡Pronto ™!</span>}
                    {!category.coming_soon && category.subcategories && category.subcategories.length > 0 && (
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </Link>
                  {!category.coming_soon && category.subcategories && category.subcategories.length > 0 && hoveredCategory === category.id && (
                    <div className="absolute top-full left-0 bg-background/95 backdrop-blur-md border rounded-2xl shadow-lg py-2 min-w-[160px] z-50">
                      {category.subcategories.map((sub) => (
                        <Link key={sub.id} href={`/${category.slug}/${sub.slug}`} className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}