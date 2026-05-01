"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useEffect } from "react"
import Link from "next/link"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <h1 className="text-3xl font-bold">¡Orden confirmada!</h1>
          <p className="text-muted-foreground max-w-md">
            Tu orden fue procesada exitosamente. El vendedor se pondrá en contacto contigo pronto.
          </p>
          <div className="flex gap-3 justify-center pt-4">
            <Button asChild variant="outline">
              <Link href="/">Seguir comprando</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/orders">Ver mis órdenes</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}