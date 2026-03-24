import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface PriceStatisticsProps {
  marketPrice: number
  marketPriceTrend: number
  listedMedian: number
  availableUnits: number
  sellerCount: number
  mostRecentSale: number
}

export function PriceStatistics({
  marketPrice,
  marketPriceTrend,
  listedMedian,
  availableUnits,
  sellerCount,
  mostRecentSale,
}: PriceStatisticsProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-6 space-y-6">
        {/* Market Price */}
        <div className="pb-4 border-b">
          <div className="text-sm text-muted-foreground mb-1">Precio de Mercado</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">Q{marketPrice.toFixed(2)}</span>
            <div className="flex items-center gap-1">
              {marketPriceTrend >= 0 ? (
                <>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">+{marketPriceTrend}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium text-red-600">{marketPriceTrend}%</span>
                </>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Venta más reciente</p>
        </div>

        {/* Price Points */}
        <div>
          <h4 className="font-semibold mb-3">Puntos de Precio</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Mediana Listada:</span>
              <span className="font-semibold">Q{listedMedian.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Cantidad Actual:</span>
              <span className="font-semibold">{availableUnits}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Vendedores Actuales:</span>
              <span className="font-semibold">{sellerCount}</span>
            </div>
          </div>
        </div>

        {/* 3 Month Snapshot */}
        <div className="pt-4 border-t">
          <h4 className="font-semibold mb-3">Resumen de 3 Meses</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Precio Más Bajo:</div>
              <div className="font-semibold">Q{(marketPrice * 0.85).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Precio Más Alto:</div>
              <div className="font-semibold">Q{(marketPrice * 1.15).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Total Vendido:</div>
              <div className="font-semibold">342</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Promedio Diario:</div>
              <div className="font-semibold">3.8</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
