import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdminStats } from "@/components/dashboard/admin/admin-stats"
import { CatalogManager } from "@/components/dashboard/admin/catalog-manager"
import { BannerManager } from "@/components/dashboard/admin/banner-manager"
import { UserManager } from "@/components/dashboard/admin/user-manager"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutGrid, ImageIcon, Users, Settings } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">
              Gestiona el catálogo, banners, usuarios y configuración del marketplace
            </p>
          </div>

          {/* Stats Overview */}
          <AdminStats />

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="catalog" className="mt-8">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl">
              <TabsTrigger value="catalog" className="gap-2">
                <LayoutGrid className="h-4 w-4" />
                Catálogo
              </TabsTrigger>
              <TabsTrigger value="banners" className="gap-2">
                <ImageIcon className="h-4 w-4" />
                Banners
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" />
                Usuarios
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" />
                Configuración
              </TabsTrigger>
            </TabsList>

            <TabsContent value="catalog" className="mt-6">
              <CatalogManager />
            </TabsContent>

            <TabsContent value="banners" className="mt-6">
              <BannerManager />
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <UserManager />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="text-center py-12">
                <Settings className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Configuración Próximamente</h3>
                <p className="text-muted-foreground">
                  Las opciones de configuración avanzada estarán disponibles pronto
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
