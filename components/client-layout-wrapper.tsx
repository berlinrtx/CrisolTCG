"use client"

import type React from "react"
import { usePathname } from 'next/navigation'
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SellerLayout } from "@/components/seller-layout"

export function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // If on login or register page, render children directly without protection
  if (pathname === "/login" || pathname === "/register" || pathname === "/") {
    return <>{children}</>
  }

  // For seller pages, wrap with protection and seller layout
  if (pathname.startsWith("/seller")) {
    return (
      <ProtectedRoute>
        <SellerLayout>{children}</SellerLayout>
      </ProtectedRoute>
    )
  }

  // For dashboard pages, wrap with protection and dashboard layout
  if (pathname.startsWith("/dashboard")) {
    return (
      <ProtectedRoute>
        <DashboardLayout>{children}</DashboardLayout>
      </ProtectedRoute>
    )
  }

  // For other pages, just render children
  return <>{children}</>
}
