"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Mensaje enviado",
        description: "Te responderemos lo antes posible",
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Envíanos un Mensaje</CardTitle>
        <CardDescription>Completa el formulario y nos pondremos en contacto contigo</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Asunto</Label>
            <Select required>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Selecciona un asunto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="order">Consulta sobre orden</SelectItem>
                <SelectItem value="product">Consulta sobre producto</SelectItem>
                <SelectItem value="shipping">Problemas de envío</SelectItem>
                <SelectItem value="payment">Problemas de pago</SelectItem>
                <SelectItem value="account">Problemas con cuenta</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderNumber">Número de Orden (opcional)</Label>
            <Input id="orderNumber" placeholder="ORD-001" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea id="message" placeholder="Describe tu consulta o problema..." rows={6} required />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            <Send className="mr-2 h-4 w-4" />
            {isLoading ? "Enviando..." : "Enviar Mensaje"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
