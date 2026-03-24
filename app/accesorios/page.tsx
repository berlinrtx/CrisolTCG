import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { accesoriosGames } from "@/lib/categories"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Flame, Zap, Crown } from "lucide-react"

const gameIcons = {
  yugioh: Flame,
  magic: Zap,
  pokemon: Sparkles,
  onepeace: Crown,
}

const gameColors = {
  yugioh: "bg-purple-500",
  magic: "bg-blue-500",
  pokemon: "bg-yellow-500",
  onepeace: "bg-red-500",
}

export default function AccesoriosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">Accesorios</h1>
          <p className="text-muted-foreground mb-8">
            Encuentra accesorios para proteger y organizar tu colección de cartas
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accesoriosGames.map((game) => {
              const Icon = gameIcons[game.slug as keyof typeof gameIcons]
              const colorClass = gameColors[game.slug as keyof typeof gameColors]

              return (
                <Link key={game.id} href={`/accesorios/${game.slug}`}>
                  <Card className="hover:shadow-lg transition-all cursor-pointer rounded-2xl group">
                    <CardContent className="p-6 flex flex-col items-center gap-4">
                      <div className={`${colorClass} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg">{game.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
