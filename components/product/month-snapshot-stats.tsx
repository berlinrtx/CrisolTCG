import { Crown, TrendingUp, TrendingDown } from "lucide-react"

interface MonthSnapshotStatsProps {
  monthSnapshot: {
    lowSalePrice: number
    highSalePrice: number
    totalSold: number
    avgSalePrice: number
  }
}

export function MonthSnapshotStats({ monthSnapshot }: MonthSnapshotStatsProps) {
  return (
    <div
      className="border-2 rounded-3xl bg-gradient-to-br from-card to-primary/5 shadow-custom-lg overflow-hidden h-full"
      style={{ borderColor: "rgba(24, 20, 53, 0.2)" }}
    >
      <div className="p-4 md:p-5" style={{ backgroundColor: "#181435" }}>
        <h3 className="text-lg md:text-xl font-bold text-primary-foreground text-center">Resumen del Mercado </h3>
      </div>

      <div className="p-5 md:p-6 space-y-3">
        {/* Average Price - Most prominent with both colors */}
        <div className="rounded-2xl p-5 text-center border-2 bg-card border-muted-foreground">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide mb-2">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-foreground">Precio de Mercado </span>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-primary">Q{monthSnapshot.avgSalePrice}</div>
        </div>

        {/* High and Low in grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* High Sale - Gold */}
          <div className="bg-accent/10 rounded-xl p-4 border-none">
            <div className="flex items-center gap-1 text-xs font-semibold text-accent uppercase tracking-wide mb-1">
              <TrendingUp className="w-3 h-3" />
              <span>Alta</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-foreground">Q{monthSnapshot.highSalePrice}</div>
          </div>

          {/* Low Sale - Purple */}
          <div className="bg-primary/10 rounded-xl p-4 border-none">
            <div className="flex items-center gap-1 text-xs font-semibold text-primary uppercase tracking-wide mb-1">
              <TrendingDown className="w-3 h-3" />
              <span>Baja</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-foreground">Q{monthSnapshot.lowSalePrice}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
