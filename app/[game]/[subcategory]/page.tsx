import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { categories } from "@/lib/categories"
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

export default function SubcategoryPage({ params }: { params: { game: string; subcategory: string } }) {
  const category = categories.find((cat) => cat.slug === params.game)
  const subcategory = category?.subcategories?.find((sub) => sub.slug === params.subcategory)

  if (!category || !subcategory) {
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
                <BreadcrumbLink href={`/${category.slug}`}>{category.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{subcategory.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-4xl font-bold mb-2">
            {category.name} - {subcategory.name}
          </h1>
          <p className="text-muted-foreground mb-8">
            {subcategory.slug === "singles"
              ? "Encuentra cartas individuales de todos los sets"
              : subcategory.slug === "sellado"
                ? "Productos sellados: boosters, cajas, mazos y más"
                : "Accesorios para proteger y organizar tu colección"}
          </p>

          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-64 flex-shrink-0">
              <CategoryFilters subcategoryType={params.subcategory} />
            </aside>
            <div className="flex-1">
              <ProductGrid game={params.game} subcategory={params.subcategory} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
