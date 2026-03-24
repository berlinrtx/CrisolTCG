"use client"

import type React from "react"

import { useState } from "react"
import { Shield, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-browser"

export function SecuritySettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new,
      })

      if (error) throw error

      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña se cambió correctamente",
      })

      setPasswords({ current: "", new: "", confirm: "" })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Seguridad</CardTitle>
        </div>
        <CardDescription>Actualiza tu contraseña y configuración de seguridad</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current_password">Contraseña Actual</Label>
            <Input
              id="current_password"
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new_password">Nueva Contraseña</Label>
            <Input
              id="new_password"
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm_password">Confirmar Nueva Contraseña</Label>
            <Input
              id="confirm_password"
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              required
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            <Lock className="mr-2 h-4 w-4" />
            {isLoading ? "Actualizando..." : "Cambiar Contraseña"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
