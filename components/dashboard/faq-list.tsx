"use client"

import { HelpCircle, Search } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const faqs = [
  {
    category: "Órdenes y Envíos",
    questions: [
      {
        question: "¿Cuánto tiempo tarda el envío?",
        answer:
          "Los envíos en la ciudad de Guatemala tardan de 1-2 días hábiles. Para el interior del país, de 3-5 días hábiles. Los envíos internacionales pueden tardar de 7-15 días hábiles.",
      },
      {
        question: "¿Puedo rastrear mi pedido?",
        answer:
          "Sí, una vez que tu pedido sea enviado, recibirás un número de rastreo por correo electrónico. También puedes ver el estado de tu pedido en la sección 'Mis Órdenes' de tu cuenta.",
      },
      {
        question: "¿Cuánto cuesta el envío?",
        answer:
          "El costo de envío varía según tu ubicación y el peso del paquete. Los envíos en la ciudad de Guatemala tienen un costo de Q25-Q40. Para el interior, Q50-Q80. Los envíos son gratis en compras mayores a Q500.",
      },
    ],
  },
  {
    category: "Pagos",
    questions: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer:
          "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, y depósitos en efectivo.",
      },
      {
        question: "¿Es seguro pagar con tarjeta?",
        answer:
          "Sí, todas las transacciones están encriptadas con SSL de 256 bits. No almacenamos información completa de tarjetas en nuestros servidores.",
      },
      {
        question: "¿Puedo pagar en cuotas?",
        answer:
          "Sí, ofrecemos planes de pago en cuotas de 3, 6 y 12 meses sin intereses para compras mayores a Q500 con tarjetas participantes.",
      },
    ],
  },
  {
    category: "Devoluciones y Cambios",
    questions: [
      {
        question: "¿Cuál es su política de devolución?",
        answer:
          "Aceptamos devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar en su empaque original y sin usar. Los gastos de envío de devolución son responsabilidad del comprador.",
      },
      {
        question: "¿Cómo inicio una devolución?",
        answer:
          "Puedes iniciar una devolución desde la sección 'Quejas y Devoluciones' de tu cuenta. Selecciona la orden y el producto que deseas devolver, y sigue las instrucciones.",
      },
      {
        question: "¿Cuándo recibiré mi reembolso?",
        answer:
          "Una vez que recibamos y procesemos tu devolución, el reembolso se procesará en 5-10 días hábiles. Aparecerá en tu método de pago original.",
      },
    ],
  },
  {
    category: "Cuenta y Seguridad",
    questions: [
      {
        question: "¿Cómo cambio mi contraseña?",
        answer: "Ve a Configuración > Seguridad en tu cuenta y sigue las instrucciones para cambiar tu contraseña.",
      },
      {
        question: "¿Puedo cambiar mi correo electrónico?",
        answer:
          "Por motivos de seguridad, no es posible cambiar el correo electrónico asociado a tu cuenta. Si necesitas hacerlo, contacta a nuestro equipo de soporte.",
      },
      {
        question: "¿Cómo elimino mi cuenta?",
        answer:
          "Puedes solicitar la eliminación de tu cuenta contactando a nuestro equipo de soporte. Ten en cuenta que esto eliminará permanentemente todos tus datos.",
      },
    ],
  },
]

export function FAQList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar en preguntas frecuentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
      </Card>

      {filteredFaqs.map((category, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              {category.category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((faq, qIndex) => (
                <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}

      {filteredFaqs.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-1">No se encontraron resultados</p>
            <p className="text-sm text-muted-foreground">Intenta con otros términos de búsqueda</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
