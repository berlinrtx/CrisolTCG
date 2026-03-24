"use client"

import type React from "react"

import { DashboardSidebar } from "./dashboard-sidebar"
import { useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase-browser"
import type { Database } from "@/types/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    async function loadUserData() {
      const supabase = getSupabaseBrowserClient()
      const { data: userData } = await supabase.auth.getUser()

      if (userData.user) {
        setUser(userData.user)
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", userData.user.id).single()

        setProfile(profileData)
      }
    }

    loadUserData()
  }, [])

  const userData = {
    email: user?.email,
    full_name: profile?.full_name,
    avatar_url: profile?.avatar_url,
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar user={userData} />
      <main className="flex-1 transition-all duration-300 mr-9 md:ml-9">
        <div className="container mx-auto p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}
