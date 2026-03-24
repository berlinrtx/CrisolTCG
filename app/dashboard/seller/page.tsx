import { redirect } from 'next/navigation'
import { createClient } from "@/lib/supabase/server"
import { SellerApplication } from "@/components/dashboard/seller-application"
import { SellerDashboardContent } from "@/components/dashboard/seller-dashboard-content"

export default async function SellerPortalPage() {
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

  redirect("/seller/dashboard")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Portal de Vendedor</h2>
        <p className="text-muted-foreground">
          {isVerifiedSeller ? "Administra tu tienda y productos" : "Solicita convertirte en vendedor de Crisol TCG"}
        </p>
      </div>

      {isVerifiedSeller ? <SellerDashboardContent profile={profile} /> : <SellerApplication profile={profile} />}
    </div>
  )
}
