"use client"

import { useState } from "react"
import { FileText, Shield, AlertTriangle, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TermsAcceptanceStepProps {
  onAccept: () => void
  onBack: () => void
  isSubmitting: boolean
}

export function TermsAcceptanceStep({ onAccept, onBack, isSubmitting }: TermsAcceptanceStepProps) {
  const [acceptedTerms, setAcceptedTerms] = useState({
    vendorTerms: false,
    privacyPolicy: false,
    antiCounterfeit: false,
  })

  const allAccepted = Object.values(acceptedTerms).every((value) => value)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Términos y Condiciones</CardTitle>
          <CardDescription>Lee y acepta nuestras políticas para convertirte en vendedor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Vendor Terms */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Términos y Condiciones de Vendedor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-48 w-full rounded-md border p-4">
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">1. Responsabilidades del Vendedor</p>
                  <p>
                    El vendedor se compromete a proporcionar descripciones precisas de los productos, garantizar la
                    autenticidad de las cartas, y enviar los productos en el tiempo establecido.
                  </p>

                  <p className="font-semibold">2. Comisiones y Pagos</p>
                  <p>
                    Crisol TCG cobra una comisión del 10% sobre cada venta. Los pagos se realizarán cada 15 días a
                    través de transferencia bancaria.
                  </p>

                  <p className="font-semibold">3. Política de Devoluciones</p>
                  <p>
                    El vendedor debe aceptar devoluciones por productos defectuosos o mal descritos dentro de los 7 días
                    posteriores a la entrega.
                  </p>

                  <p className="font-semibold">4. Suspensión y Terminación</p>
                  <p>
                    Crisol TCG se reserva el derecho de suspender o terminar la cuenta del vendedor por violación de
                    estos términos.
                  </p>
                </div>
              </ScrollArea>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vendorTerms"
                  checked={acceptedTerms.vendorTerms}
                  onCheckedChange={(checked) => setAcceptedTerms({ ...acceptedTerms, vendorTerms: checked as boolean })}
                />
                <Label htmlFor="vendorTerms" className="font-normal cursor-pointer">
                  He leído y acepto los Términos y Condiciones de Vendedor
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Policy */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Política de Privacidad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-48 w-full rounded-md border p-4">
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">1. Recopilación de Datos</p>
                  <p>
                    Recopilamos información personal incluyendo nombre, dirección, teléfono, y datos bancarios para
                    procesar pagos y entregas.
                  </p>

                  <p className="font-semibold">2. Uso de la Información</p>
                  <p>
                    Usamos tu información para procesar ventas, enviar notificaciones, y mejorar nuestros servicios. No
                    compartimos tus datos con terceros sin tu consentimiento.
                  </p>

                  <p className="font-semibold">3. Seguridad</p>
                  <p>Implementamos medidas de seguridad para proteger tus datos personales y financieros.</p>

                  <p className="font-semibold">4. Tus Derechos</p>
                  <p>Tienes derecho a acceder, modificar o eliminar tus datos personales en cualquier momento.</p>
                </div>
              </ScrollArea>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privacyPolicy"
                  checked={acceptedTerms.privacyPolicy}
                  onCheckedChange={(checked) =>
                    setAcceptedTerms({ ...acceptedTerms, privacyPolicy: checked as boolean })
                  }
                />
                <Label htmlFor="privacyPolicy" className="font-normal cursor-pointer">
                  He leído y acepto la Política de Privacidad
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Anti-Counterfeit Policy */}
          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Política Antifalsificación y Propiedad Intelectual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-48 w-full rounded-md border bg-white p-4">
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-red-900">1. Prohibición de Cartas Falsificadas</p>
                  <p>
                    Está estrictamente prohibido vender cartas falsificadas, proxies no autorizados, o cualquier
                    producto que infrinja derechos de propiedad intelectual.
                  </p>

                  <p className="font-semibold text-red-900">2. Verificación de Autenticidad</p>
                  <p>
                    Crisol TCG se reserva el derecho de verificar la autenticidad de cualquier carta vendida en la
                    plataforma.
                  </p>

                  <p className="font-semibold text-red-900">3. Consecuencias por Violación</p>
                  <p>
                    La venta de cartas falsificadas resultará en la suspensión inmediata de tu cuenta, retención de
                    pagos pendientes, y posibles acciones legales.
                  </p>

                  <p className="font-semibold text-red-900">4. Responsabilidad Legal</p>
                  <p>
                    El vendedor es legalmente responsable por garantizar la autenticidad y legalidad de todos los
                    productos que vende.
                  </p>
                </div>
              </ScrollArea>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="antiCounterfeit"
                  checked={acceptedTerms.antiCounterfeit}
                  onCheckedChange={(checked) =>
                    setAcceptedTerms({ ...acceptedTerms, antiCounterfeit: checked as boolean })
                  }
                />
                <Label htmlFor="antiCounterfeit" className="font-normal cursor-pointer">
                  He leído y acepto la Política Antifalsificación y Propiedad Intelectual
                </Label>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">Revisión de Solicitud</p>
              <p className="text-blue-700">
                Una vez enviada tu solicitud, nuestro equipo la revisará en un plazo de 2-3 días hábiles. Te
                contactaremos por correo electrónico y teléfono con los resultados.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
          Anterior
        </Button>
        <Button onClick={onAccept} disabled={!allAccepted || isSubmitting} size="lg" className="min-w-[200px]">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Enviar Solicitud
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
