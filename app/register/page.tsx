"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { getSupabaseBrowserClient } from "@/lib/supabase-browser"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Mail, Lock, User, AtSign } from "lucide-react"

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    return usernameRegex.test(username)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validations
    if (!firstName.trim() || !lastName.trim()) {
      setError("Por favor ingresa tu nombre completo")
      return
    }

    if (!validateUsername(username)) {
      setError("El nombre de usuario debe tener entre 3-20 caracteres (solo letras, números y guión bajo)")
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres")
      return
    }

    if (!acceptTerms) {
      setError("Debes aceptar los términos y condiciones")
      return
    }

    const supabase = getSupabaseBrowserClient()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            username: username,
          },
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
        },
      })

      if (error) throw error

      if (data.user) {
        // Try to sign in immediately after registration
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) {
          // If sign in fails, show success message to check email
          setSuccess(true)
        } else if (signInData.user) {
          // Create profile in database if it doesn't exist
          const { error: profileError } = await supabase.from("profiles").upsert(
            {
              id: signInData.user.id,
              email: signInData.user.email,
              first_name: firstName,
              last_name: lastName,
              username: username,
              role: "buyer",
              seller_tier: "basic",
              email_verified: true,
            },
            { onConflict: "id" },
          )

          if (profileError) {
            console.error("[v0] Profile creation error:", profileError)
          }

          // Redirect to dashboard
          router.push("/dashboard/buyer")
          router.refresh()
        }
      } else {
        setSuccess(true)
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocurrió un error al crear la cuenta")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-accent" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Revisa tu correo</h1>
            <p className="text-muted-foreground leading-relaxed">
              Hemos enviado un código de verificación a <span className="font-medium text-foreground">{email}</span>.
              Por favor revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
            </p>
          </div>
          <Button onClick={() => router.push("/login")} className="w-full" size="lg">
            Ir a iniciar sesión
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-block">
            <Image src="/crisol-logo-nb.svg" alt="Crisol TCG" width={120} height={40} className="h-10 w-auto mx-auto" />
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Crear cuenta</h1>
            <p className="text-muted-foreground">Únete a la comunidad de Crisol TCG</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name fields in grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                Nombre(s)
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Juan"
                  className="pl-10 bg-secondary/50 border-border focus:border-accent focus:ring-accent"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                Apellido(s)
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Pérez"
                  className="pl-10 bg-secondary/50 border-border focus:border-accent focus:ring-accent"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-foreground">
              Nombre de usuario
            </Label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                placeholder="tu_usuario"
                className="pl-10 bg-secondary/50 border-border focus:border-accent focus:ring-accent"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-muted-foreground">3-20 caracteres, solo letras, números y guión bajo</p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Correo electrónico
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="pl-10 bg-secondary/50 border-border focus:border-accent focus:ring-accent"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-secondary/50 border-border focus:border-accent focus:ring-accent"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
                Confirmar contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-secondary/50 border-border focus:border-accent focus:ring-accent"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Terms acceptance */}
          <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg border border-border">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              disabled={isLoading}
              className="mt-0.5"
            />
            <div className="flex-1">
              <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                Acepto los{" "}
                <Link href="/terminos" className="text-accent hover:underline font-medium">
                  Términos y Condiciones
                </Link>{" "}
                y la{" "}
                <Link href="/privacidad" className="text-accent hover:underline font-medium">
                  Política de Privacidad
                </Link>
              </Label>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Submit button */}
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Creando cuenta...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Crear cuenta
              </div>
            )}
          </Button>
        </form>

        {/* Login link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
