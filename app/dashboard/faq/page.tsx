"use client"

import { FAQList } from "@/components/dashboard/faq-list"

export default function FAQPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Preguntas Frecuentes</h2>
        <p className="text-muted-foreground">Encuentra respuestas a las preguntas más comunes</p>
      </div>

      <FAQList />
    </div>
  )
}
