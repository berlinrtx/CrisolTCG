"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface Banner {
  id: string
  title: string
  image_url: string
  link_url: string
  active: boolean
  position: number
}

// Mock data - will be replaced with Supabase data
const mockBanners: Banner[] = [
  {
    id: "1",
    title: "Nuevas Cartas de Pokémon",
    image_url: "/pokemon-trading-cards-banner-colorful.jpg",
    link_url: "/catalog?tcg=pokemon",
    active: true,
    position: 1,
  },
  {
    id: "2",
    title: "Yu-Gi-Oh! Edición Especial",
    image_url: "/yugioh-trading-cards-banner-dark-mystical.jpg",
    link_url: "/catalog?tcg=yugioh",
    active: true,
    position: 2,
  },
  {
    id: "3",
    title: "Magic: The Gathering",
    image_url: "/magic-the-gathering-cards-banner-fantasy.jpg",
    link_url: "/catalog?tcg=magic",
    active: true,
    position: 3,
  },
]

export function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [banners] = useState<Banner[]>(mockBanners)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [banners.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  if (banners.length === 0) return null

  return (
    <div className="relative w-full h-[450px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Link href={banners[currentIndex].link_url}>
            <div className="relative w-full h-full">
              <Image
                src={banners[currentIndex].image_url || "/placeholder.svg"}
                alt={banners[currentIndex].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-3xl md:text-5xl font-bold text-balance">{banners[currentIndex].title}</h2>
              </div>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 hover:scale-125 ${index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
