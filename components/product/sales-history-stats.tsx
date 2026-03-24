import { TrendingUp, TrendingDown, Zap } from "lucide-react"

interface SalesHistoryStatsProps {
  lastSalePrice: number
  highestSalePrice: number
  lowestSalePrice: number
}

export function SalesHistoryStats({ lastSalePrice, highestSalePrice, lowestSalePrice }: SalesHistoryStatsProps) {
  return (
    <div
      className="border-2 rounded-3xl bg-gradient-to-br from-card to-accent/5 shadow-custom-lg overflow-hidden h-full"
      style={{ borderColor: "rgba(24, 20, 53, 0.2)" }}
    >
      <div className="p-4 md:p-5 bg-muted-foreground">
        <h3 className="text-lg md:text-xl font-bold text-center text-background">Historial de Ventas</h3>
      </div>

      <div className="p-5 md:p-6 space-y-4">
        {/* Last Sale - Purple primary for emphasis */}
        <div className="bg-primary/15 rounded-2xl p-5 text-center border-2 border-primary/30 border-none">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-primary uppercase tracking-wide mb-2">
            <Zap className="w-4 h-4" />
            <span>Última Venta</span>
          </div>
          <div className="font-bold mb-1 text-foreground text-3xl">Q{lastSalePrice}</div>
          <div className="text-xs text-muted-foreground">Precio más reciente</div>
        </div>

        {/* High and Low Sales in grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Highest Sale - Gold */}
          <div className="bg-accent/10 rounded-xl p-4 text-center border-none">
            <TrendingUp className="w-5 h-5 mx-auto mb-2 text-accent" />
            <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">Más Alta</div>
            <div className="text-xl md:text-2xl font-bold text-foreground">Q{highestSalePrice}</div>
          </div>

          {/* Lowest Sale - Neutral */}
          <div className="bg-muted/50 rounded-xl p-4 text-center border border-muted-foreground/20 border-none">
            <TrendingDown className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">Más Baja</div>
            <div className="text-xl md:text-2xl font-bold text-foreground">Q{lowestSalePrice}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
