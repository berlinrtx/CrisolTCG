import { Header } from "@/components/header"
import { HeroBanner } from "@/components/hero-banner"
import { RecentReleases } from "@/components/recent-releases"
import { FeaturedCards } from "@/components/featured-cards"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"


export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <RecentReleases />
        <FeaturedCards />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  )
}
