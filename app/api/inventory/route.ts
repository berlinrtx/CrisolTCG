import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET - Ver todas las cartas del usuario
export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST - Agregar carta al inventario
export async function POST(request: Request) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const body = await request.json()
  const { card_name, card_set, condition, quantity, for_sale, price, image_url } = body

  if (!card_name) {
    return NextResponse.json({ error: "card_name es requerido" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("inventory")
    .insert({
      user_id: user.id,
      card_name,
      card_set,
      condition,
      quantity: quantity ?? 1,
      for_sale: for_sale ?? false,
      price,
      image_url,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}