import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SellerApplication } from "@/components/dashboard/seller-application"
import { SellerOrdersDashboard } from "@/components/seller/seller-orders-dashboard"
import { WalletCard } from "@/components/wallet-card" // Import WalletCard

export default async function SellerDashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Check if user is verified seller
  const isVerifiedSeller = profile?.is_seller_verified === true

  // If not a verified seller, redirect to application page
  if (!isVerifiedSeller) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Portal de Vendedor</h2>
          <p className="text-muted-foreground">Solicita convertirte en vendedor de Crisol TCG</p>
        </div>
        <SellerApplication profile={profile} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard de Vendedor</h2>
          <p className="text-muted-foreground">Administra tus órdenes y ventas</p>
        </div>
        <div className="w-full md:w-auto min-w-[300px]">
          <WalletCard balance={profile?.wallet_balance || 0} /> {/* Added WalletCard to seller dashboard */}
        </div>
      </div>
      <SellerOrdersDashboard profile={profile} />
    </div>
  )
}
