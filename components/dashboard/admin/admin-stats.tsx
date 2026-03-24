import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Package, DollarSign } from "lucide-react"

// Mock data - will be replaced with Supabase data
const mockStats = {
  totalUsers: 1247,
  usersChange: 8.2,
  totalProducts: 3456,
  productsChange: 12.5,
  totalSellers: 89,
  sellersChange: 5.3,
  totalRevenue: 45780,
  revenueChange: 15.7,
}

export function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Users */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Usuarios</p>
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold mb-1">{mockStats.totalUsers.toLocaleString()}</p>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-green-500">+{mockStats.usersChange}%</span>
            <span className="text-muted-foreground">este mes</span>
          </div>
        </CardContent>
      </Card>

      {/* Total Products */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Productos</p>
            <Package className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold mb-1">{mockStats.totalProducts.toLocaleString()}</p>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-green-500">+{mockStats.productsChange}%</span>
            <span className="text-muted-foreground">este mes</span>
          </div>
        </CardContent>
      </Card>

      {/* Total Sellers */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Vendedores Activos</p>
            <Users className="h-5 w-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold mb-1">{mockStats.totalSellers}</p>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-green-500">+{mockStats.sellersChange}%</span>
            <span className="text-muted-foreground">este mes</span>
          </div>
        </CardContent>
      </Card>

      {/* Total Revenue */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Ingresos Totales</p>
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold mb-1">Q{mockStats.totalRevenue.toLocaleString()}</p>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-green-500">+{mockStats.revenueChange}%</span>
            <span className="text-muted-foreground">este mes</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
