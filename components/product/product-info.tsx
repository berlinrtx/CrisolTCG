interface Product {
  id: string
  name: string
  tcg: string
  set_name: string
  set_number: string
  rarity: string
  card_type: string
  description: string
}

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-6">
      {/* Title and Set Info */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-balance">{product.name}</h1>
        <p className="text-muted-foreground text-lg">
          {product.set_name} ({product.set_number})
        </p>
      </div>
    </div>
  )
}
