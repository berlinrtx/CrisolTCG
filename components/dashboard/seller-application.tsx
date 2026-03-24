"use client"

import { Store, FileText, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { SellerVerificationWizard } from "./seller-verification-wizard"

export function SellerApplication({ profile }: { profile: any }) {
  const benefits = [
    {
      icon: Store,
      title: "Tu Propia Tienda",
      description: "Crea tu tienda personalizada con tu marca",
    },
    {
      icon: ShieldCheck,
      title: "Verificación Oficial",
      description: "Obtén el sello de verificación de Crisol TCG",
    },
    {
      icon: FileText,
      title: "Gestión Fácil",
      description: "Administra inventario y órdenes desde un solo lugar",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Benefits Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {benefits.map((benefit, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Verification Wizard */}
      <SellerVerificationWizard userId={profile.id} profile={profile} />
    </div>
  )
}
