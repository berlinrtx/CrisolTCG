import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Search } from "lucide-react"
import { AddToCartButton } from "@/components/ui/add-to-cart-button"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q?.trim() ?? ""

  const supabase = await createClient()

  let cards: any[] = []
  let sellers: any[] = []

  if (query.length >= 2) {
    const { data: cardsData } = await supabase
      .from("inventory")
      .select("id, card_name, card_set, condition, price, user_id")
      .eq("for_sale", true)
      .or(`card_name.ilike.%${query}%,card_set.ilike.%${query}%`)
      .limit(20)

    const { data: sellersData } = await supabase
      .from("sellers")
      .select("id, username, display_name, rating")
      .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
      .limit(10)

    cards = cardsData ?? []
    sellers = sellersData ?? []
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">

        <div className="flex items-center gap-2 mb-8">
          <Search className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-2xl font-bold">
            {query ? `Resultados para "${query}"` : "Buscar"}
          </h1>
        </div>

        {query.length < 2 && (
          <p className="text-muted-foreground">Escribe al menos 2 caracteres para buscar.</p>
        )}

        {query.length >= 2 && cards.length === 0 && sellers.length === 0 && (
          <p className="text-muted-foreground">No se encontraron resultados para "{query}".</p>
        )}

        {/* Cartas en venta */}
        {cards.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4">Cartas en venta</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map((card) => (
               <div key={card.id} className="border rounded-2xl p-4 bg-secondary/20 hover:bg-secondary/40 transition-colors">
  <h3 className="font-semibold">{card.card_name}</h3>
  {card.card_set && (
    <p className="text-sm text-muted-foreground">{card.card_set}</p>
  )}
  <p className="text-sm font-medium mt-2">Q{card.price}</p>
  <AddToCartButton inventoryId={card.id} />
</div>
              ))}
            </div>
          </div>
        )}

        {/* Vendedores */}
        {sellers.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Vendedores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sellers.map((seller) => (
                <Link
                  key={seller.id}
                  href={`/seller/${seller.username}`}
                  className="border rounded-2xl p-4 bg-secondary/20 hover:bg-secondary/40 transition-colors"
                >
                  <h3 className="font-semibold">@{seller.username}</h3>
                  {seller.display_name && (
                    <p className="text-sm text-muted-foreground">{seller.display_name}</p>
                  )}
                  {seller.rating > 0 && (
                    <p className="text-sm mt-1">⭐ {seller.rating}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  )
}