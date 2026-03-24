import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const documentType = formData.get("documentType") as string
    const userId = formData.get("userId") as string

    if (!file || !documentType || !userId) {
      return NextResponse.json({ error: "Faltan parámetros requeridos" }, { status: 400 })
    }

    const supabase = await createClient()

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user || user.id !== userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const fileBuffer = await file.arrayBuffer()
    const fileName = `${userId}/${documentType}-${Date.now()}-${file.name}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("seller-documents")
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error("Error uploading to Supabase Storage:", uploadError)
      return NextResponse.json({ error: "Error al subir archivo" }, { status: 500 })
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("seller-documents").getPublicUrl(uploadData.path)

    // Store document record in database
    const { error: insertError } = await supabase.from("seller_documents").insert({
      seller_id: userId,
      document_type: documentType,
      file_url: publicUrl,
      file_name: file.name,
      file_size: file.size,
    })

    if (insertError) {
      console.error("Error storing document:", insertError)
      return NextResponse.json({ error: "Error al guardar documento" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: "Documento subido correctamente",
    })
  } catch (error) {
    console.error("Upload document error:", error)
    return NextResponse.json({ error: "Error al subir documento" }, { status: 500 })
  }
}
