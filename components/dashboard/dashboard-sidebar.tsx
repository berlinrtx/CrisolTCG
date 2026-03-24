"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  MapPin,
  CreditCard,
  HelpCircle,
  MessageSquare,
  AlertCircle,
  Store,
  Menu,
  X,
  User,
  History,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DashboardSidebarProps {
  profile: any
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Mi Cuenta", href: "/dashboard/account", icon: User },
  { name: "Mis Órdenes", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Historial", href: "/dashboard/history", icon: History },
  { name: "Mis Direcciones", href: "/dashboard/addresses", icon: MapPin },
  { name: "Métodos de Pago", href: "/dashboard/payment-methods", icon: CreditCard },
  { name: "FAQ", href: "/dashboard/faq", icon: HelpCircle },
  { name: "Contacto", href: "/dashboard/contact", icon: MessageSquare },
  { name: "Quejas y Devoluciones", href: "/dashboard/returns", icon: AlertCircle },
  { name: "Portal de Vendedor", href: "/dashboard/seller", icon: Store },
]

export default function DashboardSidebar({ profile }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-[#181435] hover:bg-[#18afeb] text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-[#181435] text-white transition-transform duration-300 md:translate-x-0 md:static flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/crisol-logo-nb.svg" alt="Crisol TCG" width={140} height={48} className="h-10 w-auto" />
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-[#18afeb] text-white shadow-lg shadow-[#18afeb]/20"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-3">
            <div className="w-10 h-10 bg-[#18afeb] text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
              {profile?.first_name?.[0]?.toUpperCase() || profile?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">
                {profile?.first_name && profile?.last_name
                  ? `${profile.first_name} ${profile.last_name}`
                  : profile?.email || "Usuario"}
              </p>
              <p className="text-xs text-white/60 truncate">{profile?.email || ""}</p>
            </div>
          </div>
          <p className="text-xs text-white/40 text-center">© 2025 Crisol TCG. Todos los derechos reservados.</p>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}

export { DashboardSidebar }
