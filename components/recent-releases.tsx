import Image from "next/image"
import Link from "next/link"

const releases = [
  {
    id: 1,
    name: "Surging Sparks",
    image: "/pokemon-surging-sparks-set-banner.jpg",
    href: "/pokemon/surging-sparks",
  },
  {
    id: 2,
    name: "Stellar Crown",
    image: "/pokemon-stellar-crown-set-banner.jpg",
    href: "/pokemon/stellar-crown",
  },
  {
    id: 3,
    name: "Shrouded Fable",
    image: "/pokemon-shrouded-fable-set-banner.jpg",
    href: "/pokemon/shrouded-fable",
  },
  {
    id: 4,
    name: "Twilight Masquerade",
    image: "/pokemon-twilight-masquerade-set-banner.jpg",
    href: "/pokemon/twilight-masquerade",
  },
  {
    id: 5,
    name: "Temporal Forces",
    image: "/pokemon-temporal-forces-set-banner.jpg",
    href: "/pokemon/temporal-forces",
  },
  {
    id: 6,
    name: "Paldean Fates",
    image: "/pokemon-paldean-fates-set-banner.jpg",
    href: "/pokemon/paldean-fates",
  },
  {
    id: 7,
    name: "Obsidian Flames",
    image: "/pokemon-obsidian-flames-set-banner.jpg",
    href: "/pokemon/obsidian-flames",
  },
]

export function RecentReleases() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#181435] to-[#6B46C1] bg-clip-text text-transparent text-left">
        Lanzamientos Recientes
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          {releases.slice(0, 3).map((release) => (
            <Link
              key={release.id}
              href={release.href}
              className="group relative overflow-hidden rounded-2xl shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className="aspect-[4.4/1] relative bg-gradient-to-r from-gray-900 to-gray-800">
                <Image
                  src={release.image || "/placeholder.svg"}
                  alt={release.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {releases.slice(3, 6).map((release) => (
            <Link
              key={release.id}
              href={release.href}
              className="group relative overflow-hidden rounded-2xl shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className="aspect-[4.4/1] relative bg-gradient-to-r from-gray-900 to-gray-800">
                <Image
                  src={release.image || "/placeholder.svg"}
                  alt={release.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
