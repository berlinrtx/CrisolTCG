import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "../lib/categories"

export function CategoryGrid() {
  return (
    <section className="py-12 pt-2">
      <div className="container mx-auto px-4">
        <h2 className="font-bold mb-8 text-balance text-left text-5xl bg-gradient-to-r from-[#181435] to-[#6B46C1] bg-clip-text text-transparent">
          Explora por Juego
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="hover:shadow-custom-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer rounded-2xl overflow-hidden group">
                  <CardContent className="p-6 flex flex-col items-center gap-4">
                    <div
                      className={`${category.color} p-4 rounded-2xl group-hover:scale-110 transition-all duration-300`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
