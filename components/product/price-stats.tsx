import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Activity } from "lucide-react"

interface PriceStatsProps {
  stats: {
    marketPrice: number
    mostRecentSale: number
    volatility: "low" | "medium" | "high" | "indeterminate"
    listedMedian: number
    currentQuantity: number
    currentSellers: number
    lowestListing: number
    averageListing: number
    sellerCount: number
    lastSalePrice: number
    highestSalePrice: number
    lowestSalePrice: number
    monthSnapshot: {
      lowSalePrice: number
      highSalePrice: number
      totalSold: number
      avgDailySold: number
    }
  }
}

export function PriceStats({ stats }: PriceStatsProps) {
  const getVolatilityColor = (volatility: string) => {
    switch (volatility) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const getVolatilityText = (volatility: string) => {
    switch (volatility) {
      case "low":
        return "Baja Volatilidad"
      case "medium":
        return "Volatilidad Media"
      case "high":
        return "Alta Volatilidad"
      default:
        return "Volatilidad Indeterminada"
    }
  }

  return (
    <Card className="rounded-2xl shadow-custom-lg" style={{ borderColor: "rgba(24, 20, 53, 0.2)" }}>
      <CardHeader>
        <CardTitle className="text-2xl">Price Points</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Market Price - Main highlight */}
        <div className="rounded-2xl p-5 text-center border-2 bg-card border-primary/20">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide mb-2 text-muted-foreground">
            <span>Precio de Mercado</span>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-primary">Q{stats.marketPrice}</div>
        </div>

        {/* Most Recent Sale */}
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Venta Más Reciente</span>
          <span className="text-xl font-bold text-foreground">Q{stats.mostRecentSale}</span>
        </div>

        <Separator />

        {/* Volatility Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-2">
              <Activity className="w-4 h-4" />
              {getVolatilityText(stats.volatility)}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${getVolatilityColor(stats.volatility)} transition-all duration-300`}
              style={{ width: stats.volatility === "low" ? "33%" : stats.volatility === "medium" ? "66%" : "100%" }}
            />
          </div>
        </div>

        <Separator />

        {/* Listed Median */}
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Mediana Listados:</span>
          <span className="text-xl font-bold text-foreground">Q{stats.listedMedian}</span>
        </div>

        <Separator />

        {/* Price Range - High, Low, Average */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Precio Más Alto:</span>
            <span className="text-lg text-foreground font-normal">Q{stats.monthSnapshot.highSalePrice}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Precio Más Bajo:</span>
            <span className="text-lg text-foreground font-normal">Q{stats.monthSnapshot.lowSalePrice}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Precio Promedio:</span>
            <span className="text-lg text-foreground font-normal">Q{stats.averageListing}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
