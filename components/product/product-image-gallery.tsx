"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductImageGalleryProps {
  images: string[]
  name: string
}

export function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="border rounded-2xl bg-card shadow-custom overflow-hidden sticky top-32">
      <div className="p-2">
        <div className="relative aspect-[1/1] mb-1.5 bg-muted rounded-xl overflow-hidden">
          <Image
            src={images[selectedImage] || "/placeholder.svg"}
            alt={`${name} - Image ${selectedImage + 1}`}
            fill
            className="object-contain p-1"
            priority
          />
        </div>

        <div className="grid grid-cols-4 gap-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-[1/1] rounded-lg overflow-hidden border-2 transition-all hover:scale-105 hover:shadow-custom ${
                selectedImage === index ? "border-primary shadow-custom" : "border-border"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                className="object-contain p-0.5"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
