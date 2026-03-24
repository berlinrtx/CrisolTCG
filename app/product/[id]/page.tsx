import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductImageGallery } from "@/components/product/product-image-gallery"
import { ProductSpecs } from "@/components/product/product-specs"
import { PriceHistoryChart } from "@/components/product/price-history-chart"
import { PriceStats } from "@/components/product/price-stats"
import { SellerListingsTable } from "@/components/product/seller-listings-table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Mock product data - will be replaced with Supabase data
const mockProduct = {
  id: "1",
  name: "Charizard VMAX",
  tcg: "Pokémon",
  set_name: "Darkness Ablaze",
  set_number: "020/189",
  rarity: "Secret Rare",
  card_type: "Fire",
  images: ["/charizard-pokemon-card.png", "/charizard-pokemon-card.png", "/charizard-pokemon-card.png"],
  min_price: 450,
  max_price: 650,
  seller_count: 5,
  description:
    "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards.\n\n[Ability] Charizard's Flame: Once during your turn, you may attach a Fire Energy card from your discard pile to this Pokémon.\n\n[Attack] G-Max Wildfire (2 Fire Energy, 1 Colorless Energy): 300 damage. Discard 2 Energy from this Pokémon.\n\nHP: 330\nWeakness: Water (×2)\nRetreat Cost: 3",
}

// Mock seller listings
const mockListings = [
  {
    id: "1",
    seller_id: "s1",
    seller_name: "CardMaster GT",
    seller_avatar_url: "/seller-avatar.png",
    price: 450,
    condition: "Near Mint",
    quantity: 2,
    rating: 4.9,
    reviews_count: 127,
    response_time: "< 1 hora",
    shipping_cost: 25,
    seller_location: "Ciudad de Guatemala",
    is_verified: true,
  },
  {
    id: "2",
    seller_id: "s2",
    seller_name: "TCG Collectors",
    seller_avatar_url: "/seller-avatar-2.jpg",
    price: 480,
    condition: "Mint",
    quantity: 1,
    rating: 4.8,
    reviews_count: 89,
    response_time: "< 2 horas",
    shipping_cost: 30,
    seller_location: "Antigua Guatemala",
    is_verified: true,
  },
  {
    id: "3",
    seller_id: "s3",
    seller_name: "Pokémon Paradise",
    seller_avatar_url: "/seller-avatar-3.jpg",
    price: 520,
    condition: "Near Mint",
    quantity: 3,
    rating: 4.7,
    reviews_count: 56,
    response_time: "< 3 horas",
    shipping_cost: 25,
    seller_location: "Quetzaltenango",
    is_verified: false,
  },
  {
    id: "4",
    seller_id: "s4",
    seller_name: "Elite Cards GT",
    seller_avatar_url: "/seller-avatar-4.jpg",
    price: 580,
    condition: "Mint",
    quantity: 1,
    rating: 5.0,
    reviews_count: 203,
    response_time: "< 30 min",
    shipping_cost: 35,
    seller_location: "Ciudad de Guatemala",
    is_verified: true,
  },
  {
    id: "5",
    seller_id: "s5",
    seller_name: "Cards & More",
    seller_avatar_url: "/seller-avatar-5.jpg",
    price: 650,
    condition: "Gem Mint",
    quantity: 1,
    rating: 4.6,
    reviews_count: 34,
    response_time: "< 4 horas",
    shipping_cost: 25,
    seller_location: "Escuintla",
    is_verified: false,
  },
]

// Mock price history with dynamic scaling
const mockPriceHistory = [
  { date: "7/31", price: 420, volume: 12 },
  { date: "8/3", price: 425, volume: 8 },
  { date: "8/7", price: 430, volume: 15 },
  { date: "8/10", price: 435, volume: 10 },
  { date: "8/14", price: 440, volume: 18 },
  { date: "8/17", price: 445, volume: 22 },
  { date: "8/21", price: 455, volume: 7 },
  { date: "8/24", price: 460, volume: 9 },
  { date: "8/28", price: 470, volume: 6 },
  { date: "8/31", price: 475, volume: 5 },
  { date: "9/4", price: 465, volume: 11 },
  { date: "9/7", price: 455, volume: 13 },
  { date: "9/11", price: 450, volume: 14 },
  { date: "9/14", price: 460, volume: 9 },
  { date: "9/17", price: 470, volume: 8 },
  { date: "9/21", price: 465, volume: 16 },
  { date: "9/24", price: 460, volume: 12 },
  { date: "9/28", price: 455, volume: 19 },
  { date: "10/1", price: 450, volume: 14 },
  { date: "10/4", price: 445, volume: 11 },
  { date: "10/8", price: 455, volume: 10 },
  { date: "10/11", price: 465, volume: 8 },
  { date: "10/15", price: 475, volume: 7 },
  { date: "10/18", price: 480, volume: 6 },
  { date: "10/22", price: 478, volume: 5 },
  { date: "10/25", price: 485, volume: 4 },
]

// Mock price statistics
const mockPriceStats = {
  marketPrice: 465,
  mostRecentSale: 475,
  volatility: "medium" as const,
  listedMedian: 500,
  currentQuantity: 316,
  currentSellers: 197,
  highestListing: 650,
  lowestListing: 450,
  averageListing: 516,
  sellerCount: 5,
  lastSalePrice: 475,
  highestSalePrice: 650,
  lowestSalePrice: 420,
  monthSnapshot: {
    lowSalePrice: 445,
    highSalePrice: 485,
    totalSold: 156,
    avgDailySold: 5,
    avgSalePrice: 465,
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/catalog">Catálogo</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${mockProduct.tcg.toLowerCase()}`}>{mockProduct.tcg}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{mockProduct.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Top Section: Image + Right Column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {/* Left: Card Image */}
            <div className="lg:col-span-1">
              <ProductImageGallery images={mockProduct.images} name={mockProduct.name} />
            </div>

            {/* Right Column: Product Specs */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* Product Specifications */}
              <ProductSpecs product={mockProduct} currentQuantity={mockPriceStats.currentQuantity} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Price History Chart - Bar chart with average prices */}
                <PriceHistoryChart condition="Near Mint" currentPrice={mockPriceStats.marketPrice} priceChange={2.3} />

                {/* Price Stats - Consolidated TCGPlayer-style metrics */}
                <PriceStats stats={mockPriceStats} />
              </div>
            </div>
          </div>

          {/* Bottom Section: Seller Listings Table */}
          <SellerListingsTable listings={mockListings} productName={mockProduct.name} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
