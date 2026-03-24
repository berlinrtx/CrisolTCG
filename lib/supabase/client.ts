import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/database.types"

// Singleton instance del cliente de Supabase para el navegador
let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function createClient() {
  if (browserClient) {
    return browserClient
  }

  browserClient = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "crisol-auth",
      },
      cookieOptions: {
        name: "crisol-auth",
      },
    },
  )

  return browserClient
}

// Export singleton instance
export const supabase = createClient()
