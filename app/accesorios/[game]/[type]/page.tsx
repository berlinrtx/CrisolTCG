import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { accesoriosGames, accessoryTypes } from "@/lib/categories"
import { notFound } from "next/navigation"
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

export default function AccesoriosTypePage({ params }: { params: { game: string; type: string } }) {
  const game = accesoriosGames.find((g) => g.slug === params.game)
  const accessoryType = accessoryTypes.find((t) => t.slug === params.type)

  if (!game || !accessoryType) {
    notFound()
  }

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
                <BreadcrumbLink href={`/accesorios/${params.game}`}>{game.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{accessoryType.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-4xl font-bold mb-2">
            {accessoryType.name} de {game.name}
          </h1>
          <p className="text-muted-foreground mb-8">
            Explora nuestra selección de {accessoryType.name.toLowerCase()} para {game.name}
          </p>

          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-64 flex-shrink-0">
              <CategoryFilters subcategoryType="accesorios" selectedAccessoryType={params.type} />
            </aside>
            <div className="flex-1">
              <ProductGrid game={params.game} subcategory="accesorios" accessoryType={params.type} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
