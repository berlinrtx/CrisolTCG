"use client"

import { useState } from "react"
import { Upload, FileText, Check, X, Loader2, Camera, FileCheck, Building2, CreditCard, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

interface DocumentUploadStepProps {
  onComplete: (documents: Record<string, string>) => void
  userId: string
}

interface DocumentStatus {
  file: File | null
  url: string | null
  uploading: boolean
  uploaded: boolean
}

type DocumentType = "dpi_front" | "dpi_back" | "selfie" | "nit" | "rtu_sat" | "bank_statement" | "address_proof"

const documentConfig: Record<
  DocumentType,
  {
    title: string
    description: string
    icon: any
    required: boolean
    accept: string
  }
> = {
  dpi_front: {
    title: "DPI (Frente)",
    description: "Foto clara del frente de tu DPI",
    icon: FileText,
    required: true,
    accept: "image/*",
  },
  dpi_back: {
    title: "DPI (Reverso)",
    description: "Foto clara del reverso de tu DPI",
    icon: FileText,
    required: true,
    accept: "image/*",
  },
  selfie: {
    title: "Selfie de Verificación",
    description: "Selfie sosteniendo tu DPI junto a tu rostro",
    icon: Camera,
    required: true,
    accept: "image/*",
  },
  nit: {
    title: "NIT",
    description: "Foto o PDF de tu constancia de NIT",
    icon: FileCheck,
    required: true,
    accept: "image/*,application/pdf",
  },
  rtu_sat: {
    title: "RTU SAT Vigente",
    description: "PDF de tu RTU SAT vigente (máximo 3 meses)",
    icon: Building2,
    required: true,
    accept: "application/pdf",
  },
  bank_statement: {
    title: "Constancia Bancaria",
    description: "Constancia bancaria a tu nombre",
    icon: CreditCard,
    required: true,
    accept: "image/*,application/pdf",
  },
  address_proof: {
    title: "Comprobante de Domicilio",
    description: "Recibo de luz, agua o teléfono (máx. 3 meses)",
    icon: Home,
    required: true,
    accept: "image/*,application/pdf",
  },
}

export function DocumentUploadStep({ onComplete, userId }: DocumentUploadStepProps) {
  const { toast } = useToast()
  const [documents, setDocuments] = useState<Record<DocumentType, DocumentStatus>>({
    dpi_front: { file: null, url: null, uploading: false, uploaded: false },
    dpi_back: { file: null, url: null, uploading: false, uploaded: false },
    selfie: { file: null, url: null, uploading: false, uploaded: false },
    nit: { file: null, url: null, uploading: false, uploaded: false },
    rtu_sat: { file: null, url: null, uploading: false, uploaded: false },
    bank_statement: { file: null, url: null, uploading: false, uploaded: false },
    address_proof: { file: null, url: null, uploading: false, uploaded: false },
  })

  const handleFileSelect = async (type: DocumentType, file: File) => {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Archivo muy grande",
        description: "El archivo no debe superar los 10MB",
        variant: "destructive",
      })
      return
    }

    setDocuments((prev) => ({
      ...prev,
      [type]: { ...prev[type], file, uploading: true },
    }))

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("documentType", type)
      formData.append("userId", userId)

      const response = await fetch("/api/seller/upload-document", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al subir archivo")
      }

      setDocuments((prev) => ({
        ...prev,
        [type]: {
          file,
          url: data.url,
          uploading: false,
          uploaded: true,
        },
      }))

      toast({
        title: "Archivo subido",
        description: `${documentConfig[type].title} subido correctamente`,
      })
    } catch (error: any) {
      setDocuments((prev) => ({
        ...prev,
        [type]: { file: null, url: null, uploading: false, uploaded: false },
      }))

      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleContinue = () => {
    const requiredDocs = Object.keys(documentConfig).filter(
      (key) => documentConfig[key as DocumentType].required,
    ) as DocumentType[]

    const allUploaded = requiredDocs.every((key) => documents[key].uploaded)

    if (!allUploaded) {
      toast({
        title: "Documentos incompletos",
        description: "Por favor sube todos los documentos requeridos",
        variant: "destructive",
      })
      return
    }

    const documentUrls = Object.entries(documents).reduce(
      (acc, [key, value]) => {
        if (value.url) {
          acc[key] = value.url
        }
        return acc
      },
      {} as Record<string, string>,
    )

    onComplete(documentUrls)
  }

  const uploadProgress = Object.values(documents).filter((doc) => doc.uploaded).length
  const totalRequired = Object.values(documentConfig).filter((doc) => doc.required).length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Documentos de Verificación</CardTitle>
              <CardDescription>Sube todos los documentos requeridos para verificar tu identidad</CardDescription>
            </div>
            <Badge variant="secondary" className="text-base">
              {uploadProgress}/{totalRequired}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {(Object.keys(documentConfig) as DocumentType[]).map((type) => {
            const config = documentConfig[type]
            const status = documents[type]
            const Icon = config.icon

            return (
              <Card key={type} className={status.uploaded ? "border-green-200 bg-green-50" : ""}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        status.uploaded ? "bg-green-500 text-white" : "bg-primary/10 text-primary"
                      }`}
                    >
                      {status.uploaded ? <Check className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{config.title}</h4>
                        {config.required && (
                          <Badge variant="destructive" className="text-xs">
                            Requerido
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{config.description}</p>

                      {status.uploaded ? (
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-green-700 font-medium">Archivo subido</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setDocuments((prev) => ({
                                ...prev,
                                [type]: { file: null, url: null, uploading: false, uploaded: false },
                              }))
                            }}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cambiar
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="file"
                            id={`file-${type}`}
                            accept={config.accept}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleFileSelect(type, file)
                            }}
                            disabled={status.uploading}
                          />
                          <Label htmlFor={`file-${type}`} className="cursor-pointer">
                            <Button
                              type="button"
                              variant="outline"
                              disabled={status.uploading}
                              onClick={() => document.getElementById(`file-${type}`)?.click()}
                            >
                              {status.uploading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Subiendo...
                                </>
                              ) : (
                                <>
                                  <Upload className="mr-2 h-4 w-4" />
                                  Seleccionar Archivo
                                </>
                              )}
                            </Button>
                          </Label>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </CardContent>
      </Card>

      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <FileText className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-900 mb-1">Requisitos de Documentos</p>
              <ul className="text-amber-700 space-y-1 list-disc list-inside">
                <li>Fotos claras y legibles</li>
                <li>Archivos en formato JPG, PNG o PDF</li>
                <li>Tamaño máximo: 10MB por archivo</li>
                <li>RTU SAT y comprobante de domicilio deben tener máximo 3 meses de antigüedad</li>
                <li>La selfie debe mostrar tu rostro y tu DPI claramente</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleContinue} size="lg" disabled={uploadProgress < totalRequired} className="min-w-[200px]">
          Continuar
          <Check className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
