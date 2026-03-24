import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { accesoriosGames, getAccessoryTypesForGame } from "@/lib/categories"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { CategoryFilters } from "@/components/category/category-filters"
import { ProductGrid } from "@/components/category/product-grid"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Package } from "lucide-react"

export default function AccesoriosGamePage({ params }: { params: { game: string } }) {
  const game = accesoriosGames.find((g) => g.slug === params.game)

  if (!game) {
    notFound()
  }

  const gameAccessoryTypes = getAccessoryTypesForGame(params.game)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/accesorios">Accesorios</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{game.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-4xl font-bold mb-2">Accesorios de {game.name}</h1>
          <p className="text-muted-foreground mb-8">
            Encuentra playmats, binders, sleeves, dados, pins y más para {game.name}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {gameAccessoryTypes.map((type) => (
              <Link key={type.id} href={`/accesorios/${params.game}/${type.slug}`}>
                <Card className="rounded-2xl hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="mb-3 flex justify-center">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm">{type.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-64 flex-shrink-0">
              <CategoryFilters subcategoryType="accesorios" />
            </aside>
            <div className="flex-1">
              <ProductGrid game={params.game} subcategory="accesorios" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
