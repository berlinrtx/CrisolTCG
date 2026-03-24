import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SellerInventory } from "@/components/seller/seller-inventory"

export default async function SellerInventoryPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile?.is_seller_verified) {
    redirect("/seller/dashboard")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mi Inventario</h2>
        <p className="text-muted-foreground">Administra tus productos listados</p>
      </div>

      <SellerInventory />
    </div>
  )
}
