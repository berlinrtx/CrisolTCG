"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getSupabaseBrowserClient } from "@/lib/supabase-browser"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = getSupabaseBrowserClient()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        throw signInError
      }

      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single()

        if (profileError && profileError.code === "PGRST116") {
          await supabase.from("profiles").insert({
            id: data.user.id,
            email: data.user.email || "",
            username: data.user.email?.split("@")[0] || "",
            first_name: "",
            last_name: "",
            role: "buyer",
            seller_tier: "basic",
          })
        } else if (profileError) {
          throw new Error("Error al cargar perfil de usuario")
        }
      }

      window.location.href = "/"
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Ocurrió un error al iniciar sesión")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-md rounded-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <Link href="/">
              <Image src="/crisol-logo-nb.svg" alt="Crisol TCG" width={140} height={48} className="h-12 w-auto" />
            </Link>
          </div>
          <div>
            <CardTitle className="text-2xl">Bienvenido de vuelta</CardTitle>
            <CardDescription>Ingresa a tu cuenta de Crisol TCG</CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="rounded-xl"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="rounded-xl"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-xl">{error}</div>}
            <Button className="w-full rounded-xl" size="lg" type="submit" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Regístrate aquí
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
