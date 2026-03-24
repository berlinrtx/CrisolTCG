"use client"

import { useState } from "react"
import { Phone, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-browser"

interface PhoneVerificationStepProps {
  onVerified: (phoneNumber: string) => void
  userId: string
}

export function PhoneVerificationStep({ onVerified, userId }: PhoneVerificationStepProps) {
  const { toast } = useToast()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 8) {
      toast({
        title: "Error",
        description: "Por favor ingresa un número de teléfono válido",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/seller/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          userId: userId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar código")
      }

      setOtpSent(true)
      toast({
        title: "Código enviado",
        description: `Hemos enviado un código de verificación a ${phoneNumber}`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Por favor ingresa el código de 6 dígitos",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)

    try {
      const response = await fetch("/api/seller/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          otpCode: otp,
          userId: userId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Código inválido")
      }

      // Update profile with verified phone
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          phone_number: phoneNumber,
          phone_verified: true,
        })
        .eq("id", userId)

      if (updateError) throw updateError

      setIsVerified(true)
      toast({
        title: "Verificación exitosa",
        description: "Tu número de teléfono ha sido verificado",
      })

      // Call parent callback after short delay
      setTimeout(() => {
        onVerified(phoneNumber)
      }, 1500)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  if (isVerified) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Teléfono Verificado</h3>
            <p className="text-sm text-muted-foreground">{phoneNumber}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Verificación de Teléfono
          </CardTitle>
          <CardDescription>
            Necesitamos verificar tu número de teléfono para contactarte sobre tus ventas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!otpSent ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Número de Teléfono</Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+502 1234-5678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSendOTP} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Código"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Recibirás un código de 6 dígitos por SMS o WhatsApp</p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Ingresa el Código de Verificación</Label>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <p className="text-xs text-center text-muted-foreground">Código enviado a {phoneNumber}</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setOtpSent(false)} className="flex-1">
                  Cambiar Número
                </Button>
                <Button onClick={handleVerifyOTP} disabled={isVerifying || otp.length !== 6} className="flex-1">
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    "Verificar"
                  )}
                </Button>
              </div>

              <Button variant="link" onClick={handleSendOTP} disabled={isLoading} className="w-full text-sm">
                {isLoading ? "Reenviando..." : "Reenviar código"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Phone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">¿Por qué necesitamos tu teléfono?</p>
              <p className="text-blue-700">
                Usaremos tu número para notificarte sobre ventas, coordinar entregas y resolver cualquier problema con
                tus pedidos. Tu número no será visible públicamente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
