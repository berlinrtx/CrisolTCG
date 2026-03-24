"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, ArrowUpCircle, ArrowDownCircle, History } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

interface WalletCardProps {
  balance: number
  className?: string
}

export function WalletCard({ balance, className }: WalletCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Billetera Virtual</CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
        <p className="text-xs text-muted-foreground mb-4">Saldo disponible</p>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 bg-[#18afeb] hover:bg-[#18afeb]/90">
            <ArrowUpCircle className="mr-2 h-4 w-4" />
            Recargar
          </Button>
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            <ArrowDownCircle className="mr-2 h-4 w-4" />
            Retirar
          </Button>
        </div>
        <div className="mt-4 pt-4 border-t">
          <Link href="/dashboard/wallet" className="text-xs text-muted-foreground hover:text-primary flex items-center">
            <History className="mr-1 h-3 w-3" />
            Ver historial de transacciones
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
