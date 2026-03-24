import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t mt-12 text-card bg-muted-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 text-left">
            <Image
              src="/crisol-logo-nb.svg"
              alt="Crisol TCG"
              width={135}
              height={45}
              className="w-auto mb-4 dark:invert bg-muted-foreground text-muted-foreground h-[45px] ml-48"
            />
            <p className="text-sm leading-relaxed max-w-md text-card">
              El marketplace líder de cartas coleccionables en Guatemala. Compra y vende cartas de Yu-Gi-Oh!, Pokémon,
              One Piece, Magic y más con confianza.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog" className="text-sm hover:text-primary transition-colors text-card">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/sellers" className="text-sm hover:text-primary transition-colors text-card">
                  Vendedores
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-primary transition-colors text-card">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-primary transition-colors text-card">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm hover:text-primary transition-colors text-card">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-primary transition-colors text-card">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-primary transition-colors text-card">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm hover:text-primary transition-colors text-card">
                  Envíos y Devoluciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Crisol TCG. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
