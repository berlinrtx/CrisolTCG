import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Eye, ShieldCheck, Ban } from "lucide-react"

// Mock user data - will be replaced with Supabase data
const mockUsers = [
  {
    id: "1",
    name: "Carlos Méndez",
    email: "carlos@example.com",
    avatar_url: "/buyer-avatar-1.jpg",
    role: "buyer",
    status: "active",
    joined_date: "2024-12-15",
    total_orders: 12,
  },
  {
    id: "2",
    name: "CardMaster GT",
    email: "cardmaster@example.com",
    avatar_url: "/seller-avatar.png",
    role: "seller",
    status: "active",
    joined_date: "2024-11-20",
    total_orders: 127,
  },
  {
    id: "3",
    name: "María García",
    email: "maria@example.com",
    avatar_url: "/buyer-avatar-2.jpg",
    role: "buyer",
    status: "active",
    joined_date: "2025-01-05",
    total_orders: 5,
  },
  {
    id: "4",
    name: "TCG Collectors",
    email: "tcgcollectors@example.com",
    avatar_url: "/seller-avatar-2.jpg",
    role: "seller",
    status: "active",
    joined_date: "2024-10-10",
    total_orders: 89,
  },
  {
    id: "5",
    name: "José Rodríguez",
    email: "jose@example.com",
    avatar_url: "/buyer-avatar-3.jpg",
    role: "buyer",
    status: "suspended",
    joined_date: "2024-09-15",
    total_orders: 3,
  },
]

const roleConfig = {
  buyer: { label: "Comprador", color: "bg-blue-500" },
  seller: { label: "Vendedor", color: "bg-purple-500" },
  admin: { label: "Admin", color: "bg-red-500" },
}

const statusConfig = {
  active: { label: "Activo", color: "bg-green-500" },
  suspended: { label: "Suspendido", color: "bg-red-500" },
  pending: { label: "Pendiente", color: "bg-yellow-500" },
}

export function UserManager() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Gestión de Usuarios</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Buscar usuarios..." className="pl-10 rounded-2xl" />
        </div>

        {/* Users Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de Registro</TableHead>
              <TableHead>Pedidos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </TableCell>
                <TableCell>
                  <Badge className={roleConfig[user.role as keyof typeof roleConfig].color}>
                    {roleConfig[user.role as keyof typeof roleConfig].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={statusConfig[user.status as keyof typeof statusConfig].color}>
                    {statusConfig[user.status as keyof typeof statusConfig].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{user.joined_date}</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{user.total_orders}</p>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon-sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <ShieldCheck className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <Ban className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
