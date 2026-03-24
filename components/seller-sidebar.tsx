"use client"

import {
  Home,
  MessageSquare,
  AlertTriangle,
  Tag,
  Percent,
  BarChart3,
  Settings,
  LogOut,
  Box,
  Wallet,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"

const navigation = [
  { name: "Dashboard", href: "/seller/dashboard", icon: Home },
  { name: "Inventario", href: "/seller/inventory", icon: Box },
  { name: "Billetera", href: "/dashboard/wallet", icon: Wallet },
  { name: "Mensajes", href: "/seller/messages", icon: MessageSquare },
  { name: "Disputas", href: "/seller/disputes", icon: AlertTriangle },
  { name: "Descuentos", href: "/seller/discounts", icon: Tag },
  { name: "Códigos", href: "/seller/codes", icon: Percent },
  { name: "Estadísticas", href: "/seller/stats", icon: BarChart3 },
  { name: "Configuración", href: "/seller/settings", icon: Settings },
]

export function SellerSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const isActive = (href: string) => {
    if (href === "/seller/dashboard") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile sidebar */}
      <div className="lg:hidden">{/* Mobile sidebar code would go here with a sheet/drawer */}</div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0" style={{ backgroundColor: "#33065a" }}>
        <div className="flex flex-col flex-grow border-r border-white/10">
          {/* Logo */}
          <div className="flex py-4 border-b border-white/10 h-16 items-center w-auto text-center justify-center px-6 pl-6 border-l-0">
            <Link href="/">
              <Image src="/crisol-logo-nb.svg" alt="Crisol TCG" width={45} height={45} />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="mb-2 px-3 text-xs font-semibold text-white/60 uppercase tracking-wider">
              Panel de Vendedor
            </div>
            <ul className="space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        active ? "text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                      style={active ? { backgroundColor: "#18afeb" } : {}}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#f79b27] to-[#18afeb] flex items-center justify-center text-white font-semibold">
                {user?.email?.[0]?.toUpperCase() || "V"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Vendedor</p>
                <p className="text-xs text-white/60 truncate">{user?.email}</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 w-full px-3 py-2 mb-1 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <Home className="h-4 w-4" />
              Mi Cuenta
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
