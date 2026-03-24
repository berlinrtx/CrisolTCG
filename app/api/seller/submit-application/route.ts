import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { userId, phoneNumber, personalInfo, documents, termsAccepted } = data

    if (!userId || !phoneNumber || !personalInfo || !documents) {
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

    // Insert seller verification data
    const { error: verificationError } = await supabase.from("seller_verification_data").insert({
      seller_id: userId,
      legal_first_name: personalInfo.legalFirstName,
      legal_last_name: personalInfo.legalLastName,
      date_of_birth: personalInfo.dateOfBirth,
      country: "Guatemala",
      department: "Guatemala",
      municipality: personalInfo.municipality,
      address: personalInfo.address,
      store_name_public: personalInfo.storeNamePublic,
      dpi_number: personalInfo.dpiNumber,
      nit_number: personalInfo.nitNumber,
      bank_name: personalInfo.bankName,
      bank_account_type: personalInfo.bankAccountType,
      bank_account_number: personalInfo.bankAccountNumber,
      bank_account_holder: personalInfo.bankAccountHolder,
      accepted_terms_vendor: true,
      accepted_privacy_policy: true,
      accepted_anti_counterfeit_policy: true,
      terms_accepted_at: new Date().toISOString(),
      verification_status: "pending",
    })

    if (verificationError) {
      console.error("Error storing verification data:", verificationError)
      return NextResponse.json({ error: "Error al guardar datos de verificación" }, { status: 500 })
    }

    // Update profile with seller application status
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        seller_application_status: "pending_review",
        seller_application_submitted_at: new Date().toISOString(),
        store_name: personalInfo.storeNamePublic,
      })
      .eq("id", userId)

    if (profileError) {
      console.error("Error updating profile:", profileError)
      return NextResponse.json({ error: "Error al actualizar perfil" }, { status: 500 })
    }

    // TODO: Send notification email to admin team for review
    // TODO: Send confirmation email to user

    return NextResponse.json({
      success: true,
      message: "Solicitud enviada correctamente",
    })
  } catch (error) {
    console.error("Submit application error:", error)
    return NextResponse.json({ error: "Error al enviar solicitud" }, { status: 500 })
  }
}
