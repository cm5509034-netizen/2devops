"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Icons as SVG components
const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const Check = () => (
  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const Terminal = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Cloud = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const Cog = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Shield = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Rocket = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const Lock = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const CreditCard = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const Mail = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// Visa Icon
const VisaIcon = () => (
  <svg viewBox="0 0 48 32" className="h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="32" rx="4" fill="#1434CB"/>
    <path d="M19.5 21H17.5L18.9 11H20.9L19.5 21Z" fill="white"/>
    <path d="M28.5 11.2C28.1 11.1 27.4 11 26.6 11C24.5 11 23 12.1 23 13.6C23 14.7 24 15.3 24.8 15.7C25.6 16.1 25.9 16.4 25.9 16.8C25.9 17.4 25.2 17.7 24.5 17.7C23.5 17.7 23 17.6 22.2 17.2L21.9 17.1L21.6 18.9C22.2 19.2 23.1 19.4 24.1 19.4C26.3 19.4 27.8 18.3 27.8 16.7C27.8 15.8 27.2 15.1 26 14.5C25.3 14.1 24.8 13.9 24.8 13.5C24.8 13.1 25.2 12.8 26.1 12.8C26.8 12.8 27.3 12.9 27.7 13.1L27.9 13.2L28.5 11.2Z" fill="white"/>
    <path d="M32.2 11H30.6C30.1 11 29.7 11.1 29.5 11.7L26.4 21H28.6L29 19.7H31.7L32 21H34L32.2 11ZM29.6 18C29.8 17.5 30.6 15.2 30.6 15.2C30.6 15.2 30.8 14.6 30.9 14.2L31.1 15.1C31.1 15.1 31.6 17.3 31.7 18H29.6Z" fill="white"/>
    <path d="M16.3 11L14.2 17.8L14 16.7C13.5 15.2 12.2 13.6 10.7 12.8L12.5 21H14.8L18.6 11H16.3Z" fill="white"/>
    <path d="M12.5 11H9.1L9 11.2C11.7 11.9 13.5 13.6 14 16.7L13.4 11.7C13.3 11.1 12.9 11 12.5 11Z" fill="#FCBB32"/>
  </svg>
);

// Mastercard Icon
const MastercardIcon = () => (
  <svg viewBox="0 0 48 32" className="h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="32" rx="4" fill="#1A1F36"/>
    <circle cx="19" cy="16" r="8" fill="#EB001B"/>
    <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
    <path d="M24 10.5C25.7 11.9 26.8 13.8 26.8 16C26.8 18.2 25.7 20.1 24 21.5C22.3 20.1 21.2 18.2 21.2 16C21.2 13.8 22.3 11.9 24 10.5Z" fill="#FF5F00"/>
  </svg>
);

export default function Home() {
  const [hours, setHours] = useState<number>(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const PRICE_PER_HOUR = 15;
  const totalPrice = hours * PRICE_PER_HOUR;

  const handleOpenPaymentModal = () => {
    if (hours > 0) {
      setIsPaymentModalOpen(true);
    }
  };

  const handleHoursChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0 && numValue <= 999) {
      setHours(numValue);
    }
  };

  const incrementHours = () => {
    if (hours < 999) setHours(hours + 1);
  };

  const decrementHours = () => {
    if (hours > 1) setHours(hours - 1);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ").substring(0, 19) : "";
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  const detectCardType = (number: string) => {
    const cleaned = number.replace(/\D/g, "");
    if (cleaned.startsWith("4")) return "visa";
    if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return "mastercard";
    return null;
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      alert(`Pago procesado exitosamente.\n\n${hours} hora(s) de servicio - Total: $${totalPrice}\n\nRecibirás un correo de confirmación con los detalles de tu compra.`);
      // Reset form
      setCardNumber("");
      setCardHolder("");
      setExpiryDate("");
      setCvv("");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-background grid-bg relative">
      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <CreditCard />
              Pago Seguro
            </DialogTitle>
            <DialogDescription>
              {hours} hora(s) de servicio DevOps - Total: ${totalPrice}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitPayment} className="space-y-6 mt-4">
            {/* Order Summary */}
            <div className="p-4 bg-secondary/30 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Precio por hora:</span>
                <span>${PRICE_PER_HOUR}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Horas:</span>
                <span>{hours}</span>
              </div>
              <div className="border-t border-border/50 pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">${totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Card Icons */}
            <div className="flex items-center gap-3 justify-center p-4 bg-secondary/30 rounded-lg">
              <VisaIcon />
              <MastercardIcon />
              <span className="text-sm text-muted-foreground ml-2">Aceptamos Visa y Mastercard</span>
            </div>

            {/* Card Number */}
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número de Tarjeta</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  required
                  className="pl-4 pr-12 bg-background border-border/50 focus:border-primary"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {detectCardType(cardNumber) === "visa" && <VisaIcon />}
                  {detectCardType(cardNumber) === "mastercard" && <MastercardIcon />}
                </div>
              </div>
            </div>

            {/* Cardholder Name */}
            <div className="space-y-2">
              <Label htmlFor="cardHolder">Nombre del Titular</Label>
              <Input
                id="cardHolder"
                placeholder="NOMBRE COMO APARECE EN LA TARJETA"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                required
                className="bg-background border-border/50 focus:border-primary"
              />
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Fecha de Vencimiento</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  maxLength={5}
                  required
                  className="bg-background border-border/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder="***"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").substring(0, 4))}
                  maxLength={4}
                  required
                  className="bg-background border-border/50 focus:border-primary"
                />
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg text-sm">
              <Shield />
              <span className="text-muted-foreground">
                Tu información está protegida con encriptación SSL de 256 bits. Nunca almacenamos los datos completos de tu tarjeta.
              </span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full btn-primary text-primary-foreground py-6 text-lg font-semibold"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Procesando pago...
                </span>
              ) : (
                `Pagar $${totalPrice}`
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Background Orbs */}
      <div className="gradient-orb orb-cyan w-[600px] h-[600px] -top-48 -left-48 fixed animate-pulse-glow" />
      <div className="gradient-orb orb-blue w-[500px] h-[500px] top-1/3 -right-48 fixed animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="gradient-orb orb-cyan w-[400px] h-[400px] bottom-0 left-1/4 fixed animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
              <Terminal />
            </div>
            <span className="text-xl font-bold tracking-tight">DevOps<span className="text-primary">Pro</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">Servicios</a>
            <a href="#planes" className="text-muted-foreground hover:text-foreground transition-colors">Planes</a>
            <a href="#pago" className="text-muted-foreground hover:text-foreground transition-colors">Pago</a>
          </div>
          <Button className="btn-primary text-primary-foreground font-semibold px-6">
            Contactar
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
            Infraestructura Cloud de Nueva Generación
          </Badge>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Escalabilidad
            <br />
            <span className="text-gradient-cyan">sin fricciones</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Automatizamos tu infraestructura para que tu equipo se enfoque en lo que importa:
            <span className="text-foreground font-medium"> construir productos excepcionales.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="btn-primary text-primary-foreground font-semibold px-8 py-6 text-lg group"
              onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Comenzar Ahora
              <ArrowRight />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/50 hover:bg-secondary/50 px-8 py-6 text-lg"
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient-cyan">99.9%</div>
              <div className="text-muted-foreground mt-2">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient-cyan">50+</div>
              <div className="text-muted-foreground mt-2">Clientes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient-cyan">24/7</div>
              <div className="text-muted-foreground mt-2">Soporte</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">Scroll</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Services Section */}
      <section id="servicios" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-foreground">Nuestros Servicios</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Soluciones DevOps <span className="text-gradient-cyan">Integrales</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Desde la estrategia hasta la implementación, cubrimos todo el ciclo de vida de tu infraestructura.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1: Consultoría y Estrategia */}
            <Card className="service-card animated-border p-8 bg-card/50 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-6 text-primary">
                <Cog />
              </div>
              <h3 className="text-2xl font-bold mb-4">Consultoría y Estrategia</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Analizamos tu infraestructura actual y diseñamos una hoja de ruta personalizada para alcanzar tus objetivos de negocio con eficiencia máxima.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Auditoría de infraestructura</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Roadmap de transformación</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Optimización de costos cloud</span>
                </li>
              </ul>
            </Card>

            {/* Service 2: Automatización CI/CD */}
            <Card className="service-card animated-border p-8 bg-card/50 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-6 text-primary">
                <Rocket />
              </div>
              <h3 className="text-2xl font-bold mb-4">Automatización CI/CD</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Implementamos pipelines robustos que aceleran tu ciclo de desarrollo. Despliega con confianza, múltiples veces al día.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Jenkins, GitLab CI, GitHub Actions</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Testing automatizado</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Rollbacks automáticos</span>
                </li>
              </ul>
            </Card>

            {/* Service 3: Infraestructura como Código */}
            <Card className="service-card animated-border p-8 bg-card/50 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-6 text-primary">
                <Cloud />
              </div>
              <h3 className="text-2xl font-bold mb-4">Infraestructura & Cloud</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Define tu infraestructura como código. Replicable, versionable y escalable. Terraform, Kubernetes y más.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Terraform & Pulumi</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Kubernetes & Docker</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">AWS, GCP, Azure</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Pricing Section - NUEVO SISTEMA POR HORA */}
      <section id="planes" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-foreground">Precio por Hora</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Paga solo por las <span className="text-gradient-cyan">Horas que Necesitas</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sin suscripciones ni compromisos. Selecciona las horas de servicio DevOps que requieres y paga únicamente por ellas.
            </p>
          </div>

          {/* Single Pricing Card */}
          <Card className="pricing-card featured p-10 relative overflow-hidden glow-cyan max-w-xl mx-auto">
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
              Flexible
            </Badge>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Servicio DevOps por Hora</h3>
              <p className="text-muted-foreground">Consultoría, CI/CD, Infraestructura Cloud y más</p>
            </div>

            {/* Price Display */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl font-bold text-gradient-cyan">${PRICE_PER_HOUR}</span>
                <span className="text-2xl text-muted-foreground">/hora</span>
              </div>
            </div>

            {/* Hours Selector */}
            <div className="mb-8">
              <Label htmlFor="hours" className="text-center block mb-4 text-lg font-medium">
                ¿Cuántas horas necesitas?
              </Label>
              <div className="flex items-center justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-14 h-14 text-2xl font-bold border-border/50 hover:bg-secondary/50"
                  onClick={decrementHours}
                  disabled={hours <= 1}
                >
                  -
                </Button>
                <Input
                  id="hours"
                  type="number"
                  min="1"
                  max="999"
                  value={hours}
                  onChange={(e) => handleHoursChange(e.target.value)}
                  className="w-28 h-14 text-center text-2xl font-bold bg-background border-border/50 focus:border-primary"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-14 h-14 text-2xl font-bold border-border/50 hover:bg-secondary/50"
                  onClick={incrementHours}
                  disabled={hours >= 999}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Total Calculation */}
            <div className="bg-secondary/30 rounded-xl p-6 mb-8">
              <div className="flex justify-between items-center text-lg">
                <span className="text-muted-foreground">{hours} hora(s) × ${PRICE_PER_HOUR}</span>
                <span className="text-3xl font-bold text-gradient-cyan">${totalPrice}</span>
              </div>
            </div>

            {/* What's Included */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check />
                <span>Consultoría DevOps especializada</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>Setup y configuración CI/CD</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>Infraestructura como código</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>Kubernetes, Docker, Terraform</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>AWS, GCP, Azure</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>Soporte durante el servicio</span>
              </li>
            </ul>

            <Button
              className="w-full btn-primary text-primary-foreground py-6 text-lg font-semibold flex items-center justify-center gap-3"
              onClick={handleOpenPaymentModal}
              disabled={hours < 1}
            >
              <CreditCard />
              Pagar ${totalPrice}
            </Button>

            {/* Card Icons */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <VisaIcon />
              <MastercardIcon />
            </div>
          </Card>

          {/* Quick Select Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="text-muted-foreground self-center mr-2">Selección rápida:</span>
            {[5, 10, 20, 40].map((h) => (
              <Button
                key={h}
                variant="outline"
                size="sm"
                className={`border-border/50 hover:bg-secondary/50 ${hours === h ? 'bg-primary/20 border-primary' : ''}`}
                onClick={() => setHours(h)}
              >
                {h} horas
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Payment Section */}
      <section id="pago" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-foreground">Pago Seguro</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Proceso de <span className="text-gradient-cyan">Pago Seguro</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tu seguridad es nuestra prioridad. Procesamos todos los pagos con tarjeta de crédito usando encriptación de nivel bancario.
            </p>
          </div>

          <Card className="animated-border p-10 bg-card/50 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left: Process Steps */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <CreditCard />
                  Flujo de Suscripción
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Selecciona las horas</h4>
                      <p className="text-sm text-muted-foreground">Elige cuántas horas de servicio DevOps necesitas.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Ingresa tu Tarjeta</h4>
                      <p className="text-sm text-muted-foreground">Completa el formulario seguro con los datos de tu tarjeta Visa o Mastercard.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Confirma el Pago</h4>
                      <p className="text-sm text-muted-foreground">Revisa los detalles y autoriza el pago único por tus horas seleccionadas.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Recibe tu Factura</h4>
                      <p className="text-sm text-muted-foreground">Recibirás una factura automática en tu correo electrónico.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Security Info */}
              <div className="bg-secondary/30 rounded-2xl p-8">
                <div className="text-primary mb-6">
                  <Lock />
                </div>
                <h3 className="text-2xl font-bold mb-4">Pago 100% Seguro</h3>
                <p className="text-muted-foreground mb-6">
                  Protegemos tu información financiera con encriptación SSL de 256 bits.
                  Nunca almacenamos los datos completos de tu tarjeta.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield />
                    <span className="text-sm">Encriptación de nivel bancario</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield />
                    <span className="text-sm">Cancela en cualquier momento</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield />
                    <span className="text-sm">Sin cargos ocultos</span>
                  </div>
                </div>

                {/* Card Badges */}
                <div className="mt-8 p-4 bg-background/50 rounded-xl">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <VisaIcon />
                    <MastercardIcon />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Aceptamos Visa y Mastercard</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para <span className="text-gradient-cyan">transformar</span> tu infraestructura?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Agenda una llamada gratuita de 30 minutos y descubre cómo podemos acelerar tu negocio.
          </p>
          <Button className="btn-primary text-primary-foreground font-semibold px-10 py-6 text-lg">
            <Mail />
            Agendar Llamada Gratis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                <Terminal />
              </div>
              <span className="text-lg font-bold">DevOps<span className="text-primary">Pro</span></span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Términos</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacidad</a>
              <a href="#" className="hover:text-foreground transition-colors">Contacto</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 DevOpsPro. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
