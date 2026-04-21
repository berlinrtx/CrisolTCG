import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"
import { SellerListingsTable } from "@/components/product/seller-listings-table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: card } = await supabase
    .from("inventory")
    .select("*")
    .eq("id", id)
    .eq("for_sale", true)
    .single()

  if (!card) notFound()

  const { data: listings } = await supabase
    .from("inventory")
    .select("*")
    .eq("card_name", card.card_name)
    .eq("for_sale", true)
    .order("price", { ascending: true })

  const formattedListings = (listings ?? []).map((l: any) => ({
    id: l.id,
    seller_id: l.user_id,
    seller_name: "Vendedor",
    seller_avatar_url: "",
    price: l.price ?? 0,
    condition: l.condition ?? "near_mint",
    quantity: l.quantity ?? 1,
    rating: 0,
    reviews_count: 0,
    response_time: "N/A",
    shipping_cost: 0,
    seller_location: "Guatemala",
    is_verified: false,
  }))

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/search">Búsqueda</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{card.card_name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-8">
            <h1 className="text-3xl font-bold">{card.card_name}</h1>
            {card.card_set && (
              <p className="text-muted-foreground mt-1">{card.card_set}</p>
            )}
          </div>

          <SellerListingsTable
            listings={formattedListings}
            productName={card.card_name}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}