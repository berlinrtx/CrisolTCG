import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SecuritySettings } from "@/components/dashboard/security-settings"
import { NotificationSettings } from "@/components/dashboard/notification-settings"

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
        <p className="text-muted-foreground">Administra la seguridad y preferencias de tu cuenta</p>
      </div>

      <SecuritySettings />
      <NotificationSettings />
    </div>
  )
}
