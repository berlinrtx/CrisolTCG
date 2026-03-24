"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface PriceHistogramProps {
  data: Array<{ date: string; price: number; volume: number }>
  productName: string
}

type TimePeriod = "1M" | "3M" | "6M" | "1Y"

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null

  const data = payload[0].payload
  const price = data.price
  const date = data.date

  const priceMin = (price * 0.8).toFixed(2)
  const priceMax = (price * 1.2).toFixed(2)

  return (
    <div className="bg-background border border-border rounded-2xl shadow-custom-lg p-4 min-w-[180px] z-50">
      <div className="text-sm font-medium text-muted-foreground mb-2">{date}</div>
      <div className="text-3xl font-bold text-[#f79b27] mb-2">Q{price.toFixed(2)}</div>
      <div className="text-sm text-muted-foreground">
        Q{priceMin} - Q{priceMax}
      </div>
    </div>
  )
}

export function PriceHistogram({ data, productName }: PriceHistogramProps) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("3M")

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return []

    // Parse dates and add to data (assuming current year for dates without year)
    const currentYear = new Date().getFullYear()
    const dataWithDates = data.map((item) => {
      const [month, day] = item.date.split("/").map(Number)
      const date = new Date(currentYear, month - 1, day)
      return { ...item, parsedDate: date }
    })

    // Sort by date
    dataWithDates.sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime())

    // Calculate cutoff date based on time period
    const now = new Date()
    const daysToSubtract = {
      "1M": 30,
      "3M": 90,
      "6M": 180,
      "1Y": 365,
    }[timePeriod]

    const cutoffDate = new Date(now)
    cutoffDate.setDate(cutoffDate.getDate() - daysToSubtract)

    // Filter data based on cutoff date
    const filtered = dataWithDates.filter((item) => item.parsedDate >= cutoffDate)

    // If no data in range, show all data
    if (filtered.length === 0) return data

    // Return original format without parsedDate
    return filtered.map(({ parsedDate, ...rest }) => rest)
  }, [data, timePeriod])

  const xAxisTicks = useMemo(() => {
    const tickCounts = {
      "1M": 4,
      "3M": 6,
      "6M": 6,
      "1Y": 12,
    }
    return tickCounts[timePeriod]
  }, [timePeriod])

  const { yMin, yMax } = useMemo(() => {
    if (filteredData.length === 0) return { yMin: 0, yMax: 100 }

    const prices = filteredData.map((d) => d.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    return {
      yMin: Math.floor(minPrice * 0.9),
      yMax: Math.ceil(maxPrice * 1.1),
    }
  }, [filteredData])

  return (
    <div className="border border-border rounded-2xl bg-card shadow-custom">
      <div className="p-4 md:p-6 mb-4">
        <h3 className="text-lg md:text-xl font-semibold">Historial de Precios</h3>
      </div>

      <div className="px-4 md:px-6 pb-4 md:pb-6">
        <div className="flex items-center justify-center gap-2 mb-2 text-xs md:text-sm">
          <div className="w-8 h-0.5 bg-[#f79b27]" />
          <span className="text-muted-foreground">Precio</span>
        </div>

        <ResponsiveContainer width="100%" height={300} className="md:h-[400px]">
          <LineChart
            data={filteredData}
            margin={{
              left: 0,
              right: 8,
              top: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10 }}
              className="md:text-[11px]"
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis
              domain={[yMin, yMax]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10 }}
              className="md:text-[11px]"
              tickFormatter={(value) => `Q${value}`}
            />
            <Tooltip
              cursor={{ stroke: "#000", strokeWidth: 1, strokeDasharray: "5 5" }}
              content={<CustomTooltip />}
              wrapperStyle={{ zIndex: 1000 }}
            />
            <Line
              dataKey="price"
              type="monotone"
              stroke="#f79b27"
              strokeWidth={2}
              dot={{
                fill: "#f79b27",
                r: 3,
                strokeWidth: 2,
                stroke: "hsl(var(--background))",
              }}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                stroke: "hsl(var(--background))",
              }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="flex justify-center gap-2 mt-4">
          {(["1M", "3M", "6M", "1Y"] as TimePeriod[]).map((period) => (
            <Button
              key={period}
              variant={timePeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setTimePeriod(period)}
              className="rounded-2xl min-w-[60px]"
            >
              {period}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
