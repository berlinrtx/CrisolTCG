import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, CheckCircle, Clock } from "lucide-react"

export function OrdersStats() {
  const stats = [
    {
      title: "Pendientes",
      value: "2",
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      title: "En Proceso",
      value: "1",
      icon: Package,
      color: "text-blue-500",
    },
    {
      title: "En Camino",
      value: "1",
      icon: Truck,
      color: "text-primary",
    },
    {
      title: "Completadas",
      value: "12",
      icon: CheckCircle,
      color: "text-green-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
