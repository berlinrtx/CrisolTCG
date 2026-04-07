import InventoryPage from "@/components/ui/inventory-Page"

export default function Page() {
      console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)

  return <InventoryPage />
}