import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { categories } from "@/lib/categories"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

export default function GamePage({ params }: { params: { game: string } }) {
  const category = categories.find((cat) => cat.slug === params.game)

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
          <p className="text-muted-foreground mb-8">Explora todas las categorías de {category.name}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {category.subcategories?.map((sub) => (
              <Link key={sub.id} href={`/${category.slug}/${sub.slug}`}>
                <Card className="hover:shadow-lg transition-all cursor-pointer rounded-2xl group">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{sub.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {sub.slug === "singles"
                          ? "Cartas individuales"
                          : sub.slug === "sellado"
                            ? "Productos sellados"
                            : "Accesorios del juego"}
                      </p>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
