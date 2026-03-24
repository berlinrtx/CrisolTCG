import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, userId } = await request.json()

    if (!phoneNumber || !userId) {
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

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

    // Set expiration to 10 minutes from now
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 10)

    // Store OTP in database
    const { error: insertError } = await supabase.from("seller_otp_verification").insert({
      seller_id: userId,
      phone_number: phoneNumber,
      otp_code: otpCode,
      expires_at: expiresAt.toISOString(),
    })

    if (insertError) {
      console.error("Error storing OTP:", insertError)
      return NextResponse.json({ error: "Error al generar código" }, { status: 500 })
    }

    // TODO: Send OTP via SMS/WhatsApp
    // For now, we'll just log it (in production, integrate with Twilio, etc.)
    console.log(`[OTP] Code for ${phoneNumber}: ${otpCode}`)

    return NextResponse.json({
      success: true,
      message: "Código enviado correctamente",
      // Remove this in production - only for testing
      otpCode: process.env.NODE_ENV === "development" ? otpCode : undefined,
    })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ error: "Error al enviar código" }, { status: 500 })
  }
}
