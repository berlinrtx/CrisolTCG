"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Home,
  LogOut,
  Menu,
  X,
  Package,
  MapPin,
  CreditCard,
  HelpCircle,
  Mail,
  RotateCcw,
  Store,
  User,
  History,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Mi Cuenta", href: "/dashboard/account", icon: User },
  { name: "Billetera", href: "/dashboard/wallet", icon: Wallet }, // Added Wallet link
  { name: "Mis Órdenes", href: "/dashboard/orders", icon: Package },
  { name: "Historial", href: "/dashboard/history", icon: History },
  { name: "Mis Direcciones", href: "/dashboard/addresses", icon: MapPin },
  { name: "Métodos de Pago", href: "/dashboard/payment-methods", icon: CreditCard },
  { name: "FAQ", href: "/dashboard/faq", icon: HelpCircle },
  { name: "Contacto", href: "/dashboard/contact", icon: Mail },
  { name: "Devoluciones", href: "/dashboard/returns", icon: RotateCcw },
  { name: "Vender", href: "/dashboard/seller", icon: Store },
]

export function DashboardSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden",
          "border-r",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        style={{ backgroundColor: "#33065a" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10 h-16">
          <Image src="/crisol-logo-nb.svg" alt="Crisol TCG" width={120} height={40} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive(item.href)
                      ? "text-white font-semibold"
                      : "text-white/70 hover:text-white hover:bg-white/10",
                  )}
                  style={isActive(item.href) ? { backgroundColor: "#18afeb" } : undefined}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="mb-4 px-3 py-2 rounded-md bg-white/5">
            <p className="text-xs text-white/50 mb-1">Usuario</p>
            <p className="text-sm text-white font-medium truncate">{user?.email}</p>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
            onClick={handleSignOut}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0" style={{ backgroundColor: "#33065a" }}>
        <div className="flex flex-col flex-grow border-r border-white/10">
          <div className="flex px-6 py-4 border-b border-white/10 h-16 items-center justify-center">
            <Link href="/">
              <Image src="/crisol-logo-nb.svg" alt="Crisol TCG" width={45} height={45} />
            </Link>
          </div>
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive(item.href)
                        ? "text-white font-semibold"
                        : "text-white/70 hover:text-white hover:bg-white/10",
                    )}
                    style={isActive(item.href) ? { backgroundColor: "#18afeb" } : undefined}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="px-4 py-6 border-t border-white/10">
            <div className="mb-4 px-3 py-2 rounded-md bg-white/5">
              <p className="text-xs text-white/50 mb-1">Usuario</p>
              <p className="text-sm text-white font-medium truncate">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
              onClick={handleSignOut}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-40"
          style={{ backgroundColor: "#33065a" }}
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5 text-white" />
        </Button>
      </div>
    </>
  )
}
