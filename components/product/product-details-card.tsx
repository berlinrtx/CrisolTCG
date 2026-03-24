import { Card, CardContent } from "@/components/ui/card"

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

interface ProductDetailsCardProps {
  product: Product
}

export function ProductDetailsCard({ product }: ProductDetailsCardProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-4">Detalles del Producto</h3>
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="pt-3 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Número:</span>
              <span className="font-medium">{product.set_number}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rareza:</span>
              <span className="font-medium">{product.rarity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tipo:</span>
              <span className="font-medium">{product.card_type}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
