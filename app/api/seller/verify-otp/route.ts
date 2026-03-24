import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, otpCode, userId } = await request.json()

    if (!phoneNumber || !otpCode || !userId) {
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

    // Get the most recent OTP for this phone number
    const { data: otpRecord, error: fetchError } = await supabase
      .from("seller_otp_verification")
      .select("*")
      .eq("seller_id", userId)
      .eq("phone_number", phoneNumber)
      .eq("verified", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !otpRecord) {
      return NextResponse.json({ error: "Código no encontrado" }, { status: 404 })
    }

    // Check if OTP is expired
    const now = new Date()
    const expiresAt = new Date(otpRecord.expires_at)
    if (now > expiresAt) {
      return NextResponse.json({ error: "Código expirado. Solicita uno nuevo." }, { status: 400 })
    }

    // Check if too many attempts
    if (otpRecord.attempts >= 5) {
      return NextResponse.json({ error: "Demasiados intentos. Solicita un nuevo código." }, { status: 400 })
    }

    // Verify OTP code
    if (otpRecord.otp_code !== otpCode) {
      // Increment attempts
      await supabase
        .from("seller_otp_verification")
        .update({ attempts: otpRecord.attempts + 1 })
        .eq("id", otpRecord.id)

      return NextResponse.json({ error: "Código incorrecto" }, { status: 400 })
    }

    // Mark OTP as verified
    const { error: updateError } = await supabase
      .from("seller_otp_verification")
      .update({ verified: true })
      .eq("id", otpRecord.id)

    if (updateError) {
      console.error("Error updating OTP:", updateError)
      return NextResponse.json({ error: "Error al verificar código" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Teléfono verificado correctamente",
    })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ error: "Error al verificar código" }, { status: 500 })
  }
}
