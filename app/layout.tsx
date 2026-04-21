import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { ClientLayoutWrapper } from "@/components/client-layout-wrapper"
import { CartProvider } from "@/components/cart-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Crisol TCG - Marketplace de Cartas Coleccionables en Guatemala",
  description: "Compra y vende cartas de Yu-Gi-Oh!, Pokémon, One Piece, Magic y más en Guatemala",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}