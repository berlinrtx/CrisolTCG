"use client"

import { createClient } from "@/lib/supabase-browser"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Settings, Mail, Phone, Calendar } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"

export default function AccountPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (user) {
      const supabase = createClient()
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()
        .then(({ data }) => setProfile(data))
    }
  }, [user])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mi Cuenta</h2>
        <p className="text-muted-foreground">Administra tu información personal y configuración</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información Personal
            </CardTitle>
            <CardDescription>Tus datos de perfil y contacto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Nombre:</span>
                <span>
                  {profile?.first_name} {profile?.last_name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <span>{user?.email}</span>
              </div>
              {profile?.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Teléfono:</span>
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile?.created_at && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Miembro desde:</span>
                  <span>{new Date(profile.created_at).toLocaleDateString("es-GT")}</span>
                </div>
              )}
            </div>
            <Link href="/dashboard/account/profile">
              <Button className="w-full">Editar Perfil</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Account Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración de Cuenta
            </CardTitle>
            <CardDescription>Seguridad y preferencias</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Contraseña</span>
                <span className="text-muted-foreground">********</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Autenticación de dos factores</span>
                <span className="text-muted-foreground">Desactivada</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Notificaciones por email</span>
                <span className="text-muted-foreground">Activadas</span>
              </div>
            </div>
            <Link href="/dashboard/account/settings">
              <Button variant="outline" className="w-full bg-transparent">
                Configuración
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
