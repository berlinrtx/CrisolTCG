import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface CurrentListingsStatsProps {
  highestListing: number
  lowestListing: number
  averageListing: number
}

export function CurrentListingsStats({ highestListing, lowestListing, averageListing }: CurrentListingsStatsProps) {
  return (
    <div
      className="border-2 rounded-3xl bg-gradient-to-br from-card to-primary/5 shadow-custom-lg overflow-hidden h-full"
      style={{ borderColor: "rgba(24, 20, 53, 0.2)" }}
    >
      <div className="p-4 md:p-5 bg-muted-foreground">
        <h3 className="text-lg md:text-xl font-bold text-primary-foreground text-center">Listados Actuales</h3>
      </div>

      <div className="p-5 md:p-6 space-y-4">
        {/* Highest Listing - Gold accent */}
        <div className="bg-accent/10 rounded-2xl p-4 border-none">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wide mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Más Alto</span>
          </div>
          <div className="text-3xl font-bold text-foreground md:text-2xl">Q{highestListing}</div>
        </div>

        {/* Lowest Listing - Purple primary */}
        <div className="bg-primary/10 rounded-2xl p-4 border-l-4 border-primary border-none">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wide mb-1">
            <TrendingDown className="w-4 h-4" />
            <span>Más Bajo</span>
          </div>
          <div className="font-bold text-foreground text-2xl">Q{lowestListing}</div>
        </div>

        {/* Average Listing - Neutral */}
        <div className="bg-muted/50 rounded-2xl p-4 border-l-4 border-muted-foreground/30 border-none">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            <Minus className="w-4 h-4" />
            <span>Promedio</span>
          </div>
          <div className="font-bold text-3xl text-accent">Q{averageListing}</div>
        </div>
      </div>
    </div>
  )
}
