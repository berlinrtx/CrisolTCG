"use client"

import { useState } from "react"
import { Check, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PhoneVerificationStep } from "./phone-verification-step"
import { DocumentUploadStep } from "./document-upload-step"
import { PersonalInfoStep } from "./personal-info-step"
import { TermsAcceptanceStep } from "./terms-acceptance-step"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface SellerVerificationWizardProps {
  userId: string
  profile: any
}

const steps = [
  { id: 1, name: "Verificación Telefónica", description: "Verifica tu número" },
  { id: 2, name: "Información Personal", description: "Datos legales y bancarios" },
  { id: 3, name: "Documentos", description: "Sube tus documentos" },
  { id: 4, name: "Términos y Condiciones", description: "Acepta políticas" },
]

export function SellerVerificationWizard({ userId, profile }: SellerVerificationWizardProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    phoneNumber: "",
    personalInfo: {} as any,
    documents: {} as Record<string, string>,
    termsAccepted: false,
  })

  const handlePhoneVerified = (phoneNumber: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber }))
    setCurrentStep(2)
  }

  const handlePersonalInfoComplete = (data: any) => {
    setFormData((prev) => ({ ...prev, personalInfo: data }))
    setCurrentStep(3)
  }

  const handleDocumentsComplete = (documents: Record<string, string>) => {
    setFormData((prev) => ({ ...prev, documents }))
    setCurrentStep(4)
  }

  const handleTermsAccepted = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/seller/submit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          ...formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar solicitud")
      }

      toast({
        title: "Solicitud enviada",
        description: "Tu solicitud ha sido enviada. Te contactaremos pronto.",
      })

      // Redirect to dashboard after success
      setTimeout(() => {
        router.push("/dashboard/seller")
        router.refresh()
      }, 2000)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <Card className="p-6">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {steps.map((step, index) => (
              <li key={step.id} className="relative flex-1">
                <div className="flex items-center">
                  <div className="flex items-center justify-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        step.id < currentStep
                          ? "bg-primary text-primary-foreground"
                          : step.id === currentStep
                            ? "border-2 border-primary bg-white text-primary"
                            : "border-2 border-gray-300 bg-white text-gray-500"
                      }`}
                    >
                      {step.id < currentStep ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-semibold">{step.id}</span>
                      )}
                    </div>
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${step.id <= currentStep ? "text-primary" : "text-gray-500"}`}>
                      {step.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-10 top-5 hidden h-0.5 w-full sm:block ${
                      step.id < currentStep ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </Card>

      {/* Step Content */}
      <div className="min-h-[500px]">
        {currentStep === 1 && <PhoneVerificationStep onVerified={handlePhoneVerified} userId={userId} />}

        {currentStep === 2 && (
          <PersonalInfoStep
            onComplete={handlePersonalInfoComplete}
            onBack={() => setCurrentStep(1)}
            initialData={formData.personalInfo}
          />
        )}

        {currentStep === 3 && <DocumentUploadStep onComplete={handleDocumentsComplete} userId={userId} />}

        {currentStep === 4 && (
          <TermsAcceptanceStep
            onAccept={handleTermsAccepted}
            onBack={() => setCurrentStep(3)}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      {/* Navigation */}
      {currentStep > 1 && currentStep < 4 && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep((prev) => prev - 1)}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
        </div>
      )}
    </div>
  )
}
