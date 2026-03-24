"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PriceHistoryChartProps {
  condition: string
  currentPrice: number
  priceChange: number
}

export function PriceHistoryChart({ condition, currentPrice, priceChange }: PriceHistoryChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<"1M" | "3M" | "6M" | "12M">("1M")

  const chartData = useMemo(() => {
    const now = new Date()
    const data = []

    switch (selectedPeriod) {
      case "1M":
        // 12 bars, each bar = average of 1 month
        for (let i = 11; i >= 0; i--) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
          const monthName = date.toLocaleDateString("es-ES", { month: "short" })
          data.push({
            id: `1m-${i}`,
            period: monthName.charAt(0).toUpperCase() + monthName.slice(1),
            avgPrice: 430 + Math.random() * 50,
            month: date.getMonth() + 1,
          })
        }
        break

      case "3M":
        // 12 bars, each bar = average of 3 months (last 36 months)
        for (let i = 11; i >= 0; i--) {
          const endMonth = new Date(now.getFullYear(), now.getMonth() - i * 3, 1)
          const startMonth = new Date(endMonth.getFullYear(), endMonth.getMonth() - 2, 1)
          const label = `${startMonth.toLocaleDateString("es-ES", { month: "short" })}-${endMonth.toLocaleDateString("es-ES", { month: "short" })}`
          data.push({
            id: `3m-${i}`,
            period: label.charAt(0).toUpperCase() + label.slice(1),
            avgPrice: 430 + Math.random() * 50,
            month: endMonth.getMonth() + 1,
          })
        }
        break

      case "6M":
        // 12 bars, each bar = average of 6 months (last 72 months / 6 years)
        for (let i = 11; i >= 0; i--) {
          const endMonth = new Date(now.getFullYear(), now.getMonth() - i * 6, 1)
          const startMonth = new Date(endMonth.getFullYear(), endMonth.getMonth() - 5, 1)
          const label = `${startMonth.toLocaleDateString("es-ES", { month: "short" })}-${endMonth.toLocaleDateString("es-ES", { month: "short" })}`
          data.push({
            id: `6m-${i}`,
            period: label.charAt(0).toUpperCase() + label.slice(1),
            avgPrice: 420 + Math.random() * 60,
            month: endMonth.getMonth() + 1,
          })
        }
        break

      case "12M":
        // 12 bars, each bar = average of 12 months (last 144 months / 12 years)
        for (let i = 11; i >= 0; i--) {
          const year = now.getFullYear() - i
          data.push({
            id: `12m-${i}`,
            period: year.toString(),
            avgPrice: 400 + Math.random() * 80,
            month: 12,
          })
        }
        break
    }

    return data
  }, [selectedPeriod])

  const yAxisDomain = useMemo(() => {
    const prices = chartData.map((d) => d.avgPrice)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    // Start Y-axis at 85% of minimum value to show variation better
    // Add 15% padding above maximum for visual space
    const yMin = Math.floor(minPrice * 0.85)
    const yMax = Math.ceil(maxPrice * 1.15)

    return [yMin, yMax]
  }, [chartData])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-custom-lg">
          <p className="text-sm font-medium mb-1">{payload[0].payload.period}</p>
          <p className="text-sm font-bold" style={{ color: "#17AFEB" }}>
            Q{payload[0].payload.avgPrice.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">Precio Promedio</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="rounded-2xl shadow-custom-lg" style={{ borderColor: "rgba(24, 20, 53, 0.2)" }}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <TrendingUp className="h-5 w-5" style={{ color: "#181435" }} />
          <div>
            <CardTitle className="text-lg">Precio Promedio Mensual</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{condition}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              onMouseMove={(state) => {
                if (state.isTooltipActive) {
                  setHoveredIndex(state.activeTooltipIndex ?? null)
                } else {
                  setHoveredIndex(null)
                }
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" vertical={false} />
              <XAxis
                dataKey="period"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value) => `Q${value}`}
                tickLine={false}
                axisLine={false}
                domain={yAxisDomain}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(23, 175, 235, 0.05)" }} />
              <Bar dataKey="avgPrice" radius={[8, 8, 0, 0]} fill="#17AFEB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-2 justify-center mt-4">
          {(["1M", "3M", "6M", "12M"] as const).map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className="h-8 px-3 text-xs transition-all duration-300 hover:scale-105 active:scale-95"
              style={
                selectedPeriod === period
                  ? { backgroundColor: "#181435", borderColor: "#181435" }
                  : { borderColor: "rgba(24, 20, 53, 0.3)" }
              }
            >
              {period}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
