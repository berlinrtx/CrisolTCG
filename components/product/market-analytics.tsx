"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, Package } from "lucide-react"

interface MarketAnalyticsProps {
  marketPrice: number
  marketPriceTrend: number // percentage change
  listedMedian: number
  availableUnits: number
  sellerCount: number
  mostRecentSale: number
}

export function MarketAnalytics({
  marketPrice,
  marketPriceTrend,
  listedMedian,
  availableUnits,
  sellerCount,
  mostRecentSale,
}: MarketAnalyticsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Análisis de Mercado</h2>

      <div className="grid grid-cols-1 gap-4">
        {/* Market Price - Main indicator */}
        <Card className="rounded-2xl border-2 border-green-500/20 bg-green-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Precio de Mercado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-green-600">Q{marketPrice.toFixed(2)}</p>
              <div className="flex items-center gap-1 text-sm">
                {marketPriceTrend >= 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-green-600">+{marketPriceTrend}%</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span className="text-red-600">{marketPriceTrend}%</span>
                  </>
                )}
                <span className="text-muted-foreground">vs. mes anterior</span>
              </div>
              <p className="text-xs text-muted-foreground">Promedio de ventas completadas</p>
            </div>
          </CardContent>
        </Card>

        {/* Listed Median */}
        <Card className="rounded-2xl border-2 border-blue-500/20 bg-blue-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              Mediana Listada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-blue-600">Q{listedMedian.toFixed(2)}</p>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Package className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-medium">{availableUnits}</span>
                  <span className="text-muted-foreground">unidades</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-medium">{sellerCount}</span>
                <span className="text-muted-foreground">vendedores</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Most Recent Sale */}
        <Card className="rounded-2xl border-2 border-purple-500/20 bg-purple-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              Venta Más Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-purple-600">Q{mostRecentSale.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">Última transacción completada</p>
              <Badge variant="outline" className="text-xs">
                Hace 2 días
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
