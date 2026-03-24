"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, ShoppingBag, BarChart3, Settings } from "lucide-react"
import { SellerStats } from "./seller/seller-stats"
import { SellerInventory } from "./seller/seller-inventory"
import { SellerOrders } from "./seller/seller-orders"
import { Card, CardContent } from "@/components/ui/card"

export function SellerDashboardContent({ profile }: { profile: any }) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold mb-2">Bienvenido, {profile.store_name || profile.first_name}!</h3>
          <p className="opacity-90">
            Tier: {profile.seller_tier?.toUpperCase() || "BASIC"} • Calificación: {profile.seller_rating || "N/A"} ⭐
          </p>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <SellerStats />

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inventory" className="gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Inventario</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Pedidos</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analíticas</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Ajustes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <SellerInventory />
        </TabsContent>

        <TabsContent value="orders">
          <SellerOrders />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analíticas Próximamente</h3>
              <p className="text-muted-foreground text-center">
                Las estadísticas detalladas y reportes estarán disponibles pronto
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Settings className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Configuración Próximamente</h3>
              <p className="text-muted-foreground text-center">
                Las opciones de configuración de tienda estarán disponibles pronto
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
