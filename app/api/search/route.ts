import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.trim()

  if (!query || query.length < 2) {
    return NextResponse.json({ cards: [], sellers: [] })
  }

  const supabase = await createClient()

  // Buscar cartas en venta en el inventario
  const { data: cards } = await supabase
    .from("inventory")
    .select("id, card_name, card_set, condition, price, user_id")
    .eq("for_sale", true)
    .or(`card_name.ilike.%${query}%,card_set.ilike.%${query}%`)
    .limit(5)

  // Buscar vendedores
  const { data: sellers } = await supabase
    .from("sellers")
    .select("id, username, display_name, avatar_url, rating")
    .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
    .limit(5)

  return NextResponse.json({
    cards: cards ?? [],
    sellers: sellers ?? [],
  })
}