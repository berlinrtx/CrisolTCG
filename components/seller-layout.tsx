"use client"

import { SellerSidebar } from "./seller-sidebar"

export function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SellerSidebar />
      <div className="lg:pl-64">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
