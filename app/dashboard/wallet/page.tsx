import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { WalletCard } from "@/components/wallet-card"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

export default async function WalletPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get profile for balance
  const { data: profile } = await supabase.from("profiles").select("wallet_balance").eq("id", user.id).single()

  // Get transactions
  const { data: transactions } = await supabase
    .from("wallet_transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completado</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Pendiente
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">Fallido</Badge>
      case "cancelled":
        return <Badge variant="secondary">Cancelado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    if (["deposit", "sale", "refund"].includes(type)) {
      return <ArrowDownLeft className="h-4 w-4 text-green-500" />
    }
    return <ArrowUpRight className="h-4 w-4 text-red-500" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mi Billetera</h1>
        <p className="text-muted-foreground">Administra tus fondos y revisa tus movimientos</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <WalletCard balance={profile?.wallet_balance || 0} className="h-full" />
        </div>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Resumen Mensual</CardTitle>
            <CardDescription>Tus ingresos y gastos de este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-600">Ingresos</p>
                <p className="text-2xl font-bold text-green-700">{formatCurrency(0)}</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-600">Gastos</p>
                <p className="text-2xl font-bold text-red-700">{formatCurrency(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Transacciones</CardTitle>
          <CardDescription>Todos los movimientos de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions && transactions.length > 0 ? (
                transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium capitalize flex items-center gap-2">
                      {getTypeIcon(tx.transaction_type)}
                      {tx.transaction_type === "deposit"
                        ? "Depósito"
                        : tx.transaction_type === "withdrawal"
                          ? "Retiro"
                          : tx.transaction_type === "purchase"
                            ? "Compra"
                            : tx.transaction_type === "sale"
                              ? "Venta"
                              : tx.transaction_type}
                    </TableCell>
                    <TableCell>{tx.description || "-"}</TableCell>
                    <TableCell>{new Date(tx.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(tx.status)}</TableCell>
                    <TableCell
                      className={`text-right font-bold ${
                        ["deposit", "sale", "refund"].includes(tx.transaction_type) ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {["deposit", "sale", "refund"].includes(tx.transaction_type) ? "+" : "-"}
                      {formatCurrency(tx.amount)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No hay transacciones registradas
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
