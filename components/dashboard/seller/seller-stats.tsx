import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingBag, Star } from "lucide-react"

// Mock data - will be replaced with Supabase data
const mockStats = {
  totalRevenue: 12450,
  revenueChange: 12.5,
  activeListings: 47,
  listingsChange: -3,
  pendingOrders: 8,
  ordersChange: 25,
  averageRating: 4.8,
  ratingChange: 0.2,
}

export function SellerStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Revenue */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Ingresos Totales</p>
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold mb-1">Q{mockStats.totalRevenue.toLocaleString()}</p>
          <div className="flex items-center gap-1 text-sm">
            {mockStats.revenueChange > 0 ? (
              <>
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500">+{mockStats.revenueChange}%</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-red-500">{mockStats.revenueChange}%</span>
              </>
            )}
            <span className="text-muted-foreground">vs mes anterior</span>
          </div>
        </CardContent>
      </Card>

      {/* Active Listings */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Publicaciones Activas</p>
            <Package className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold mb-1">{mockStats.activeListings}</p>
          <div className="flex items-center gap-1 text-sm">
            {mockStats.listingsChange > 0 ? (
              <>
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500">+{mockStats.listingsChange}</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-red-500">{mockStats.listingsChange}</span>
              </>
            )}
            <span className="text-muted-foreground">esta semana</span>
          </div>
        </CardContent>
      </Card>

      {/* Pending Orders */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Pedidos Pendientes</p>
            <ShoppingBag className="h-5 w-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold mb-1">{mockStats.pendingOrders}</p>
          <div className="flex items-center gap-1 text-sm">
            {mockStats.ordersChange > 0 ? (
              <>
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500">+{mockStats.ordersChange}%</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-red-500">{mockStats.ordersChange}%</span>
              </>
            )}
            <span className="text-muted-foreground">vs semana anterior</span>
          </div>
        </CardContent>
      </Card>

      {/* Average Rating */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Calificación Promedio</p>
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-3xl font-bold mb-1">{mockStats.averageRating}</p>
          <div className="flex items-center gap-1 text-sm">
            {mockStats.ratingChange > 0 ? (
              <>
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500">+{mockStats.ratingChange}</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-red-500">{mockStats.ratingChange}</span>
              </>
            )}
            <span className="text-muted-foreground">este mes</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
