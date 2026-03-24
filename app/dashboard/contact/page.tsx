"use client"

import { ContactForm } from "@/components/dashboard/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Contacto</h2>
        <p className="text-muted-foreground">Ponte en contacto con nuestro equipo de soporte</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>Puedes contactarnos por cualquiera de estos medios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Correo Electrónico</p>
                  <p className="text-sm text-muted-foreground">soporte@crisol.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-sm text-muted-foreground">+502 2345-6789</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Dirección</p>
                  <p className="text-sm text-muted-foreground">
                    5ta Avenida 12-34 Zona 10
                    <br />
                    Ciudad de Guatemala
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Horario de Atención</p>
                  <p className="text-sm text-muted-foreground">
                    Lunes a Viernes: 9:00 AM - 6:00 PM
                    <br />
                    Sábados: 10:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
